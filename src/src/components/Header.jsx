import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import {
  Menu,
  X,
  Bell,
  MessageCircle,
  User,
  ChevronDown,
  Calculator,
} from "lucide-react";

/** Props: { onAddProject } */
const Header = ({ onAddProject }) => {
  const { language, toggleLanguage, t, dir } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const navItems = [
    { key: "home", path: "/" },
    { key: "services", path: "/services" },
    { key: "accountants", path: "/accountants" },
    { key: "contact", path: "/contact" },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 rtl:space-x-reverse"
          >
            <Calculator className="h-8 w-8 text-blue-700" />
            <span className="font-bold text-xl text-gray-900">
              {language === "ar" ? "حسابي" : "AccountPro"}
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
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 text-sm font-medium text-gray-700 hover:text-blue-700 border border-gray-300 rounded-md hover:border-blue-300 transition-colors"
            >
              {language === "ar" ? "EN" : "عربي"}
            </button>

            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-blue-700 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </button>

            {/* Messages */}
            <button className="relative p-2 text-gray-600 hover:text-blue-700 transition-colors">
              <MessageCircle className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                2
              </span>
            </button>

            {/* Dashboard */}
            {/* <Link
              to="/dashboard"
              className="text-gray-700 hover:text-blue-700 font-medium transition-colors"
            >
              Dashboard
            </Link> */}

            {/* My Projects */}
            <Link
              to="/projects"
              className="text-gray-700 hover:text-blue-700 font-medium transition-colors"
            >
              {t("myProjects")}
            </Link>

            {/* Add Project Button */}
            <button
              onClick={onAddProject}
              className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 font-medium transition-colors"
            >
              {t("addProject")}
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="flex items-center space-x-2 rtl:space-x-reverse text-gray-700 hover:text-blue-700 transition-colors"
              >
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5" />
                </div>
                <ChevronDown className="h-4 w-4" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    {t("profile")}
                  </Link>
                  <Link
                    to="/dashboard/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    {t("settings")}
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    {t("logout")}
                  </button>
                </div>
              )}
            </div>
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
              <Link
                to="/dashboard"
                className="block px-3 py-2 text-gray-700 hover:text-blue-700 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/projects"
                className="block px-3 py-2 text-gray-700 hover:text-blue-700 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("myProjects")}
              </Link>
              <button
                onClick={() => {
                  onAddProject();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 bg-blue-700 text-white rounded-lg font-medium"
              >
                {t("addProject")}
              </button>
              <button
                onClick={toggleLanguage}
                className="block px-3 py-2 text-gray-700 hover:text-blue-700 font-medium"
              >
                {language === "ar" ? "English" : "عربي"}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
