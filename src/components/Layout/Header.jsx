import React from "react";
import { Bell, Search, Menu, Globe } from "lucide-react";
import CaHupLogo from "../CaHupLogo";
import UserDropdown from "../ui/UserDropdown";
import { useLanguage } from "../../contexts/LanguageContext";


export const Header = ({ user, onToggleSidebar }) => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          {onToggleSidebar && (
            <button
              type="button"
              onClick={onToggleSidebar}
              className="inline-flex md:hidden items-center justify-center w-10 h-10 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
         <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <CaHupLogo className="h-8 w-8" />
            <h1 className="text-xl font-bold text-gray-900">CaHup</h1>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:block md:flex-1 md:max-w-lg md:mx-8">
          <div className="relative">
            <Search className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4`} />
            <input
              type="text"
              placeholder="Search bookings, services..."
              className={`w-full ${language === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200`}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-2 rtl:space-x-reverse p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            aria-label={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
            title={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
          >
            <Globe className="w-5 h-5" />
            <span className="text-sm font-medium hidden sm:inline">
              {language === "ar" ? "EN" : "عربي"}
            </span>
          </button>

          {/* Notifications */}
          <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Dropdown */}
          <UserDropdown user={user} />
        </div>
      </div>
    </header>
  );
};
