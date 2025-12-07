import React from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

/**
 * Reusable UserDropdown component for header menus
 * @param {Object} user - User object with name, email, avatar, role
 * @param {string} className - Additional CSS classes for the dropdown container
 */
const UserDropdown = ({ user, className = "" }) => {
  const { language } = useLanguage();

  // Get role-based routes
  const getDashboardRoute = () => {
    switch (user?.role) {
      case "client":
        return "/client";
      case "admin":
        return "/admin";
      case "serviceProvider":
      case "firm":
        return "/firm";
      default:
        return "/";
    }
  };

  if (!user) return null;

  return (
    <div className={`relative ${className}`}>
      {/* User Profile Button - No dropdown, just display */}
      <Link
        to={getDashboardRoute()}
        className="flex items-center space-x-2 rtl:space-x-reverse text-gray-700 hover:text-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-2 py-1"
      >
        {/* Avatar */}
        <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center overflow-hidden">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name || user.email || "User"}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          )}
        </div>

        {/* User Name - hidden on mobile */}
        <span className="hidden md:block text-sm font-medium dark:text-white">
          {user.name || user.email || "User"}
        </span>
      </Link>
    </div>
  );
};

export default UserDropdown;