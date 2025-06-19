import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { eposta, sifre } = req.body;

    try {
      // تحقق من بيانات المستخدم
      const user = await prisma.kullanici.findUnique({
        where: { eposta },
      });

      if (!user || user.sifre !== sifre) {
        return res.status(400).json({ mesaj: 'Giriş bilgileri hatalı.' });
      }

      res.status(200).json({ kullanici: user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mesaj: 'Bir hata oluştu.' });
    }
  } else {
    res.status(405).json({ mesaj: 'Sadece POST isteği destekleniyor.' });
  }
}
