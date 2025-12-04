import React, { useState, useEffect } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAuth } from "../../hooks/useAuth";
import { usersAPI } from "../../services/api";
import {
  Menu,
  Search,
  Bell,
  MessageSquare,
  User,
  Settings,
  LogOut,
  Moon,
  Sun,
  Globe,
} from "lucide-react";
import NotificationsDropdown from "./NotificationsDropdown";

const Topbar = ({ onMenuClick, currentPath }) => {
  const { t, dir, toggleLanguage, language } = useLanguage();
  const { user: authUser } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userData, setUserData] = useState(null);

  // Load user data from API - use authUser as primary source
  useEffect(() => {
    // Use authUser directly first
    if (authUser && !userData) {
      setUserData(authUser);
    }
    
    // Optionally fetch fresh data with a delay to avoid rate limiting
    const loadUserData = async () => {
      if (!authUser) return;
      
      try {
        const response = await usersAPI.getMe();
        if (response.data.success) {
          setUserData(response.data.data);
        }
      } catch (error) {
        // Silently fail if rate limited, use authUser instead
        if (error?.response?.status !== 429 && authUser) {
          console.error("Error loading user data:", error);
        }
        // Keep using authUser as fallback
        if (authUser && !userData) {
          setUserData(authUser);
        }
      }
    };
    
    // Delay the API call to avoid conflicts with Sidebar
    const timer = setTimeout(() => {
      if (authUser) {
        loadUserData();
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [authUser]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const getPageTitle = () => {
    const pathMap = {
      "/firm": t("dashboard"),
      "/firm/requests": t("myRequests"),
      "/firm/messages": t("messages"),
      "/firm/wallet": t("wallet"),
      "/firm/portfolio": t("portfolio"),
      "/firm/browse": t("browseProjects"),
      "/firm/settings": t("settings"),
      "/firm/help": t("helpSupport"),
    };
    return pathMap[currentPath] || t("dashboard");
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left Section */}
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Menu className="w-5 h-5" />
          </button>

          <h1 className="ml-4 text-xl font-semibold text-gray-800 dark:text-white">
            {getPageTitle()}
          </h1>
        </div>

        {/* Center Section - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title={t("toggleLanguage")}
          >
            <Globe className="w-5 h-5" />
          </button>

          {/* Notifications */}
          <NotificationsDropdown />

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {userData?.avatar ? (
                <img
                  src={userData.avatar}
                  alt={userData.name || t("user")}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {(userData?.name || t("user")).charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  {userData?.name || t("user")}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {userData?.role === "serviceProvider" ? t("serviceProvider") || "Service Provider" :
                   userData?.role === "client" ? t("client") || "Client" :
                   userData?.role === "admin" ? t("admin") || "Admin" : ""}
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;

