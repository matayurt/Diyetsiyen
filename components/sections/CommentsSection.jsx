// components/sections/CommentsSection.jsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import StarRating from '../StarRating';
import { motion } from 'framer-motion';
import { ChevronRight, MessageSquare, Star, Heart, Loader2 } from 'lucide-react';

// Dekoratif SVG Komponenti
const DecorativeElement = ({ className }) => (
  <svg
    viewBox="0 0 100 100"
    className={`absolute opacity-10 ${className}`}
    style={{ filter: 'blur(0.5px)' }}
  >
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#86efac" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#22c55e" stopOpacity="0.3" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="40" fill="url(#grad)" />
    <path
      d="M50,10 C70,10 85,30 85,55 C85,80 50,85 50,85 C50,85 15,80 15,55 C15,30 30,10 50,10"
      fill="url(#grad)"
      opacity="0.5"
    />
  </svg>
);

// Yorum Kartı Komponenti
const CommentCard = ({ comment, variants }) => (
  <motion.div
    variants={variants}
    className="group relative bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
  >
    {/* Dekoratif gradient arkaplan */}
    <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative p-8">
      {/* Alıntı işareti dekorasyonu */}
      <div className="absolute top-4 right-4 text-6xl text-green-100 font-serif">"</div>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform duration-300">
          <span className="text-white font-semibold text-xl">
            {comment.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-green-700 transition-colors duration-300">
            {comment.name}
          </h3>
          <div className="flex items-center gap-2">
            <StarRating value={comment.rating} readonly size={18} />
            <span className="text-sm text-gray-500">
              {new Date(comment.createdAt).toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>
      </div>

      <p className="text-gray-600 mb-6 line-clamp-4 relative group-hover:text-gray-700 transition-colors duration-300">
        {comment.comment}
      </p>

      {/* Dekoratif alt çizgi */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  </motion.div>
);

// Stats Kartı Komponenti
const StatCard = ({ icon: Icon, value, label }) => (
  <div className="text-center transform hover:scale-105 transition-transform duration-300">
    <div className="flex items-center justify-center gap-2 text-2xl font-bold text-[#8aa542] mb-2">
      <Icon className="w-6 h-6 fill-current" />
      {value}
    </div>
    <p className="text-sm text-gray-500">{label}</p>
  </div>
);

export default function CommentsSection() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalComments: 0,
    averageRating: 0,
    satisfactionRate: 98
  });

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch('/api/comments', {
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }

      const data = await response.json();
      
      // Son 3 yorumu al
      const recentComments = data.slice(0, 3);
      setComments(recentComments);
      
      // İstatistikleri hesapla
      calculateStats(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    if (!data.length) return;

    const total = data.length;
    const avg = data.reduce((acc, curr) => acc + curr.rating, 0) / total;
    const highRatings = data.filter(comment => comment.rating >= 4).length;
    const satisfactionRate = Math.round((highRatings / total) * 100);

    setStats({
      totalComments: total,
      averageRating: Math.round(avg * 10) / 10,
      satisfactionRate
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto pt-32 px-6">
        <div className="flex flex-col items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-green-600 mb-4" />
          <p className="text-gray-500">Yorumlar yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-6">
      {/* Dekoratif Elementler */}
      <DecorativeElement className="top-0 left-0 w-72 h-72 -translate-x-1/2 -translate-y-1/4" />
      <DecorativeElement className="top-1/4 right-0 w-64 h-64 translate-x-1/3" />
      <DecorativeElement className="bottom-0 left-1/4 w-56 h-56" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 relative"
      >
        {/* Ana Başlık */}
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#8aa542] to-[#8aa542] bg-clip-text text-transparent">
          Mutlu Danışanlarımız
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
          Sağlıklı yaşam yolculuğunda birlikte ilerlediğimiz danışanlarımızın değerli deneyimleri
        </p>
        
        {/* İstatistikler */}
        <div className="flex justify-center gap-12 mt-8">
          <StatCard 
            icon={Star} 
            value={stats.averageRating} 
            label="Ortalama Puan" 
          />
          <StatCard 
            icon={MessageSquare} 
            value={stats.totalComments} 
            label="Toplam Yorum" 
          />
          <StatCard 
            icon={Heart} 
            value={`${stats.satisfactionRate}%`} 
            label="Memnuniyet" 
          />
        </div>
      </motion.div>

      {/* Yorumlar Grid */}
      {comments.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {comments.map((comment) => (
            <CommentCard 
              key={comment._id} 
              comment={comment} 
              variants={itemVariants}
            />
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg mb-16"
        >
          <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Henüz Yorum Bulunmuyor
          </h3>
          <p className="text-gray-600">
            İlk yorumu yapan siz olun!
          </p>
        </motion.div>
      )}

      {/* Tüm Yorumları Gör Butonu */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center"
      >
        <Link
          href="/comments"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8aa542] to-[#8aa542] text-white px-8 py-4 rounded-full font-medium hover:shadow-lg hover:shadow-[#8aa542]-500/20 transition-all duration-300 hover:-translate-y-0.5 group"
        >
          Tüm Yorumları Gör
          <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </div>
  );
}