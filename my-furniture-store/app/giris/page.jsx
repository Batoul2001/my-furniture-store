'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Giris() {
  const [eposta, setEposta] = useState('');
  const [sifre, setSifre] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/giris', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eposta, sifre })
    });

    const data = await res.json();

    console.log(data);

    if (data.kullanici) {
      localStorage.setItem('kullanici', JSON.stringify(data.kullanici));
      alert('Giriş başarılı!');
      if (data.kullanici.rol === 'admin') {
        router.push('/admin');
      } else {
        router.push('/user');
      }
    } else {
      alert(data.mesaj || 'Giriş başarısız.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Giriş Yap</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="E-posta"
            value={eposta}
            onChange={(e) => setEposta(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Şifre"
            value={sifre}
            onChange={(e) => setSifre(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
}
