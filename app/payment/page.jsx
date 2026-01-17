
"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getFromLS, saveToLS, KEYS } from '@/utils/localStorageUtils';
import { getCurrentUser } from '@/utils/auth';
import { createOrder } from '@/utils/firebaseStore';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function PaymentPage() {
    const [amount, setAmount] = useState('');
    const [product, setProduct] = useState(null);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const data = getFromLS('tempCheckout');
        if (!data) router.push('/');
        else setProduct(data);
    }, [router]);

    const handlePayment = (e) => {
        e.preventDefault();
        const user = getCurrentUser();

        if (!user) {
            setError("Authentication error. Please login again.");
            return;
        }

        const enteredAmount = Number(amount);
        const requiredAmount = Number(product.price);

        if (enteredAmount === requiredAmount) {
            // Success - Save Order
            const saveOrderToFirestore = async () => {
                const newOrder = {
                    userId: user.id || 'N/A',
                    userName: user.name || 'Customer',
                    userEmail: user.email,
                    productId: product.id,
                    productName: product.name,
                    productImage: product.image,
                    size: product.selectedSize,
                    price: requiredAmount,
                    status: 'Confirmed',
                    date: new Date().toLocaleDateString()
                };
                const savedOrder = await createOrder(newOrder);
                localStorage.removeItem('tempCheckout');
                router.push(`/order-success?id=${savedOrder.id}`);
            };
            saveOrderToFirestore();
        } else {
            setError(`Payment mismatch! Required amount is Rs. ${product.price}. Please enter the exact amount.`);
        }
    };

    if (!product) return null;

    return (
        <ProtectedRoute>
            <div className="max-w-[500px] mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold mb-8">Payment Gateway (Dummy)</h1>
                <div className="bg-white border rounded-sm p-8 card-shadow">
                    <p className="text-muted mb-4 uppercase text-sm tracking-widest font-bold">Payable Amount</p>
                    <p className="text-4xl font-black text-dark mb-8">Rs. {product.price}</p>

                    <form onSubmit={handlePayment} className="flex flex-col gap-6">
                        <div className="text-left flex flex-col gap-2">
                            <label className="text-xs font-bold block">Enter Amount to Pay</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full border p-4 text-center text-2xl font-bold focus:outline-primary transition-all"
                                placeholder="0"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setAmount(product.price.toString())}
                                className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline self-end"
                            >
                                Quick Fill: Rs. {product.price}
                            </button>
                            {error && <p className="text-primary text-xs mt-1 font-bold">{error}</p>}
                        </div>

                        <button type="submit" className="myntra-btn py-4 text-lg">
                            PAY NOW
                        </button>
                    </form>

                    <p className="text-[10px] text-muted mt-8">
                        This is a simulation. Enter exactly {product.price} to succeed.
                    </p>
                </div>
            </div>
        </ProtectedRoute>
    );
}
