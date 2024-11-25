'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { KeyRound, Lock, Eye, EyeOff, Leaf, Apple, Carrot, Utensils, Scale, Heart, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

const healthFeatures = [
  { 
    icon: Scale, 
    title: "Kişisel Diyet Planları",
    description: "Her danışana özel beslenme programları"
  },
  { 
    icon: Heart, 
    title: "Sağlıklı Yaşam Takibi",
    description: "Detaylı ilerleme ve gelişim analizi"
  },
  { 
    icon: Utensils, 
    title: "Özel Menü Planlaması",
    description: "Kişiselleştirilmiş beslenme önerileri"
  }
];

export default function AdminPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
      }
    } catch (error) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8aa542] via-[#9fb85e] to-[#8aa542] flex items-stretch p-4 relative overflow-hidden">
      {/* Animated background patterns */}
      <div className="absolute inset-0 w-full h-full opacity-10">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-white rounded-full mix-blend-overlay filter blur-xl animate-pulse" />
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-white rounded-full mix-blend-overlay filter blur-xl animate-pulse" />
      </div>

      {/* Sol Bilgi Paneli */}
      <div className="hidden lg:flex w-2/3 flex-col justify-center px-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">Diyetisyen Yönetim Sistemi</h1>
          <p className="text-xl opacity-90">Sağlıklı yaşamın anahtarı, profesyonel takip sistemi</p>
        </motion.div>

        <div className="grid gap-8">
          {healthFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.2 }}
              className="flex items-start space-x-4"
            >
              <div className="bg-white bg-opacity-20 p-3 rounded-xl backdrop-blur-sm">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">{feature.title}</h3>
                <p className="text-white text-opacity-80">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[Leaf, Apple, Carrot].map((Icon, index) => (
            <motion.div
              key={index}
              className="absolute"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                y: [0, -100],
                x: Math.sin(index) * 50
              }}
              transition={{
                duration: 3,
                delay: index * 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
              style={{
                left: `${20 + (index * 30)}%`,
                bottom: '10%'
              }}
            >
              <Icon className="w-8 h-8 text-white opacity-30" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sağ Login Formu */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full lg:w-1/3 flex items-center"
      >
        <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white border-opacity-20 w-full">
          <div className="p-8">
            <div className="flex justify-center mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative bg-gradient-to-tr from-[#8aa542] to-[#9fb85e] rounded-2xl p-5 shadow-lg"
              >
                <motion.div
                  animate={{ 
                    boxShadow: [
                      "0 0 0 0px rgba(138, 165, 66, 0.2)",
                      "0 0 0 10px rgba(138, 165, 66, 0)",
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="absolute inset-0 rounded-2xl"
                />
                <Lock className="w-8 h-8 text-white" />
              </motion.div>
            </div>
            
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold text-center text-gray-800 mb-2"
            >
              Admin Girişi
            </motion.h2>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center text-gray-500 mb-8"
            >
              Yönetim paneline erişim sağlayın
            </motion.p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Input */}
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-5 w-5 text-[#8aa542]" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-12 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8aa542] focus:border-transparent transition-all bg-white bg-opacity-50"
                  placeholder="Kullanıcı Adı"
                  required
                />
              </motion.div>

              {/* Password Input */}
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="relative"
              >
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <KeyRound className="h-5 w-5 text-[#8aa542]" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8aa542] focus:border-transparent transition-all bg-white bg-opacity-50"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-[#8aa542] transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-[#8aa542] transition-colors" />
                  )}
                </button>
              </motion.div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm text-center"
                >
                  {error}
                </motion.p>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="w-full bg-gradient-to-r from-[#8aa542] to-[#9fb85e] text-white py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Giriş yapılıyor...</span>
                  </div>
                ) : (
                  'Giriş Yap'
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}