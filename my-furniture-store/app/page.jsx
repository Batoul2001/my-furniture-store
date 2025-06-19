import Link from 'next/link'; 

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-3xl w-full text-center py-12">
        <h1 className="text-5xl font-bold text-blue-600 mb-4">Hoş Geldiniz! 🏡</h1>
        <p className="text-xl text-gray-700 mb-8">
          Bu mağazaya hoş geldiniz! Evinize en uygun mobilyayı bulmak için doğru yerdesiniz.
        </p>

        <div className="flex justify-center gap-6 flex-wrap mb-12">
          <Link href="/urunler">
            <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
              🛋️ Ürünleri Keşfet
            </button>
          </Link>

          <Link href="/giris">
            <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
              🔑 Giriş Yap
            </button>
          </Link>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Başlamak İçin</h2>
          <ul className="space-y-4 text-lg text-blue-600">
            <li>
              <Link href="/sepet" className="hover:underline">
                🛒 Sepetim
              </Link>
            </li>
            <li>
              <Link href="/registration" className="hover:underline">
                📝 Kayıt Ol
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
