
"use client";
import { useEffect } from 'react';
import { initFirestore } from '@/utils/initFirestore';

export default function AppInitializer({ children }) {
    useEffect(() => {
        initFirestore();
    }, []);

    return children;
}
