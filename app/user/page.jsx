'use client';

import { useEffect, useState } from 'react';

export default function User() {
  const [kullanicilar, setKullanicilar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKullanicilar = async () => {
      try {
        const res = await fetch('/api/users');
        const data = await res.json();
        setKullanicilar(data.kullanicilar || []);
      } catch (error) {
        console.error('Hata:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchKullanicilar();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Yükleniyor...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Tüm Kullanıcılar</h2>
      {kullanicilar.length === 0 ? (
        <p className="text-center text-gray-600">Kayıtlı kullanıcı bulunamadı.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Ad</th>
                <th className="px-4 py-2 text-left">E-posta</th>
                <th className="px-4 py-2 text-left">Rol</th>
              </tr>
            </thead>
            <tbody>
              {kullanicilar.map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{user.id}</td>
                  <td className="px-4 py-2">{user.ad}</td>
                  <td className="px-4 py-2">{user.eposta}</td>
                  <td className="px-4 py-2 capitalize">{user.rol}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
