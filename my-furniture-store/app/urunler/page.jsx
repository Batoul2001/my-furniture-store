'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Urunler() {
  const [urunler, setUrunler] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUrunler = async () => {
      const res = await fetch('/api/urunler');
      const data = await res.json();
      setUrunler(data.urunler || []);
      setLoading(false);
    };
    fetchUrunler();
  }, []);

  const handleAddToCart = (urun) => {
    const eskiSepet = JSON.parse(localStorage.getItem('sepet')) || [];
    const yeniSepet = [...eskiSepet, urun];
    localStorage.setItem('sepet', JSON.stringify(yeniSepet));
    alert('Ürün sepete eklendi!');
    router.push('/sepet');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-600">
        Yükleniyor...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Ürünler</h2>
      {urunler.length === 0 ? (
        <p className="text-center text-gray-600">Henüz ürün eklenmedi.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {urunler.map((urun) => (
            <li
              key={urun.id}
              className="border border-gray-200 rounded-lg p-6 shadow-sm bg-white flex flex-col justify-between"
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{urun.ad}</h3>
                <p className="text-gray-600">{urun.kategori}</p>
                <p className="text-gray-700 font-medium mt-2">{urun.fiyat} ₺</p>
              </div>
              <button
                onClick={() => handleAddToCart(urun)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors mt-auto"
              >
                🛒 Sepete Ekle
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
