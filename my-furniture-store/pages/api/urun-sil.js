// pages/api/urun-ekle.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { ad, fiyat, kategori } = req.body;

    // تحقق من وجود كل الحقول
    if (!ad || !fiyat || !kategori) {
      return res.status(400).json({ mesaj: 'Tüm alanlar zorunludur.' });
    }

    try {
      // أضف المنتج إلى قاعدة البيانات
      const urun = await prisma.urun.create({
        data: {
          ad,
          fiyat: parseFloat(fiyat), // التأكد من تحويل السعر إلى رقم عشري
          kategori,
        },
      });

      // إرجاع استجابة ناجحة مع المنتج
      res.status(200).json({ mesaj: 'Ürün başarıyla eklendi!', urun });
    } catch (error) {
      // في حال حدوث خطأ أثناء إضافة المنتج
      console.error("Error adding product:", error);
      res.status(500).json({ mesaj: 'Ürün eklerken hata oluştu.' });
    }
  } else {
    // رد في حال كانت الطريقة غير مدعومة
    res.status(405).json({ mesaj: 'Sadece POST isteği destekleniyor.' });
  }
}
