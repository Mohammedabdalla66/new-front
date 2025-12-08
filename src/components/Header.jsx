import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../hooks/useAuth";
import CaHupLogo from "./CaHupLogo";
import ExternalUserDropdown from "./ui/ExternalUserDropdown";
import { Menu, X, Bell, MessageCircle, LayoutDashboard, User, Settings, LogOut, Globe, Circle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  const getDashboardPath = (role) => {
    if (role === 'serviceProvider' || role === 'firm') return '/firm';
    return `/${role}`;
  };

  const getProfilePath = (role) => {
    if (role === 'serviceProvider' || role === 'firm') return '/firm/profile';
    return `/${role}/profile`;
  };

  const getSettingsPath = (role) => {
    if (role === 'serviceProvider' || role === 'firm') return '/firm/settings';
    return `/${role}/settings`;
  };

  return (
    <header className="bg-[#2075ba] border-b-8 border-[#ED5C2B] sticky top-0 z-50">
      {/* Decorative Shapes - Position based on language (left for English, right for Arabic) */}
      {/* Decorative Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Background is already blue via header class */}

        {/* White Logo Backing Area */}
        <div
          className={`absolute top-0 h-full bg-white z-0 transform transition-transform duration-300 ${language === "ar"
            ? "right-0 skew-x-[30deg] origin-top-right translate-x-[20%]"
            : "left-0 -skew-x-[30deg] origin-top-left -translate-x-[20%]"
            }`}
          style={{ width: '28%' }} // Wide enough to cover logo, scales with screen
        />

        {/* Rectangular fix for the corner gap (to ensure corner is fully white) */}
        <img src="./nav.png" className={`absolute  ${language == "en" && "rotate-180"} start-4 sm:start-24 lg:start-36 w-32 sm:w-56 lg:w-64 top-0 h-full object-cover`} />


      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex justify-between items-center h-16">
          {/* Left Side - Logo (RTL) */}
          <div className="flex items-center flex-shrink-0">
            <Link
              to="/"
              className="flex items-center space-x-2 rtl:space-x-reverse"
            >
              <img src="./navLogo.png" className="w-8 sm:w-10 md:w-12 relative sm:absolute sm:-start-6 md:start-8 lg:-start-16" />
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
          <div className="flex items-center space-x-8 sm:space-x-16 rtl:space-x-reverse flex-shrink-0">
            {/* Language Toggle */}

            {/* Not Logged In */}
            {!user ? (
              <div className="flex items-center gap-x-6">
                <Link
                  to="/auth/login"
                  className="text-white hover:text-blue-200 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap"
                >
                  <div className="flex gap-x-3 items-center">
                    <Circle stroke="white" fill="white" size={12} className="mt-1" />
                    {language === "ar" ? "تسجيل الدخول" : "Login"}
                  </div>
                </Link>
                <Link
                  to="/auth/register"
                  className="text-white hover:text-blue-200 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap hidden sm:inline-block"
                >
                  <div className="flex gap-x-3 items-center">
                    <Circle stroke="white" fill="white" size={12} className="mt-1" />
                    {language === "ar" ? "إنشاء حساب" : "Register"}
                  </div>
                </Link>
              </div>
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
                <div className="hidden lg:block">
                  <ExternalUserDropdown user={user} />
                </div>
              </>
            )}

            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 rtl:space-x-reverse text-white hover:text-blue-200 transition-colors"
            >
              <Globe className="h-5 w-5" />
              <span className="text-xs sm:text-sm font-medium hidden sm:inline">{language === "ar" ? "EN" : "عربي"}</span>
            </button>


            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-white hover:text-blue-200 focus:outline-none"
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
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden border-t border-blue-700 bg-[#2075ba] overflow-hidden"
            >
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

                {/* Language Toggle in Mobile Menu */}
                {/* Keep consistency with desktop toggle, maybe not needed if it's already in the top bar? 
                    Actually, it IS in the top bar (line 175) visible on all screens. 
                    So removing it from here to reduce clutter is better, or keep it if top bar is crowded?
                    Top bar has it. Removing duplicate. 
                    Wait, previous code had it (lines 248-253).
                    I'll remove it to clean up, as it's definitely in the top bar.
                */}

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
                    <div className="border-t border-blue-400 my-2 pt-2">
                      <div className="px-3 py-2 flex items-center space-x-3 rtl:space-x-reverse text-blue-100 text-sm">
                        {user.avatar ? (
                          <img src={user.avatar} alt="User" className="w-8 h-8 rounded-full bg-blue-800 object-cover" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center">
                            <User className="h-4 w-4 text-white" />
                          </div>
                        )}
                        <span className="font-medium">{user.name || user.email}</span>
                      </div>

                      <Link
                        to={getDashboardPath(user.role)}
                        className="flex items-center space-x-3 rtl:space-x-reverse px-3 py-2 text-white hover:text-blue-200 font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <LayoutDashboard className="h-5 w-5" />
                        <span>{language === "ar" ? "لوحة التحكم" : "Dashboard"}</span>
                      </Link>

                      <Link
                        to={getProfilePath(user.role)}
                        className="flex items-center space-x-3 rtl:space-x-reverse px-3 py-2 text-white hover:text-blue-200 font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <User className="h-5 w-5" />
                        <span>{language === "ar" ? "الملف الشخصي" : "Profile"}</span>
                      </Link>

                      <Link
                        to={getSettingsPath(user.role)}
                        className="flex items-center space-x-3 rtl:space-x-reverse px-3 py-2 text-white hover:text-blue-200 font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Settings className="h-5 w-5" />
                        <span>{language === "ar" ? "الإعدادات" : "Settings"}</span>
                      </Link>

                      <button
                        onClick={() => {
                          logout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full text-left flex items-center space-x-3 rtl:space-x-reverse px-3 py-2 text-red-200 hover:text-red-100 font-medium"
                      >
                        <LogOut className="h-5 w-5" />
                        <span>{language === "ar" ? "تسجيل الخروج" : "Logout"}</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Orange bottom accent line - 2px height (within 1-4px spec range) */}
      <div className="h-[2px] bg-[#ef6820] w-full" aria-hidden="true"></div>
    </header >
  );
};

export default Header;