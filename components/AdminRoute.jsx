
"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentAdmin } from '@/utils/auth';

export default function AdminRoute({ children }) {
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const admin = getCurrentAdmin();
        if (!admin) {
            router.push('/admin/login');
        } else {
            setIsAdmin(true);
        }
    }, [router]);

    if (!isAdmin) return <div className="min-h-screen flex items-center justify-center">Loading Admin...</div>;

    return children;
}
