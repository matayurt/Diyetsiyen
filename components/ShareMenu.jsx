'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Share2, Copy, X, QrCode, TrendingUp, Facebook, Twitter, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';

const themes = {
  light: {
    primary: '#8aa542',
    secondary: '#758e30',
    background: 'white',
    text: '#1f2937',
    border: '#e5e7eb',
  },
  dark: {
    primary: '#86efac',
    secondary: '#22c55e',
    background: '#1f2937',
    text: 'white',
    border: '#374151',
  },
  forest: {
    primary: '#059669',
    secondary: '#047857',
    background: '#ecfdf5',
    text: '#064e3b',
    border: '#a7f3d0',
  }
};

const shareButtons = [
  {
    name: 'facebook',
    label: 'Facebook',
    icon: <Facebook size={20} />,
    className: 'bg-blue-600 hover:bg-blue-700'
  },
  {
    name: 'twitter',
    label: 'Twitter',
    icon: <Twitter size={20} />,
    className: 'bg-sky-500 hover:bg-sky-600'
  },
  {
    name: 'whatsapp',
    label: 'WhatsApp',
    icon: <Send size={20} />,
    className: 'bg-green-500 hover:bg-green-600'
  },
  {
    name: 'telegram',
    label: 'Telegram',
    icon: <Send size={20} />,
    className: 'bg-blue-400 hover:bg-blue-500'
  }
];

const ShareMenu = ({ recipe, variant = 'button', initialTheme = 'light', className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCopiedToast, setShowCopiedToast] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [theme, setTheme] = useState(initialTheme);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const [stats, setStats] = useState({
    daily: 0,
    weekly: 0,
    monthly: 0,
    total: 0
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (recipe?.id) {
      loadStats();
    }
  }, [recipe?.id]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setShowQR(false);
      setShowStats(false);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleTouchStart = (e) => {
    if (!isMobile) return;
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setCurrentY(0);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !isMobile) return;
    const deltaY = e.touches[0].clientY - startY;
    if (deltaY > 0) { // Only allow dragging down
      setCurrentY(deltaY);
    }
  };

  const handleTouchEnd = () => {
    if (!isMobile) return;
    setIsDragging(false);
    if (currentY > 100) { // If dragged down more than 100px, close the menu
      setIsOpen(false);
    } else {
      setCurrentY(0);
    }
  };

  const loadStats = () => {
    if (!recipe?.id) return;

    const now = new Date();
    const storedShares = JSON.parse(localStorage.getItem(`shares_${recipe.id}`) || '[]');
    
    const daily = storedShares.filter(share => 
      new Date(share).toDateString() === now.toDateString()
    ).length;

    const weekly = storedShares.filter(share => {
      const shareDate = new Date(share);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return shareDate > weekAgo;
    }).length;

    const monthly = storedShares.filter(share => {
      const shareDate = new Date(share);
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return shareDate > monthAgo;
    }).length;

    setStats({
      daily,
      weekly,
      monthly,
      total: storedShares.length
    });
  };

  const recordShare = () => {
    if (!recipe?.id) return;
    
    const shares = JSON.parse(localStorage.getItem(`shares_${recipe.id}`) || '[]');
    shares.push(new Date().toISOString());
    localStorage.setItem(`shares_${recipe.id}`, JSON.stringify(shares));
    loadStats();
  };

  const getShareUrl = () => {
    if (typeof window === 'undefined') return '';
    const baseUrl = window.location.origin;
    return `${baseUrl}/recipes/${recipe?.id}`;
  };

  const handleShare = (platform) => {
    const url = encodeURIComponent(getShareUrl());
    const text = encodeURIComponent(`${recipe?.title} tarifini keşfet! 🍳`);
    
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      telegram: `https://t.me/share/url?url=${url}&text=${text}`
    };

    window.open(urls[platform], '_blank', 'width=600,height=400');
    recordShare();
    setIsOpen(false);
  };

  const currentTheme = themes[theme];

  return (
    <div 
      className={`relative inline-block ${className}`} 
      style={{ '--theme-primary': currentTheme.primary }}
    >
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(true)}
        className={`inline-flex items-center justify-center w-8 h-8 rounded-lg transition-all ${
          variant === 'button' 
            ? 'text-gray-600 hover:text-[var(--theme-primary)] hover:bg-gray-100' 
            : 'hover:bg-[var(--theme-primary)]/10'
        }`}
      >
        <motion.div
          whileHover={{ rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          className="relative"
        >
          <Share2 size={18} />
          {stats.total > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1.5 -right-1.5 bg-[var(--theme-primary)] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
            >
              {stats.total}
            </motion.div>
          )}
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[99998]"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              ref={menuRef}
              initial={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.95 }}
              animate={isMobile ? 
                { y: currentY > 0 ? currentY : 0 } : 
                { opacity: 1, scale: 1 }
              }
              exit={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              drag={isMobile ? "y" : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.7 }}
              onDragEnd={(e, { offset, velocity }) => {
                if (offset.y > 100 || velocity.y > 500) {
                  setIsOpen(false);
                }
              }}
              style={{
                position: 'fixed',
                ...(isMobile ? {
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: currentTheme.background,
                  borderTopLeftRadius: '24px',
                  borderTopRightRadius: '24px',
                  maxHeight: '90vh',
                } : {
                  top: buttonRef.current?.getBoundingClientRect().bottom + 8,
                  right: '16px',
                  backgroundColor: currentTheme.background,
                  width: '320px',
                  borderRadius: '16px',
                  maxHeight: 'calc(100vh - 32px)',
                }),
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                color: currentTheme.text,
                overflow: 'hidden',
                zIndex: 99999,
              }}
              className="flex flex-col"
            >
              {isMobile && (
                <div className="pt-3 pb-2 px-4">
                  <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />
                </div>
              )}

              <div className="overflow-y-auto overscroll-contain">
                <div className="p-4 space-y-4">
                  {/* Header */}
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Tarifi Paylaş</h3>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowStats(!showStats)}
                        className="p-2 rounded-full hover:bg-gray-100"
                      >
                        <TrendingUp size={20} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowQR(!showQR)}
                        className="p-2 rounded-full hover:bg-gray-100"
                      >
                        <QrCode size={20} />
                      </motion.button>
                      {!isMobile && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setIsOpen(false)}
                          className="p-2 rounded-full hover:bg-gray-100"
                        >
                          <X size={20} />
                        </motion.button>
                      )}
                    </div>
                  </div>

                  {/* Theme Selector */}
                  <div className="flex justify-center gap-3">
                    {Object.entries(themes).map(([themeName, themeColors]) => (
                      <motion.button
                        key={themeName}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setTheme(themeName)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          theme === themeName ? 'border-[var(--theme-primary)]' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: themeColors.primary }}
                      />
                    ))}
                  </div>

                  {/* Stats Panel */}
                  <AnimatePresence>
                    {showStats && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 rounded-xl bg-gray-50">
                          <h4 className="text-sm font-semibold mb-3">Paylaşım İstatistikleri</h4>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-[var(--theme-primary)]">
                                {stats.daily}
                              </div>
                              <div className="text-xs text-gray-600">Bugün</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-[var(--theme-primary)]">
                                {stats.weekly}
                              </div>
                              <div className="text-xs text-gray-600">Bu Hafta</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-[var(--theme-primary)]">
                                {stats.monthly}
                              </div>
                              <div className="text-xs text-gray-600">Bu Ay</div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* QR Code Panel */}
                  <AnimatePresence>
                    {showQR && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 rounded-xl bg-white border border-gray-100">
                          <QRCodeSVG
                            value={getShareUrl()}
                            size={200}
                            level="H"
                            includeMargin={true}
                            className="w-full h-auto"
                            fgColor={currentTheme.text}
                            bgColor={currentTheme.background}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Share Buttons */}
                  <div className="space-y-3">
                    {/* Native Share API */}
                    {typeof navigator !== 'undefined' && navigator.share && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={async () => {
                          try {
                            await navigator.share({
                              title: recipe?.title,
                              text: `${recipe?.title} tarifini keşfet! 🍳`,
                              url: getShareUrl()
                            });
                            recordShare();
                            setIsOpen(false);
                          } catch (err) {
                            console.error('Share failed:', err);
                          }
                        }}
                        className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-[var(--theme-primary)] text-white text-base font-medium hover:opacity-90 transition-opacity"
                      >
                        <Share2 size={20} />
                        <span>Hızlı Paylaş</span>
                      </motion.button>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      {/* Social Share Buttons */}
                      {shareButtons.map((button) => (
                        <motion.button
                          key={button.name}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleShare(button.name)}
                          className={`flex items-center justify-center gap-2 p-3 rounded-xl text-white text-base font-medium transition-opacity hover:opacity-90 ${button.className}`}
                        >
                          {button.icon}
                          <span>{button.label}</span>
                        </motion.button>
                      ))}
                    </div>

                    {/* Copy Link Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(getShareUrl());
                          setShowCopiedToast(true);
                          setTimeout(() => setShowCopiedToast(false), 2000);
                          recordShare();
                          setIsOpen(false);
                        } catch (err) {
                          console.error('Copy failed:', err);
                        }
                      }}
                      className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-base font-medium transition-colors"
                    >
                      <Copy size={20} />
                      <span>Bağlantıyı Kopyala</span>
                    </motion.button>
                  </div>

                  {isMobile && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsOpen(false)}
                      className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-gray-200 text-gray-500 text-base font-medium mt-2"
                    >
                      <X size={20} />
                      <span>Kapat</span>
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {showCopiedToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[var(--theme-primary)] text-white px-6 py-3 rounded-xl shadow-lg z-[99999] text-base font-medium"
          >
            <span>Bağlantı kopyalandı!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShareMenu;