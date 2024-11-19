// page.jsx
'use client';

import React, { useEffect, useState, useCallback } from 'react';
import HomeSection from '@/components/sections/HomeSection';
import AboutSection from '@/components/sections/AboutSection';
import PacketsSection from '@/components/sections/PacketsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import InstagramSection from '@/components/sections/InstagramSection';
import ContactSection from '@/components/sections/ContactSection';
import RecipesSection from '@/components/sections/RecipesSection';
import { RecipeProvider } from '@/contexts/RecipeContext';
import Modal from '@/components/Modal';

const SECTIONS = {
  home: 'Ana Sayfa',
  about: 'Hakkımda',
  packets: 'Paketler',
  testimonials: 'Başarı Hikayeleri',
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
    className={`w-full h-auto md:min-h-screen py-16 flex flex-col items-center justify-center px-4 relative overflow-hidden ${className}`}
  >
    {/* Background decorative elements */}
    <div className="absolute inset-0 opacity-30">
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-green-200/20 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-1/3 h-2/3 bg-blue-200/20 rounded-full filter blur-3xl transform translate-x-1/3" />
      <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-purple-200/20 rounded-full filter blur-3xl" />
    </div>

    {/* Render floating fruits only in the "home" section */}
    {id === 'home' && <FloatingFruits />}
    
    <div className="relative z-10 w-full max-w-7xl mx-auto">
      {children}
    </div>
  </section>
);

const NavigationDots = ({ activeSection }) => (
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
    <main className="relative w-full overflow-x-hidden">
      {/* Fixed background gradients */}
      <div className="fixed inset-0 bg-gradient-to-b from-white via-green-50/50 to-white pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-green-100/30 via-transparent to-blue-100/30 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-white via-green-50/20 to-transparent opacity-60 pointer-events-none" />

      {/* Content */}
      <div className="relative w-full">
        <Section id="home" className="relative backdrop-blur-sm bg-white/30">
          <HomeSection />
        </Section>
        
        <Section id="about" className="backdrop-blur-sm bg-white/30">
          <AboutSection />
        </Section>

        <Section id="packets" className="backdrop-blur-sm bg-white/40">
          <PacketsSection />
        </Section>

        <Section id="testimonials" className="backdrop-blur-sm bg-white/30">
          <TestimonialsSection />
        </Section>

        <Section id="recipes" className="backdrop-blur-sm bg-white/30">
          <RecipesSection />
        </Section>

        <Section id="instagram" className="backdrop-blur-sm bg-white/40">
          <InstagramSection />
        </Section>

        <Section id="contact" className="backdrop-blur-sm bg-white/30">
          <ContactSection />
        </Section>
      </div>

      {/* Navigation Dots - Only render on client side */}
      {isClient && <NavigationDots activeSection={activeSection} />}
      <Modal />
    </main>
    </RecipeProvider>
  );
}