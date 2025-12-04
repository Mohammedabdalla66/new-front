import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate, Link } from "react-router-dom";
import { User, Settings, LogOut, ChevronDown, LayoutDashboard } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useLanguage } from "../../contexts/LanguageContext";

/**
 * External UserDropdown component for homepage/public pages
 * @param {Object} user - User object with name, email, avatar, role
 * @param {string} className - Additional CSS classes for the dropdown container
 */
const ExternalUserDropdown = ({ user, className = "" }) => {
  const { logout } = useAuth();
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

  // Calculate dropdown position
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
      const scrollX = window.scrollX || window.pageXOffset;
      const dropdownWidth = 192; // w-48 = 192px
      
      // Calculate position - align right edge of dropdown with right edge of trigger
      const isRTL = language === "ar" || document.documentElement.dir === "rtl";
      const left = isRTL 
        ? rect.left + scrollX
        : rect.right + scrollX - dropdownWidth;
      
      setDropdownPosition({
        top: rect.bottom + scrollY + 4,
        left: left,
      });
    }
  }, [isOpen, language]);

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (
        (dropdownRef.current && dropdownRef.current.contains(event.target)) ||
        (triggerRef.current && triggerRef.current.contains(event.target))
      ) {
        return;
      }
      
      setIsOpen(false);
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const timeoutId = setTimeout(() => {
      document.addEventListener("click", handleClickOutside, true);
    }, 100);
    
    document.addEventListener("keydown", handleEscape);
    
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleClickOutside, true);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  // Get role-based routes
  const getProfileRoute = () => {
    switch (user?.role) {
      case "client":
        return "/client/profile";
      case "admin":
        return "/admin/profile";
      case "serviceProvider":
      case "firm":
        return "/firm/profile";
      default:
        return "/";
    }
  };

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

  const getSettingsRoute = () => {
    switch (user?.role) {
      case "client":
        return "/client/settings";
      case "admin":
        return "/admin/settings";
      case "serviceProvider":
      case "firm":
        return "/firm/settings";
      default:
        return "/";
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    e.stopPropagation();
    logout();
    setIsOpen(false);
    navigate("/auth/login");
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  if (!user) return null;

  return (
    <>
      <div ref={triggerRef} className={`relative ${className}`}>
        {/* Trigger Button */}
        <button
          onClick={toggleDropdown}
          className="flex items-center space-x-2 rtl:space-x-reverse text-gray-700 hover:text-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-2 py-1"
          aria-expanded={isOpen}
          aria-haspopup="true"
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

          {/* Chevron Icon */}
          <ChevronDown
            className={`h-4 w-4 text-gray-400 dark:text-gray-500 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Dropdown Menu - Rendered via Portal */}
      {isOpen && typeof document !== 'undefined' && createPortal(
        <div
          ref={dropdownRef}
          onClick={(e) => {
            e.stopPropagation();
            if (e.nativeEvent) {
              e.nativeEvent.stopImmediatePropagation();
            }
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
            if (e.nativeEvent) {
              e.nativeEvent.stopImmediatePropagation();
            }
          }}
          className="fixed w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-[9999]"
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
          }}
          role="menu"
          aria-orientation="vertical"
        >
          {/* User Info Section */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {user.name || "User"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user.email}
            </p>
          </div>

          {/* Menu Items */}
          <Link
            to={getDashboardRoute()}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            className="flex items-center space-x-3 rtl:space-x-reverse px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            role="menuitem"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>{t("dashboard") || (language === "ar" ? "لوحة التحكم" : "Dashboard")}</span>
          </Link>

          <Link
            to={getProfileRoute()}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            className="flex items-center space-x-3 rtl:space-x-reverse px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            role="menuitem"
          >
            <User className="h-4 w-4" />
            <span>{t("profile") || (language === "ar" ? "الملف الشخصي" : "Profile")}</span>
          </Link>

          <Link
            to={getSettingsRoute()}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            className="flex items-center space-x-3 rtl:space-x-reverse px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            role="menuitem"
          >
            <Settings className="h-4 w-4" />
            <span>{t("settings") || (language === "ar" ? "الإعدادات" : "Settings")}</span>
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 rtl:space-x-reverse px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left"
            role="menuitem"
          >
            <LogOut className="h-4 w-4" />
            <span>{t("logout") || (language === "ar" ? "تسجيل الخروج" : "Logout")}</span>
          </button>
        </div>,
        document.body
      )}
    </>
  );
};

export default ExternalUserDropdown;

