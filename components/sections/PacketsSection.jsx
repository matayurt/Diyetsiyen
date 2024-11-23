'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Phone, Star, Crown, CalendarClock, MessageCircle, Video, Shield } from 'lucide-react';

const packages = [
  {
    id: 1,
    title: "Başlangıç Paketi",
    price: "1500",
    duration: "ay",
    highlight: "Sağlıklı yaşama ilk adım",
    color: "green",
    icon: <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
      <CalendarClock className="w-8 h-8 text-green-600" />
    </div>,
    mainFeatures: [
      { icon: <MessageCircle className="w-5 h-5" />, text: "2 Sesli Görüşme" },
      { icon: <CalendarClock className="w-5 h-5" />, text: "4 Haftalık Program" },
      { icon: <Shield className="w-5 h-5" />, text: "10:00-20:00 Destek" },
    ],
    highlightFeature: "2 Haftada 1 Online Kontrol"
  },
  {
    id: 2,
    title: "Premium Paket",
    price: "2200",
    duration: "ay",
    popular: true,
    tag: "En Çok Tercih Edilen",
    highlight: "Tam kapsamlı destek",
    color: "blue",
    icon: <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
      <Star className="w-8 h-8 text-blue-600" />
    </div>,
    mainFeatures: [
      { icon: <Video className="w-5 h-5" />, text: "1 Görüntülü + 3 Sesli Görüşme" },
      { icon: <CalendarClock className="w-5 h-5" />, text: "4 Haftalık Detaylı Program" },
      { icon: <Shield className="w-5 h-5" />, text: "10:00-20:00 Öncelikli Destek" },
    ],
    highlightFeature: "10 Günde 1 Online Kontrol + 1 Görüntülü Görüşme",
    extraFeatures: ["Alternatif Menüler", "Yemek Tarifleri", "Daha Sık Görüşme"]
  },
  {
    id: 3,
    title: "VIP Paket",
    price: "2500",
    duration: "ay",
    highlight: "Maksimum sonuç ve ayrıcalıklar",
    color: "purple",
    icon: <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
      <Crown className="w-8 h-8 text-purple-600" />
    </div>,
    mainFeatures: [
      { icon: <Video className="w-5 h-5" />, text: "2 Görüntülü + 2 Sesli Görüşme" },
      { icon: <CalendarClock className="w-5 h-5" />, text: "4 Haftalık Premium Program" },
      { icon: <Shield className="w-5 h-5" />, text: "10:00-22:00 VIP Destek" },
    ],
    highlightFeature: "Haftada 1 Birebir Kontrol",
    extraFeatures: ["Acil Destek", "VIP Grup Üyeliği", "Cumartesi Özel Destek"]
  }
];

const PacketsSection = () => {
  const [hoveredPackage, setHoveredPackage] = useState(null);
  
  const handlePackageSelect = (packageTitle) => {
    const phoneNumber = "05541889160";
    const formattedNumber = phoneNumber.replace(/\D/g, '');
    window.location.href = `tel:${formattedNumber}`;
  };

  return (
    <section className="relative bg-gray-50">
      <div className="container mx-auto max-w-6xl px-4 py-16">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4 text-[#8aa542]"
          >
            Online Diyet Paketleri
          </motion.h2>
          <p className="text-gray-600 text-lg mb-4">
            Size özel hazırlanmış beslenme programları ile hayalinizdeki bedene kavuşun
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              onMouseEnter={() => setHoveredPackage(pkg.id)}
              onMouseLeave={() => setHoveredPackage(null)}
              className={`relative rounded-xl bg-white p-6 shadow-lg transition-all duration-300 isolate
                ${hoveredPackage === pkg.id ? 'transform scale-105 z-10' : 'z-0'}
                ${pkg.popular ? 'border-2 border-[#8aa542]' : 'border border-gray-100'}
              `}
              style={{
                transform: hoveredPackage === pkg.id ? 'scale(1.05)' : 'scale(1)',
                zIndex: hoveredPackage === pkg.id ? 10 : 1
              }}
            >
              {pkg.tag && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                >
                  <span className="px-4 py-1 rounded-full text-sm font-medium bg-[#8aa542] text-white whitespace-nowrap">
                    {pkg.tag}
                  </span>
                </motion.div>
              )}
              
              <div className="text-center mb-6">
                <div className="relative mb-4 z-0">{pkg.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{pkg.title}</h3>
                <div className="text-4xl font-bold text-[#8aa542] mb-2">
                  {pkg.price} ₺
                  <span className="text-base text-gray-600 font-normal">/{pkg.duration}</span>
                </div>
                <p className="text-sm text-green-600 font-medium">{pkg.highlight}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="font-medium text-center text-gray-800 mb-2">{pkg.highlightFeature}</div>
              </div>

              <div className="space-y-4 mb-6">
                {pkg.mainFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-3 text-gray-700">
                    <div className="flex-shrink-0 text-[#8aa542]">
                      {feature.icon}
                    </div>
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>

              {pkg.extraFeatures && (
                <div className="border-t pt-4 mb-6">
                  <div className="grid grid-cols-1 gap-2">
                    {pkg.extraFeatures.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button 
                onClick={() => handlePackageSelect(pkg.title)}
                className={`relative w-full py-3 px-6 rounded-lg transition-colors duration-200 font-medium flex items-center justify-center space-x-2
                  ${pkg.popular
                    ? 'bg-[#8aa542] hover:bg-[#758e30] text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
              >
                <Phone className="w-4 h-4" />
                <span>Hemen Başla</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PacketsSection;