// app/kvkk/page.jsx
'use client';
import React from 'react';

export default function KVKK() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-green-50/50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">KVKK Aydınlatma Metni</h1>
        
        <div className="prose prose-green max-w-none space-y-6 text-gray-600">
          <p className="text-lg">
            Son güncellenme: {new Date().toLocaleDateString('tr-TR')}
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mt-8">1. Veri Sorumlusu</h2>
            <p>
              6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz; veri sorumlusu olarak Dyt. Melike Öztürk tarafından aşağıda açıklanan kapsamda işlenebilecektir.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mt-8">2. Kişisel Verilerin İşlenme Amacı</h2>
            <p>
              Toplanan kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Beslenme danışmanlığı hizmetlerinin sunulması</li>
              <li>Randevu oluşturulması ve takibi</li>
              <li>Sağlık değerlendirmelerinin yapılması</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
              <li>İletişim faaliyetlerinin yürütülmesi</li>
              <li>Hizmet kalitesinin değerlendirilmesi</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mt-8">3. İşlenen Kişisel Veri Kategorileri</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Kimlik Bilgileri (Ad, soyad, T.C. kimlik numarası, doğum tarihi vb.)</li>
              <li>İletişim Bilgileri (Telefon, adres, e-posta)</li>
              <li>Sağlık Bilgileri (Boy, kilo, kronik hastalıklar, ilaç kullanımı vb.)</li>
              <li>Beslenme Alışkanlıkları</li>
              <li>Finansal Bilgiler (Ödeme bilgileri)</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mt-8">4. Kişisel Verilerin Aktarılması</h2>
            <p>
              Kişisel verileriniz, yasal yükümlülükler ve sağlık hizmetlerinin gerektirdiği durumlarda:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Sağlık Bakanlığı ve bağlı kuruluşları</li>
              <li>Özel sigorta şirketleri (sadece sigorta kapsamında hizmet alınması durumunda)</li>
              <li>Hukuki yükümlülükler kapsamında kamu kurumları</li>
              <li>Hizmet sağlayıcı firmalar (teknik destek vb.)</li>
            </ul>
            <p>
              ile paylaşılabilecektir.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mt-8">5. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi</h2>
            <p>
              Kişisel verileriniz, aşağıdaki yöntemler ve hukuki sebepler ile toplanmaktadır:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Website üzerinden form doldurulması</li>
              <li>E-posta, telefon veya yüz yüze görüşmeler</li>
              <li>Randevu sistemleri</li>
              <li>Sağlık değerlendirme formları</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mt-8">6. Kişisel Veri Sahibinin Hakları</h2>
            <p>
              KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
              <li>Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme</li>
              <li>Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</li>
              <li>KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerinizin silinmesini veya yok edilmesini isteme</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mt-8">7. Başvuru Yöntemi</h2>
            <p>
              Yukarıda belirtilen haklarınızı kullanmak için:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>E-posta: diyetisyenmelikeozturk@gmail.com</li>
              <li>Telefon: 05541889160</li>
              <li>Adres: Kemal Sunal Caddesi - İzmit/Kocaeli</li>
            </ul>
            <p>
              üzerinden bizimle iletişime geçebilirsiniz. Başvurunuz en kısa sürede ve en geç 30 gün içinde ücretsiz olarak sonuçlandırılacaktır.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Bu aydınlatma metni son olarak {new Date().toLocaleDateString('tr-TR')} tarihinde güncellenmiştir.
          </p>
        </div>
      </div>
    </div>
  );
}