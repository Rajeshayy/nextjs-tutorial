
"use client";
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getOrderById } from '@/utils/firebaseStore';
import Link from 'next/link';

function OrderSuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('id');
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            if (orderId) {
                const found = await getOrderById(orderId);
                setOrder(found);
            }
        };
        fetchOrder();
    }, [orderId]);

    if (!order) return <div className="p-20 text-center">Order processing...</div>;

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-4xl">
                ✓
            </div>
            <h1 className="text-3xl font-bold text-dark">Order Confirmed!</h1>
            <p className="text-muted">Thank you for shopping with us. Your order will be delivered within 3-5 business days.</p>

            <div className="w-full bg-white border border-gray-100 p-6 rounded-sm card-shadow text-left mt-4">
                <p className="font-bold text-sm mb-4 border-b pb-2">ORDER DETAILS</p>
                <div className="flex gap-4">
                    <img src={order.productImage} className="w-16 h-20 object-cover" />
                    <div className="flex flex-col gap-1">
                        <p className="font-bold text-sm">{order.productName}</p>
                        <p className="text-xs text-muted">Size: {order.size} | Order Id: {order.id}</p>
                        <p className="font-bold text-sm mt-1">Rs. {order.price}</p>
                    </div>
                </div>
            </div>

            <div className="flex gap-4 mt-8">
                <Link href="/user-dashboard" className="px-8 py-3 border border-dark font-bold text-sm hover:bg-dark hover:text-white transition-all">
                    VIEW MY ORDERS
                </Link>
                <Link href="/" className="px-8 py-3 bg-primary text-white font-bold text-sm hover:bg-accent transition-all">
                    CONTINUE SHOPPING
                </Link>
            </div>
        </div>
    );
}

export default function OrderSuccessPage() {
    return (
        <div className="max-w-[600px] mx-auto px-4 py-20 text-center">
            <Suspense fallback={<div>Loading...</div>}>
                <OrderSuccessContent />
            </Suspense>
        </div>
    );
}
