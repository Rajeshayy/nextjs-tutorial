
"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getProductById } from '@/utils/firebaseStore';
import { saveToLS } from '@/utils/localStorageUtils';

export default function ProductDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            const found = await getProductById(id);
            setProduct(found);
        };
        fetchProduct();
    }, [id]);

    const handleCheckout = () => {
        if (!selectedSize) {
            setError('Please select a size');
            return;
        }
        // Store checkout info temporarily
        saveToLS('tempCheckout', { ...product, selectedSize });
        router.push('/checkout');
    };

    if (!product) return <div className="p-20 text-center">Product not found</div>;

    return (
        <div className="max-w-[1200px] mx-auto px-4 md:px-12 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Images */}
                <div className="flex gap-4">
                    <div className="w-full aspect-[3/4] overflow-hidden rounded-sm">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                </div>

                {/* Details */}
                <div className="flex flex-col gap-6">
                    <div>
                        <h1 className="text-2xl font-bold text-dark">{product.name}</h1>
                        <p className="text-lg text-muted mt-1">{product.description}</p>
                    </div>

                    <div className="flex items-center gap-2 border-y border-gray-100 py-4">
                        <div className="px-2 border-r border-gray-300">
                            <span className="font-bold">4.2 ⭐</span>
                        </div>
                        <div className="px-2 text-muted font-semibold">1.5k Ratings</div>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-dark">Rs. {product.price}</span>
                        <span className="text-xl text-muted line-through">Rs. {Math.round(product.price * 1.5)}</span>
                        <span className="text-xl text-orange-400 font-bold">(50% OFF)</span>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-bold text-dark">SELECT SIZE</span>
                            <span className="text-primary font-bold text-sm cursor-pointer underline">SIZE CHART</span>
                        </div>
                        <div className="flex gap-4 flex-wrap">
                            {product.sizes.map(size => (
                                <button
                                    key={size}
                                    onClick={() => { setSelectedSize(size); setError(''); }}
                                    className={`w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center font-bold transition-all
                    ${selectedSize === size ? 'border-primary text-primary' : 'hover:border-primary text-dark'}
                  `}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                        {error && <p className="text-primary text-xs mt-2 font-bold">{error}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                        <button
                            onClick={handleCheckout}
                            className="bg-primary text-white font-bold py-4 rounded-sm flex items-center justify-center gap-4 hover:bg-accent"
                        >
                            🛍️ PROCEED TO CHECKOUT
                        </button>
                        <button className="border border-dark font-bold py-4 rounded-sm flex items-center justify-center gap-4 hover:border-primary hover:text-primary">
                            🤍 WISHLIST
                        </button>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-100">
                        <h3 className="font-bold mb-4">PRODUCT DETAILS</h3>
                        <p className="text-sm text-dark leading-6">
                            This product is made with high-quality materials to ensure comfort and durability.
                            Perfect for {product.category === 'MEN' ? 'his' : 'her'} stylish wardrobe.
                            Easy to wash and maintain.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
