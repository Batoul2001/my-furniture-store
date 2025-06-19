import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function UrunDetay() {
  const router = useRouter();
  const { id } = router.query;

  const [urun, setUrun] = useState(null);
  const [hata, setHata] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchUrun = async () => {
      try {
        const res = await fetch(`/api/urun?id=${id}`);
        if (!res.ok) throw new Error('API hatası');
        const data = await res.json();
        if (!data.urun) throw new Error('Ürün bulunamadı');
        setUrun(data.urun);
      } catch (err) {
        console.error('Ürün alınamadı:', err);
        setHata(true);
      }
    };

    fetchUrun();
  }, [id]);

  const sepeteEkle = () => {
    const eskiSepet = JSON.parse(localStorage.getItem('sepet')) || [];
    const yeniSepet = [...eskiSepet, urun];
    localStorage.setItem('sepet', JSON.stringify(yeniSepet));
    alert('Ürün sepete eklendi!');
  };

  if (hata) return <p style={{ padding: '20px', color: 'red' }}>Ürün bulunamadı.</p>;
  if (!urun) return <p style={{ padding: '20px' }}>Ürün yükleniyor...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>{urun.ad}</h2>
      <p><strong>Kategori:</strong> {urun.kategori}</p>
      <p><strong>Fiyat:</strong> {urun.fiyat} ₺</p>
      <button onClick={sepeteEkle}>🛒 Sepete Ekle</button>
    </div>
  );
}
