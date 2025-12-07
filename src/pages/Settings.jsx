import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationSettings } from '../components/Settings/NotificationSettings.jsx';
import { SecuritySettings } from '../components/Settings/SecuritySettings.jsx';
import { Bell, Shield, CreditCard, Database, Moon, Sun, Globe, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import Navbar from '../components/Layout/Navbar';
import AdminSidebar from '../components/sidebar/AdminSidebar';

const mockNotificationSettings = {
  emailNotifications: true,
  smsNotifications: false,
  bookingUpdates: true,
  marketingEmails: false,
  proposalNotifications: true,
};

export const Settings = () => {
  const { t, language, toggleLanguage } = useLanguage();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('notifications');
  const [notificationSettings, setNotificationSettings] = useState(mockNotificationSettings);
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem('darkMode') === 'true';
    } catch {
      return false;
    }
  });

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleBack = () => {
    navigate('/admin');
  };

  const handleNotificationSave = (settings) => {
    setNotificationSettings(settings);
    console.log('Notification settings saved:', settings);
  };

  const handlePasswordChange = (currentPassword, newPassword) => {
    console.log('Password change requested');
  };

  const sections = [
    { id: 'notifications', label: t('notifications'), icon: Bell },
    { id: 'security', label: t('security'), icon: Shield },
    { id: 'billing', label: t('billing'), icon: CreditCard },
    { id: 'data', label: t('dataPrivacy'), icon: Database },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={closeSidebar}
          role="presentation"
        />
      )}
      <AdminSidebar isMobileOpen={isSidebarOpen} onMobileClose={closeSidebar} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onToggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
      <div className="mb-6">
              <button
                onClick={handleBack}
                className="flex items-center space-x-2 space-x-reverse mb-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {language === 'ar' ? (
                  <ArrowRight className="w-5 h-5" />
                ) : (
                  <ArrowLeft className="w-5 h-5" />
                )}
                <span className="font-medium">{t('back') || 'Back'}</span>
              </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('settings')}</h1>
        <p className="text-gray-600 dark:text-gray-400">{t('manageAccountPreferences')}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <section.icon className="w-5 h-5" />
                  <span className="font-medium">{section.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex-1">
          {/* Appearance */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('appearance')}</h3>
            <div className="space-y-4">
              {/* Dark Mode */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 space-x-reverse">
                  {darkMode ? <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" /> : <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />}
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{t('darkMode')}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{t('applyDarkTheme')}</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const next = !darkMode;
                    setDarkMode(next);
                    try { localStorage.setItem('darkMode', String(next)); } catch {}
                    // Inform App to re-render with new mode
                    window.dispatchEvent(new CustomEvent('toggle-dark-mode', { detail: { enabled: next } }));
                  }}
                  className={`px-4 py-2 rounded-lg border text-sm ${darkMode ? 'bg-gray-900 text-white border-gray-800' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'} hover:opacity-90`}
                >
                  {darkMode ? t('on') : t('off')}
                </button>
              </div>
              
              {/* Language Switcher */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Globe className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{t('language')}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{t('selectLanguage')}</div>
                  </div>
                </div>
                <button
                  onClick={toggleLanguage}
                  className="px-4 py-2 rounded-lg border text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:opacity-90"
                >
                  {language === 'ar' ? t('arabic') : t('english')}
                </button>
              </div>
            </div>
          </div>
          {activeSection === 'notifications' && (
            <NotificationSettings settings={notificationSettings} onSave={handleNotificationSave} />
          )}

          {activeSection === 'security' && (
            <SecuritySettings onPasswordChange={handlePasswordChange} />
          )}

          {activeSection === 'billing' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('billing')}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t('billingSettingsAvailable')}</p>
            </div>
          )}

          {activeSection === 'data' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('dataPrivacy')}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t('dataManagementAvailable')}</p>
            </div>
          )}
        </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default Settings;