// admin/settings/page.jsx
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Mail, 
  Bell, 
  Shield, 
  Smartphone, 
  Globe, 
  Save,
  Moon,
  Sun,
  RefreshCw,
  CheckCircle
} from 'lucide-react';

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      browser: true,
    },
    security: {
      twoFactor: true,
      loginAlerts: true,
      ipLogging: false,
    },
    preferences: {
      language: 'tr',
      theme: 'light',
      autoUpdate: true,
    }
  });

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Ayarlar kaydedilirken hata oluştu:', error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle component
  const Toggle = ({ enabled, onChange }) => (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`${
        enabled ? 'bg-blue-600' : 'bg-gray-200'
      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
    >
      <span
        className={`${
          enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
      />
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-tr from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Ayarlar</h1>
          </div>

          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : success ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            {loading ? 'Kaydediliyor...' : success ? 'Kaydedildi!' : 'Kaydet'}
          </button>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Notifications Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-blue-500" />
                <h2 className="text-xl font-semibold text-gray-800">Bildirim Ayarları</h2>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* Email Notifications */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">E-posta Bildirimleri</h3>
                  <p className="text-sm text-gray-500">Önemli güncellemeler için e-posta al</p>
                </div>
                <Toggle
                  enabled={settings.notifications.email}
                  onChange={(value) => handleSettingChange('notifications', 'email', value)}
                />
              </div>

              {/* Push Notifications */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Push Bildirimleri</h3>
                  <p className="text-sm text-gray-500">Mobil push bildirimleri al</p>
                </div>
                <Toggle
                  enabled={settings.notifications.push}
                  onChange={(value) => handleSettingChange('notifications', 'push', value)}
                />
              </div>

              {/* Browser Notifications */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Tarayıcı Bildirimleri</h3>
                  <p className="text-sm text-gray-500">Tarayıcı üzerinden bildirim al</p>
                </div>
                <Toggle
                  enabled={settings.notifications.browser}
                  onChange={(value) => handleSettingChange('notifications', 'browser', value)}
                />
              </div>
            </div>
          </div>

          {/* Security Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-blue-500" />
                <h2 className="text-xl font-semibold text-gray-800">Güvenlik Ayarları</h2>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* Two Factor Auth */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">İki Faktörlü Doğrulama</h3>
                  <p className="text-sm text-gray-500">Hesabınızı daha güvenli hale getirin</p>
                </div>
                <Toggle
                  enabled={settings.security.twoFactor}
                  onChange={(value) => handleSettingChange('security', 'twoFactor', value)}
                />
              </div>

              {/* Login Alerts */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Giriş Uyarıları</h3>
                  <p className="text-sm text-gray-500">Yeni cihazlardan giriş yapıldığında bildir</p>
                </div>
                <Toggle
                  enabled={settings.security.loginAlerts}
                  onChange={(value) => handleSettingChange('security', 'loginAlerts', value)}
                />
              </div>

              {/* IP Logging */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">IP Kayıt Tutma</h3>
                  <p className="text-sm text-gray-500">Giriş yapılan IP adreslerini kaydet</p>
                </div>
                <Toggle
                  enabled={settings.security.ipLogging}
                  onChange={(value) => handleSettingChange('security', 'ipLogging', value)}
                />
              </div>
            </div>
          </div>

          {/* Preferences Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-blue-500" />
                <h2 className="text-xl font-semibold text-gray-800">Tercihler</h2>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* Language Selection */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Dil</h3>
                  <p className="text-sm text-gray-500">Arayüz dilini seçin</p>
                </div>
                <select
                  value={settings.preferences.language}
                  onChange={(e) => handleSettingChange('preferences', 'language', e.target.value)}
                  className="block w-32 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="tr">Türkçe</option>
                  <option value="en">English</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>

              {/* Theme Selection */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Tema</h3>
                  <p className="text-sm text-gray-500">Arayüz temasını seçin</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSettingChange('preferences', 'theme', 'light')}
                    className={`p-2 rounded-lg ${
                      settings.preferences.theme === 'light'
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <Sun className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleSettingChange('preferences', 'theme', 'dark')}
                    className={`p-2 rounded-lg ${
                      settings.preferences.theme === 'dark'
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <Moon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Auto Update */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Otomatik Güncelleme</h3>
                  <p className="text-sm text-gray-500">Sistem güncellemelerini otomatik yükle</p>
                </div>
                <Toggle
                  enabled={settings.preferences.autoUpdate}
                  onChange={(value) => handleSettingChange('preferences', 'autoUpdate', value)}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}