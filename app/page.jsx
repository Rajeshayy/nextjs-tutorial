
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getAllProducts } from '@/utils/firebaseStore';
import ProductCard from '@/components/ProductCard';

export default function LandingPage() {
    const [recentProducts, setRecentProducts] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const products = await getAllProducts();
            setRecentProducts(products.slice(0, 10));
        };
        fetch();
    }, []);

    return (
        <div className="flex flex-col">
            {/* Hero Banner */}
            <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden bg-gray-100">
                <img
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000"
                    alt="Hero"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white p-4">
                    <h1 className="text-4xl md:text-6xl font-black tracking-widest text-center mb-6 drop-shadow-lg">
                        UNSTOPPABLE FASHION
                    </h1>
                    <p className="text-lg md:text-2xl font-semibold mb-8 text-center drop-shadow-md">
                        Up to 50% OFF on the Latest Collections
                    </p>
                    <div className="flex gap-6">
                        <Link href="/category/MEN" className="bg-white text-dark px-10 py-4 font-bold rounded-sm hover:bg-gray-100 transition-all">
                            SHOP MEN
                        </Link>
                        <Link href="/category/WOMEN" className="bg-primary text-white px-10 py-4 font-bold rounded-sm hover:bg-accent transition-all">
                            SHOP WOMEN
                        </Link>
                    </div>
                </div>
            </div>

            {/* Trending Scrolling Section */}
            {recentProducts.length > 0 && (
                <section className="py-16 bg-white">
                    <h2 className="text-2xl font-bold tracking-[5px] text-dark mb-12 text-center uppercase">Trending Now</h2>
                    <div className="px-4 md:px-12">
                        <div className="flex gap-8 overflow-x-auto pb-8 snap-x scrollbar-hide">
                            {recentProducts.map(product => (
                                <div key={product.id} className="min-w-[250px] md:min-w-[280px] snap-start">
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Featured Categories */}
            <section className="py-16 px-4 md:px-12 bg-white text-center">
                <h2 className="text-2xl font-bold tracking-[5px] text-dark mb-12">DEAL OF THE DAY</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Link href="/category/MEN" className="relative h-[400px] group overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1516257984877-a03a804703ae?auto=format&fit=crop&q=80&w=1000"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent flex flex-col items-center text-white">
                            <span className="text-xl font-bold">MEN'S CLASSICS</span>
                            <span className="text-sm mt-2 opacity-80 underline underline-offset-4">SHOP NOW</span>
                        </div>
                    </Link>
                    <Link href="/category/WOMEN" className="relative h-[400px] group overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1000"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent flex flex-col items-center text-white">
                            <span className="text-xl font-bold">WOMEN'S ELEGANCE</span>
                            <span className="text-sm mt-2 opacity-80 underline underline-offset-4">SHOP NOW</span>
                        </div>
                    </Link>
                </div>
            </section>

            {/* Trust Badges */}
            <div className="bg-secondary grid grid-cols-2 md:grid-cols-4 gap-8 py-12 px-12 border-y border-gray-200">
                <div className="flex flex-col items-center text-center">
                    <div className="text-3xl mb-2">🎁</div>
                    <span className="text-xs font-bold">AUTHENTIC PRODUCTS</span>
                </div>
                <div className="flex flex-col items-center text-center">
                    <div className="text-3xl mb-2">🔄</div>
                    <span className="text-xs font-bold">EASY 30 DAYS RETURNS</span>
                </div>
                <div className="flex flex-col items-center text-center">
                    <div className="text-3xl mb-2">🚚</div>
                    <span className="text-xs font-bold">FASTEST DELIVERY</span>
                </div>
                <div className="flex flex-col items-center text-center">
                    <div className="text-3xl mb-2">💎</div>
                    <span className="text-xs font-bold">PREMIUM QUALITY</span>
                </div>
            </div>
        </div>
    );
}
