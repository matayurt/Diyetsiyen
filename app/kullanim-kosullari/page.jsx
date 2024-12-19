// app/kullanim-kosullari/page.jsx
'use client';
import React from 'react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-green-50/50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">Kullanım Koşulları</h1>
        
        <div className="prose prose-green max-w-none space-y-6 text-gray-600">
          <p className="text-lg">
            Son güncellenme: {new Date().toLocaleDateString('tr-TR')}
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mt-8">1. Hizmet Şartları</h2>
            <p>
              Bu web sitesini kullanarak, aşağıdaki kullanım koşullarını kabul etmiş sayılırsınız. Bu koşulları kabul etmiyorsanız, lütfen siteyi kullanmayınız.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mt-8">2. Hizmet Tanımı</h2>
            <p>
              Dyt. Melike Öztürk olarak sunduğumuz hizmetler:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Online beslenme danışmanlığı</li>
              <li>Yüz yüze beslenme danışmanlığı</li>
              <li>Diyet programları</li>
              <li>Beslenme eğitimi ve danışmanlık</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mt-8">3. Randevu ve İptal Politikası</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Randevular en az 24 saat öncesinden iptal edilmelidir</li>
              <li>İptal edilmeyen randevular ücretlendirilir</li>
              <li>Randevu saatine 15 dakikadan fazla geç kalınması durumunda, randevu iptal edilebilir</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mt-8">4. Ödeme Koşulları</h2>
            <p>
              Hizmet bedelleri peşin olarak tahsil edilir. Kabul edilen ödeme yöntemleri:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Kredi kartı</li>
              <li>Banka havalesi</li>
              <li>EFT</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mt-8">5. Gizlilik</h2>
            <p>
              Danışan bilgileri ve sağlık verileri gizlilik prensipleri çerçevesinde korunmaktadır. Detaylı bilgi için Gizlilik Politikamızı inceleyebilirsiniz.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mt-8">6. Telif Hakları</h2>
            <p>
              Site içeriğindeki tüm materyaller telif hakkı ile korunmaktadır. İçeriklerin izinsiz kullanımı, kopyalanması ve dağıtılması yasaktır.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mt-8">7. Sorumluluk Reddi</h2>
            <p>
              Web sitesinde yer alan bilgiler genel bilgilendirme amaçlıdır ve tıbbi tavsiye yerine geçmez. Her danışanın durumu bireysel olarak değerlendirilmelidir.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mt-8">8. Değişiklikler</h2>
            <p>
              Bu kullanım koşulları önceden haber verilmeksizin değiştirilebilir. Değişiklikler sitede yayınlandığı tarihten itibaren geçerli olur.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mt-8">9. İletişim</h2>
            <p>
              Kullanım koşulları hakkında sorularınız için:
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
            Bu kullanım koşulları son olarak {new Date().toLocaleDateString('tr-TR')} tarihinde güncellenmiştir.
          </p>
        </div>
      </div>
    </div>
  );
}