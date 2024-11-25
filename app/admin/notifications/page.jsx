// app/admin/notifications/page.jsx
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  MessageSquare, 
  Star, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Filter,
  Trash2,
  RefreshCw,
  MailOpen,
  Search
} from 'lucide-react';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, unread, read
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNotifications, setSelectedNotifications] = useState(new Set());

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/comments');
      const comments = await response.json();
      
      const notificationItems = comments.map(comment => ({
        id: comment._id,
        title: 'Yeni Yorum',
        message: `${comment.name} adlı kullanıcı yorum yaptı`,
        time: new Date(comment.createdAt).toLocaleString('tr-TR'),
        type: 'comment',
        status: comment.status === 'pending' ? 'unread' : 'read',
        rating: comment.rating,
        comment: comment.comment,
        user: {
          name: comment.name,
          email: comment.email
        }
      }));

      setNotifications(notificationItems);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (ids) => {
    try {
      // API çağrısı yapılacak
      setNotifications(prev => 
        prev.map(notification => 
          ids.includes(notification.id) 
            ? { ...notification, status: 'read' }
            : notification
        )
      );
      setSelectedNotifications(new Set());
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }
  };

  const handleDelete = async (ids) => {
    if (!window.confirm('Seçili bildirimleri silmek istediğinize emin misiniz?')) return;

    try {
      // API çağrısı yapılacak
      setNotifications(prev => 
        prev.filter(notification => !ids.includes(notification.id))
      );
      setSelectedNotifications(new Set());
    } catch (error) {
      console.error('Error deleting notifications:', error);
    }
  };

  const filteredNotifications = notifications
    .filter(notification => {
      if (filter === 'unread') return notification.status === 'unread';
      if (filter === 'read') return notification.status === 'read';
      return true;
    })
    .filter(notification =>
      notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
      {/* Header */}
      <header className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bildirimler</h1>
            <p className="mt-1 text-sm text-gray-500">
              Tüm sistem bildirimlerinizi buradan yönetin
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 text-sm text-blue-600 bg-blue-50 rounded-full">
              Son Güncelleme: {new Date().toLocaleTimeString('tr-TR')}
            </span>
            <button
              onClick={fetchNotifications}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Filtreler ve Arama */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full flex items-center gap-2 ${
                filter === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Bell size={16} />
              <span>Tümü</span>
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-full flex items-center gap-2 ${
                filter === 'unread'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <AlertCircle size={16} />
              <span>Okunmamış</span>
              {notifications.filter(n => n.status === 'unread').length > 0 && (
                <span className="px-2 py-0.5 text-xs bg-yellow-400 rounded-full">
                  {notifications.filter(n => n.status === 'unread').length}
                </span>
              )}
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`px-4 py-2 rounded-full flex items-center gap-2 ${
                filter === 'read'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <CheckCircle size={16} />
              <span>Okunmuş</span>
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Bildirimlerde ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>

        {selectedNotifications.size > 0 && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              {selectedNotifications.size} bildirim seçildi
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleMarkAsRead([...selectedNotifications])}
                className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg flex items-center gap-2"
              >
                <MailOpen size={16} />
                <span>Okundu İşaretle</span>
              </button>
              <button
                onClick={() => handleDelete([...selectedNotifications])}
                className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2"
              >
                <Trash2 size={16} />
                <span>Sil</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bildirim Listesi */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <AnimatePresence mode="popLayout">
          <div className="divide-y divide-gray-100">
            {filteredNotifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`p-4 transition-colors ${
                  notification.status === 'unread' ? 'bg-blue-50/30' : 'hover:bg-gray-50/50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={selectedNotifications.has(notification.id)}
                    onChange={(e) => {
                      const newSelected = new Set(selectedNotifications);
                      if (e.target.checked) {
                        newSelected.add(notification.id);
                      } else {
                        newSelected.delete(notification.id);
                      }
                      setSelectedNotifications(newSelected);
                    }}
                    className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-blue-50 rounded-full">
                          <MessageSquare className="w-4 h-4 text-blue-500" />
                        </div>
                        <h3 className="font-medium text-gray-900">
                          {notification.title}
                        </h3>
                        {notification.status === 'unread' && (
                          <span className="px-2 py-0.5 text-xs font-medium text-yellow-600 bg-yellow-50 rounded-full">
                            Yeni
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">
                        {notification.time}
                      </span>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <p className="text-gray-600">{notification.message}</p>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex items-center text-sm text-yellow-500">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                              key={index}
                              className={`w-4 h-4 ${
                                index < notification.rating ? 'fill-current' : 'stroke-current fill-none'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          ({notification.rating}/5)
                        </span>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-lg mt-2">
                        <p className="text-gray-600 text-sm whitespace-pre-wrap">
                          {notification.comment}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{notification.user.name}</span>
                        <span>{notification.user.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredNotifications.length === 0 && (
              <div className="p-8 text-center">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="p-3 bg-gray-50 rounded-full">
                    <Bell className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Bildirim Bulunamadı</h3>
                  <p className="text-gray-500">Bu kriterlere uygun bildirim bulunmuyor.</p>
                </div>
              </div>
            )}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}