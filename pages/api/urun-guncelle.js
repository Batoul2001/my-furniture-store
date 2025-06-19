import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const id = parseInt(req.query.id);
    const { ad, fiyat, kategori } = req.body;

    if (!id || !ad || !fiyat || !kategori) {
      return res.status(400).json({ mesaj: 'Tüm alanlar zorunludur.' });
    }

    await prisma.urun.update({
      where: { id },
      data: { ad, fiyat, kategori },
    });

    res.status(200).json({ mesaj: 'Ürün başarıyla güncellendi' });
  } else {
    res.status(405).json({ mesaj: 'Sadece PUT destekleniyor.' });
  }
}
