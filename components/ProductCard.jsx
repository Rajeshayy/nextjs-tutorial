
"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product }) {
    return (
        <div className="group relative bg-white transition-all duration-300 hover:shadow-xl border border-gray-100 rounded-sm overflow-hidden">
            <Link href={`/product/${product.id}`}>
                <div className="aspect-[3/4] overflow-hidden relative">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute bottom-2 left-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-dark">
                        ⭐ 4.2 | 1.2k
                    </div>
                </div>
                <div className="p-4">
                    <h3 className="text-sm font-bold text-dark truncate">{product.name}</h3>
                    <p className="text-xs text-muted truncate mt-1">{product.description || 'Modern fashion wear'}</p>
                    <div className="mt-2 flex items-center gap-2">
                        <span className="text-sm font-bold text-dark">Rs. {product.price}</span>
                        <span className="text-[10px] text-muted line-through">Rs. {Math.round(product.price * 1.5)}</span>
                        <span className="text-[10px] text-orange-400 font-bold">(50% OFF)</span>
                    </div>
                </div>
            </Link>
        </div>
    );
}
