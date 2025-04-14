"use client"
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<User|null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUser(jwtDecode(token));
            setIsLoggedIn(true);
        }
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUser(null);
    }

    return (
        <header className="w-full flex justify-between items-center p-2 lg:px-40 sticky top-0 bg-[#bbbbbb58] backdrop-blur-lg text-black shadow-md z-10">
            <h1 className="text-2xl font-thin">Project Management</h1>

            <div className='flex items-center gap-3'>
                {isLoggedIn ? (
                    <>  
                        <span className="text-lg font-bold ">Hello, {user && user.fName} 👋</span>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold" onClick={handleSignOut}>Sign Out</button>
                    </>
                ) : (
                    <Link href="/login" className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold">Sign In</Link>
                )}
            </div>

        </header>
    )
}

interface User {
    fName: string;
    lName: string;
    email: string;
}