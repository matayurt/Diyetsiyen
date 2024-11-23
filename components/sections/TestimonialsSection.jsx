import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, TrendingUp, MessageCircle, Star, Quote, User } from 'lucide-react';

const testimonials = [
  {
    text: "Harika bir program ve müthiş sonuçlar aldım!",
    author: "Ayşe Y.",
    rating: 5,
    weightLoss: "-25 KG",
    duration: "3 Ay",
    startWeight: "85 KG",
    currentWeight: "60 KG",
    comment: "Benim yıllardır verdiğim uğraşlar sonucu gitmeyen kilolarımı güzel tatlı dili motivasyonuyla bana uygun yaptığı listeleriyle sıkmadan bunaltmadan kilolarıma elveda dedirten canım diyetisyenim."
  },
  {
    text: "Kişiselleştirilmiş yaklaşımları çok başarılı.",
    author: "Mehmet K.",
    rating: 5,
    weightLoss: "-20 KG",
    duration: "4 Ay",
    startWeight: "95 KG",
    currentWeight: "75 KG",
    comment: "Kendisine nekadar tesekkür etsem azdır doğum sonrası kilolarımı hic veremiyeceğim sanıyordum sağolsun 4 ayda 20 kg verdim bende inanamadım ve kesinlikle spor yapmadığım halde tekrar tekrar tesekkürler doktorum."
  },
  {
    text: "6 ayda hedeflerime ulaştım!",
    author: "Zeynep A.",
    rating: 5,
    weightLoss: "-25 KG",
    duration: "6 Ay",
    startWeight: "80 KG",
    currentWeight: "55 KG",
    comment: "Benim Melike hanımla yolum bundan 6 ay önce kesisti. Onunla toplamda 25 kilo verdim ve Melike hanım hazırladığı diyet listesi sayesinde aç kalmadan rahat bir şekilde kilo verdim. Her soruma içten verdiği cevaplar ve önerileri sayesinde hem istediğim hedefe hemde sağlığıma kavuştum. İyi ki Melike hanımı tanıdım ve iyi ki karşıma çıktı. "
  }
];

const statistics = [
  { icon: <Star className="w-6 h-6" />, value: "1000+", label: "Mutlu Danışan" },
  { icon: <TrendingUp className="w-6 h-6" />, value: "15.000+", label: "Toplam Verilen Kilo" },
  { icon: <Star className="w-6 h-6" />, value: "98%", label: "Memnuniyet Oranı" }
];

const TestimonialsSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#8aa542] to-[#8aa542] bg-clip-text text-transparent">
          Başarı Hikayeleri
        </h2>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Gerçek insanlar, gerçek sonuçlar. Danışanlarımızın ilham verici dönüşüm hikayeleri.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {statistics.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center justify-center space-x-4">
                <div className="p-3 bg-green-50 rounded-full text-green-600">
                  {stat.icon}
                </div>
                <div className="text-left">
                  <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold">{testimonials[activeSlide].author}</h3>
                </div>
              </div>
              <div className="flex items-center mb-4">
                {[...Array(testimonials[activeSlide].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
                ))}
              </div>
              <Quote className="w-10 h-10 text-green-200 mb-4" />
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {testimonials[activeSlide].comment}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-500">Başlangıç</p>
                <p className="font-bold text-lg">{testimonials[activeSlide].startWeight}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-gray-500">Şu an</p>
                <p className="font-bold text-lg text-green-600">{testimonials[activeSlide].currentWeight}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="text-green-500 w-5 h-5" />
                  <span className="font-medium text-green-600">{testimonial.weightLoss}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="text-blue-500 w-5 h-5" />
                  <span className="text-gray-600">{testimonial.duration}</span>
                </div>
              </div>
              <p className="text-gray-600 line-clamp-3">{testimonial.comment}</p>
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{testimonial.author}</span>
                </div>
                <div className="flex items-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;