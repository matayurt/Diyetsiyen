// app/comments/page.jsx
'use client';
import { useState, useEffect, useRef } from 'react';
import StarRating from '@/components/StarRating';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  MessageSquarePlus,
  Heart,
  Search,
  CheckCircle2,
  Loader2,
  Filter,
  BadgeCheck,
  Clock,
  BarChart,
  ArrowLeft,
  AlertCircle,
  X
} from 'lucide-react';
import Link from 'next/link';
import Script from 'next/script';

// Toast Component
const Toast = ({ message, type = 'success', onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, x: '-50%' }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
  >
    <div className={`
      px-6 py-4 rounded-xl shadow-lg backdrop-blur-sm flex items-center gap-3
      ${type === 'success' ? 'bg-[#8aa542]/90 text-white' : 'bg-red-500/90 text-white'}
    `}>
      {type === 'success' ? (
        <CheckCircle2 className="w-5 h-5" />
      ) : (
        <AlertCircle className="w-5 h-5" />
      )}
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="ml-2 hover:opacity-80 transition-opacity"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  </motion.div>
);

// Stats Card Component
const StatCard = ({ icon: Icon, label, value, bgColor = "bg-[#8aa542]/10", textColor = "text-[#8aa542]" }) => (
  <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100">
    <div className="flex items-center gap-4">
      <div className={`p-2.5 rounded-xl ${bgColor} group-hover:scale-105 transition-transform duration-300`}>
        <Icon className={`w-5 h-5 ${textColor}`} />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-0.5">{label}</p>
        <p className="text-xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

// Rating Filter Component
const RatingFilter = ({ activeRating, setActiveRating }) => (
  <div className="flex items-center gap-2">
    {[5, 4, 3, 2, 1].map((rating) => (
      <button
        key={rating}
        onClick={() => setActiveRating(activeRating === rating ? null : rating)}
        className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
          activeRating === rating 
            ? 'bg-[#8aa542] text-white shadow-md' 
            : 'bg-white/80 text-gray-700 hover:bg-[#8aa542]/10'
        }`}
      >
        <Star className={`w-4 h-4 ${activeRating === rating ? 'fill-white' : 'fill-yellow-400'}`} />
        <span className="text-sm font-medium">{rating}</span>
      </button>
    ))}
  </div>
);

// Filter Dropdown Component
const FilterDropdown = ({ sortBy, setSortBy }) => (
  <div className="relative">
    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      className="appearance-none bg-white/80 pl-10 pr-10 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#8aa542] focus:border-transparent transition-all font-medium text-gray-700 text-sm hover:border-[#8aa542] cursor-pointer"
    >
      <option value="newest">En Yeni</option>
      <option value="oldest">En Eski</option>
      <option value="highest">En Yüksek Puan</option>
      <option value="lowest">En Düşük Puan</option>
    </select>
    <Clock className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
    <Filter className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
  </div>
);

// Rating Stats Component
const RatingStats = ({ averageRating, totalComments, distribution }) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
    <div className="flex flex-col lg:flex-row gap-8 items-center">
      <div className="flex items-center gap-4">
        <div className="text-4xl font-bold text-[#8aa542]">
          {averageRating}
        </div>
        <div>
          <StarRating value={averageRating} readonly size={20} />
          <p className="text-sm text-gray-500 mt-1">
            {totalComments} değerlendirme
          </p>
        </div>
      </div>
      <div className="flex-1 flex items-center gap-3">
        {[5, 4, 3, 2, 1].map((rating) => (
          <div key={rating} className="flex-1 h-12">
            <div className="flex flex-col items-center">
              <div className="w-full h-8 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ 
                    height: `${(distribution[rating] / totalComments) * 100}%` 
                  }}
                  transition={{ duration: 1 }}
                  className="w-full bg-gradient-to-t from-[#8aa542] to-[#6b833a]"
                  style={{
                    transformOrigin: 'bottom'
                  }}
                />
              </div>
              <span className="text-xs text-gray-500 mt-1">{rating}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Comment Form Component
const CommentForm = ({ formData, setFormData, handleSubmit, submitLoading, setToast }) => {
  const recaptchaRef = useRef(null);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  useEffect(() => {
    // Only attempt to reset if reCAPTCHA is loaded and the form is reset
    if (recaptchaLoaded && !formData.name && !formData.email && !formData.comment) {
      try {
        window.grecaptcha?.reset();
      } catch (error) {
        console.error('Error resetting reCAPTCHA:', error);
      }
    }
  }, [formData, recaptchaLoaded]);

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!recaptchaLoaded || !window.grecaptcha) {
      setToast({
        show: true,
        message: 'Lütfen sayfayı yenileyip tekrar deneyin',
        type: 'error'
      });
      return;
    }

    const recaptchaValue = window.grecaptcha.getResponse();
    if (!recaptchaValue) {
      setToast({
        show: true,
        message: 'Lütfen robot olmadığınızı doğrulayın',
        type: 'error'
      });
      return;
    }

    // Add recaptcha token to form data
    handleSubmit(e, recaptchaValue);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8 border border-gray-100 hover:shadow-xl transition-all duration-300"
    >
      <Script
        src="https://www.google.com/recaptcha/api.js"
        onLoad={() => {
          setRecaptchaLoaded(true);
        }}
        onError={() => {
          console.error('Error loading reCAPTCHA');
          setRecaptchaLoaded(false);
          setToast({
            show: true,
            message: 'reCAPTCHA yüklenirken bir hata oluştu',
            type: 'error'
          });
        }}
      />

      <h3 className="text-xl font-semibold mb-6 bg-gradient-to-r from-[#8aa542] to-[#6b833a] bg-clip-text text-transparent">
        Deneyiminizi Paylaşın
      </h3>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Adınız Soyadınız
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#8aa542] focus:border-transparent transition-all text-sm"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Adınızı giriniz"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              E-posta Adresiniz
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#8aa542] focus:border-transparent transition-all text-sm"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="E-posta adresinizi giriniz"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Değerlendirmeniz
          </label>
          <StarRating
            value={formData.rating}
            onChange={(rating) => setFormData({ ...formData, rating })}
            size={24}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Deneyiminizi Paylaşın
          </label>
          <textarea
            required
            rows="4"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#8aa542] focus:border-transparent transition-all text-sm resize-none"
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            placeholder="Deneyiminizi detaylı bir şekilde paylaşın..."
          />
        </div>

        <div className="flex justify-center mb-4">
          {recaptchaLoaded ? (
            <div
              className="g-recaptcha"
              data-sitekey="6LfvwYkqAAAAAK7Umw31qRSHvWz-LjiU4usqX8ha"
              ref={recaptchaRef}
            />
          ) : (
            <div className="text-sm text-gray-500">
              reCAPTCHA yükleniyor...
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={submitLoading || !recaptchaLoaded}
          className="w-full bg-gradient-to-r from-[#8aa542] to-[#6b833a] text-white py-3 rounded-xl font-medium hover:shadow-lg disabled:opacity-50 transition-all duration-300 hover:-translate-y-0.5 transform-gpu flex items-center justify-center gap-2 text-sm"
        >
          {submitLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Gönderiliyor...
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Yorumu Gönder
            </>
          )}
        </button>
      </div>
    </form>
  );
};

// Comment Card Component
const CommentCard = ({ comment }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="group bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden transform hover:-translate-y-1 border border-gray-100/50"
  >
    <div className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-[#8aa542] to-[#6b833a] rounded-full flex items-center justify-center shadow-md transform group-hover:scale-105 transition-transform duration-300">
          <span className="text-white font-semibold text-lg">
            {comment.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-[#8aa542] transition-colors duration-300">
            {comment.name}
          </h3>
          <div className="flex items-center gap-3">
            <StarRating value={comment.rating} readonly size={16} />
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

      <p className="text-gray-600 relative z-10 group-hover:text-gray-700 transition-colors duration-300 line-clamp-4">
        {comment.comment}
      </p>
    </div>
  </motion.div>
);

// Main Page Component
export default function CommentsPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: '',
    rating: 0,
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [activeRating, setActiveRating] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [stats, setStats] = useState({
    totalComments: 0,
    averageRating: 0,
    satisfactionRate: 0,
    ratingDistribution: {
      5: 0, 4: 0, 3: 0, 2: 0, 1: 0
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 55);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    if (comments.length > 0) {
      calculateStats();
    }
  }, [comments]);

  const calculateStats = () => {
    const total = comments.length;
    const avg = comments.reduce((acc, curr) => acc + curr.rating, 0) / total;
    
    const distribution = comments.reduce((acc, curr) => {
      acc[curr.rating] = (acc[curr.rating] || 0) + 1;
      return acc;
    }, {1: 0, 2: 0, 3: 0, 4: 0, 5: 0});

    // Calculate satisfaction rate (percentage of ratings >= 4)
    const highRatings = comments.filter(comment => comment.rating >= 4).length;
    const satisfactionRate = Math.round((highRatings / total) * 100);

    setStats({
      totalComments: total,
      averageRating: Math.round(avg * 10) / 10,
      satisfactionRate: satisfactionRate, // Added this
      ratingDistribution: distribution
    });
  };

  const fetchComments = async () => {
    try {
      const response = await fetch('/api/comments/all', {
        cache: 'no-store'
      });
      if (!response.ok) throw new Error('Failed to fetch comments');
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setToast({
        show: true,
        message: 'Yorumlar yüklenirken bir hata oluştu',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e, recaptchaToken) => {
    e.preventDefault();
    if (formData.rating === 0) {
      setToast({
        show: true,
        message: 'Lütfen bir değerlendirme puanı seçin',
        type: 'error'
      });
      return;
    }
    
    setSubmitLoading(true);
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken
        }),
      });
      
      if (!response.ok) throw new Error('Failed to submit comment');

      setFormData({ name: '', email: '', comment: '', rating: 0 });
      setToast({
        show: true,
        message: 'Yorumunuz başarıyla gönderildi. Onaylandıktan sonra yayınlanacaktır.',
        type: 'success'
      });
      fetchComments();
    } catch (error) {
      console.error('Error submitting comment:', error);
      setToast({
        show: true,
        message: 'Yorum gönderilirken bir hata oluştu. Lütfen tekrar deneyin.',
        type: 'error'
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  const getFilteredAndSortedComments = () => {
    let filteredComments = [...comments];
    
    if (activeRating) {
      filteredComments = filteredComments.filter(comment => comment.rating === activeRating);
    }

    return filteredComments.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        default:
          return 0;
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center bg-gradient-to-b from-green-50/50 to-white">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#8aa542] mx-auto mb-4" />
          <p className="text-gray-600">Yorumlar yükleniyor...</p>
        </div>
      </div>
    );
  }

  const filteredComments = getFilteredAndSortedComments();

  return (
    <main className="min-h-screen pt-32 px-4 bg-gradient-to-b from-green-50/50 via-white to-gray-50/30">
      <AnimatePresence>
        {toast.show && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ ...toast, show: false })}
          />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto pb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`fixed top-20 left-0 right-0 bg-white shadow-md z-30 transition-all duration-300 ${isScrolled ? '-mt-4' : ''}`}
        >
          <div className="container mx-auto max-w-7xl px-4 py-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#8aa542] hover:text-[#6b833a] transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Ana Sayfaya Dön</span>
            </Link>
          </div>
        </motion.div>

        <div className="text-center mb-12 mt-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#8aa542] to-[#6b833a] bg-clip-text text-transparent">
            Değerli Yorumlarınız
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sağlıklı yaşam yolculuğunda birlikte ilerlediğimiz danışanlarımızın değerli deneyimleri
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard 
          icon={Star}
          label="Ortalama Puan"
          value={stats.averageRating}
        />
        <StatCard 
          icon={MessageSquarePlus}
          label="Toplam Yorum"
          value={stats.totalComments}
          bgColor="bg-[#6b833a]/10"
          textColor="text-[#6b833a]"
        />
        <StatCard 
          icon={Heart}
          label="Memnuniyet"
          value={`${stats.satisfactionRate}%`}
        />
      </div>

        <div className="mb-8">
          <RatingStats 
            averageRating={stats.averageRating}
            totalComments={stats.totalComments}
            distribution={stats.ratingDistribution}
          />
        </div>

        <CommentForm 
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          submitLoading={submitLoading}
          setToast={setToast}
        />

        <div className="sticky top-32 z-20 bg-white/80 backdrop-blur-md py-4 px-6 rounded-2xl shadow-sm mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <RatingFilter 
              activeRating={activeRating}
              setActiveRating={setActiveRating}
            />
            <FilterDropdown 
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </div>
        </div>

        <div className="relative">
          {filteredComments.length > 0 ? (
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filteredComments.map((comment) => (
                <CommentCard key={comment._id} comment={comment} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-100"
            >
              <MessageSquarePlus className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Yorum Bulunamadı
              </h3>
              <p className="text-gray-600 text-sm">
                {activeRating 
                  ? `${activeRating} yıldızlı yorum bulunmuyor` 
                  : 'Henüz yorum yapılmamış'}
              </p>
            </motion.div>
          )}

          <div className="absolute -bottom-16 left-0 right-0 h-16 bg-gradient-to-t from-gray-50/30 to-transparent" />
        </div>
      </div>
    </main>
  );
}