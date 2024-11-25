// app/admin/comments/page.jsx
'use client';
import { useState, useEffect } from 'react';
import StarRating from '@/components/StarRating';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Star, Clock, CheckCircle, AlertCircle, TrendingUp, ThumbsUp } from 'lucide-react';

export default function AdminCommentsPage() {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState('pending');
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    fetchComments();

    // Her 30 saniyede bir yorumları güncelle
    const interval = setInterval(fetchComments, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (comments.length > 0) {
      const approved = comments.filter(c => c.status === 'approved');
      const avg = approved.length > 0 
        ? approved.reduce((acc, curr) => acc + curr.rating, 0) / approved.length 
        : 0;
      setAverageRating(Math.round(avg * 10) / 10);
    } else {
      setAverageRating(0);
    }
  }, [comments]);

  const fetchComments = async () => {
    try {
      const response = await fetch('/api/admin/comments');
      const data = await response.json();
      setComments(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setLoading(false);
    }
  };

  const handleStatusChange = async (commentId, newStatus) => {
    try {
      if (newStatus === 'rejected' && !window.confirm('Bu yorumu silmek istediğinize emin misiniz?')) {
        return;
      }
  
      // id'yi kullanarak istek gönderelim
      const payload = {
        _id: commentId, // Backend'de hala _id olarak beklediği için değiştirmedik
        status: newStatus
      };
  
      console.log('Sending update request:', payload);
  
      const response = await fetch('/api/admin/comments', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Beklenmeyen bir hata oluştu');
      }
  
      await fetchComments();
    } catch (error) {
      console.error('Error details:', error);
      alert('Yorum güncellenirken bir hata oluştu: ' + error.message);
    }
  };

  const filteredComments = comments.filter((comment) => comment.status === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Yorum Yönetimi</h1>
            <p className="mt-1 text-sm text-gray-500">
              Yorumları yönetin, onaylayın veya reddedin
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 text-sm text-blue-600 bg-blue-50 rounded-full">
              Son Güncelleme: {new Date().toLocaleTimeString('tr-TR')}
            </span>
            <button
              onClick={fetchComments}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <TrendingUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Toplam Yorum</h3>
            <div className="p-2 bg-blue-50 rounded-lg">
              <FileText className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-3xl font-bold text-gray-900">{comments.length}</p>
            <div className="mt-2 flex items-center text-sm">
              <ThumbsUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500">%{Math.round((comments.filter(c => c.status === 'approved').length / comments.length) * 100)}</span>
              <span className="text-gray-500 ml-2">onay oranı</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Onay Bekleyen</h3>
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <p className="text-3xl font-bold text-gray-900">
                {comments.filter(c => c.status === 'pending').length}
              </p>
              <p className="mt-1 text-sm text-gray-500">bekleyen yorum</p>
            </div>
            {comments.filter(c => c.status === 'pending').length > 0 && (
              <span className="px-3 py-1 text-sm text-yellow-600 bg-yellow-50 rounded-full">
                İşlem Bekliyor
              </span>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Onaylanan</h3>
            <div className="p-2 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-3xl font-bold text-gray-900">
              {comments.filter(c => c.status === 'approved').length}
            </p>
            <p className="mt-1 text-sm text-gray-500">onaylanan yorum</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Ort. Puan</h3>
            <div className="p-2 bg-amber-50 rounded-lg">
              <Star className="w-6 h-6 text-amber-500" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-3xl font-bold text-gray-900">{averageRating}</p>
            <div className="mt-1">
              <StarRating value={averageRating} readonly />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900">Yorumlar</h2>
            <div className="flex flex-wrap gap-3">
              <button
                className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
                  filter === 'pending'
                    ? 'bg-yellow-500 text-white shadow-sm'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                }`}
                onClick={() => setFilter('pending')}
              >
                <Clock className="w-4 h-4" />
                <span>Onay Bekleyenler</span>
                {comments.filter(c => c.status === 'pending').length > 0 && (
                  <span className="px-2 py-0.5 text-xs bg-yellow-400 rounded-full">
                    {comments.filter(c => c.status === 'pending').length}
                  </span>
                )}
              </button>
              <button
                className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
                  filter === 'approved'
                    ? 'bg-green-500 text-white shadow-sm'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                }`}
                onClick={() => setFilter('approved')}
              >
                <CheckCircle className="w-4 h-4" />
                <span>Onaylananlar</span>
                {comments.filter(c => c.status === 'approved').length > 0 && (
                  <span className="px-2 py-0.5 text-xs bg-green-400 rounded-full">
                    {comments.filter(c => c.status === 'approved').length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          <div className="divide-y divide-gray-100">
            {filteredComments.map((comment, index) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="p-6 hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-grow space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg text-gray-900">{comment.name}</h3>
                      <span className="text-sm text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString('tr-TR')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{comment.email}</p>
                    <div className="flex items-center space-x-2">
                      <StarRating value={comment.rating} readonly />
                      <span className="text-sm text-gray-600">({comment.rating}/5)</span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg mt-2">
                      <p className="text-gray-700 whitespace-pre-wrap">{comment.comment}</p>
                    </div>
                  </div>
                  <div className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-2">
                    {comment.status === 'pending' && (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleStatusChange(comment.id, 'approved')}
                          className="flex-1 md:flex-none bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors shadow-sm flex items-center justify-center space-x-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Onayla</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleStatusChange(comment.id, 'rejected')}
                          className="flex-1 md:flex-none bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors shadow-sm flex items-center justify-center space-x-2"
                        >
                          <AlertCircle className="w-4 h-4" />
                          <span>Sil</span>
                        </motion.button>
                      </>
                    )}
                    {comment.status === 'approved' && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleStatusChange(comment.id, 'rejected')}
                        className="flex-1 md:flex-none bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors shadow-sm flex items-center justify-center space-x-2"
                      >
                        <AlertCircle className="w-4 h-4" />
                        <span>Sil</span>
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            
            {filteredComments.length === 0 && (
              <div className="p-12 text-center">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="p-3 bg-gray-50 rounded-full">
                    <FileText className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Yorum Bulunamadı</h3>
                  <p className="text-gray-500">Bu kategoride henüz yorum bulunmuyor.</p>
                </div>
              </div>
            )}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}