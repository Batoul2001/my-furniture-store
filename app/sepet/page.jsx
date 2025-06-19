'use client';

import { useState, useEffect } from 'react';

export default function Sepet() {
  const [sepet, setSepet] = useState([]);

  useEffect(() => {
    const storedSepet = JSON.parse(localStorage.getItem('sepet')) || [];
    setSepet(storedSepet);
  }, []);

  const handleRemoveFromCart = (urunId) => {
    const updatedSepet = sepet.filter((urun) => urun.id !== urunId);
    setSepet(updatedSepet);
    localStorage.setItem('sepet', JSON.stringify(updatedSepet));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Sepetim</h2>
      {sepet.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">Henüz sepetinizde ürün yok.</p>
      ) : (
        <ul className="space-y-4">
          {sepet.map((urun) => (
            <li
              key={urun.id}
              className="flex items-center justify-between border p-4 rounded-lg shadow-sm bg-white"
            >
              <div>
                <strong className="text-lg text-gray-800">{urun.ad}</strong>
                <p className="text-gray-600">{urun.fiyat} ₺</p>
              </div>
              <button
                onClick={() => handleRemoveFromCart(urun.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                🗑️ Sepetten Çıkar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
