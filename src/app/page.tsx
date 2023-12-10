
'use client'
import React, { useState } from 'react';

function AuthForm() {
    const [activeTab, setActiveTab] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');


  const handleSubmit = async (e :any) => {
    e.preventDefault();

    const userData = {
        email,
        password,
        firstName: activeTab === 'signup' ? firstName : undefined,
        lastName: activeTab === 'signup' ? lastName : undefined,
    };

    const endpoint = activeTab === 'login' ? 'http://yourbackend.com/login.php' : 'http://yourbackend.com/register.php';

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (response.ok) {
            if (activeTab === 'login') {
                localStorage.setItem('jwt', data.token);
                // Handle login success
            } else {
                // Handle signup success
                alert(data.message); // Popup message
            }
        } else {
            console.error('Error:', data.message || 'An error occurred');
        }
    } catch (error) {
        console.error('There was an error:', error);
    }
};


    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-800">
            <div className="mb-6 text-center">
                <h1 className="text-3xl font-bold text-white">Budget Tracking App</h1>
                <p className="text-gray-400">Manage your finances with ease</p>
            </div>
            <div className="p-6 bg-gray-700 rounded shadow-md">
                <div className="flex mb-4">
                    <button 
                        className={`flex-1 py-2 rounded-t-lg text-white ${activeTab === 'login' ? 'bg-gray-600' : 'bg-gray-700'}`}
                        onClick={() => setActiveTab('login')}
                    >
                        Login
                    </button>
                    <button 
                        className={`flex-1 py-2 rounded-t-lg text-white ${activeTab === 'signup' ? 'bg-gray-600' : 'bg-gray-700'}`}
                        onClick={() => setActiveTab('signup')}
                    >
                        Signup
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    {activeTab === 'signup' && (
                        <>
                            <div className="mb-4">
                                <label htmlFor="firstName" className="block mb-2 text-sm font-bold text-gray-300">First Name</label>
                                <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full px-3 py-2 border rounded shadow appearance-none text-gray-300 bg-gray-600 border-gray-500 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="lastName" className="block mb-2 text-sm font-bold text-gray-300">Last Name</label>
                                <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full px-3 py-2 border rounded shadow appearance-none text-gray-300 bg-gray-600 border-gray-500 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                        </>
                    )}
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-300">Email</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded shadow appearance-none text-gray-300 bg-gray-600 border-gray-500 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-300">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 mb-3 border rounded shadow appearance-none text-gray-300 bg-gray-600 border-gray-500 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline">
                        {activeTab === 'login' ? 'Login' : 'Sign Up'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AuthForm;

