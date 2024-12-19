// app/gizlilik-politikasi/page.jsx
'use client';
import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-green-50/50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">Gizlilik Politikası</h1>
        
        <div className="prose prose-green max-w-none space-y-6 text-gray-600">
          <p className="text-lg">
            Son güncellenme: {new Date().toLocaleDateString('tr-TR')}
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mt-8">1. Genel Bakış</h2>
            <p>
              Dyt. Melike Öztürk olarak, web sitemizi ziyaret eden kullanıcılarımızın gizliliğini korumak önceliklerimiz arasındadır. Bu Gizlilik Politikası, sitemizdeki hizmetleri kullanırken toplanan, işlenen ve saklanan bilgilerin nasıl kullanıldığını açıklar.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mt-8">2. Toplanan Bilgiler</h2>
            <p>
              Sitemizde aşağıdaki bilgileri toplayabiliriz:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Ad-soyad, e-posta adresi, telefon numarası gibi iletişim bilgileri</li>
              <li>Randevu talebinde bulunurken paylaştığınız sağlık bilgileri</li>
              <li>Site kullanımınıza dair teknik bilgiler (IP adresi, tarayıcı bilgileri vb.)</li>
              <li>Çerezler aracılığıyla toplanan kullanım verileri</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mt-8">3. Bilgilerin Kullanımı</h2>
            <p>
              Toplanan bilgiler aşağıdaki amaçlarla kullanılmaktadır:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Beslenme danışmanlığı hizmetlerinin sunulması</li>
              <li>Randevu taleplerinin değerlendirilmesi ve yönetimi</li>
              <li>İletişim taleplerinin yanıtlanması</li>
              <li>Hizmet kalitemizin iyileştirilmesi</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mt-8">4. Bilgilerin Korunması</h2>
            <p>
              Kişisel verilerinizin güvenliği için uygun teknik ve idari tedbirler alınmaktadır. Verileriniz yalnızca yetkili personel tarafından, gerekli olduğu kadar erişilebilir durumdadır.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mt-8">5. Çerezler</h2>
            <p>
              Sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanmaktadır. Çerezler, tarayıcınız tarafından cihazınıza depolanan küçük metin dosyalarıdır.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mt-8">6. Haklarınız</h2>
            <p>
              KVKK kapsamında aşağıdaki haklara sahipsiniz:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
              <li>Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme</li>
              <li>Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mt-8">7. İletişim</h2>
            <p>
              Bu gizlilik politikası hakkında sorularınız için aşağıdaki kanallardan bize ulaşabilirsiniz:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>E-posta: diyetisyenmelikeozturk@gmail.com</li>
              <li>Telefon: 05541889160</li>
              <li>Adres: Kemal Sunal Caddesi - İzmit/Kocaeli</li>
            </ul>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Bu gizlilik politikası son olarak {new Date().toLocaleDateString('tr-TR')} tarihinde güncellenmiştir.
          </p>
        </div>
      </div>
    </div>
  );
}