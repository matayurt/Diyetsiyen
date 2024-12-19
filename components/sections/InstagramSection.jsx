'use client'
import React, { useEffect, useState } from 'react';
import { Heart, MessageCircle, Bookmark, ChevronRight, Instagram, Facebook, ArrowRight, Share2 } from 'lucide-react';
import { getSocialMediaStats } from '@/lib/socialMediaScraper';


const SocialMediaSection = () => {

  const [stats, setStats] = useState({
    instagram: { followers: '30K+', posts: '850+' },
    facebook: { followers: '500+', posts: '100+' }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Verileri çek
    async function fetchStats() {
      try {
        setLoading(true);
        const data = await getSocialMediaStats();
        setStats(data);
        setError(null);
      } catch (err) {
        setError('Veriler yüklenirken bir hata oluştu');
        console.error('Veri çekme hatası:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();

    // Her 30 dakikada bir güncelle
    const interval = setInterval(fetchStats, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const socialPlatforms = [
    {
      name: "Instagram",
      username: "@dyt.melikeozturk",
      link: "https://www.instagram.com/dyt.melikeozturk/",
      icon: <Instagram className="w-6 h-6" />,
      gradient: "from-purple-600 to-pink-600",
      hoverGradient: "from-purple-500/80 to-pink-500/80",
      stats: {
        followers: stats.instagram.followers,
        posts: stats.instagram.posts
      }
    },
    {
      name: "Facebook",
      username: "dyt.melikeozturkk",
      link: "https://www.facebook.com/dyt.melikeozturkk/",
      icon: <Facebook className="w-6 h-6" />,
      gradient: "from-blue-600 to-blue-400",
      hoverGradient: "from-blue-500/80 to-blue-400/80",
      stats: {
        followers: stats.facebook.followers,
        posts: stats.facebook.posts
      }
    }
  ];
  
  const posts = [
    {
      type: "before-after",
      title: "Danışan Deneyimleri",
      description: "-25 KG / 3 Ay",
      engagement: { likes: "2.4K", comments: "186" },
      platform: "instagram"
    },
    {
      type: "recipe",
      title: "Sağlıklı Tarifler",
      description: "Protein Kahvaltı Kasesi",
      engagement: { likes: "1.8K", comments: "234" },
      platform: "facebook"
    },
    {
      type: "tips",
      title: "Beslenme İpuçları",
      description: "Metabolizma Hızlandırma",
      engagement: { likes: "3.1K", comments: "295" },
      platform: "instagram"
    }
  ];
  
  return (
    <div className="container mx-auto max-w-6xl px-4 py-16">
      <div className="text-center mb-16">
        <h4 className="text-transparent bg-clip-text bg-gradient-to-r from-[#8aa542] to-[#8aa542] font-semibold mb-2 uppercase tracking-wider">
          Sosyal Medyada Biz
        </h4>
        <h2 className="text-4xl font-bold mb-4">Sağlıklı Yaşam Topluluğumuz</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Motivasyon, danışan deneyimleri, sağlıklı tarifler ve daha fazlası için sosyal medyada bizi takip edin!
        </p>
      </div>

      {/* Social Media Platforms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {socialPlatforms.map((platform) => (
          <a
            key={platform.name}
            href={platform.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative overflow-hidden rounded-2xl bg-gradient-to-r ${platform.gradient} p-8 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl`}
          >
            <div className="absolute top-0 right-0 p-4">
              <ArrowRight className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
            </div>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-white/20 p-3 rounded-full">
                {platform.icon}
              </div>
              <div className="text-white">
                <h3 className="text-xl font-bold">{platform.name}</h3>
                <p className="opacity-90">{platform.username}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-white">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold">{platform.stats.followers}</div>
                <div className="text-sm opacity-90">Takipçi</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold">{platform.stats.posts}</div>
                <div className="text-sm opacity-90">Gönderi</div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Featured Posts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {posts.map((post, index) => (
          <div key={index} className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
            <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500
              ${post.platform === 'instagram' ? 'from-purple-500/80 to-pink-500/80' : 'from-blue-500/80 to-blue-400/80'}`}
            ></div>
            
            <div className="relative p-6 h-80 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                  {post.platform === 'instagram' ? (
                    <Instagram className="w-6 h-6 text-purple-600" />
                  ) : (
                    <Facebook className="w-6 h-6 text-blue-600" />
                  )}
                </div>
                <Share2 className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-white transition-colors">{post.title}</h3>
                <p className="text-gray-600 group-hover:text-white/90 transition-colors">{post.description}</p>
              </div>

              <div className="flex items-center justify-between text-gray-600 group-hover:text-white/90 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Heart className="w-5 h-5 mr-1" />
                    <span>{post.engagement.likes}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="w-5 h-5 mr-1" />
                    <span>{post.engagement.comments}</span>
                  </div>
                </div>
                <Bookmark className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Social Media Follow Buttons */}
      <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
        {socialPlatforms.map((platform) => (
          <a
            key={platform.name}
            href={platform.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`group inline-flex items-center space-x-3 bg-gradient-to-r ${platform.gradient} text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
          >
            {platform.icon}
            <span>{platform.name}'da Takip Et</span>
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialMediaSection;