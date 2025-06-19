import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
 
  if (req.method === 'GET') {
    try {
      const urunler = await prisma.urun.findMany(); 
      res.status(200).json({ urunler });
    } catch (error) {
      res.status(500).json({ mesaj: 'Ürünler alınırken bir hata oluştu.' });
    }
  }
  

  else if (req.method === 'POST') {
    const { ad, fiyat, kategori } = req.body;

    if (!ad || !fiyat || !kategori) {
      return res.status(400).json({ mesaj: 'Tüm alanlar zorunludur.' });
    }

    try {
      const urun = await prisma.urun.create({
        data: { ad, fiyat, kategori },
      });
      res.status(201).json({ mesaj: 'Ürün başarıyla eklendi!', urun });
    } catch (error) {
      res.status(500).json({ mesaj: 'Ürün eklenirken hata oluştu.' });
    }
  }


  else if (req.method === 'PUT') {
    const { id, ad, fiyat, kategori } = req.body;

    if (!id || !ad || !fiyat || !kategori) {
      return res.status(400).json({ mesaj: 'Tüm alanlar zorunludur.' });
    }

    try {
      const urun = await prisma.urun.update({
        where: { id },
        data: { ad, fiyat, kategori },
      });
      res.status(200).json({ mesaj: 'Ürün başarıyla güncellendi!', urun });
    } catch (error) {
      res.status(500).json({ mesaj: 'Ürün güncellenirken hata oluştu.' });
    }
  }

  else if (req.method === 'DELETE') {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ mesaj: 'Geçerli bir id gereklidir.' });
    }

    try {
      await prisma.urun.delete({
        where: { id: parseInt(id) },
      });
      res.status(200).json({ mesaj: 'Ürün başarıyla silindi.' });
    } catch (error) {
      res.status(500).json({ mesaj: 'Ürün silinirken hata oluştu.' });
    }
  } else {
    res.status(405).json({ mesaj: 'Yalnızca GET, POST, PUT ve DELETE istekleri destekleniyor.' });
  }
}
