"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RegisterCard from '@/components/Auth/RegisterCard';

const RegisterPage = () => {
  const router = useRouter();
  const [error, setError] = useState(null);



  const handleRegister = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value; // Lägg till detta

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }), // Inkludera name här
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed');
        return;
      }

      router.push(`/login?email=${encodeURIComponent(email)}`);
      const data = await response.json();
      // Logga den registrerade användaren
      console.log('User registered:', data);

      // Handle successful registration
      console.log('Registration successful');
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred');
    }
  };

  const clearError = () => {
    setError(null);

  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <RegisterCard onSubmit={handleRegister} errorMessage={error}
        clearError={clearError} />
    </main>
  );
};

export default RegisterPage;
