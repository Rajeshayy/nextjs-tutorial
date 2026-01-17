
"use client";
import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '@/utils/auth';
import { getOrdersByUser } from '@/utils/firebaseStore';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function UserDashboard() {
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const u = getCurrentUser();
        if (u) {
            setUser(u);
            const fetchOrders = async () => {
                const userOrders = await getOrdersByUser(u.id);
                setOrders(userOrders);
            };
            fetchOrders();
        }
    }, [user?.id]);

    return (
        <ProtectedRoute>
            <div className="max-w-[1000px] mx-auto px-4 py-12">
                <h1 className="text-2xl font-bold mb-2">Account</h1>
                <p className="text-muted mb-8">{user?.name} | {user?.email}</p>

                <div className="flex flex-col md:flex-row gap-12">
                    <div className="w-full md:w-1/4 flex flex-col gap-4 border-r border-gray-100 pr-8">
                        <button className="text-left font-bold text-primary border-r-4 border-primary pr-4">Orders</button>
                        <button className="text-left font-bold text-dark hover:text-primary">Profile</button>
                        <button className="text-left font-bold text-dark hover:text-primary">Addresses</button>
                    </div>

                    <div className="flex-1">
                        <h2 className="font-bold text-lg mb-6">Recent Orders ({orders.length})</h2>
                        <div className="flex flex-col gap-6">
                            {orders.length === 0 ? (
                                <div className="p-12 border border-dashed text-center text-muted rounded-sm">
                                    You haven't placed any orders yet.
                                </div>
                            ) : (
                                orders.map(order => (
                                    <div key={order.id} className="border border-gray-100 p-4 rounded-sm card-shadow flex gap-6 items-center">
                                        <img src={order.productImage} className="w-20 h-24 object-cover" />
                                        <div className="flex-1">
                                            <p className="font-bold text-dark">{order.productName}</p>
                                            <p className="text-xs text-muted mb-2">Size: {order.size} | Ordered on: {order.date}</p>
                                            <div className="flex items-center gap-2">
                                                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                                                <span className="text-xs font-bold text-dark uppercase">{order.status}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold">Rs. {order.price}</p>
                                            <p className="text-[10px] text-muted">ID: {order.id}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
