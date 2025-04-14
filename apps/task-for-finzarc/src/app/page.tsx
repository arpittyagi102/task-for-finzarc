import React from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default async function Index() {

    return (
        <main className='h-screen bg-cover bg-no-repeat' style={{ backgroundImage: 'url(/bg.jpg)', backgroundPosition: 'center' }}>
            <Navbar />

            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-screen'>
                <h1 className="text-6xl font-bold align-center text-center m-4 w-full text-neutral-700">
                    Never Forget Your Tasks
                </h1>
                <Link href="/tasks" className='text-2xl px-8 mt-6 py-2 border border-black rounded-full font-bold backdrop-blur-sm hover:bg-neutral-800 hover:text-neutral-300'> Get Started </Link>
            </div>
        </main>
    );
}


