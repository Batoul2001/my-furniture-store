export default function Kayit() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl py-12">
        <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-8">
          Hoş Geldiniz! | Toptan ve Perakende Mobilya Satışı
        </h1>

        <p className="text-2xl text-center text-gray-700 mb-10">
          Evinizi ve ofisinizi yenileyin, stilinizi yansıtan şık mobilyalarla konforun tadını çıkarın.
        </p>

        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Ürünlerimizi Keşfedin</h2>
          <p className="text-lg text-gray-600">
            Geniş ürün yelpazemizle size özel mobilyalar keşfedin. Hem klasik hem modern tarzda seçenekler!
          </p>
        </div>

        <div className="text-center">
          <h3 className="text-3xl font-semibold text-gray-800 mb-4">Evinizi Baştan Yaratın!</h3>
          <p className="text-lg text-gray-600 mb-8">
            Her zevke hitap eden tasarımlar, kaliteli malzemeler ve uygun fiyatlarla mobilya seçeneklerimiz sizi bekliyor.
            Hemen keşfedin ve tarzınızı yansıtın!
          </p>
          <a
            href="/urunler"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg text-xl transition duration-300"
          >
            Ürünleri İnceleyin
          </a>
        </div>
      </div>
    </div>
  );
}
