import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const correctPassword = 'Peacelove082420!!!'; // 🔒 Change this to your own secret
    if (password === correctPassword) {
      localStorage.setItem('authenticated', 'true');
      navigate('/admin');
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">🔐 Admin Login</h1>
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 rounded text-black w-72 mb-3"
      />
      <button
        onClick={handleLogin}
        className="bg-green-500 px-6 py-2 rounded hover:bg-green-600"
      >
        Log In
      </button>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
}