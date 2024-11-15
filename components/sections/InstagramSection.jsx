import React from 'react';
import { Heart, MessageCircle, Bookmark, ChevronRight, Instagram } from 'lucide-react';

const posts = [
  {
    type: "before-after",
    title: "Başarı Hikayeleri",
    description: "-25 KG / 3 Ay",
    engagement: { likes: "2.4K", comments: "186" }
  },
  {
    type: "recipe",
    title: "Sağlıklı Tarifler",
    description: "Protein Kahvaltı Kasesi",
    engagement: { likes: "1.8K", comments: "234" }
  },
  {
    type: "tips",
    title: "Beslenme İpuçları",
    description: "Metabolizma Hızlandırma",
    engagement: { likes: "3.1K", comments: "295" }
  }
];

const InstagramSection = () => {
  return (
    <div className="container mx-auto max-w-6xl px-4">
      <div className="text-center mb-16">
        <h4 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 font-semibold mb-2">
          INSTAGRAM'DA BİZ
        </h4>
        <h2 className="text-4xl font-bold mb-4">Sağlıklı Yaşam Yolculuğunuz</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Motivasyon, başarı hikayeleri, sağlıklı tarifler ve daha fazlası için Instagram'da bizi takip edin!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {posts.map((post, index) => (
          <div key={index} className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/80 to-pink-500/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative p-6 h-80 flex flex-col justify-between">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg mb-4">
                {post.type === "before-after" && (
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full animate-pulse"></div>
                )}
                {post.type === "recipe" && (
                  <div className="w-8 h-8 relative animate-spin-slow">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full transform rotate-45"></div>
                  </div>
                )}
                {post.type === "tips" && (
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full animate-bounce"></div>
                )}
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

      <div className="text-center">
        <a
          href="https://www.instagram.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
        >
          <Instagram className="w-6 h-6" />
          <span>Instagram'da Takip Et</span>
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
};

export default InstagramSection;