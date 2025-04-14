"use client";

import React, { useState, useRef, FormEvent } from 'react';
import { showToast } from '@/utils/toast';
import { Berkshire_Swash } from "next/font/google";
import { useRouter } from 'next/navigation';

const berkshire_swash = Berkshire_Swash({ subsets: ["latin"], weight: ["400"] });

export default function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [inProgress, setInProgress] = useState(false);
    const router = useRouter();

    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const validateSignUp = () => {
        if (!firstName.trim()) {
            showToast('First Name is required', 'error');
            if (firstNameRef.current) {
                firstNameRef.current.focus();
                firstNameRef.current.style.border = '1px solid red';
            }
            return false;
        }

        if (!lastName.trim()) {
            showToast('Last Name is required', 'error');
            if (lastNameRef.current) {
                lastNameRef.current.focus();
                lastNameRef.current.style.border = '1px solid red';
            }
            return false;
        }

        if (!email.trim()) {
            showToast('Email is required', 'error');
            if (emailInputRef.current) {
                emailInputRef.current.focus();
                emailInputRef.current.style.border = '1px solid red';
            }
            return false;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            showToast('Please enter a valid email address', 'error');
            if (emailInputRef.current) {
                emailInputRef.current.focus();
                emailInputRef.current.style.border = '1px solid red';
            }
            return false;
        }

        if (!password) {
            showToast('Password is required', 'error');
            if (passwordInputRef.current) {
                passwordInputRef.current.focus();
                passwordInputRef.current.style.border = '1px solid red';
            }
            return false;
        }

        if (password.length < 8) {
            showToast("Password should be at least 8 characters long", 'error');
            if (passwordInputRef.current) {
                passwordInputRef.current.focus();
                passwordInputRef.current.style.border = '1px solid red';
            }
            return false;
        }

        return true;
    }

    const handleSignUp = async (e: FormEvent) => {
        e.preventDefault();
        setInProgress(true);

        if (!validateSignUp()) {
            setInProgress(false);
            return;
        }

        try {
            const response = await fetch('https://task-for-finzarc.onrender.com/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fName: firstName,
                    lName: lastName,
                    email,
                    password
                })
            })

            if (response.status === 409) {
                showToast("This user already exists", 'error');
                router.push('/login');

            } else if (response.status === 201) {
                showToast("User created successfully", 'success');
                router.push('/login');

            } else {
                const data = await response.json();
                showToast(data.message, 'error');
            }

        } catch (error) {
            console.log("Error while signing up: ", error);
        }

        setInProgress(false);
    }

    return (
        <div className="min-h-screen flex items-stretch text-white">
            {/* Background Image Section */}
            <div className="lg:flex grow hidden bg-gray-500 bg-no-repeat bg-cover relative items-center backdrop-blur" style={{ backgroundImage: `url('task2.jpg')` }}>
                <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                <div className="w-full px-24 z-10">
                    <h1 className="text-5xl font-bold text-left tracking-wide">Track Your Tasks</h1>
                    <p className="text-3xl my-4">Making the task management easy for you</p>
                </div>
            </div>

            {/* Signup Form Section */}
            <div className="w-full lg:max-w-[600px] flex items-center justify-center text-center px-auto lg:px-36 z-0 bg-white text-black">
                <div className="py-6 z-20 w-[400px]">
                    <h1 className={`logo my-6 text-5xl ${berkshire_swash.className}`}>
                        EasyHome
                    </h1>

                    {/* Signup Form */}
                    <form className="w-full px-4 lg:px-0" onSubmit={handleSignUp}>
                        <div className='fnln-outer flex justify-between'>
                            <div className="fName w-[45%]">
                                <label className="float-start text-sm">First Name</label>
                                <input
                                    name="first-name"
                                    className="bg-neutral-300 focus:outline-none p-3 w-full rounded-xl"
                                    placeholder='Arpit'
                                    value={firstName}
                                    ref={firstNameRef}
                                    onChange={(e) => {
                                        setFirstName(e.target.value)
                                        e.target.style.border = "none"
                                    }}
                                />
                            </div>
                            <div className="lName w-[45%]">
                                <label className="float-start text-sm">Last Name</label>
                                <input
                                    name="last-name"
                                    className=" bg-neutral-300 focus:outline-none p-3 w-full rounded-xl"
                                    placeholder='Tyagi'
                                    value={lastName}
                                    ref={lastNameRef}
                                    onChange={(e) => {
                                        setLastName(e.target.value)
                                        e.target.style.border = "none"
                                    }}
                                />
                            </div>
                        </div>

                        <div className="pb-1 pt-4">
                            <label className="float-start text-sm">Email</label>
                            <input
                                ref={emailInputRef}
                                className="block w-full p-4 text-lg rounded-xl bg-neutral-300 focus:outline-none"
                                type="email"
                                name="email"
                                id="email"
                                placeholder="arpittyagi102@gmail.com"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    e.target.style.border = "none"
                                }}
                            />
                        </div>

                        <div className="pb-1 pt-4">
                            <label className="float-start text-sm">Password</label>
                            <input
                                ref={passwordInputRef}
                                className="block w-full p-4 text-lg rounded-xl bg-neutral-300 focus:outline-none"
                                type="password"
                                name="password"
                                id="password"
                                placeholder="*************"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    e.target.style.border = "none"
                                }}
                            />
                        </div>

                        {/* SIGN UP BUTTON */}
                        <div className="px-4 pb-2 pt-4 text-white flex justify-center">
                            <button
                                className="w-full p-3 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 flex justify-center focus:outline-none"
                                disabled={inProgress}
                            >
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
                                    <span>SIGN UP</span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
