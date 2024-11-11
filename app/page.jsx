'use client';

import { Typewriter } from 'react-simple-typewriter';
import { useEffect, useState, useCallback } from 'react';
import { FaStar, FaInstagram } from 'react-icons/fa';
import { Check, Mail, Phone, MapPin, Send, Instagram, Heart, MessageCircle, Bookmark, ChevronLeft, ChevronRight, ChevronDown, Leaf, Brain, Star, Award, Timer, Calendar, Users, TrendingUp, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Constants
const THEME_COLORS = {
  primary: '#8aa542',
  primaryHover: '#758e30',
  background: '#FFF1DB',
};

const SECTIONS = {
  home: 'Ana Sayfa',
  about: 'Hakkımda',
  packets: 'Paketler',
  testimonials: 'Başarı Hikayeleri',
  instagram: 'Instagram',
  contact: 'İletişim',
};

const testimonials = [
  {
    text: "Harika bir program ve müthiş sonuçlar aldım!",
    author: "Ayşe Y.",
  },
  {
    text: "Kişiselleştirilmiş yaklaşımları çok başarılı.",
    author: "Mehmet K.",
  },
  {
    text: "6 ayda hedeflerime ulaştım!",
    author: "Zeynep A.",
  },
];

const packages = [
  {
    id: 1,
    title: "Başlangıç Paketi",
    price: "199",
    duration: "ay",
    highlight: "Sağlıklı yaşama ilk adım",
    icon: <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
      <Check className="w-8 h-8 text-green-600" />
    </div>,
    features: [
      "Kişisel beslenme programı",
      "Haftalık takip",
      "Online destek",
      "Temel öğün planlaması"
    ]
  },
  {
    id: 2,
    title: "Premium Paket",
    price: "299",
    duration: "ay",
    popular: true,
    tag: "En Çok Tercih Edilen",
    highlight: "Tam kapsamlı destek",
    icon: <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
      <Check className="w-8 h-8 text-blue-600" />
    </div>,
    features: [
      "Kişisel beslenme programı",
      "Günlük takip",
      "7/24 destek",
      "Detaylı öğün planlaması",
      "Egzersiz programı"
    ]
  },
  {
    id: 3,
    title: "VIP Paket",
    price: "499",
    duration: "ay",
    highlight: "Maksimum sonuç",
    icon: <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
      <Check className="w-8 h-8 text-purple-600" />
    </div>,
    features: [
      "Kişisel beslenme programı",
      "Anlık takip",
      "Birebir görüntülü görüşme",
      "Özel takviye planlaması",
      "Kişisel antrenör desteği"
    ]
  }
];

const posts = [
  {
    type: "before-after",
    title: "Başarı Hikayeleri",
    description: "-25 KG / 3 Ay",
    engagement: { likes: "2.4K", comments: "186" }
  },
  {
    type: "recipe",
    title: "Sağlıklı Tarifler",
    description: "Protein Kahvaltı Kasesi",
    engagement: { likes: "1.8K", comments: "234" }
  },
  {
    type: "tips",
    title: "Beslenme İpuçları",
    description: "Metabolizma Hızlandırma",
    engagement: { likes: "3.1K", comments: "295" }
  }
];

const features = [
  {
    icon: <Leaf className="w-8 h-8 text-green-600" />,
    title: "Sağlıklı Beslenme",
    description: "Uzman diyetisyenlerimizle kişiselleştirilmiş beslenme planları"
  },
  {
    icon: <Heart className="w-8 h-8 text-red-500" />,
    title: "Yaşam Koçluğu",
    description: "Sadece diyet değil, yaşam tarzı değişimi için profesyonel destek"
  },
  {
    icon: <Brain className="w-8 h-8 text-purple-500" />,
    title: "Zihinsel Sağlık",
    description: "Beden ve zihin sağlığı için bütünsel yaklaşım"
  }
];

// Reusable Components
const Section = ({ id, className, children }) => (
  <section 
    id={id} 
    className={`min-h-screen py-16 flex flex-col items-center justify-center px-4 relative bg-gradient-to-b from-green-50 to-white ${className}`}
  >
    {/* Render floating fruits only in the "home" section */}
    {id === 'home' && (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        
        {/* Elma */}
        <FloatingFruit
          fruit={
            <svg viewBox="0 0 24 24" className="w-16 h-16 text-red-400">
              <path fill="currentColor" d="M20,10C22,13 17,22 15,22C13,22 13,21 12,21C11,21 11,22 9,22C7,22 2,13 4,10C6,7 9,7 11,8V5C5.38,8.07 4.11,3.78 4.11,3.78C4.11,3.78 6.77,0.19 11,5V3H13V8C15,7 18,7 20,10Z" />
            </svg>
          }
          className="absolute left-1/4 top-1/4 fruit-float-1 opacity-60"
        />

        {/* Limon */}
        <FloatingFruit
          fruit={
            <svg viewBox="0 0 24 24" className="w-12 h-12 text-yellow-400">
              <path fill="currentColor" d="M12,2C14.21,2 16,3.79 16,6H8C8,3.79 9.79,2 12,2M16,9H8V16L6,20H18L16,16V9Z" />
            </svg>
          }
          className="absolute right-1/4 top-1/3 fruit-float-2 opacity-50"
        />

        {/* Üzüm */}
        <FloatingFruit
          fruit={
            <svg viewBox="0 0 24 24" className="w-20 h-20 text-purple-400">
              <path fill="currentColor" d="M19,10C17,13 13,16 12,17C11,16 7,13 5,10C3,7 5,2 12,2C19,2 21,7 19,10Z" />
            </svg>
          }
          className="absolute left-1/3 bottom-1/4 fruit-float-3 opacity-55"
        />

        {/* Çilek */}
        <FloatingFruit
          fruit={
            <svg viewBox="0 0 24 24" className="w-14 h-14 text-red-500">
              <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
            </svg>
          }
          className="absolute right-1/3 top-1/4 fruit-float-4 opacity-45"
        />

        {/* Portakal */}
        <FloatingFruit
          fruit={
            <svg viewBox="0 0 24 24" className="w-16 h-16 text-orange-400">
              <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
            </svg>
          }
          className="absolute right-1/4 bottom-1/3 fruit-float-5 opacity-50"
        />

        {/* Armut */}
        <FloatingFruit
          fruit={
            <svg viewBox="0 0 24 24" className="w-14 h-14 text-green-400">
              <path fill="currentColor" d="M12,3C16.42,3 20,4.79 20,7C20,9.21 16.42,11 12,11C7.58,11 4,9.21 4,7C4,4.79 7.58,3 12,3M4,9C4,11.21 7.58,13 12,13C16.42,13 20,11.21 20,9" />
            </svg>
          }
          className="absolute left-1/4 bottom-1/3 fruit-float-6 opacity-55"
        />

        {/* Gradyan arka plan efekti */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-25" />
      </div>
    )}
    <div className="relative z-10 w-full">
      {children}
    </div>
  </section>
);


const SectionTitle = ({ children }) => (
  <h2 className="text-3xl md:text-4xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#8aa542] to-[#8aa542] drop-shadow-lg text-center">
    {children}
  </h2>
);

const PrimaryButton = ({ href, className, children }) => (
  <a
    href={href}
    className={`inline-block px-8 py-4 bg-[#8aa542] text-white rounded-full font-semibold shadow-lg hover:bg-[#758e30] transition duration-300 hover:scale-105 ${className}`}
  >
    {children}
  </a>
);

const FloatingFruit = ({ fruit, className }) => (
  <div className={`absolute opacity-20 animate-float ${className}`}>
    {fruit}
  </div>
);

const TestimonialCard = ({ text, author }) => (
  <div className="bg-white/80 backdrop-blur-sm text-black p-8 rounded-xl shadow-xl transform hover:scale-105 transition duration-300">
    <p className="text-lg font-semibold mb-4">"{text}"</p>
    <div className="flex justify-center mb-2">
      {[...Array(5)].map((_, i) => (
        <FaStar key={i} className="text-yellow-400" />
      ))}
    </div>
    <p className="text-right font-medium">- {author}</p>
  </div>
);

export default function HomePage() {
  const [hoveredPackage, setHoveredPackage] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [mounted, setMounted] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const statistics = [
    { icon: <Award className="w-6 h-6" />, value: "1000+", label: "Mutlu Danışan" },
    { icon: <TrendingUp className="w-6 h-6" />, value: "15.000+", label: "Toplam Verilen Kilo" },
    { icon: <Heart className="w-6 h-6" />, value: "98%", label: "Memnuniyet Oranı" }
  ];

  const handleScroll = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    const sections = Object.keys(SECTIONS).map(id => ({
      id,
      offsetTop: document.getElementById(id)?.offsetTop || 0
    }));

    const active = sections.reverse().find(section => scrollPosition >= section.offsetTop);
    if (active) setActiveSection(active.id);
  }, []);

  useEffect(() => {
    setMounted(true);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!mounted) {
    return null;
  }

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Home Section */}
      <Section id="home" className="min-h-screen relative bg-gradient-to-b from-white to-green-50">
      {/* Hero Section */}
      <div className="text-center px-4 pt-20 pb-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8aa542] to-[#8aa542]">
              <Typewriter
                words={['Sağlıklı Beslenme', 'Diyet Planları', 'Kilo Verme Tavsiyeleri']}
                loop={true}
                cursor
                cursorStyle="_"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Diyetisyeninizle birlikte sağlıklı yaşama adım atın ve hayalinizdeki 
            bedene kavuşun
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <PrimaryButton 
              href="#contact"
              className="px-8 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-[#8aa542] to-[#8aa542] text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Sağlılı Bir Hayata Adım Atın
            </PrimaryButton>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-[#8aa542]" />
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-green-50 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-40 right-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>
    </Section>

      {/* About Section */}
      <Section id="about" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
          {/* Image Container */}
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

          {/* Content Container */}
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
                Meslek hayatıma 2018 yılında Özel İzmit Konak Hastanesinde başladım. 2020 yılında kendi danışmanlık merkezimi kurmaya karar verdim. <span className="font-medium text-gray-900" > DİYETTEİZ beslenme ve diyet danışmanlık merkezini kurdum. </span> Şu an aktif olarak yüz yüze ve online diyet olarak hizmet vermekteyim. 
                </p>
              </div>

              {/* Credentials */}
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
    </Section>

    <Section id="packets" className="py-20 bg-gradient-to-b from-gray-50 to-white">
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
                  className={`w-full py-3 px-6 rounded-lg transition-colors duration-200 font-medium
                    ${pkg.popular
                      ? 'bg-[#8aa542] hover:bg-[#758e30] text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    }`}
                >
                  Hemen Başla
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>

    <Section id="testimonials" className="py-20 relative bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-green-300 rounded-full mix-blend-multiply filter blur-xl" />
        <div className="absolute top-32 right-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl" />
      </div>

      <div className="container mx-auto max-w-6xl px-4 relative">
        {/* Header Section */}
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

          {/* Statistics */}
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

        {/* Featured Success Story */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="relative group">
              <img
                src={testimonials[activeSlide].beforeAfter}
                alt="Before After"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-2xl font-bold mb-2">{testimonials[activeSlide].weightLoss}</p>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>{testimonials[activeSlide].duration}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={testimonials[activeSlide].image}
                    alt={testimonials[activeSlide].name}
                    className="w-16 h-16 rounded-full border-4 border-green-100"
                  />
                  <div>
                    <h3 className="text-xl font-bold">{testimonials[activeSlide].name}</h3>
                    <p className="text-gray-600">{testimonials[activeSlide].age} yaş, {testimonials[activeSlide].profession}</p>
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
          {/* Navigation Buttons */}
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

        {/* Success Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
              onClick={() => setSelectedTestimonial(testimonial)}
            >
              <div className="relative">
                <img
                  src={testimonial.beforeAfter}
                  alt="Before After"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 flex flex-col justify-end">
                  <div className="flex items-center space-x-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full border-2 border-white"
                    />
                    <div className="text-white">
                      <p className="font-medium">{testimonial.name}</p>
                      <div className="flex items-center">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                <div className="mt-4 flex items-center text-sm text-green-600 font-medium">
                  <span>Detaylı Hikaye</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#8aa542] to-[#8aa542] text-white px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Tüm Başarı Hikayeleri</span>
          </motion.button>
        </div>
      </div>

      {/* Testimonial Detail Modal */}
      <AnimatePresence>
        {selectedTestimonial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedTestimonial(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal content */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>

      {/* Instagram Section */}
      <Section id="instagram" className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-pink-100 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-30"></div>

      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16">
          <h4 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 font-semibold mb-2">
            INSTAGRAM'DA BİZ
          </h4>
          <h2 className="text-4xl font-bold mb-4">Sağlıklı Yaşam Yolculuğunuz</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Motivasyon, başarı hikayeleri, sağlıklı tarifler ve daha fazlası için Instagram'da bizi takip edin!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {posts.map((post, index) => (
            <div key={index} className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/80 to-pink-500/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Content Container */}
              <div className="relative p-6 h-80 flex flex-col justify-between">
                {/* Post Type Icon */}
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg mb-4">
                  {post.type === "before-after" && (
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full animate-pulse"></div>
                  )}
                  {post.type === "recipe" && (
                    <div className="w-8 h-8 relative animate-spin-slow">
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full transform rotate-45"></div>
                    </div>
                  )}
                  {post.type === "tips" && (
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full animate-bounce"></div>
                  )}
                </div>

                {/* Post Info */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-white transition-colors">{post.title}</h3>
                  <p className="text-gray-600 group-hover:text-white/90 transition-colors">{post.description}</p>
                </div>

                {/* Engagement Stats */}
                <div className="flex items-center justify-between text-gray-600 group-hover:text-white/90 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Heart className="w-5 h-5 mr-1" />
                      <span>{post.engagement.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="w-5 h-5 mr-1" />
                      <span>{post.engagement.comments}</span>
                    </div>
                  </div>
                  <Bookmark className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram Button */}
        <div className="text-center">
          <a
            href="https://www.instagram.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            <Instagram className="w-6 h-6" />
            <span>Instagram'da Takip Et</span>
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </Section>

      {/* Contact Section */}
      <Section id="contact" className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-100 rounded-full blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h4 className="text-[#8aa542] font-semibold mb-2">İLETİŞİM</h4>
          <h2 className="text-4xl font-bold mb-4">Bize Ulaşın</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sağlıklı yaşam yolculuğunuza başlamak için bir adım uzaktasınız. 
            Soruları yanıtlamak ve size yardımcı olmak için buradayız.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contact Info */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold mb-6">İletişim Bilgileri</h3>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-[#8aa542]" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Telefon</h4>
                  <p className="text-[#8aa542]">+90 555 123 4567</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#8aa542]" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">E-posta</h4>
                  <p className="text-[#8aa542]">info@diyetisyenmehmet.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#8aa542]" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Adres</h4>
                  <p className="text-gray-600">Merkez Mah. Sağlık Cad. No:123</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-xl relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl blur opacity-10"></div>
            <div className="relative">
              <h3 className="text-2xl font-bold mb-6">Mesaj Gönderin</h3>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    placeholder="Adınız"
                    required
                    className="w-full p-4 rounded-lg bg-gray-50 text-gray-800 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8aa542] focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="E-posta Adresiniz"
                    required
                    className="w-full p-4 rounded-lg bg-gray-50 text-gray-800 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8aa542] focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div className="relative">
                  <textarea
                    name="message"
                    placeholder="Mesajınız"
                    required
                    rows="4"
                    className="w-full p-4 rounded-lg bg-gray-50 text-gray-800 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8aa542] focus:border-transparent transition-all duration-300 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-[#8aa542] to-[#8aa542] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition duration-300 flex items-center justify-center space-x-2 group"
                >
                  <span>Gönder</span>
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Section>

      {/* Navigation Dots */}
      <nav className="fixed right-10 top-1/2 transform -translate-y-1/2 hidden md:flex flex-col space-y-4 z-50">
        {Object.entries(SECTIONS).map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            aria-label={label}
            className="block"
          >
            <div
              className={`w-4 h-4 rounded-full border-2 border-[#8aa542] ${
                activeSection === id ? 'bg-[#8aa542]' : 'opacity-50'
              } transition-opacity duration-300`}
            />
          </a>
        ))}
      </nav>
    </main>
  );
}
