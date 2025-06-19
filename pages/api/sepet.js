import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

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
    <div>
      <Navbar />
      <h2>Sepetim</h2>
      {sepet.length === 0 ? (
        <p>Henüz sepetinizde ürün yok.</p>
      ) : (
        <ul>
          {sepet.map((urun) => (
            <li key={urun.id}>
              <strong>{urun.ad}</strong> – {urun.fiyat} ₺
              <button onClick={() => handleRemoveFromCart(urun.id)} style={{ padding: '10px 20px', backgroundColor: '#FF6347', color: 'white', border: 'none', borderRadius: '5px' }}>
                🗑️ Sepetten Çıkar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
