import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{ padding: '10px', background: '#f2f2f2', marginBottom: '20px' }}>
      <Link href="/urunler" style={{ marginRight: '15px' }}>🪑 Ürünler</Link>
      <Link href="/sepet" style={{ marginRight: '15px' }}>🛒 Sepet</Link>
      <Link href="/giris" style={{ marginRight: '15px' }}>🔑 Giriş</Link>
      <Link href="/registration" style={{ marginRight: '15px' }}>📝 Kayıt Ol</Link> 
      <Link href="/user" style={{ marginRight: '15px' }}>👤 Kullanıcı</Link>
      <Link href="/admin" style={{ marginRight: '15px' }}>🛠️ Admin Paneli</Link>
      <Link href="/messages" style={{ marginRight: '15px', color: 'white' }}>
        📩 Mesajlar
      </Link>
    </nav>
  );
}
