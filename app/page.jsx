// app/page.jsx
'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Script from 'next/script';
import HomeSection from '@/components/sections/HomeSection';
import AboutSection from '@/components/sections/AboutSection';
import PacketsSection from '@/components/sections/PacketsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import InstagramSection from '@/components/sections/InstagramSection';
import ContactSection from '@/components/sections/ContactSection';
import RecipesSection from '@/components/sections/RecipesSection';
import CommentsSection from '@/components/sections/CommentsSection';
import { RecipeProvider } from '@/contexts/RecipeContext';
import Modal from '@/components/Modal';

// SEO için schema verisi
const getSchemaData = () => {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "DietitianOffice",
    "name": "Diyetisyen Melike Öztürk",
    "image": "https://www.melikeozturk.com/images/office.jpg",
    "@id": "https://www.melikeozturk.com",
    "url": "https://www.melikeozturk.com",
    "telephone": "+905541889160",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "İzmit",
      "addressRegion": "Kocaeli",
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 40.7654,
      "longitude": 29.9408
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "10:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "14:00"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/dyt.melikeozturk/",
      "https://www.facebook.com/dyt.melikeozturkk/"
    ]
  };

  return JSON.stringify(baseSchema);
};

// SEO meta tag güncelleyici
const updateMetaTags = (service) => {
  const metaDescription = document.querySelector('meta[name="description"]');
  const metaTitle = document.querySelector('title');
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDesc = document.querySelector('meta[property="og:description"]');
  const canonical = document.querySelector('link[rel="canonical"]');

  const baseUrl = 'https://www.melikeozturk.com';

  switch (service) {
    case 'izmit':
      metaTitle.textContent = 'İzmit Diyetisyen | Uzman Diyet Danışmanlığı - Melike Öztürk';
      metaDescription.content = 'İzmit\'te profesyonel diyetisyen hizmetleri. Online ve yüz yüze diyet danışmanlığı, kişiye özel beslenme programları.';
      canonical.href = `${baseUrl}/izmit-diyetisyen`;
      break;
    case 'kocaeli':
      metaTitle.textContent = 'Kocaeli Diyetisyen | Beslenme Danışmanlığı - Melike Öztürk';
      metaDescription.content = 'Kocaeli\'de uzman diyetisyen hizmetleri. Bilimsel ve güncel yaklaşımlarla kişiye özel beslenme programları.';
      canonical.href = `${baseUrl}/kocaeli-diyetisyen`;
      break;
    default:
      metaTitle.textContent = 'Diyetisyen Melike Öztürk | Kocaeli İzmit Diyet Danışmanlığı';
      metaDescription.content = 'Kocaeli ve İzmit\'te uzman diyetisyen Melike Öztürk ile sağlıklı beslenme ve diyet programları. Online diyet danışmanlığı hizmetleri.';
      canonical.href = baseUrl;
  }

  if (ogTitle) ogTitle.content = metaTitle.textContent;
  if (ogDesc) ogDesc.content = metaDescription.content;
};

const ServiceHandler = () => {
  const searchParams = useSearchParams();
  const service = searchParams.get('service');
  
  useEffect(() => {
    updateMetaTags(service);
  }, [service]);
  
  return null;
};

const Footer = () => (
  <footer className="relative w-full bg-gradient-to-b from-white/80 to-green-50/50 backdrop-blur-sm border-t border-green-100">
    <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Ana Footer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo ve Hakkında */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Dyt. Melike Öztürk</h3>
          <p className="text-gray-600 text-sm">
            Bireysel beslenme danışmanlığı ile sağlıklı yaşam yolculuğunuzda yanınızdayım.
          </p>
          {/* Sosyal Medya */}
          <div className="flex space-x-4 pt-2">
            <a href="https://www.instagram.com/dyt.melikeozturk/" target="_blank" rel="noopener noreferrer" 
               className="text-gray-600 hover:text-[#8aa542] transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/dyt.melikeozturkk/" target="_blank" rel="noopener noreferrer" 
   className="text-gray-600 hover:text-[#8aa542] transition-colors">
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
</a>
          </div>
        </div>

        {/* Hızlı Erişim */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Hızlı Erişim</h3>
          <ul className="space-y-2">
            {Object.entries(SECTIONS).map(([key, value]) => (
              <li key={key}>
                <a href={`#${key}`} className="text-gray-600 hover:text-[#8aa542] transition-colors text-sm">
                  {value}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* İletişim Bilgileri */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">İletişim</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
              </svg>
              <span>İzmit, Kocaeli</span>
            </li>
            <li className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              <a href="tel:+905541889160" className='hover:text-[#8aa542]'>0554 188 91 60</a>
            </li>
            <li className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              <a 
                  href="mailto:diyetisyenmelikeozturk@gmail.com" 
                  className="hover:text-[#8aa542]"
                >diyetisyenmelikeozturk@gmail.com</a>
            </li>
          </ul>
        </div>

        {/* Çalışma Saatleri */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Çalışma Saatleri</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex justify-between">
              <span>Pazartesi - Cuma:</span>
              <span>10:00 - 20:00</span>
            </li>
            <li className="flex justify-between">
              <span>Cumartesi:</span>
              <span>10:00 - 14:00</span>
            </li>
            <li className="flex justify-between">
              <span>Pazar:</span>
              <span>Kapalı</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Alt Footer */}
      <div className="mt-12 pt-8 border-t border-green-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} Dyt. Melike Öztürk. Tüm hakları saklıdır.
          </div>
          <div className="flex space-x-4 text-sm text-gray-600 md:justify-end">
            <a href="/gizlilik-politikasi" className="hover:text-[#8aa542] transition-colors">
              Gizlilik Politikası
            </a>
            <span>•</span>
            <a href="/kullanim-kosullari" className="hover:text-[#8aa542] transition-colors">
              Kullanım Koşulları
            </a>
            <span>•</span>
            <a href="/kvkk" className="hover:text-[#8aa542] transition-colors">
              KVKK
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

const SECTIONS = {
  home: 'Ana Sayfa',
  about: 'Hakkımda',
  packets: 'Paketler',
  comments: 'Yorumlar',
  testimonials: 'Danışan Deneyimleri',
  recipes: 'Tarifler',
  instagram: 'Instagram',
  contact: 'İletişim',
};

const FloatingFruits = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Sol Üst Group */}
    <div className="absolute top-0 left-0 fruit-path-1">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-16 h-16 transform-gpu">
        <g className="origin-center">
          <path d="M35,20 C20,15 45,-5 55,20" fill="#4CAF50"/>
          <path d="M45,15 C30,10 50,-10 60,15" fill="#4CAF50"/>
          <path d="M25,25 C15,20 35,-5 45,20" fill="#4CAF50"/>
        </g>
        <path d="M45,25 C65,25 75,45 75,60 C75,80 45,95 45,95 C45,95 15,80 15,60 C15,45 25,25 45,25" fill="#ff1744"/>
        <path d="M45,25 C65,25 75,45 75,60 C75,80 45,95 45,95" fill="#d50000" opacity="0.3"/>
        <g>
          {[...Array(15)].map((_, i) => (
            <circle key={i} cx={35 + (i % 5) * 8} cy={45 + Math.floor(i / 5) * 10} r="1.2" fill="#FFD700" opacity="0.8"/>
          ))}
        </g>
      </svg>
    </div>
    <div className="absolute top-[5%] left-[5%] fruit-path-1 delay-2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-18 h-18 transform-gpu">
        <defs>
          <linearGradient id="pearGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DCE775"/>
            <stop offset="100%" stopColor="#C0CA33"/>
          </linearGradient>
        </defs>
        <path d="M50,30 C65,30 80,50 80,75 C80,95 50,100 50,100 C50,100 20,95 20,75 C20,50 35,30 50,30" fill="url(#pearGradient)"/>
        <path d="M48,10 C45,0 55,0 52,10" stroke="#8D6E63" strokeWidth="2" fill="none"/>
        <path d="M50,30 C65,30 80,50 80,75" fill="#C0CA33" opacity="0.3"/>
      </svg>
    </div>

    {/* Sağ Üst Group */}
    <div className="absolute top-0 right-0 fruit-path-2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-18 h-18 transform-gpu">
        <circle cx="45" cy="60" r="35" fill="#795548"/>
        {[...Array(40)].map((_, i) => (
          <line
            key={i}
            x1={45 + Math.cos(i * Math.PI / 20) * 35}
            y1={60 + Math.sin(i * Math.PI / 20) * 35}
            x2={45 + Math.cos(i * Math.PI / 20) * 38}
            y2={60 + Math.sin(i * Math.PI / 20) * 38}
            stroke="#8D6E63"
            strokeWidth="0.5"
          />
        ))}
        <circle cx="45" cy="60" r="30" fill="#7CB342"/>
        {[...Array(25)].map((_, i) => (
          <circle key={i} cx={35 + (i % 5) * 5} cy={50 + Math.floor(i / 5) * 5} r="1" fill="#1B5E20" opacity="0.8"/>
        ))}
      </svg>
    </div>
    <div className="absolute top-[5%] right-[5%] fruit-path-2 delay-3">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-16 h-16 transform-gpu">
        <defs>
          <radialGradient id="appleGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f44336"/>
            <stop offset="100%" stopColor="#c62828"/>
          </radialGradient>
        </defs>
        <path d="M50,20 C70,20 85,40 85,65 C85,90 50,95 50,95 C50,95 15,90 15,65 C15,40 30,20 50,20" fill="url(#appleGradient)"/>
        <path d="M40,15 C25,5 45,-5 55,15" fill="#4CAF50"/>
        <path d="M45,15 L50,5" stroke="#33691E" strokeWidth="1"/>
      </svg>
    </div>

    {/* Sol Alt Group */}
    <div className="absolute bottom-0 left-0 fruit-path-3">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-20 h-20 transform-gpu">
        <defs>
          <linearGradient id="avoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2E7D32"/>
            <stop offset="100%" stopColor="#1B5E20"/>
          </linearGradient>
        </defs>
        <path d="M45,25 C70,25 85,50 85,75 C85,100 60,120 45,120 C30,120 5,100 5,75 C5,50 20,25 45,25" fill="url(#avoGradient)"/>
        <circle cx="45" cy="70" r="25" fill="#FFF9C4"/>
        <circle cx="45" cy="70" r="15" fill="#795548"/>
        <path d="M35,65 L55,75" stroke="#6D4C41" strokeWidth="0.5" opacity="0.5"/>
        <path d="M35,75 L55,65" stroke="#6D4C41" strokeWidth="0.5" opacity="0.5"/>
      </svg>
    </div>
    <div className="absolute bottom-[5%] left-[5%] fruit-path-3 delay-2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-16 h-16 transform-gpu">
        <defs>
          <radialGradient id="orangeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF9800"/>
            <stop offset="100%" stopColor="#F57C00"/>
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="40" fill="url(#orangeGradient)"/>
        <path d="M50,10 L55,5" stroke="#4CAF50" strokeWidth="2"/>
        <path d="M40,15 C25,5 45,-5 55,15" fill="#4CAF50"/>
        {[...Array(8)].map((_, i) => (
          <path
            key={i}
            d="M50,10 Q50,50 50,90"
            stroke="#F57C00"
            strokeWidth="0.5"
            opacity="0.3"
            transform={`rotate(${i * 22.5}, 50, 50)`}
          />
        ))}
      </svg>
    </div>

    {/* Sağ Alt Group */}
    <div className="absolute bottom-0 right-0 fruit-path-4">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-20 h-20 transform-gpu">
        <defs>
          <linearGradient id="bananaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE082"/>
            <stop offset="100%" stopColor="#FFA000"/>
          </linearGradient>
        </defs>
        <path d="M20,80 Q40,85 60,70 Q80,55 90,30" fill="url(#bananaGradient)"/>
        <path d="M20,80 Q40,85 60,70 Q80,55 90,30" fill="#F57F17" opacity="0.3"/>
        <path d="M25,75 Q45,80 65,65" stroke="#FFE082" strokeWidth="0.5" opacity="0.5"/>
      </svg>
    </div>
    <div className="absolute bottom-[5%] right-[5%] fruit-path-4 delay-3">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-18 h-18 transform-gpu">
        <circle cx="45" cy="60" r="35" fill="#795548"/>
        {[...Array(40)].map((_, i) => (
          <line
            key={i}
            x1={45 + Math.cos(i * Math.PI / 20) * 35}
            y1={60 + Math.sin(i * Math.PI / 20) * 35}
            x2={45 + Math.cos(i * Math.PI / 20) * 38}
            y2={60 + Math.sin(i * Math.PI / 20) * 38}
            stroke="#8D6E63"
            strokeWidth="0.5"
          />
        ))}
        <circle cx="45" cy="60" r="30" fill="#7CB342"/>
        {[...Array(25)].map((_, i) => (
          <circle key={i} cx={35 + (i % 5) * 5} cy={50 + Math.floor(i / 5) * 5} r="1" fill="#1B5E20" opacity="0.8"/>
        ))}
      </svg>
    </div>

    {/* Yumuşak blur efekti */}
    <div className="absolute inset-0">
      <div className="absolute inset-0 backdrop-blur-[0.6px] bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-10"/>
    </div>
  </div>
);

const Section = ({ id, className, children }) => (
  <section 
    id={id} 
    className={`relative w-full min-h-screen pt-24 pb-16 flex flex-col items-center justify-center ${className}`}
  >
    {/* Background decorative elements */}
    <div className="absolute inset-0 -z-10 opacity-30 pointer-events-none overflow-hidden">
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-green-200/20 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-1/3 h-2/3 bg-blue-200/20 rounded-full filter blur-3xl transform translate-x-1/3" />
      <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-purple-200/20 rounded-full filter blur-3xl" />
    </div>

    {/* Floating fruits sadece home section'da */}
    {id === 'home' && <div className="-z-10 pointer-events-none overflow-hidden"><FloatingFruits /></div>}
    
    <div className="relative w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  </section>
);


export default function HomePage() {
  const [activeSection, setActiveSection] = useState('home');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const sections = Object.keys(SECTIONS).map(id => ({
        id,
        offsetTop: document.getElementById(id)?.offsetTop || 0
      }));

      const active = sections.reverse().find(section => scrollPosition >= section.offsetTop);
      if (active) setActiveSection(active.id);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <RecipeProvider>
      <main className="relative min-h-screen overflow-x-hidden">
      <Suspense fallback={null}>
          <ServiceHandler />
        </Suspense>
        {/* Schema.org verisi */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: getSchemaData() }}
        />
        {/* Fixed background gradients */}
        <div className="fixed inset-0 -z-50 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-green-50/50 to-white" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-green-100/30 via-transparent to-blue-100/30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-white via-green-50/20 to-transparent opacity-60" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <Section id="home" className="relative bg-white/30">
            <HomeSection />
          </Section>
          
          <Section id="about" className="bg-white/30">
            <AboutSection />
          </Section>

          <Section id="packets" className="bg-white/40">
            <PacketsSection />
          </Section>

          <Section id="comments" className="bg-white/30">
            <CommentsSection />
          </Section>

          <Section id="testimonials" className="bg-white/30">
            <TestimonialsSection />
          </Section>

          <Section id="recipes" className="bg-white/30">
            <RecipesSection />
          </Section>

          <Section id="instagram" className="bg-white/40">
            <InstagramSection />
          </Section>

          <Section id="contact" className="bg-white/30">
            <ContactSection />
          </Section>
        </div>

        {/* Navigation Dots */}
        {isClient && (
          <nav className="fixed right-6 lg:right-10 top-1/2 transform -translate-y-1/2 hidden md:flex flex-col space-y-4 z-[60]">
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
        )}
        
        <Modal />
        <Footer /> 
      </main>
    </RecipeProvider>
  );
}