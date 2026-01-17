
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/utils/auth';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await loginUser(email, password);
        if (result.success) {
            router.push('/');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-[#fdf0f5]">
            <div className="bg-white w-full max-w-sm rounded-sm card-shadow overflow-hidden">
                <img src="https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/2023/10/26/293cb848-1215-45a0-9856-42dbe52c64e61698305370258-Desktop-Banner.jpg" className="w-full" alt="Login Banner" />
                <div className="p-8">
                    <h2 className="text-xl font-bold text-dark mb-6">Login <span className="text-sm font-normal text-muted">or Signup</span></h2>
                    {error && <p className="text-primary text-xs mb-4 font-bold">{error}</p>}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            type="email"
                            placeholder="Email"
                            className="border border-gray-300 p-3 text-sm focus:outline-primary rounded-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="border border-gray-300 p-3 text-sm focus:outline-primary rounded-sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <p className="text-[10px] text-muted leading-4">
                            By continuing, I agree to the <span className="text-primary font-bold">Terms of Use</span> & <span className="text-primary font-bold">Privacy Policy</span>
                        </p>
                        <button type="submit" className="myntra-btn w-full mt-2">CONTINUE</button>
                    </form>
                    <p className="text-xs text-center mt-6">
                        New to Myntra? <Link href="/signup" className="text-primary font-bold">CREATE ACCOUNT</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
