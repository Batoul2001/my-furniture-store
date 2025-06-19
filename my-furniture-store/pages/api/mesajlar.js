import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { gonderenId, aliciId, mesaj } = req.body;

    // التحقق من صحة البيانات
    if (!gonderenId || !aliciId || !mesaj) {
      return res.status(400).json({ mesaj: 'Tüm alanlar zorunludur.' });
    }

    try {
      // إرسال الرسالة إلى قاعدة البيانات
      const newMessage = await prisma.mesaj.create({
        data: {
          gonderenId,
          aliciId,
          mesaj,
        },
      });

      res.status(201).json({ mesaj: 'Mesaj başarıyla gönderildi!', newMessage });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mesaj: 'Mesaj gönderilirken hata oluştu.' });
    }
  } else if (req.method === 'GET') {
    const { id } = req.query;

    // التحقق من صحة الـ id (يجب أن يكون رقمًا صحيحًا)
    if (!id || isNaN(id)) {
      return res.status(400).json({ mesaj: 'Geçersiz kullanıcı ID.' });
    }

    try {
      // جلب الرسائل التي استلمها هذا المستخدم
      const messages = await prisma.mesaj.findMany({
        where: {
          aliciId: parseInt(id), // جلب جميع الرسائل التي تم استلامها بواسطة المستخدم
        },
        include: {
          gonderen: true, // تضمين بيانات المرسل
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
    res.status(405).json({ mesaj: 'Sadece GET ve POST isteği destekleniyor.' });
  }
}
