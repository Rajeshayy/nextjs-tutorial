
"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getAllProducts } from '@/utils/firebaseStore';
import ProductCard from '@/components/ProductCard';

export default function CategoryPage() {
    const { type } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            const allProducts = await getAllProducts();
            const filtered = allProducts.filter(p => p.category === type.toUpperCase());
            setProducts(filtered);
            setLoading(false);
        };
        fetchProducts();
    }, [type]);

    if (loading) return <div className="p-12 text-center">Loading products...</div>;

    return (
        <div className="max-w-[1400px] mx-auto px-4 md:px-12 py-8">
            <div className="flex items-center gap-2 text-xs text-muted mb-8">
                <span>Home</span>
                <span>/</span>
                <span className="font-bold text-dark">{type} Clothing</span>
            </div>

            <div className="flex items-baseline gap-4 mb-8">
                <h1 className="text-xl font-bold text-dark">{type} Clothing</h1>
                <span className="text-muted text-sm font-normal">- {products.length} items</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-x-10 md:gap-y-12">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
                {products.length === 0 && (
                    <div className="col-span-full py-20 text-center text-muted">
                        No products found in this category.
                    </div>
                )}
            </div>
        </div>
    );
}
