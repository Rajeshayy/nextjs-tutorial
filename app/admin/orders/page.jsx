
"use client";
import React, { useEffect, useState } from 'react';
import { getAllOrders } from '@/utils/firebaseStore';
import AdminRoute from '@/components/AdminRoute';

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const data = await getAllOrders();
            setOrders(data);
        };
        fetchOrders();
    }, []);

    // Group orders by user
    const ordersByUser = orders.reduce((groups, order) => {
        const email = order.userEmail;
        if (!groups[email]) groups[email] = [];
        groups[email].push(order);
        return groups;
    }, {});

    return (
        <AdminRoute>
            <div className="max-w-[1200px] mx-auto px-4 py-12">
                <h1 className="text-2xl font-black uppercase text-dark mb-8">Order Management Feed</h1>

                <div className="flex flex-col gap-12">
                    {Object.keys(ordersByUser).length === 0 ? (
                        <div className="bg-white border p-20 text-center text-muted card-shadow">
                            No orders received across the platform yet.
                        </div>
                    ) : (
                        Object.keys(ordersByUser).map(email => (
                            <div key={email} className="bg-white border border-gray-100 card-shadow overflow-hidden rounded-sm">
                                <div className="bg-gray-50 p-4 flex justify-between items-center border-b">
                                    <div>
                                        <span className="text-[10px] font-black uppercase text-muted block mb-1">Customer</span>
                                        <h3 className="font-bold text-sm text-dark">{ordersByUser[email][0].userName} ({email})</h3>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] font-black uppercase text-muted block mb-1">Items</span>
                                        <span className="bg-dark text-white text-[10px] px-2 py-1 rounded-full font-bold">{ordersByUser[email].length}</span>
                                    </div>
                                </div>
                                <div className="p-0">
                                    <table className="w-full text-left">
                                        <thead className="bg-white border-b border-gray-100">
                                            <tr>
                                                <th className="p-4 text-[9px] font-black uppercase text-muted">Product Details</th>
                                                <th className="p-4 text-[9px] font-black uppercase text-muted">Size</th>
                                                <th className="p-4 text-[9px] font-black uppercase text-muted">Amount</th>
                                                <th className="p-4 text-[9px] font-black uppercase text-muted">Status</th>
                                                <th className="p-4 text-[9px] font-black uppercase text-muted">Order Date</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {ordersByUser[email].map(order => (
                                                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                                    <td className="p-4 flex items-center gap-3">
                                                        <img src={order.productImage} className="w-8 h-10 object-cover rounded-sm" />
                                                        <div>
                                                            <p className="text-xs font-bold text-dark">{order.productName}</p>
                                                            <p className="text-[8px] text-muted uppercase tracking-tighter">ID: {order.id}</p>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 text-[10px] font-black">{order.size}</td>
                                                    <td className="p-4 text-xs font-bold text-primary">Rs. {order.price}</td>
                                                    <td className="p-4 font-bold">
                                                        <span className="bg-green-50 text-green-600 text-[8px] px-2 py-1 rounded-md border border-green-100">
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-xs text-muted">{order.date}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AdminRoute>
    );
}
