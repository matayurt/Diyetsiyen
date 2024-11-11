'use client'

import { useState } from 'react'

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setAuthenticated(true);
    } else {
      alert('Yanlış şifre!');
    }
  }

  return (
    <main className="flex items-center justify-center h-screen">
      {!authenticated ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="password" 
            placeholder="Şifreyi girin" 
            className="border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Giriş Yap
          </button>
        </form>
      ) : (
        <h1 className="text-3xl font-bold">Admin Paneline Hoş Geldiniz!</h1>
      )}
    </main>
  );
}
