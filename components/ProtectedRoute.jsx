
"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/utils/auth';

export default function ProtectedRoute({ children }) {
    const router = useRouter();
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const user = getCurrentUser();
        if (!user) {
            router.push('/login');
        } else {
            setIsAuth(true);
        }
    }, [router]);

    if (!isAuth) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return children;
}
