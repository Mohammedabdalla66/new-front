import React, { useState } from "react";
import { NotificationSettings } from "../components/Settings/NotificationSettings.jsx";
import { SecuritySettings } from "../components/Settings/SecuritySettings.jsx";
import { Bell, Shield, CreditCard, Database, Moon, Sun } from "lucide-react";

const mockNotificationSettings = {
  emailNotifications: true,
  smsNotifications: false,
  bookingUpdates: true,
  marketingEmails: false,
  proposalNotifications: true,
};

export const Settings = () => {
  const [activeSection, setActiveSection] = useState("notifications");
  const [notificationSettings, setNotificationSettings] = useState(
    mockNotificationSettings
  );
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem("darkMode") === "true";
    } catch {
      return false;
    }
  });

  const handleNotificationSave = (settings) => {
    setNotificationSettings(settings);
    console.log("Notification settings saved:", settings);
  };

  const handlePasswordChange = (currentPassword, newPassword) => {
    console.log("Password change requested");
  };

  const sections = [
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "data", label: "Data & Privacy", icon: Database },
  ];

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Settings
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Manage your account preferences and security settings.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-3 sm:p-4">
            <nav className="space-y-1 sm:space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-2 rounded-lg text-left transition-colors text-sm sm:text-base ${
                    activeSection === section.id
                      ? "bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <section.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-medium">{section.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Appearance */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 sm:p-6 mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Appearance
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                {darkMode ? (
                  <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300" />
                ) : (
                  <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300" />
                )}
                <div>
                  <div className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                    Dark Mode
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    Apply a dark theme to the layout and sidebar
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  const next = !darkMode;
                  setDarkMode(next);
                  try {
                    localStorage.setItem("darkMode", String(next));
                  } catch {}
                  // Inform App to re-render with new mode
                  window.dispatchEvent(
                    new CustomEvent("toggle-dark-mode", {
                      detail: { enabled: next },
                    })
                  );
                }}
                className={`px-3 sm:px-4 py-2 rounded-lg border text-xs sm:text-sm transition-colors ${
                  darkMode
                    ? "bg-gray-900 text-white border-gray-800"
                    : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
                } hover:opacity-90`}
              >
                {darkMode ? "On" : "Off"}
              </button>
            </div>
          </div>

          {/* Settings Sections */}
          {activeSection === "notifications" && (
            <NotificationSettings
              settings={notificationSettings}
              onSave={handleNotificationSave}
            />
          )}

          {activeSection === "security" && (
            <SecuritySettings onPasswordChange={handlePasswordChange} />
          )}

          {activeSection === "billing" && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Billing & Payments
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Billing settings and payment methods will be available here.
              </p>
            </div>
          )}

          {activeSection === "data" && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Data & Privacy
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Data management and privacy settings will be available here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Settings;
