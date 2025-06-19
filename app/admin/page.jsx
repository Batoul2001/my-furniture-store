'use client';

import { useState, useEffect } from 'react';

export default function AdminPanel() {
  const [ad, setAd] = useState('');
  const [fiyat, setFiyat] = useState('');
  const [kategori, setKategori] = useState('');
  const [urunler, setUrunler] = useState([]);
  const [loading, setLoading] = useState(true);
  const [duzenlemeModu, setDuzenlemeModu] = useState(false);
  const [duzenlenecekId, setDuzenlenecekId] = useState(null);

  useEffect(() => {
    const fetchUrunler = async () => {
      const res = await fetch('/api/admin');
      const data = await res.json();
      setUrunler(data.urunler || []);
      setLoading(false);
    };
    fetchUrunler();
  }, []);

  const handleAddOrUpdateProduct = async (e) => {
    e.preventDefault();
    const payload = { ad, fiyat: parseFloat(fiyat), kategori };

    const url = duzenlemeModu
      ? `/api/admin?id=${duzenlenecekId}`
      : '/api/admin';

    const method = duzenlemeModu ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    alert(data.mesaj || (duzenlemeModu ? 'Güncellendi!' : 'Ürün eklendi!'));

    setAd('');
    setFiyat('');
    setKategori('');
    setDuzenlemeModu(false);
    setDuzenlenecekId(null);
    fetchUrunler();
  };

  const handleDelete = async (id) => {
    if (!confirm('Bu ürünü silmek istediğine emin misin?')) return;

    const res = await fetch(`/api/admin?id=${id}`, {
      method: 'DELETE',
    });

    const data = await res.json();
    alert(data.mesaj || 'Silindi');
    fetchUrunler();
  };

  const handleEdit = (urun) => {
    setAd(urun.ad);
    setFiyat(urun.fiyat);
    setKategori(urun.kategori);
    setDuzenlemeModu(true);
    setDuzenlenecekId(urun.id);
  };

  const handleCancelEdit = () => {
    setAd('');
    setFiyat('');
    setKategori('');
    setDuzenlemeModu(false);
    setDuzenlenecekId(null);
  };

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-4xl font-bold mb-6 text-center">Admin Paneli</h2>

      <form onSubmit={handleAddOrUpdateProduct} className="space-y-4 mb-10">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Ürün Adı"
            value={ad}
            onChange={(e) => setAd(e.target.value)}
            required
            className="flex-1 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Fiyat"
            value={fiyat}
            onChange={(e) => setFiyat(e.target.value)}
            required
            className="flex-1 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Kategori"
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            required
            className="flex-1 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors"
          >
            {duzenlemeModu ? 'Güncelle' : 'Ürün Ekle'}
          </button>

          {duzenlemeModu && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md transition-colors"
            >
              İptal
            </button>
          )}
        </div>
      </form>

      <h3 className="text-2xl font-semibold mb-4">Mevcut Ürünler</h3>
      <ul className="space-y-4">
        {urunler.map((urun) => (
          <li
            key={urun.id}
            className="border p-4 rounded-md shadow-sm flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <div className="mb-2 md:mb-0">
              <strong>{urun.ad}</strong> – {urun.kategori} – {urun.fiyat} ₺
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(urun)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md transition-colors"
              >
                Düzenle
              </button>
              <button
                onClick={() => handleDelete(urun.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md transition-colors"
              >
                Sil
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
