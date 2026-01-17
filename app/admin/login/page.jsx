
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin } from '@/utils/auth';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await loginAdmin(email, password);
        if (result.success) {
            router.push('/admin/dashboard');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark">
            <div className="bg-white w-full max-w-sm rounded-sm p-8 shadow-2xl">
                <h1 className="text-2xl font-black text-dark mb-2 text-center">ADMIN PANEL</h1>
                <p className="text-muted text-xs text-center mb-8 uppercase tracking-widest">Management Console</p>

                {error && <p className="text-primary text-xs mb-4 font-bold text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-muted uppercase">Admin Email</label>
                        <input
                            type="email"
                            className="border-b-2 border-gray-200 p-2 text-sm focus:border-dark outline-none transition-all"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-muted uppercase">Secret Password</label>
                        <input
                            type="password"
                            className="border-b-2 border-gray-200 p-2 text-sm focus:border-dark outline-none transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="bg-dark text-white font-bold py-4 mt-4 hover:bg-black transition-all">
                        LOGIN TO DASHBOARD
                    </button>
                </form>
                <p className="text-[10px] text-center mt-8 text-muted uppercase italic">
                    Authorized personnel only. All actions are logged.
                </p>
            </div>
        </div>
    );
}
