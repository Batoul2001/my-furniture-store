// pages/api/urun-ekle.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { ad, fiyat, kategori } = req.body;

   
    if (!ad || !fiyat || !kategori) {
      return res.status(400).json({ mesaj: 'Tüm alanlar zorunludur.' });
    }

    try {
     
      const urun = await prisma.urun.create({
        data: {
          ad,
          fiyat: parseFloat(fiyat), 
          kategori,
        },
      });

     
      res.status(200).json({ mesaj: 'Ürün başarıyla eklendi!', urun });
    } catch (error) {
   
      console.error("Error adding product:", error);
      res.status(500).json({ mesaj: 'Ürün eklerken hata oluştu.' });
    }
  } else {
    
    res.status(405).json({ mesaj: 'Sadece POST isteği destekleniyor.' });
  }
}
