
"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getFromLS } from '@/utils/localStorageUtils';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function CheckoutPage() {
    const [product, setProduct] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const data = getFromLS('tempCheckout');
        if (!data) {
            router.push('/');
        } else {
            setProduct(data);
        }
    }, [router]);

    if (!product) return null;

    return (
        <ProtectedRoute>
            <div className="max-w-[800px] mx-auto px-4 py-12">
                <h1 className="text-xl font-bold text-dark mb-8 border-b border-gray-100 pb-4">Checkout</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 border border-gray-100 rounded-sm card-shadow">
                        <h3 className="font-bold mb-4">Delivery Address</h3>
                        <div className="text-sm border p-4 rounded-sm border-gray-200">
                            <p className="font-bold">John Doe</p>
                            <p>123, Fashion Street, Trend City</p>
                            <p>PIN: 400001</p>
                            <p className="mt-2">Mobile: <span className="font-bold">9876543210</span></p>
                        </div>
                        <button className="text-primary text-xs font-bold mt-4 uppercase">Change or add address</button>
                    </div>

                    <div className="bg-white p-6 border border-gray-100 rounded-sm card-shadow flex flex-col gap-4">
                        <h3 className="font-bold mb-4">Order Summary</h3>
                        <div className="flex gap-4">
                            <img src={product.image} className="w-20 h-24 object-cover" />
                            <div className="flex flex-col gap-1">
                                <p className="text-sm font-bold truncate">{product.name}</p>
                                <p className="text-xs text-muted">Size: {product.selectedSize}</p>
                                <p className="text-sm font-bold mt-auto">Rs. {product.price}</p>
                            </div>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total Price</span>
                            <span>Rs. {product.price}</span>
                        </div>
                        <button
                            onClick={() => router.push('/payment')}
                            className="myntra-btn w-full mt-4"
                        >
                            PROCEED TO PAYMENT
                        </button>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
