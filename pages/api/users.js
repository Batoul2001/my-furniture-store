import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const kullanicilar = await prisma.kullanici.findMany({
      select: {
        id: true,
        ad: true,
        eposta: true,
        rol: true,
      },
    });
      res.status(200).json({ kullanicilar });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mesaj: 'Kullanıcılar alınamadı.' });
    }
  } else {
    res.status(405).json({ mesaj: 'Kullanıcılar alınamadı.' });
  }
}