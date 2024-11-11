'use client';

import { useState, useEffect, useCallback } from 'react';
import { FaInstagram } from 'react-icons/fa';
import { X } from 'lucide-react';

const menuItems = [
  { href: '#about', label: 'Hakkımda' },
  { href: '#packets', label: 'Paketler' },
  { href: '#contact', label: 'İletişim' },
  {
    href: '#instagram',
    label: 'Instagram',
    icon: FaInstagram,
    isExternal: true
  }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out
        ${scrolled ? 'bg-white shadow-md h-20' : 'bg-transparent h-24'}`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center h-full">
        {/* Logo */}
        <a 
          href="#home" 
          className="relative z-50"
          onClick={closeMenu}
        >
          <img 
            src="/assets/img/dietteiz-logo.png" 
            alt="DiyetTeiz Logo" 
            className={`h-12 w-auto transition-all duration-300 ${isMenuOpen ? 'brightness-0 invert' : ''}`}
          />
        </a>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center space-x-8">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[#8aa542] hover:text-black transition duration-300 flex items-center space-x-2"
              {...(item.isExternal && { rel: "noopener noreferrer" })}
            >
              {item.icon && <item.icon size={20} />}
              <span>{item.label}</span>
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="relative z-50 sm:hidden w-10 h-10 flex flex-col justify-center items-center focus:outline-none"
          aria-label={isMenuOpen ? 'Menüyü Kapat' : 'Menüyü Aç'}
        >
          {isMenuOpen ? (
            <X 
              size={24} 
              className="text-white" 
            />
          ) : (
            <>
              <span className="w-6 h-0.5 bg-[#8aa542] transition-all duration-300 ease-in-out -translate-y-1" />
              <span className="w-6 h-0.5 bg-[#8aa542] transition-all duration-300 ease-in-out" />
              <span className="w-6 h-0.5 bg-[#8aa542] transition-all duration-300 ease-in-out translate-y-1" />
            </>
          )}
        </button>

        {/* Fullscreen Mobile Menu */}
        <div
          className={`fixed inset-0 bg-[#8aa542] transition-all duration-500 sm:hidden
            ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
          <div className="flex flex-col justify-center items-center h-full w-full px-6">
            <div className="flex flex-col items-center space-y-8">
              {menuItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`text-white text-3xl font-light hover:text-gray-200 transition-all duration-500 flex items-center space-x-4
                    ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}
                  `}
                  style={{
                    transitionDelay: `${index * 100}ms`
                  }}
                  onClick={closeMenu}
                  {...(item.isExternal && { rel: "noopener noreferrer" })}
                >
                  {item.icon && <item.icon size={32} />}
                  <span className="border-b-2 border-transparent hover:border-white pb-1">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}