// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { X, Menu, BookOpen, Home, User, Package, Star, MessageCircle, Share2, Contact } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// const menuItems = [
//   { href: '#home', label: 'Ana Sayfa', icon: Home },
//   { href: '#about', label: 'Hakkımda', icon: User },
//   { href: '#packets', label: 'Paketler', icon: Package },
//   { href: '#comments', label: 'Yorumlar', icon: MessageCircle },
//   { href: '#testimonials', label: 'Danışan Deneyimleri', icon: Star },
//   { href: '#recipes', label: 'Tarifler', icon: BookOpen },
//   { href: '#instagram', label: 'Sosyal Medya', icon: Share2 },
//   { href: '#contact', label: 'İletişim', icon: Contact }
// ];

// export default function Navbar() {
//   const pathname = usePathname();
//   const isAdminPage = pathname === '/admin';
  
//   const [mounted, setMounted] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activeSection, setActiveSection] = useState('home');

//   const handleScroll = useCallback(() => {
//     if (!isMenuOpen && !isAdminPage) {
//       const scrollPosition = window.scrollY;
//       setScrolled(scrollPosition > 50);

//       const sections = menuItems.map(item => ({
//         id: item.href.slice(1),
//         element: document.getElementById(item.href.slice(1))
//       }));

//       const viewportHeight = window.innerHeight;
//       const currentSection = sections.reduce((acc, section) => {
//         if (section.element) {
//           const rect = section.element.getBoundingClientRect();
//           const sectionTop = rect.top;
//           const sectionBottom = rect.bottom;
          
//           if (sectionTop <= viewportHeight / 2 && sectionBottom >= viewportHeight / 2) {
//             return section.id;
//           }
//         }
//         return acc;
//       }, activeSection);

//       setActiveSection(currentSection);
//     }
//   }, [activeSection, isMenuOpen, isAdminPage]);

//   useEffect(() => {
//     setMounted(true);
//     if (!isAdminPage) {
//       handleScroll();
//     }
    
//     let scrollTimeout;
//     const onScroll = () => {
//       if (scrollTimeout) {
//         window.cancelAnimationFrame(scrollTimeout);
//       }
//       scrollTimeout = window.requestAnimationFrame(handleScroll);
//     };

//     if (!isAdminPage) {
//       window.addEventListener('scroll', onScroll, { passive: true });
//     }
    
//     return () => {
//       window.removeEventListener('scroll', onScroll);
//       if (scrollTimeout) {
//         window.cancelAnimationFrame(scrollTimeout);
//       }
//     };
//   }, [handleScroll, isAdminPage]);

//   useEffect(() => {
//     if (mounted) {
//       if (isMenuOpen) {
//         document.body.style.overflow = 'hidden';
//       } else {
//         setTimeout(() => {
//           document.body.style.overflow = '';
//         }, 300);
//       }
//     }
//   }, [isMenuOpen, mounted]);

//   const handleMenuItemClick = useCallback((e) => {
//     if (isAdminPage) return;
    
//     e.preventDefault();
//     const href = e.currentTarget.getAttribute('href');
//     const target = document.querySelector(href);
    
//     if (target) {
//       const navHeight = scrolled ? 64 : 80;
//       const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
//       const offsetPosition = targetPosition - navHeight;

//       if (isMenuOpen) {
//         setIsMenuOpen(false);
//         setTimeout(() => {
//           window.scrollTo({
//             top: offsetPosition,
//             behavior: 'smooth'
//           });
//         }, 300);
//       } else {
//         window.scrollTo({
//           top: offsetPosition,
//           behavior: 'smooth'
//         });
//       }
//     }
//   }, [scrolled, isMenuOpen, isAdminPage]);

//   if (!mounted) return null;

//   return (
//     <>
//       <nav 
//         className={`fixed top-0 left-0 w-full transition-all duration-300
//           ${isAdminPage ? 'h-16 bg-white shadow-lg' : 
//             scrolled ? 'h-16 bg-white/95 backdrop-blur-md shadow-lg' : 'h-20 bg-transparent'}
//           ${isMenuOpen ? 'z-[60] bg-[#8aa542]' : 'z-50'}`}
//       >
//         <div className="container mx-auto px-4 h-full flex items-center justify-between relative">
//           {/* Logo */}
//           <Link 
//             href="/"
//             className="relative z-[70] h-10"
//           >
//             <img 
//               src="/assets/img/dietteiz-logo.png" 
//               alt="DiyetTeiz Logo" 
//               className={`h-full w-auto transition-colors duration-300 ${isMenuOpen ? 'brightness-0 invert' : ''}`}
//             />
//           </Link>

//           {/* Desktop Menu */}
//           {!isAdminPage && (
//             <div className="hidden lg:flex items-center space-x-8">
//               {menuItems.map((item) => (
//                 <a
//                   key={item.href}
//                   href={item.href}
//                   onClick={handleMenuItemClick}
//                   className={`text-[#8aa542] hover:text-[#6b833a] transition-colors duration-300 
//                     flex items-center gap-2 text-sm font-medium ${activeSection === item.href.slice(1) ? 'text-[#6b833a]' : ''}`}
//                 >
//                   <item.icon size={18} />
//                   <span className="relative">
//                     {item.label}
//                     {activeSection === item.href.slice(1) && (
//                       <motion.span
//                         layoutId="underline"
//                         className="absolute left-0 top-full h-0.5 w-full bg-[#8aa542]"
//                       />
//                     )}
//                   </span>
//                 </a>
//               ))}
//             </div>
//           )}

//           {/* Mobile Menu Button */}
//           {!isAdminPage && (
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="lg:hidden relative z-[70] w-10 h-10 flex items-center justify-center"
//               aria-label={isMenuOpen ? 'Menüyü Kapat' : 'Menüyü Aç'}
//             >
//               {isMenuOpen ? (
//                 <Menu className="w-6 h-6 text-white" />
//               ) : (
//                 <Menu className="w-6 h-6 text-[#8aa542]" />
//               )}
//             </button>
//           )}
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isMenuOpen && !isAdminPage && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="lg:hidden fixed inset-0 z-[65] bg-gradient-to-b from-[#8aa542] to-[#758e30]"
//           >
//             {/* Close Button */}
//             <button
//               onClick={() => setIsMenuOpen(false)}
//               className="absolute top-6 right-6 z-[70] w-10 h-10 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-300"
//               aria-label="Menüyü Kapat"
//             >
//               <X className="w-6 h-6 text-white" />
//             </button>

//             <div className="flex flex-col items-center justify-center min-h-screen px-6">
//               {menuItems.map((item, index) => (
//                 <motion.a
//                   key={item.href}
//                   href={item.href}
//                   onClick={handleMenuItemClick}
//                   className="text-white text-2xl font-medium py-4 flex items-center gap-3 hover:text-white/80 transition-colors"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ 
//                     opacity: 1,
//                     y: 0,
//                     transition: { delay: 0.1 + index * 0.1 }
//                   }}
//                 >
//                   <item.icon size={24} />
//                   {item.label}
//                 </motion.a>
//               ))}
//             </div>
            
//             {/* Pattern Overlay */}
//             <div className="absolute inset-0 opacity-10 pointer-events-none">
//               <div className="absolute inset-0 bg-[url('/assets/img/pattern.svg')] bg-repeat" />
//               <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent" />
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }




// YILBAŞI

'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, Menu, BookOpen, Home, User, Package, Star, MessageCircle, Share2, Contact } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Kar tanesi komponenti
const Snowflake = ({ style }) => (
  <div
    className="absolute text-white pointer-events-none select-none"
    style={{
      ...style,
      animation: `fall ${Math.random() * 10 + 5}s linear infinite`,
      fontSize: `${Math.random() * 10 + 10}px`,
    }}
  >
    ❄
  </div>
);

// Kar yağışı efekti komponenti
const SnowfallEffect = () => {
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    const flakes = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {snowflakes.map((flake) => (
        <Snowflake
          key={flake.id}
          style={{
            left: flake.left,
            animationDelay: flake.animationDelay,
          }}
        />
      ))}
    </div>
  );
};

const menuItems = [
  { href: '#home', label: 'Ana Sayfa', icon: Home },
  { href: '#about', label: 'Hakkımda', icon: User },
  { href: '#packets', label: 'Paketler', icon: Package },
  { href: '#comments', label: 'Yorumlar', icon: MessageCircle },
  { href: '#testimonials', label: 'Danışan Deneyimleri', icon: Star },
  { href: '#recipes', label: 'Tarifler', icon: BookOpen },
  { href: '#instagram', label: 'Sosyal Medya', icon: Share2 },
  { href: '#contact', label: 'İletişim', icon: Contact }
];

export default function Navbar() {
  const pathname = usePathname();
  const isAdminPage = pathname === '/admin';
  
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showChristmas, setShowChristmas] = useState(true); // Yılbaşı efektlerini kontrol eden state

  const handleScroll = useCallback(() => {
    if (!isMenuOpen && !isAdminPage) {
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
  }, [activeSection, isMenuOpen, isAdminPage]);

  useEffect(() => {
    setMounted(true);
    if (!isAdminPage) {
      handleScroll();
    }
    
    let scrollTimeout;
    const onScroll = () => {
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }
      scrollTimeout = window.requestAnimationFrame(handleScroll);
    };

    if (!isAdminPage) {
      window.addEventListener('scroll', onScroll, { passive: true });
    }
    
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }
    };
  }, [handleScroll, isAdminPage]);

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
    if (isAdminPage) return;
    
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
  }, [scrolled, isMenuOpen, isAdminPage]);

  if (!mounted) return null;

  return (
    <>
      {showChristmas && <SnowfallEffect />}
      <nav 
        className={`fixed top-0 left-0 w-full transition-all duration-300
          ${isAdminPage ? 'h-16 bg-white shadow-lg' : 
            scrolled ? 'h-16 bg-white/95 backdrop-blur-md shadow-lg' : 'h-20 bg-transparent'}
          ${isMenuOpen ? 'z-[60] bg-[#8aa542]' : 'z-50'}`}
      >
        <div className="container mx-auto px-4 h-full flex items-center justify-between relative">
          {/* Logo ve Noel Baba Şapkası */}
          <Link 
            href="/"
            className="relative z-[70] flex items-center"
          >
            <div className="relative h-8">
              <img 
                src="/assets/img/dietteiz-logo.png" 
                alt="DiyetTeiz Logo" 
                className={`h-full w-auto transition-colors duration-300 object-contain ${isMenuOpen ? 'brightness-0 invert' : ''}`}
              />
              {showChristmas && (
                <img
                  src="/assets/img/santa-hat.png"
                  alt="Noel Baba Şapkası"
                  className="absolute -top-3 -right-2 w-6 h-6 transform -rotate-15"
                />
              )}
            </div>
          </Link>

          {/* Desktop Menu */}
          {!isAdminPage && (
            <div className="hidden lg:flex items-center space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleMenuItemClick}
                  className={`text-[#8aa542] hover:text-[#6b833a] transition-colors duration-300 
                    flex items-center gap-2 text-sm font-medium ${activeSection === item.href.slice(1) ? 'text-[#6b833a]' : ''}`}
                >
                  <item.icon size={18} />
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
          )}

          {/* Mobile Menu Button */}
          {!isAdminPage && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden relative z-[70] w-10 h-10 flex items-center justify-center"
              aria-label={isMenuOpen ? 'Menüyü Kapat' : 'Menüyü Aç'}
            >
              {isMenuOpen ? (
                <Menu className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-[#8aa542]" />
              )}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && !isAdminPage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-[65] bg-gradient-to-b from-[#8aa542] to-[#758e30]"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 z-[70] w-10 h-10 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-300"
              aria-label="Menüyü Kapat"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <div className="flex flex-col items-center justify-center min-h-screen px-6">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={handleMenuItemClick}
                  className="text-white text-2xl font-medium py-4 flex items-center gap-3 hover:text-white/80 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.1 + index * 0.1 }
                  }}
                >
                  <item.icon size={24} />
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

      {/* Kar animasyonu için CSS */}
      <style jsx global>{`
        @keyframes fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}