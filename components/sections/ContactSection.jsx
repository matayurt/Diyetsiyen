'use client';
import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, Clock } from 'lucide-react';

const ContactSection = () => {
  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: false, error: null });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Bir hata oluştu');
      }

      setFormStatus({
        loading: false,
        success: true,
        error: null
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });

      setTimeout(() => {
        setFormStatus(prev => ({ ...prev, success: false }));
      }, 5000);

    } catch (error) {
      setFormStatus({
        loading: false,
        success: false,
        error: error.message
      });
    }
  };

  return (
    <div className="py-12">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-8">
          <h4 className="text-[#8aa542] font-semibold uppercase tracking-wider">İLETİŞİM</h4>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#8aa542] to-[#8aa542] bg-clip-text text-transparent">
            Bize Ulaşın
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <a 
                  href="tel:+905541889160" 
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#8aa542]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">Telefon</h4>
                    <p className="text-[#8aa542] text-sm">0554 188 91 60</p>
                  </div>
                </a>

                <a 
                  href="mailto:diyetisyenmelikeozturk@gmail.com" 
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#8aa542]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">E-posta</h4>
                    <p className="text-[#8aa542] text-sm">diyetisyenmelikeozturk@gmail.com</p>
                  </div>
                </a>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#8aa542]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">Adres</h4>
                    <p className="text-gray-600 text-sm">Kemal Sunal Caddesi - İzmit/Kocaeli</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#8aa542]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">Çalışma Saatleri</h4>
                    <p className="text-gray-600 text-sm">Hafta içi: 10:00 - 20:00</p>
                    <p className="text-gray-600 text-sm">Cumartesi: 09:00 - 14:00(VIP Paketlere Özel)</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden shadow-lg">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6042.891825278475!2d29.979313999999995!3d40.77421!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cb5021509519af%3A0x90d3d038e8a0bcad!2sDiyetteiz!5e0!3m2!1str!2str!4v1731676850937!5m2!1str!2str" 
                  className="w-full h-[400px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-2xl shadow-xl relative h-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-[#8aa542] rounded-2xl blur opacity-10"></div>
              <div className="relative h-full flex flex-col">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Mesaj Gönderin</h3>

                {formStatus.success && (
                  <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg border border-green-200">
                    Mesajınız başarıyla gönderildi!
                  </div>
                )}

                {formStatus.error && (
                  <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-200">
                    {formStatus.error}
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-4 flex flex-col flex-grow">
                  <div className="space-y-4 flex-none">
                    <input
                      type="text"
                      name="name"
                      placeholder="Adınız"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      disabled={formStatus.loading}
                      className="w-full p-3 rounded-lg bg-gray-50 text-gray-800 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8aa542] focus:border-transparent transition-all duration-300 text-sm"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="E-posta Adresiniz"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      disabled={formStatus.loading}
                      className="w-full p-3 rounded-lg bg-gray-50 text-gray-800 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8aa542] focus:border-transparent transition-all duration-300 text-sm"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Telefon Numaranız"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={formStatus.loading}
                      className="w-full p-3 rounded-lg bg-gray-50 text-gray-800 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8aa542] focus:border-transparent transition-all duration-300 text-sm"
                    />
                  </div>
                  <div className="flex-grow flex flex-col min-h-0">
                    <textarea
                      name="message"
                      placeholder="Mesajınız"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      disabled={formStatus.loading}
                      className="w-full flex-grow p-3 rounded-lg bg-gray-50 text-gray-800 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8aa542] focus:border-transparent transition-all duration-300 resize-none text-sm min-h-[200px]"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={formStatus.loading}
                    className={`w-full py-3 bg-gradient-to-r from-[#8aa542] to-green-600 text-white rounded-lg font-semibold shadow-lg transition duration-300 flex items-center justify-center space-x-2 group text-sm flex-none mt-4
                      ${formStatus.loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl hover:scale-[1.02]'}`}
                  >
                    <span>{formStatus.loading ? 'Gönderiliyor...' : 'Gönder'}</span>
                    <Send className={`w-4 h-4 ${formStatus.loading ? '' : 'group-hover:translate-x-1'} transition-transform`} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;