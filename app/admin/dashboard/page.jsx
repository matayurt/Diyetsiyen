'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Star,
  TrendingUp,
  MessageSquare,
  Activity,
  DollarSign,
  Clock,
  BarChart2,
  ThumbsUp,
  Eye,
  RefreshCcw
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const data = [
    { name: 'Pzt', ziyaretci: 400, yorum: 24, puan: 4.5 },
    { name: 'Sal', ziyaretci: 300, yorum: 13, puan: 4.8 },
    { name: 'Çar', ziyaretci: 520, yorum: 28, puan: 4.2 },
    { name: 'Per', ziyaretci: 450, yorum: 25, puan: 4.6 },
    { name: 'Cum', ziyaretci: 600, yorum: 32, puan: 4.7 },
    { name: 'Cmt', ziyaretci: 380, yorum: 21, puan: 4.4 },
    { name: 'Paz', ziyaretci: 290, yorum: 15, puan: 4.9 }
  ];

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="space-y-6">
      <header className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Sitenizin genel durumunu görüntüleyin
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-1.5 text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="day">Bugün</option>
              <option value="week">Bu Hafta</option>
              <option value="month">Bu Ay</option>
              <option value="year">Bu Yıl</option>
            </select>
            <button
              onClick={handleRefresh}
              className={`p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 ${isLoading ? 'animate-spin' : ''}`}
            >
              <RefreshCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Toplam Ziyaretçi</p>
              <p className="text-2xl font-bold text-gray-900">1,257</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">+12%</span>
            <span className="text-gray-500 ml-2">geçen haftaya göre</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ortalama Puan</p>
              <p className="text-2xl font-bold text-gray-900">4.8</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Star className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ThumbsUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">%92</span>
            <span className="text-gray-500 ml-2">memnuniyet oranı</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Toplam Yorum</p>
              <p className="text-2xl font-bold text-gray-900">328</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <MessageSquare className="w-6 h-6 text-purple-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <Activity className="w-4 h-4 text-blue-500 mr-1" />
            <span className="text-blue-500 font-medium">+8</span>
            <span className="text-gray-500 ml-2">yeni yorum</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Aktif Kullanıcı</p>
              <p className="text-2xl font-bold text-gray-900">42</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Eye className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <Clock className="w-4 h-4 text-orange-500 mr-1" />
            <span className="text-gray-500">şu anda aktif</span>
          </div>
        </motion.div>
      </div>

      {/* Grafik Bölümü */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Ziyaretçi İstatistikleri</h3>
            <div className="p-2 bg-blue-50 rounded-lg">
              <BarChart2 className="w-5 h-5 text-blue-500" />
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="ziyaretci" 
                  name="Ziyaretçi"
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="yorum" 
                  name="Yorum"
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Memnuniyet Puanı</h3>
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Star className="w-5 h-5 text-yellow-500" />
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" domain={[0, 5]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="puan" 
                  name="Puan"
                  stroke="#eab308" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Son Aktiviteler */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white p-6 rounded-xl shadow-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Son Aktiviteler</h3>
          <span className="text-sm text-gray-500">Son 24 saat</span>
        </div>
        <div className="space-y-4">
          {[
            { type: 'yorum', user: 'Ahmet Y.', time: '5 dakika önce', action: 'Yeni bir yorum ekledi' },
            { type: 'puan', user: 'Mehmet K.', time: '15 dakika önce', action: '5 yıldız verdi' },
            { type: 'yorum', user: 'Ayşe S.', time: '1 saat önce', action: 'Yorumunu güncelledi' },
            { type: 'puan', user: 'Fatma B.', time: '2 saat önce', action: '4 yıldız verdi' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className={`p-2 rounded-lg ${
                activity.type === 'yorum' ? 'bg-purple-50' : 'bg-yellow-50'
              }`}>
                {activity.type === 'yorum' ? (
                  <MessageSquare className={`w-4 h-4 ${
                    activity.type === 'yorum' ? 'text-purple-500' : 'text-yellow-500'
                  }`} />
                ) : (
                  <Star className="w-4 h-4 text-yellow-500" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                <p className="text-sm text-gray-500">{activity.action}</p>
              </div>
              <span className="text-sm text-gray-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}