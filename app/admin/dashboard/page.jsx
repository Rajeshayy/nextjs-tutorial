
"use client";
import React, { useEffect, useState } from 'react';
import { getStats } from '@/utils/firebaseStore';
import AdminRoute from '@/components/AdminRoute';
import Link from 'next/link';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        users: 0,
        orders: 0,
        sales: 0,
        products: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            const data = await getStats();
            setStats(data);
        };
        fetchStats();
    }, []);

    return (
        <AdminRoute>
            <div className="max-w-[1200px] mx-auto px-4 py-12">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h1 className="text-3xl font-black text-dark uppercase tracking-tighter">Admin Overview</h1>
                        <p className="text-muted text-sm italic">Real-time store performance statistics</p>
                    </div>
                    <div className="flex gap-4">
                        <Link href="/admin/products" className="px-6 py-2 border-2 border-dark font-bold text-xs hover:bg-dark hover:text-white transition-all">MANAGE PRODUCTS</Link>
                        <Link href="/admin/orders" className="px-6 py-2 bg-dark text-white font-bold text-xs hover:bg-black transition-all">VIEW ORDERS</Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="bg-white p-8 border border-gray-100 card-shadow text-center">
                        <p className="text-muted text-[10px] font-black uppercase mb-2 tracking-widest">Total Revenue</p>
                        <p className="text-4xl font-black text-primary">Rs. {stats.sales.toLocaleString()}</p>
                    </div>
                    <div className="bg-white p-8 border border-gray-100 card-shadow text-center">
                        <p className="text-muted text-[10px] font-black uppercase mb-2 tracking-widest">Successful Orders</p>
                        <p className="text-4xl font-black text-dark">{stats.orders}</p>
                    </div>
                    <div className="bg-white p-8 border border-gray-100 card-shadow text-center">
                        <p className="text-muted text-[10px] font-black uppercase mb-2 tracking-widest">Active Users</p>
                        <p className="text-4xl font-black text-dark">{stats.users}</p>
                    </div>
                    <div className="bg-white p-8 border border-gray-100 card-shadow text-center">
                        <p className="text-muted text-[10px] font-black uppercase mb-2 tracking-widest">Live Products</p>
                        <p className="text-4xl font-black text-dark">{stats.products}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-8 border border-gray-100 card-shadow">
                        <h3 className="font-bold mb-6 flex justify-between">
                            <span>Quick Actions</span>
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Link href="/admin/products?action=add" className="p-4 bg-gray-50 hover:bg-gray-100 text-center rounded-sm transition-all group">
                                <span className="block text-xl mb-1 group-hover:scale-110 transition-transform">➕</span>
                                <span className="text-[10px] font-bold">ADD PRODUCT</span>
                            </Link>
                            <Link href="/admin/orders" className="p-4 bg-gray-50 hover:bg-gray-100 text-center rounded-sm transition-all group">
                                <span className="block text-xl mb-1 group-hover:scale-110 transition-transform">🚚</span>
                                <span className="text-[10px] font-bold">SHIP ORDERS</span>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white p-8 border border-gray-100 card-shadow">
                        <h3 className="font-bold mb-6">Recent Sales Activity</h3>
                        <p className="text-xs text-muted text-center py-8">Graph visualization coming soon in v2.0</p>
                    </div>
                </div>
            </div>
        </AdminRoute>
    );
}
