import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../hooks/useAuth";
import CaHupLogo from "./CaHupLogo";
import UserDropdown from "./ui/UserDropdown";
import { Menu, X, Bell, MessageCircle } from "lucide-react";

const Header = ({ onAddProject }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navItems = [
    { key: "home", path: "/" },
    { key: "services", path: "/services" },
    { key: "FAQ", path: "/FAQ" },
    { key: "contact", path: "/contact" },
  ];

  return (
    <header className="relative bg-[#2075ba] sticky top-0 z-50">
      {/* Decorative Shapes - Position based on language (left for English, right for Arabic) */}
      {/* Desktop: Full artwork with multiple overlapping shapes (20% width) */}
      <div 
        className={`hidden lg:block absolute top-0 h-full w-[20%] overflow-hidden pointer-events-none ${
          language === "ar" ? "right-0" : "left-0"
        }`}
        aria-hidden="true"
      >
        {/* Fallback background - ensures header remains readable if shapes fail */}
        <div className="absolute inset-0 bg-[#2075ba]"></div>
        
        {/* White base block - creates white background behind shapes */}
        <div className="absolute inset-0 bg-white"></div>
        
        {/* Blue slanted shape - back layer (deepest, widest) */}
        <div 
          className={`absolute top-0 w-[180%] h-full bg-[#2075ba] ${
            language === "ar" ? "right-0" : "left-0"
          }`}
          style={{ 
            transform: language === "ar" 
              ? 'rotate(-30deg) translate(20%, -40%)'
              : 'rotate(30deg) translate(-20%, -40%)',
            transformOrigin: language === "ar" ? 'top right' : 'top left'
          }}
        />
        
        {/* Orange slanted shape - middle layer */}
        <div 
          className={`absolute top-0 w-[180%] h-full bg-[#ef6820] ${
            language === "ar" ? "right-0" : "left-0"
          }`}
          style={{ 
            transform: language === "ar"
              ? 'rotate(-30deg) translate(40%, -20%)'
              : 'rotate(30deg) translate(-40%, -20%)',
            transformOrigin: language === "ar" ? 'top right' : 'top left'
          }}
        />
        
        {/* Blue slanted shape - front layer (topmost, narrower) */}
        <div 
          className={`absolute top-0 w-[130%] h-full bg-[#2075ba] ${
            language === "ar" ? "right-0" : "left-0"
          }`}
          style={{ 
            transform: language === "ar"
              ? 'rotate(-30deg) translate(80%, 10%)'
              : 'rotate(30deg) translate(-80%, 10%)',
            transformOrigin: language === "ar" ? 'top right' : 'top left'
          }}
        />
      </div>
      
      {/* Tablet: Simplified artwork with fewer shapes (30% width) */}
      <div 
        className={`hidden md:block lg:hidden absolute top-0 h-full w-[30%] overflow-hidden pointer-events-none ${
          language === "ar" ? "right-0" : "left-0"
        }`}
        aria-hidden="true"
      >
        {/* Fallback background */}
        <div className="absolute inset-0 bg-[#2075ba]"></div>
        
        {/* White base */}
        <div className="absolute inset-0 bg-white"></div>
        
        {/* Simplified: Two shapes instead of three */}
        <div 
          className={`absolute top-0 w-[160%] h-full bg-[#2075ba] ${
            language === "ar" ? "right-0" : "left-0"
          }`}
          style={{ 
            transform: language === "ar"
              ? 'rotate(-30deg) translate(30%, -30%)'
              : 'rotate(30deg) translate(-30%, -30%)',
            transformOrigin: language === "ar" ? 'top right' : 'top left'
          }}
        />
        <div 
          className={`absolute top-0 w-[140%] h-full bg-[#ef6820] ${
            language === "ar" ? "right-0" : "left-0"
          }`}
          style={{ 
            transform: language === "ar"
              ? 'rotate(-30deg) translate(50%, -10%)'
              : 'rotate(30deg) translate(-50%, -10%)',
            transformOrigin: language === "ar" ? 'top right' : 'top left'
          }}
        />
      </div>
      
      {/* Mobile: Single compact slanted accent (20% width) */}
      <div 
        className={`md:hidden absolute top-0 h-full w-[10%] overflow-hidden pointer-events-none ${
          language === "ar" ? "right-0" : "left-0"
        }`}
        aria-hidden="true"
      >
        {/* Fallback background */}
        <div className="absolute inset-0 bg-[#2075ba]"></div>
        
        {/* White base */}
        <div className="absolute inset-0 bg-white"></div>
        
        {/* Single blue slanted accent */}
        <div 
          className={`absolute top-0 w-[150%] h-full bg-[#2075ba] ${
            language === "ar" ? "right-0" : "left-0"
          }`}
          style={{ 
            transform: language === "ar"
              ? 'rotate(-30deg) translate(30%, -20%)'
              : 'rotate(30deg) translate(-30%, -20%)',
            transformOrigin: language === "ar" ? 'top right' : 'top left'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex justify-between items-center h-16">
          {/* Left Side - Logo (RTL) */}
          <div className="flex items-center flex-shrink-0">
            <Link
              to="/"
              className="flex items-center space-x-2 rtl:space-x-reverse"
            >
              <CaHupLogo className="h-8 w-8 sm:h-10 sm:w-10 text-white flex-shrink-0" />
              <span className="font-bold text-lg sm:text-xl text-white hidden sm:inline-block">
                {language === "ar" ? "CaHup" : "CaHup"}
              </span>
            </Link>
          </div>

          {/* Center - Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6 rtl:space-x-reverse flex-1 justify-center">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className="text-white hover:text-blue-200 font-medium text-xs xl:text-sm transition-colors whitespace-nowrap"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          {/* Right Side - Language & Auth (RTL) */}
          <div className="flex items-center space-x-2 sm:space-x-4 rtl:space-x-reverse flex-shrink-0">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 rtl:space-x-reverse text-white hover:text-blue-200 transition-colors"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <span className="text-xs sm:text-sm font-medium hidden sm:inline">{language === "ar" ? "EN" : "عربي"}</span>
            </button>

            {/* Not Logged In */}
            {!user ? (
              <>
                <Link
                  to="/auth/login"
                  className="text-white hover:text-blue-200 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap"
                >
                  {language === "ar" ? "تسجيل الدخول" : "Login"}
                </Link>
                <Link
                  to="/auth/register"
                  className="text-white hover:text-blue-200 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap hidden sm:inline-block"
                >
                  {language === "ar" ? "إنشاء حساب" : "Register"}
                </Link>
              </>
            ) : (
              <>
                {/* Notifications */}
                <button className="relative p-2 text-white hover:text-blue-200 transition-colors">
                  <Bell className="h-5 w-5" />

                </button>

                {/* Messages */}
                <button className="relative p-2 text-white hover:text-blue-200 transition-colors">
                  <MessageCircle className="h-5 w-5" />

                </button>

                {/* User Dropdown - External/Homepage version */}
                <ExternalUserDropdown user={user} />
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-white hover:text-blue-200"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-blue-700 bg-[#2075ba]">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  className="block px-3 py-2 text-white hover:text-blue-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t(item.key)}
                </Link>
              ))}
              <button
                onClick={toggleLanguage}
                className="block px-3 py-2 text-white hover:text-blue-200 font-medium"
              >
                {language === "ar" ? "English" : "عربي"}
              </button>

              {/* Conditional mobile links */}
              {!user ? (
                <>
                  <Link
                    to="/auth/login"
                    className="block px-3 py-2 text-white hover:text-blue-200 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {language === "ar" ? "تسجيل الدخول" : "Login"}
                  </Link>
                  <Link
                    to="/auth/register"
                    className="block px-3 py-2 text-white hover:text-blue-200 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {language === "ar" ? "إنشاء حساب" : "Register"}
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to={`/${user.role}`}
                    className="block px-3 py-2 text-white hover:text-blue-200 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {language === "ar" ? "لوحة التحكم" : "Dashboard"}
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-white hover:text-blue-200 font-medium"
                  >
                    {language === "ar" ? "تسجيل الخروج" : "Logout"}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      {/* Orange bottom accent line - 2px height (within 1-4px spec range) */}
      <div className="h-[2px] bg-[#ef6820] w-full" aria-hidden="true"></div>
    </header >
  );
};

export default Header;
