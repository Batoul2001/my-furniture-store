import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';  

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { ad, eposta, sifre } = req.body; 

 
    if (!ad || !eposta || !sifre) {
      return res.status(400).json({ mesaj: 'Tüm alanlar zorunludur.' });
    }

   
    const existingUser = await prisma.kullanici.findUnique({
      where: { eposta },
    });

    if (existingUser) {
      return res.status(400).json({ mesaj: 'Bu e-posta adresi zaten kullanılıyor.' });
    }

    try {
   
      const hashedPassword = await bcrypt.hash(sifre, 10); 

   
      const user = await prisma.kullanici.create({
        data: {
          ad,
          eposta,
          sifre: hashedPassword, 
          rol: 'kullanici',  
        },
      });

      res.status(201).json({ mesaj: 'Kullanıcı başarıyla kaydedildi!', kullanici: user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mesaj: 'Kayıt sırasında bir hata oluştu.' });
    }
  } else {
   
    res.status(405).json({ mesaj: 'Sadece POST isteği destekleniyor.' });
  }
}
