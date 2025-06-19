-- CreateTable
CREATE TABLE "Kullanici" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ad" TEXT NOT NULL,
    "eposta" TEXT NOT NULL,
    "sifre" TEXT NOT NULL,
    "rol" TEXT NOT NULL DEFAULT 'kullanici'
);

-- CreateTable
CREATE TABLE "Urun" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ad" TEXT NOT NULL,
    "fiyat" REAL NOT NULL,
    "kategori" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Siparis" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kullaniciId" INTEGER NOT NULL,
    "urunId" INTEGER NOT NULL,
    "durum" TEXT NOT NULL DEFAULT 'bekliyor',
    CONSTRAINT "Siparis_kullaniciId_fkey" FOREIGN KEY ("kullaniciId") REFERENCES "Kullanici" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Siparis_urunId_fkey" FOREIGN KEY ("urunId") REFERENCES "Urun" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Kullanici_eposta_key" ON "Kullanici"("eposta");
