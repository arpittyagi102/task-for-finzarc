"use client";

import React, { useState, useRef, FormEvent } from 'react';
import { showToast } from '@/utils/toast';
import { Berkshire_Swash } from "next/font/google";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const berkshire_swash = Berkshire_Swash({ subsets: ["latin"], weight: ["400"] });

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [inProgress, setInProgress] = useState(false);
    const router = useRouter(); // Initialize useRouter hook

    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const handleLogin = async (e: FormEvent) => {
        setInProgress(true);
        e.preventDefault();
        if (!email) {
            if (emailInputRef.current) {
                emailInputRef.current.focus();
                emailInputRef.current.style.border = '1px solid red';
            }
            showToast('Email is required', 'error');
            setInProgress(false);
            return;
        }
        if (!password) {
            if (passwordInputRef.current) {
                passwordInputRef.current.focus();
                passwordInputRef.current.style.border = '1px solid red';
            }
            showToast('Password is required', 'error');
            setInProgress(false);
            return;
        }

        // Sign in here
        try {
            const response = await fetch('https://task-for-finzarc.onrender.com/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            setInProgress(false);

            if (response?.ok) {
                const { token } = await response.json();
                localStorage.setItem('token', token);

                showToast('Logged in successfully', 'success');
                router.push('/tasks');
            } else {
                showToast('Invalid credentials', 'error');
            }

        } catch (error) {
            setInProgress(false);
            console.error("Error during login: ", error);
            showToast('Login failed', 'error');
        }

    }

    return (
        <div className="min-h-screen flex items-stretch text-white">
            <div className="lg:flex grow hidden bg-gray-500 bg-no-repeat bg-cover relative items-center backdrop-blur" style={{ backgroundImage: `url('/task.jpg')` }}>
                <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                <div className="w-full px-24 z-10">
                    <h1 className="text-5xl font-bold text-left tracking-wide">Time is Money</h1>
                    <p className="text-3xl my-4">Manage your time and be efficient !!</p>
                </div>
                <div className="bottom-0 absolute p-4 text-center right-0 left-0 flex justify-center space-x-4">
                    {/* Social icons */}
                </div>
            </div>
            <div className="w-full lg:max-w-[600px] flex items-center justify-center text-center px-auto lg:px-36 z-0 bg-white text-black">
                <div className="py-6 z-20 w-[400px]">
                    <h1 className={`logo my-6 text-5xl ${berkshire_swash.className}`}>
                        Task Manager
                    </h1>


                    <form className="w-full px-4 lg:px-0" onSubmit={handleLogin}>
                        <div className="pb-2 pt-4">
                            <input ref={emailInputRef} className="block w-full p-4 text-lg rounded-xl bg-neutral-300 focus:outline-none" type="email" name="email" id="email" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value); e.target.style.border = "none" }} />
                        </div>
                        <div className="pb-1 pt-4">
                            <input ref={passwordInputRef} className="block w-full p-4 text-lg rounded-xl bg-neutral-300 focus:outline-none" type="password" name="password" id="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value); e.target.style.border = "none" }} />
                        </div>
                        <div className="text-right text-neutral-600 hover:text-black">
                            <Link href="/signup" className="text-right text-neutral-600 hover:text-black">Don&apos;t have an account?</Link>
                        </div>

                        <div className="px-4 pb-2 pt-4 text-white flex justify-center">
                            <button className="w-full p-3 text-lg rounded-full bg-gradient-to-r from-indigo-500 to-purple-400 hover:to-indigo-600 font-bold flex justify-center focus:outline-none">
                                {inProgress ? (
                                    <span className='block w-min'>
                                        <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                            <g id="SVGRepo_iconCarrier">
                                                <path d="M21 12a9 9 0 11-6.219-8.56"></path>
                                            </g>
                                        </svg>
                                    </span>
                                ) : (
                                    <span>SIGN IN</span>
                                )}
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}