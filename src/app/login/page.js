"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginCard from '@/components/Auth/LoginCard';

const LoginPage = () => {
    const router = useRouter();
    const [initialEmail, setInitialEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        // Hämta e-post från URL-parametrar
        const urlParams = new URLSearchParams(window.location.search);
        const email = urlParams.get('email');
        if (email) {
            setInitialEmail(email);
            setSuccessMessage('Registration successful! <br> Please fill in your password to log in.');
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        console.log('Email:', email);
        console.log('Password:', password);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error);
                return;
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            console.log('Token saved to localStorage:', localStorage.getItem('token')); // Lägg till denna rad
            console.log('Login successful');
            router.push('/inventory');
        } catch (err) {
            console.error(err);
            setError(err.message); // Set error message to display
        }
    };

    const clearError = () => setError(null);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <LoginCard onSubmit={handleLogin} errorMessage={error} clearError={clearError} initialEmail={initialEmail} successMessage={successMessage} />
        </main>
    );
};

export default LoginPage;
