
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signupUser } from '@/utils/auth';

export default function SignupPage() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await signupUser(formData);
        if (result.success) {
            router.push('/');
        } else {
            setError(result.message);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-[#fdf0f5]">
            <div className="bg-white w-full max-w-sm rounded-sm card-shadow p-8">
                <h2 className="text-xl font-bold text-dark mb-6">Create Account</h2>
                {error && <p className="text-primary text-xs mb-4 font-bold">{error}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        className="border border-gray-300 p-3 text-sm focus:outline-primary rounded-sm"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        className="border border-gray-300 p-3 text-sm focus:outline-primary rounded-sm"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Create Password"
                        className="border border-gray-300 p-3 text-sm focus:outline-primary rounded-sm"
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className="myntra-btn w-full mt-4">SIGN UP</button>
                </form>
                <p className="text-xs text-center mt-6">
                    Already have an account? <Link href="/login" className="text-primary font-bold">LOGIN</Link>
                </p>
            </div>
        </div>
    );
}
