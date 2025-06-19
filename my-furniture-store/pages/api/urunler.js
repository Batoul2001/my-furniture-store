import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const urunler = await prisma.urun.findMany();
      res.status(200).json({ urunler });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mesaj: 'Ürünler alınırken hata oluştu.' });
    }
  } else {
    res.status(405).json({ mesaj: 'Sadece GET isteği destekleniyor.' });
  }
}
