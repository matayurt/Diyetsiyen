import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <div className="container mx-auto max-w-6xl px-4">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
        <div className="lg:w-2/5">
          <div className="relative">
            <div className="absolute -inset-4 bg-blue-100 rounded-full blur-lg opacity-75"></div>
            <img
              src="/assets/img/dietitian.png"
              alt="Diyetisyen Mehmet"
              className="relative w-72 h-72 lg:w-96 lg:h-96 rounded-full object-cover shadow-xl border-4 border-white hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#8aa542] text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg">
              Uzman Diyetisyen
            </div>
          </div>
        </div>

        <div className="lg:w-3/5 space-y-8">
          <div className="text-left">
            <h4 className="text-[#8aa542] font-semibold text-lg mb-2">Merhaba, Ben</h4>
            <h2 className="text-4xl font-bold mb-6">
              Diyetisyen <span className="text-[#8aa542]">Melike Öztürk</span>
            </h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg leading-relaxed">
                Sağlıklı yaşam ve beslenme konusunda uzmanlaşmış bir profesyonelim.
                Amacım, <span className="font-medium text-gray-900">doğru beslenme alışkanlıklarıyla</span> insanların sağlıklı bir yaşam sürmelerine yardımcı olmak.
              </p>
              <p className="text-lg leading-relaxed">
                Meslek hayatıma 2018 yılında Özel İzmit Konak Hastanesinde başladım. 2020 yılında kendi danışmanlık merkezimi kurmaya karar verdim. 
                <span className="font-medium text-gray-900"> DİYETTEİZ beslenme ve diyet danışmanlık merkezini kurdum. </span> 
                Şu an aktif olarak yüz yüze ve online diyet olarak hizmet vermekteyim. 
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
                <span className="text-3xl font-bold text-[#8aa542] mr-2">10</span>
                <span className="text-sm text-gray-600 leading-tight">Yıllık<br/>Deneyim</span>
              </div>
              <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
                <span className="text-3xl font-bold text-[#8aa542] mr-2">1000+</span>
                <span className="text-sm text-gray-600 leading-tight">Mutlu<br/>Danışan</span>
              </div>
              <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
                <span className="text-3xl font-bold text-[#8aa542] mr-2">%98</span>
                <span className="text-sm text-gray-600 leading-tight">Başarı<br/>Oranı</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;