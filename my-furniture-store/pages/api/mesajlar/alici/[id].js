import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id || isNaN(id)) {
    return res.status(400).json({ mesaj: 'Geçersiz kullanıcı ID.' });
  }

  if (req.method === 'GET') {
    try {
      const messages = await prisma.mesaj.findMany({
        where: {
          aliciId: parseInt(id),
        },
        include: {
          gonderen: true,
        },
      });

      if (messages.length === 0) {
        return res.status(404).json({ mesaj: 'Bu kullanıcı için mesaj bulunamadı.' });
      }

      res.status(200).json({ messages });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mesaj: 'Mesajlar alınırken hata oluştu.' });
    }
  } else {
    res.status(405).json({ mesaj: 'Sadece GET isteği destekleniyor.' });
  }
}
