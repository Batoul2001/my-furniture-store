'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Registration() {
  const [ad, setAd] = useState('');
  const [eposta, setEposta] = useState('');
  const [sifre, setSifre] = useState('');
  const [confirmSifre, setConfirmSifre] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (sifre !== confirmSifre) {
      alert('Şifreler uyuşmuyor!');
      return;
    }

    const res = await fetch('/api/registration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ad, eposta, sifre }),
    });

    const data = await res.json();

    if (data.kullanici) {
      alert('Kullanıcı başarıyla kaydedildi!');
      router.push('/giris');
    } else {
      alert(data.mesaj || 'Kayıt sırasında bir hata oluştu.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Kullanıcı Kaydı</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Ad"
            value={ad}
            onChange={(e) => setAd(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
          <input
            type="password"
            placeholder="Şifreyi Doğrula"
            value={confirmSifre}
            onChange={(e) => setConfirmSifre(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition-colors"
          >
            Kaydol
          </button>
        </form>
      </div>
    </div>
  );
}
