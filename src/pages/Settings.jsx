import React, { useState } from 'react';
import { NotificationSettings } from '../components/Settings/NotificationSettings.jsx';
import { SecuritySettings } from '../components/Settings/SecuritySettings.jsx';
import { Bell, Shield, CreditCard, Database } from 'lucide-react';

const mockNotificationSettings = {
  emailNotifications: true,
  smsNotifications: false,
  bookingUpdates: true,
  marketingEmails: false,
  proposalNotifications: true,
};

export const Settings = () => {
  const [activeSection, setActiveSection] = useState('notifications');
  const [notificationSettings, setNotificationSettings] = useState(mockNotificationSettings);

  const handleNotificationSave = (settings) => {
    setNotificationSettings(settings);
    console.log('Notification settings saved:', settings);
  };

  const handlePasswordChange = (currentPassword, newPassword) => {
    console.log('Password change requested');
  };

  const sections = [
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'data', label: 'Data & Privacy', icon: Database },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and security settings.</p>
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
          {activeSection === 'notifications' && (
            <NotificationSettings settings={notificationSettings} onSave={handleNotificationSave} />
          )}

          {activeSection === 'security' && (
            <SecuritySettings onPasswordChange={handlePasswordChange} />
          )}

          {activeSection === 'billing' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing & Payments</h3>
              <p className="text-gray-600">Billing settings and payment methods will be available here.</p>
            </div>
          )}

          {activeSection === 'data' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Data & Privacy</h3>
              <p className="text-gray-600">Data management and privacy settings will be available here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


