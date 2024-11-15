import React from 'react';
import { Phone, Mail, MapPin, Send, Clock } from 'lucide-react';

const ContactSection = () => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Form submission logic
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header Section - More Compact */}
        <div className="text-center mb-8">
          <h4 className="text-[#8aa542] font-semibold uppercase tracking-wider">İLETİŞİM</h4>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#8aa542] to-green-600 bg-clip-text text-transparent">
            Bize Ulaşın
          </h2>
        </div>

        {/* Main Content - Single Row Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - All Info in Single Card */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              {/* Contact Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#8aa542]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">Telefon</h4>
                    <p className="text-[#8aa542] text-sm">+90 555 123 4567</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#8aa542]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">E-posta</h4>
                    <p className="text-[#8aa542] text-sm">info@diyetisyenmelike.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#8aa542]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">Adres</h4>
                    <p className="text-gray-600 text-sm">Merkez Mah. Sağlık Cad. No:123</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#8aa542]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">Çalışma Saatleri</h4>
                    <p className="text-gray-600 text-sm">Hafta içi: 09:00 - 18:00</p>
                    <p className="text-gray-600 text-sm">Cumartesi: 09:00 - 14:00</p>
                  </div>
                </div>
              </div>

              {/* Map - Full Width */}
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

          {/* Right Column - Contact Form */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-2xl shadow-xl relative h-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-[#8aa542] rounded-2xl blur opacity-10"></div>
              <div className="relative h-full flex flex-col">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Mesaj Gönderin</h3>
                <form onSubmit={handleFormSubmit} className="space-y-4 flex flex-col flex-grow">
                  <div className="space-y-4 flex-none">
                    <input
                      type="text"
                      name="name"
                      placeholder="Adınız"
                      required
                      className="w-full p-3 rounded-lg bg-gray-50 text-gray-800 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8aa542] focus:border-transparent transition-all duration-300 text-sm"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="E-posta Adresiniz"
                      required
                      className="w-full p-3 rounded-lg bg-gray-50 text-gray-800 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8aa542] focus:border-transparent transition-all duration-300 text-sm"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Telefon Numaranız"
                      className="w-full p-3 rounded-lg bg-gray-50 text-gray-800 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8aa542] focus:border-transparent transition-all duration-300 text-sm"
                    />
                  </div>
                  <div className="flex-grow flex flex-col min-h-0">
                    <textarea
                      name="message"
                      placeholder="Mesajınız"
                      required
                      className="w-full flex-grow p-3 rounded-lg bg-gray-50 text-gray-800 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8aa542] focus:border-transparent transition-all duration-300 resize-none text-sm min-h-[200px]"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-[#8aa542] to-green-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition duration-300 flex items-center justify-center space-x-2 group hover:scale-[1.02] text-sm flex-none mt-4"
                  >
                    <span>Gönder</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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