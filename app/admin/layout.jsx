'use client';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Settings, 
  LogOut,
  Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/admin/Navbar';

const menuItems = [
  {
    path: '/admin/dashboard',
    icon: LayoutDashboard,
    title: 'Dashboard'
  },
  {
    path: '/admin/comments',
    icon: MessageSquare,
    title: 'Yorumlar'
  },
  {
    path: '/admin/notifications',
    icon: Bell,
    title: 'Bildirimler'
  },
  {
    path: '/admin/settings',
    icon: Settings,
    title: 'Ayarlar'
  }
];

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [notifications, setNotifications] = useState(0);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchPendingComments = async () => {
      try {
        const response = await fetch('/api/admin/comments');
        const comments = await response.json();
        const pendingCount = comments.filter(c => c.status === 'pending').length;
        setNotifications(pendingCount);
      } catch (error) {
        console.error('Error fetching pending comments:', error);
      }
    };

    fetchPendingComments();
    const interval = setInterval(fetchPendingComments, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleNotificationRead = (notificationId) => {
    console.log('Notification marked as read:', notificationId);
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

  if (pathname === '/admin') return children;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
        notifications={notifications}
        onNotificationRead={handleNotificationRead}
      />

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-white border-r border-gray-200 transition-transform ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="h-full px-3 pb-4 overflow-y-auto">
              <ul className="space-y-2 font-medium">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.path;
                  return (
                    <li key={item.path}>
                      <a
                        href={item.path}
                        className={`flex items-center p-3 text-gray-900 rounded-lg hover:bg-gray-100 group transition-colors ${
                          isActive ? 'bg-blue-50 text-blue-600' : ''
                        }`}
                      >
                        <Icon size={20} className={isActive ? 'text-blue-600' : 'text-gray-500'} />
                        <span className="ml-3">{item.title}</span>
                        {item.path === '/admin/comments' && notifications > 0 && (
                          <span className="ml-auto bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                            {notifications}
                          </span>
                        )}
                      </a>
                    </li>
                  );
                })}
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full p-3 text-gray-900 rounded-lg hover:bg-gray-100 group transition-colors"
                  >
                    <LogOut size={20} className="text-gray-500" />
                    <span className="ml-3">Çıkış Yap</span>
                  </button>
                </li>
              </ul>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div 
        className={`p-4 ${isSidebarOpen ? 'md:ml-64' : ''} transition-[margin]`}
      >
        <div className="mt-14">
          {children}
        </div>
      </div>

      {/* Mobil için karartma overlay */}
      {isMobile && isSidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-30 bg-gray-900 bg-opacity-50 transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}