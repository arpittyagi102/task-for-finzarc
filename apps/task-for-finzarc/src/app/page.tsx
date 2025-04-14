import React from 'react';
import Navbar from '@/components/Navbar';

export default async function Index() {
    const data = await getData();

    return (
        <main>
            <Navbar />
            <h1 className="text-3xl font-bold align-center text-center m-4">
                Hello from Frontend !!
            </h1>
            <h1 className="text-3xl font-bold align-center text-center m-4">
                {data.message || 'Error fetching data'}
            </h1>
           
        </main>
    );
}

async function getData() {
    try {
        const res = await fetch('http://localhost:3333/api', {
            cache: 'no-store',
        });
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }

        return res.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return { message: 'Error fetching data' };
    }
}

