
"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getCurrentUser, logoutUser, getCurrentAdmin, logoutAdmin } from '@/utils/auth';

export default function Navbar() {
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(null);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        setUser(getCurrentUser());
        setAdmin(getCurrentAdmin());
    }, [pathname]);

    const handleLogout = async () => {
        await logoutUser();
        setUser(null);
        router.push('/login');
    };

    const handleAdminLogout = async () => {
        await logoutAdmin();
        setAdmin(null);
        router.push('/admin/login');
    };

    const isAdminRoute = pathname.startsWith('/admin');

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white z-50 card-shadow px-4 md:px-12 h-20 flex items-center justify-between">
            <div className="flex items-center gap-12">
                <Link href="/" className="flex items-center">
                    <div className="w-12 h-10 myntra-gradient rounded-md flex items-center justify-center text-white font-bold text-xl italic">
                        M
                    </div>
                </Link>

                {!isAdminRoute && (
                    <div className="hidden md:flex gap-8 items-center h-full pt-6">
                        <Link href="/category/MEN" className={`nav-link ${pathname === '/category/MEN' ? 'border-b-4 border-primary' : ''}`}>MEN</Link>
                        <Link href="/category/WOMEN" className={`nav-link ${pathname === '/category/WOMEN' ? 'border-b-4 border-primary' : ''}`}>WOMEN</Link>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-6">
                {isAdminRoute ? (
                    <>
                        {admin ? (
                            <>
                                <Link href="/admin/dashboard" className="text-sm font-bold text-dark hover:text-primary">DASHBOARD</Link>
                                <button onClick={handleAdminLogout} className="text-sm font-bold text-dark hover:text-primary">LOGOUT</button>
                            </>
                        ) : (
                            <Link href="/admin/login" className="text-sm font-bold text-dark hover:text-primary">ADMIN LOGIN</Link>
                        )}
                    </>
                ) : (
                    <>
                        <div className="relative group">
                            <button className="flex flex-col items-center gap-1">
                                <span className="text-[10px] font-bold">PROFILE</span>
                            </button>
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-4 rounded-sm">
                                {user ? (
                                    <div className="flex flex-col gap-3">
                                        <p className="text-xs font-bold text-dark">Welcome, {user.name}!</p>
                                        <Link href="/user-dashboard" className="text-xs hover:text-primary font-semibold">My Orders</Link>
                                        <hr />
                                        <button onClick={handleLogout} className="text-xs text-left hover:text-primary font-semibold">Logout</button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-3">
                                        <p className="text-xs font-bold text-dark">Welcome</p>
                                        <p className="text-[10px] text-muted">To access account and manage orders</p>
                                        <Link href="/login" className="border border-gray-200 p-2 text-center text-primary font-bold text-xs hover:border-primary">LOGIN / SIGNUP</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
}
