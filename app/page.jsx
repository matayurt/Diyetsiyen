'use client';

import React, { useEffect, useState, useCallback } from 'react';
import HomeSection from '@/components/sections/HomeSection';
import AboutSection from '@/components/sections/AboutSection';
import PacketsSection from '@/components/sections/PacketsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import InstagramSection from '@/components/sections/InstagramSection';
import ContactSection from '@/components/sections/ContactSection';
import RecipesSection from '@/components/sections/RecipesSection';

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
    {/* Elma */}
    <div className="absolute left-1/4 top-1/4 fruit-float-1 opacity-60">
      <svg viewBox="0 0 24 24" className="w-16 h-16 text-red-400">
        <path fill="currentColor" d="M20,10C22,13 17,22 15,22C13,22 13,21 12,21C11,21 11,22 9,22C7,22 2,13 4,10C6,7 9,7 11,8V5C5.38,8.07 4.11,3.78 4.11,3.78C4.11,3.78 6.77,0.19 11,5V3H13V8C15,7 18,7 20,10Z" />
      </svg>
    </div>

    {/* Limon */}
    <div className="absolute right-1/4 top-1/3 fruit-float-2 opacity-50">
      <svg viewBox="0 0 24 24" className="w-12 h-12 text-yellow-400">
        <path fill="currentColor" d="M12,2C14.21,2 16,3.79 16,6H8C8,3.79 9.79,2 12,2M16,9H8V16L6,20H18L16,16V9Z" />
      </svg>
    </div>

    {/* Üzüm */}
    <div className="absolute left-1/3 bottom-1/4 fruit-float-3 opacity-55">
      <svg viewBox="0 0 24 24" className="w-20 h-20 text-purple-400">
        <path fill="currentColor" d="M19,10C17,13 13,16 12,17C11,16 7,13 5,10C3,7 5,2 12,2C19,2 21,7 19,10Z" />
      </svg>
    </div>

    {/* Çilek */}
    <div className="absolute right-1/3 top-1/4 fruit-float-4 opacity-45">
      <svg viewBox="0 0 24 24" className="w-14 h-14 text-red-500">
        <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
      </svg>
    </div>

    {/* Portakal */}
    <div className="absolute right-1/4 bottom-1/3 fruit-float-5 opacity-50">
      <svg viewBox="0 0 24 24" className="w-16 h-16 text-orange-400">
        <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
      </svg>
    </div>

    {/* Armut */}
    <div className="absolute left-1/4 bottom-1/3 fruit-float-6 opacity-55">
      <svg viewBox="0 0 24 24" className="w-14 h-14 text-green-400">
        <path fill="currentColor" d="M12,3C16.42,3 20,4.79 20,7C20,9.21 16.42,11 12,11C7.58,11 4,9.21 4,7C4,4.79 7.58,3 12,3M4,9C4,11.21 7.58,13 12,13C16.42,13 20,11.21 20,9" />
      </svg>
    </div>

    {/* Gradyan arka plan efekti */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-25" />
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
    </main>
  );
}