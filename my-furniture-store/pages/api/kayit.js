import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { ad, eposta, sifre } = req.body;

    // تحقق من عدم وجود مستخدم بنفس البريد الإلكتروني
    const varOlan = await prisma.kullanici.findUnique({
      where: { eposta },
    });

    if (varOlan) {
      return res.status(400).json({ mesaj: 'Bu e-posta zaten kayıtlı.' });
    }

    // إنشاء المستخدم الجديد
    const yeniKullanici = await prisma.kullanici.create({
      data: { ad, eposta, sifre },
    });

    res.status(200).json({ mesaj: 'Kayıt başarılı!', kullanici: yeniKullanici });
  } else {
    res.status(405).json({ mesaj: 'Yalnızca POST isteği destekleniyor.' });
  }
}
