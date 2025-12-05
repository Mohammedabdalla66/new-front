import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../hooks/useAuth";
import CaHupLogo from "./CaHupLogo";
import ExternalUserDropdown from "./ui/ExternalUserDropdown";
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
    <header className="bg-[#1E40AF] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Side - Language & Auth (RTL) */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 rtl:space-x-reverse text-white hover:text-blue-200 transition-colors"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <span className="text-sm font-medium">{language === "ar" ? "EN" : "عربي"}</span>
            </button>

            {/* Not Logged In */}
            {!user ? (
              <>
                <Link
                  to="/auth/login"
                  className="text-white hover:text-blue-200 font-medium text-sm transition-colors"
                >
                  {language === "ar" ? "تسجيل الدخول" : "Login"}
                </Link>
                <Link
                  to="/auth/register"
                  className="text-white hover:text-blue-200 font-medium text-sm transition-colors"
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
          </div>

          {/* Right Side - Logo (RTL) */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-2 rtl:space-x-reverse"
            >
              <CaHupLogo className="h-8 w-8 text-white" />
              <span className="font-bold text-xl text-white">
                {language === "ar" ? "CaHup" : "CaHup"}
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-white hover:text-blue-200 mr-2 rtl:mr-0 rtl:ml-2"
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
          <div className="md:hidden border-t border-blue-700 bg-[#1E40AF]">
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
      {/* Orange divider line */}
      <div className="h-0.5 bg-[#F97316]"></div>
    </header>
  );
};

export default Header;
