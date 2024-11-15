'use client';

import { useState, useEffect, useCallback } from 'react';
import { FaInstagram } from 'react-icons/fa';
import { X, Menu, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  { href: '#home', label: 'Ana Sayfa' },
  { href: '#about', label: 'Hakkımda' },
  { href: '#packets', label: 'Paketler' },
  { href: '#recipes', label: 'Tarifler', icon: BookOpen },
  { href: '#testimonials', label: 'Başarı Hikayeleri' },
  { href: '#instagram', label: 'Instagram', icon: FaInstagram },
  { href: '#contact', label: 'İletişim' }
];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const handleScroll = useCallback(() => {
    if (!isMenuOpen) {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);

      const sections = menuItems.map(item => ({
        id: item.href.slice(1),
        element: document.getElementById(item.href.slice(1))
      }));

      const viewportHeight = window.innerHeight;
      const currentSection = sections.reduce((acc, section) => {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          const sectionTop = rect.top;
          const sectionBottom = rect.bottom;
          
          if (sectionTop <= viewportHeight / 2 && sectionBottom >= viewportHeight / 2) {
            return section.id;
          }
        }
        return acc;
      }, activeSection);

      setActiveSection(currentSection);
    }
  }, [activeSection, isMenuOpen]);

  useEffect(() => {
    setMounted(true);
    handleScroll();
    
    let scrollTimeout;
    const onScroll = () => {
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }
      scrollTimeout = window.requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    if (mounted) {
      if (isMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        setTimeout(() => {
          document.body.style.overflow = '';
        }, 300);
      }
    }
  }, [isMenuOpen, mounted]);

  const handleMenuItemClick = useCallback((e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    const target = document.querySelector(href);
    
    if (target) {
      const navHeight = scrolled ? 64 : 80;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = targetPosition - navHeight;

      if (isMenuOpen) {
        setIsMenuOpen(false);
        setTimeout(() => {
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 300);
      } else {
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [scrolled, isMenuOpen]);

  if (!mounted) return null;

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full transition-all duration-300
          ${scrolled ? 'h-16 bg-white/95 backdrop-blur-md shadow-lg' : 'h-20 bg-transparent'}
          ${isMenuOpen ? 'z-[60]' : 'z-50'}`}
      >
        <div className="container mx-auto px-4 h-full flex items-center justify-between relative">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={handleMenuItemClick}
            className="relative z-[70]"
          >
            <img 
              src="/assets/img/dietteiz-logo.png" 
              alt="DiyetTeiz Logo" 
              className={`h-10 w-auto transition-all duration-300 ${isMenuOpen ? 'brightness-0 invert' : ''}`}
            />
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleMenuItemClick}
                className={`text-[#8aa542] hover:text-[#6b833a] transition-colors duration-300 
                  flex items-center gap-2 text-sm font-medium ${activeSection === item.href.slice(1) ? 'text-[#6b833a]' : ''}`}
              >
                {item.icon && <item.icon size={18} />}
                <span className="relative">
                  {item.label}
                  {activeSection === item.href.slice(1) && (
                    <motion.span
                      layoutId="underline"
                      className="absolute left-0 top-full h-0.5 w-full bg-[#8aa542]"
                    />
                  )}
                </span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden relative z-[70] w-10 h-10 flex items-center justify-center"
            aria-label={isMenuOpen ? 'Menüyü Kapat' : 'Menüyü Aç'}
          >
            <div className={`w-6 h-6 relative ${isMenuOpen ? 'text-white' : 'text-[#8aa542]'}`}>
              <span className={`absolute left-0 w-full h-0.5 transition-all duration-300 bg-current
                ${isMenuOpen ? 'top-[11px] rotate-45' : 'top-1'}`} />
              <span className={`absolute left-0 w-full h-0.5 transition-all duration-300 bg-current
                ${isMenuOpen ? 'opacity-0' : 'opacity-100 top-[11px]'}`} />
              <span className={`absolute left-0 w-full h-0.5 transition-all duration-300 bg-current
                ${isMenuOpen ? 'top-[11px] -rotate-45' : 'top-5'}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-[65] bg-gradient-to-b from-[#8aa542] to-[#758e30]"
          >
            <div className="flex flex-col items-center justify-center min-h-screen px-6">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={handleMenuItemClick}
                  className="text-white text-2xl font-medium py-4 flex items-center gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.1 + index * 0.1 }
                  }}
                >
                  {item.icon && <item.icon size={24} />}
                  {item.label}
                </motion.a>
              ))}
            </div>
            
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute inset-0 bg-[url('/assets/img/pattern.svg')] bg-repeat" />
              <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}