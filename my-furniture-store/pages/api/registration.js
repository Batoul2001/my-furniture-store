import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';  // استيراد bcrypt لتشفير كلمة المرور

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { ad, eposta, sifre } = req.body; // استلام بيانات المستخدم

    // تحقق من وجود جميع الحقول المطلوبة
    if (!ad || !eposta || !sifre) {
      return res.status(400).json({ mesaj: 'Tüm alanlar zorunludur.' });
    }

    // تحقق إذا كان البريد الإلكتروني موجود بالفعل
    const existingUser = await prisma.kullanici.findUnique({
      where: { eposta },
    });

    if (existingUser) {
      return res.status(400).json({ mesaj: 'Bu e-posta adresi zaten kullanılıyor.' });
    }

    try {
      // تشفير كلمة المرور
      const hashedPassword = await bcrypt.hash(sifre, 10); // الرقم 10 هو عدد جولات التشفير

      // إضافة المستخدم الجديد إلى قاعدة البيانات مع كلمة المرور المشفرة
      const user = await prisma.kullanici.create({
        data: {
          ad,
          eposta,
          sifre: hashedPassword,  // كلمة المرور المشفرة
          rol: 'kullanici',  // الدور الافتراضي هو "مستخدم"
        },
      });

      res.status(201).json({ mesaj: 'Kullanıcı başarıyla kaydedildi!', kullanici: user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mesaj: 'Kayıt sırasında bir hata oluştu.' });
    }
  } else {
    // إذا كان الطلب ليس `POST`
    res.status(405).json({ mesaj: 'Sadece POST isteği destekleniyor.' });
  }
}
