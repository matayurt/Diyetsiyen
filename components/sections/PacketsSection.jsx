import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Phone } from 'lucide-react';

const packages = [
  {
    id: 1,
    title: "Başlangıç Paketi",
    price: "1500",
    duration: "ay",
    highlight: "Sağlıklı yaşama ilk adım",
    icon: <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
      <Check className="w-8 h-8 text-green-600" />
    </div>,
    features: [
      "2 Sesli Görüşme(2 Haftada 1 Kez)",
      "4 Diyet Listesi",
      "10:00 - 20:00 takip ve konuşma hakkı"
    ]
  },
  {
    id: 2,
    title: "Premium Paket",
    price: "2200",
    duration: "ay",
    popular: true,
    tag: "En Çok Tercih Edilen",
    highlight: "Tam kapsamlı destek",
    icon: <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
      <Check className="w-8 h-8 text-blue-600" />
    </div>,
    features: [
      "İlk Görüşme Görüntülü",
      "+ 3 Sesli Görüşme",
      "4 Diyet Listesi", 
      "10:00 - 20:00 takip ve konuşma hakkı"
    ]
  },
  {
    id: 3,
    title: "VIP Paket",
    price: "2500",
    duration: "ay",
    highlight: "Maksimum sonuç",
    icon: <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
      <Check className="w-8 h-8 text-purple-600" />
    </div>,
    features: [
      "2 Görüntülü Görüşme",
      "+ 2 Sesli Görüşme",
      "4 Diyet Listesi",
      "10:00 - 22:00 takip ve konuşma hakkı"
    ]
  }
];

const PacketsSection = () => {
  const [hoveredPackage, setHoveredPackage] = useState(null);
  
  const handlePackageSelect = (packageTitle) => {
    const phoneNumber = "05551234567";
    
    const formattedNumber = phoneNumber.replace(/\D/g, '');
    
    window.location.href = `tel:${formattedNumber}`;
  };

  return (
    <div className="container mx-auto max-w-6xl px-4">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-4 text-[#8aa542]"
        >
          Online Diyet Paketleri
        </motion.h2>
        <p className="text-gray-600 text-lg">
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
            className={`relative rounded-xl bg-white p-8 shadow-lg transition-all duration-300
              ${hoveredPackage === pkg.id ? 'transform scale-105' : ''}
              ${pkg.popular ? 'border-2 border-[#8aa542]' : 'border border-gray-100'}
            `}
          >
            {pkg.tag && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="absolute -top-4 left-1/2 transform -translate-x-1/2"
              >
                <span className="px-4 py-1 rounded-full text-sm font-medium bg-[#8aa542] text-white">
                  {pkg.tag}
                </span>
              </motion.div>
            )}
            <div className="text-center mb-8">
              <div className="mb-4">{pkg.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{pkg.title}</h3>
              <div className="text-4xl font-bold text-[#8aa542] mb-2">
                {pkg.price} ₺
                <span className="text-base text-gray-600 font-normal">/{pkg.duration}</span>
              </div>
              <p className="text-sm text-green-600 font-medium">{pkg.highlight}</p>
            </div>
            <ul className="space-y-4 mb-8">
              {pkg.features.map((feature, i) => (
                <li key={i} className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="text-center">
              <button 
                onClick={() => handlePackageSelect(pkg.title)}
                className={`w-full py-3 px-6 rounded-lg transition-colors duration-200 font-medium flex items-center justify-center space-x-2
                  ${pkg.popular
                    ? 'bg-[#8aa542] hover:bg-[#758e30] text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
              >
                <Phone className="w-4 h-4" />
                <span>Hemen Başla</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PacketsSection;