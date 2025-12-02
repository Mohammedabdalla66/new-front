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
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center ml-2 space-x-2 rtl:space-x-reverse"
          >
            <CaHupLogo className="h-8 w-8" />
            <span className="font-bold text-xl text-gray-900">
              {language === "ar" ? "CaHup" : "CaHup"}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className="text-gray-700 hover:text-blue-700 font-medium transition-colors"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse mr-2">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 text-sm font-medium text-gray-700 hover:text-blue-700 border border-gray-300 rounded-md hover:border-blue-300 transition-colors"
            >
              {language === "ar" ? "EN" : "عربي"}
            </button>

            {/* Not Logged In */}
            {!user ? (
              <>
                <Link
                  to="/auth/login"
                  className="text-gray-700 hover:text-blue-700 font-medium"
                >
                  {language === "ar" ? "تسجيل الدخول" : "Login"}
                </Link>
                <Link
                  to="/auth/register"
                  className="text-gray-700 hover:text-blue-700 font-medium"
                >
                  {language === "ar" ? "إنشاء حساب" : "Register"}
                </Link>
              </>
            ) : (
              <>   
                {/* Notifications */}
                <button className="relative p-2 text-gray-600 hover:text-blue-700 transition-colors">
                  <Bell className="h-5 w-5" />
                  
                </button>

                {/* Messages */}
                <button className="relative p-2 text-gray-600 hover:text-blue-700 transition-colors">
                  <MessageCircle className="h-5 w-5" />
                  
                </button>

                {/* User Dropdown */}
                <UserDropdown user={user} />
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-gray-600 hover:text-blue-700"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-700 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t(item.key)}
                </Link>
              ))}
              ;
              <button
                onClick={toggleLanguage}
                className="block px-3 py-2 text-gray-700 hover:text-blue-700 font-medium"
              >
                {language === "ar" ? "English" : "عربي"}
              </button>

              {/* Conditional mobile links */}
              {!user ? (
                <>
                  <Link
                    to="/auth/login"
                    className="block px-3 py-2 text-gray-700 hover:text-blue-700 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {language === "ar" ? "تسجيل الدخول" : "Login"}
                  </Link>
                  <Link
                    to="/auth/register"
                    className="block px-3 py-2  text-gray-700 hover:text-blue-700 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {language === "ar" ? "إنشاء حساب" : "Register"}
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to={`/${user.role}`}
                    className="block px-3 py-2 text-gray-700 hover:text-blue-700 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {language === "ar" ? "لوحة التحكم" : "Dashboard"}
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-700 font-medium"
                  >
                    {language === "ar" ? "تسجيل الخروج" : "Logout"}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
