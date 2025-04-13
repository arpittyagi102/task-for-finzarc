import React from 'react';

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

export default async function Index() {
    const data = await getData();

    return (
        <div>
            <h1 className="text-3xl font-bold align-center text-center m-4">
                Hello from Frontend !!
            </h1>
            <h1 className="text-3xl font-bold align-center text-center m-4">
                {data.message || 'Error fetching data'}
            </h1>
           
        </div>
    );
}
