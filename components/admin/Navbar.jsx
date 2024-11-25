'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Bell, 
  Menu, 
  X, 
  User,
  LogOut,
  Settings,
  CheckCircle,
  Clock,
  ChevronDown,
  AlertCircle,
  MessageSquare,
  Star,
  Search,
  Moon,
  Sun,
  HelpCircle,
  Mail,
  Shield,
  Activity,
  BellRing,
  BellOff,
  LayoutDashboard,
  UserCog
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ 
  isSidebarOpen, 
  setSidebarOpen, 
  notifications, 
  onNotificationRead 
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [notificationItems, setNotificationItems] = useState([]);
  const [notificationSound, setNotificationSound] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastActivity, setLastActivity] = useState('Şimdi aktif');
  const notificationRef = useRef(null);
  const userMenuRef = useRef(null);
  const searchRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/api/admin/comments');
        const comments = await response.json();
        const pendingComments = comments.filter(c => c.status === 'pending');
        
        const items = pendingComments.map(comment => ({
          id: comment._id,
          title: 'Yeni Yorum',
          message: `${comment.name} adlı kullanıcı yorum yaptı`,
          time: new Date(comment.createdAt).toLocaleString('tr-TR'),
          type: 'comment',
          status: 'unread',
          link: `/admin/comments?id=${comment._id}`,
          rating: comment.rating,
          priority: getNotificationPriority(comment.rating)
        }));

        // Bildirimleri önceliğe göre sırala
        items.sort((a, b) => b.priority - a.priority);
        setNotificationItems(items);

        // Yeni bildirim geldiğinde ses çal
        if (items.length > notificationItems.length && notificationSound) {
          playNotificationSound();
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [notifications, notificationSound, notificationItems.length]);

  const getNotificationPriority = (rating) => {
    if (rating <= 2) return 3; // Yüksek öncelik
    if (rating <= 3) return 2; // Orta öncelik
    return 1; // Normal öncelik
  };

  const playNotificationSound = () => {
    const audio = new Audio('/notification-sound.mp3'); // Ses dosyasını public klasörüne eklemelisiniz
    audio.play().catch(error => console.error('Error playing sound:', error));
  };

  const handleNotificationClick = (notification) => {
    if (notification.status === 'unread') {
      onNotificationRead?.(notification.id);
    }
    setShowNotifications(false);
    router.push(notification.link);
  };

  const handleLogout = async () => {
    if (window.confirm('Çıkış yapmak istediğinize emin misiniz?')) {
      try {
        const res = await fetch('/api/admin/logout', {
          method: 'POST',
        });
  
        if (res.ok) {
          router.push('/admin');
        } else {
          console.error('Logout failed');
          alert('Çıkış yapılırken bir hata oluştu. Lütfen tekrar deneyin.');
        }
      } catch (error) {
        console.error('Logout error:', error);
        alert('Çıkış yapılırken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Burada dark mode implementasyonu yapılabilir
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 3: return 'bg-red-50 text-red-500';
      case 2: return 'bg-yellow-50 text-yellow-500';
      default: return 'bg-blue-50 text-blue-500';
    }
  };

  const userMenuItems = [
    { icon: UserCog, label: 'Profil', href: '/admin/profile' },
    { icon: Settings, label: 'Ayarlar', href: '/admin/settings' },
    { icon: Shield, label: 'Güvenlik', href: '/admin/security' },
    { icon: HelpCircle, label: 'Yardım', href: '/admin/help' },
    { icon: Activity, label: 'Aktivite', href: '/admin/activity' },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="ml-4">
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-gray-900">
                Admin Panel
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Arama */}
            <div className="relative" ref={searchRef}>
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
              >
                <Search size={20} />
              </button>

              <AnimatePresence>
                {showSearch && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 p-4"
                  >
                    <input
                      type="text"
                      placeholder="Panel içinde ara..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      autoFocus
                    />
                    {/* Arama sonuçları burada gösterilebilir */}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bildirimler */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Bell size={20} />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full animate-pulse">
                    {notifications}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 w-96 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h2 className="text-lg font-semibold text-gray-900">Bildirimler</h2>
                          {notifications > 0 && (
                            <span className="px-2 py-1 text-xs font-medium text-white bg-red-500 rounded-full animate-pulse">
                              {notifications} yeni
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setNotificationSound(!notificationSound)}
                            className="p-1 rounded-full hover:bg-gray-100"
                            title={notificationSound ? 'Bildirimleri sessize al' : 'Bildirimleri sesli yap'}
                          >
                            {notificationSound ? (
                              <BellRing size={16} className="text-gray-500" />
                            ) : (
                              <BellOff size={16} className="text-gray-500" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
                      {notificationItems.length > 0 ? (
                        notificationItems.map((item) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                            onClick={() => handleNotificationClick(item)}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-full ${getPriorityColor(item.priority)}`}>
                                <MessageSquare className="w-5 h-5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                  {item.title}
                                  {item.priority === 3 && (
                                    <span className="px-2 py-0.5 text-xs bg-red-100 text-red-600 rounded-full">
                                      Acil
                                    </span>
                                  )}
                                </p>
                                <p className="text-sm text-gray-500 truncate">
                                  {item.message}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <div className="flex items-center text-sm text-yellow-500">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                      <Star
                                        key={index}
                                        className={`w-4 h-4 ${
                                          index < item.rating ? 'fill-current' : 'stroke-current fill-none'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-xs text-gray-400">
                                    {item.time}
                                  </span>
                                </div>
                              </div>
                              <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-500">
                          <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />
                          <p>Tüm bildirimleri gördünüz</p>
                        </div>
                      )}
                    </div>

                    {notificationItems.length > 0 && (
                      <div className="p-4 border-t border-gray-100">
                        <button
                          onClick={() => {
                            setShowNotifications(false);
                            router.push('/admin/notifications');
                          }}
                          className="w-full px-4 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          Tüm bildirimleri görüntüle
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Kullanıcı menüsü */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 border-l pl-4 hover:bg-gray-50 rounded-lg transition-colors py-2 pr-2"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center relative">
                  <User size={16} className="text-white" />
                  <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-medium text-gray-900">Admin</span>
                  <span className="text-xs text-gray-500">{lastActivity}</span>
                </div>
                <ChevronDown size={16} className="text-gray-400 hidden md:block" />
                </button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
                  >
                    {/* Kullanıcı Profil Başlığı */}
                    <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                          <User size={24} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">Admin</h3>
                          <p className="text-sm text-blue-100">admin@example.com</p>
                          <span className="inline-flex items-center mt-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                            <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                            Çevrimiçi
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Hızlı Eylemler */}
                    <div className="p-2 border-b border-gray-100">
                      <div className="grid grid-cols-3 gap-1">
                        <button className="flex flex-col items-center p-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                          <LayoutDashboard size={20} />
                          <span className="text-xs mt-1">Dashboard</span>
                        </button>
                        <button className="flex flex-col items-center p-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                          <Mail size={20} />
                          <span className="text-xs mt-1">Mesajlar</span>
                        </button>
                        <button className="flex flex-col items-center p-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                          <Activity size={20} />
                          <span className="text-xs mt-1">Aktivite</span>
                        </button>
                      </div>
                    </div>

                    {/* Ana Menü */}
                    <div className="py-2">
                      {userMenuItems.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setShowUserMenu(false);
                            router.push(item.href);
                          }}
                          className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                        >
                          <item.icon size={16} />
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Ayarlar ve Mod Seçenekleri */}
                    <div className="p-3 bg-gray-50 border-t border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Bildirim Sesi</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setNotificationSound(!notificationSound);
                          }}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                            notificationSound ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`${
                              notificationSound ? 'translate-x-6' : 'translate-x-1'
                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                          />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Karanlık Mod</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDarkMode(!darkMode);
                          }}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                            darkMode ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`${
                              darkMode ? 'translate-x-6' : 'translate-x-1'
                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Çıkış Butonu */}
                    <div className="p-2 border-t border-gray-100">
                    <button
                      onClick={async (e) => {
                        e.preventDefault();
                        setShowUserMenu(false);
                        await handleLogout();
                      }}
                      className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center justify-center space-x-2"
                    >
                      <LogOut size={16} />
                      <span>Çıkış Yap</span>
                    </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Global Arama Sonuçları */}
      <AnimatePresence>
        {showSearch && searchQuery.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg"
          >
            <div className="container mx-auto p-4">
              <div className="max-h-96 overflow-y-auto">
                {/* Arama sonuçları burada gösterilecek */}
                <div className="text-sm text-gray-500">
                  "{searchQuery}" için sonuçlar aranıyor...
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}