import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { serviceProviderAPI, messagesAPI, usersAPI } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import CaHupLogo from "../CaHupLogo";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Wallet,
  Briefcase,
  Search,
  Settings,
  HelpCircle,
  LogOut,
  X,
} from "lucide-react";

const Sidebar = ({ isOpen, onClose, currentPath }) => {
  const { t, dir } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { user: authUser } = useAuth();
  const [stats, setStats] = useState(null);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [userData, setUserData] = useState(null);
  const loadingUserDataRef = useRef(false);
  const loadingStatsRef = useRef(false);
  const loadingMessagesRef = useRef(false);

  // Load dashboard stats for badge counts
  useEffect(() => {
    const loadStats = async () => {
      const userRole = authUser?.role || userData?.role;
      if (userRole === 'serviceProvider' && !loadingStatsRef.current) {
        loadingStatsRef.current = true;
        try {
          const response = await serviceProviderAPI.getDashboardStats();
          if (response.data.success) {
            setStats(response.data.data);
          } else {
            console.error("Sidebar stats response not successful:", response.data);
          }
        } catch (error) {
          // Only log if it's not a rate limit error
          if (error?.response?.status !== 429) {
            console.error("Error loading sidebar stats:", error);
          }
          // Set default stats on error
          setStats({
            proposals: { total: 0, pending: 0, active: 0, accepted: 0 }
          });
        } finally {
          loadingStatsRef.current = false;
        }
      }
    };

    const loadUnreadMessages = async () => {
      const userRole = authUser?.role || userData?.role;
      if (!userRole || loadingMessagesRef.current) return;
      
      loadingMessagesRef.current = true;
      try {
        const response = userRole === 'client' 
          ? await messagesAPI.listClientConversations()
          : await messagesAPI.listServiceProviderConversations();
        
        if (response.data.success) {
          const chats = response.data.data || [];
          const totalUnread = chats.reduce((sum, chat) => {
            return sum + (userRole === 'client' 
              ? (chat.unreadCount?.client || 0)
              : (chat.unreadCount?.serviceProvider || 0));
          }, 0);
          setUnreadMessages(totalUnread);
        }
      } catch (error) {
        // Only log if it's not a rate limit error
        if (error?.response?.status !== 429) {
          console.error("Error loading unread messages:", error);
        }
      } finally {
        loadingMessagesRef.current = false;
      }
    };

    // Load user data from API only if not already loaded and authUser exists
    const loadUserData = async () => {
      // Use authUser as primary source, only fetch if we need more details
      if (authUser && !userData && !loadingUserDataRef.current) {
        loadingUserDataRef.current = true;
        try {
          const response = await usersAPI.getMe();
          if (response.data.success) {
            setUserData(response.data.data);
          } else {
            // Fallback to authUser
            setUserData(authUser);
          }
        } catch (error) {
          // Only log if it's not a rate limit error
          if (error?.response?.status !== 429) {
            console.error("Error loading user data:", error);
          }
          // Fallback to authUser
          if (authUser) {
            setUserData(authUser);
          }
        } finally {
          loadingUserDataRef.current = false;
        }
      } else if (authUser && !userData) {
        // Use authUser directly if API call fails or is rate limited
        setUserData(authUser);
      }
    };

    if (authUser) {
      // Use authUser directly first, then optionally fetch more details
      if (!userData) {
        setUserData(authUser);
      }
      
      // Load additional data with delays to avoid rate limiting
      const timer1 = setTimeout(() => {
        loadUserData();
      }, 100);
      
      const timer2 = setTimeout(() => {
        loadStats();
      }, 200);
      
      const timer3 = setTimeout(() => {
        loadUnreadMessages();
      }, 300);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [authUser]);

  const menuItems = [
    {
      id: "dashboard",
      label: t("dashboard"),
      icon: LayoutDashboard,
      path: "/firm",
      badge: null,
    },
    {
      id: "requests",
      label: t("myRequests"),
      icon: FileText,
      path: "/firm/requests",
      badge: stats?.proposals?.total || null,
    },
    {
      id: "messages",
      label: t("messages"),
      icon: MessageSquare,
      path: "/firm/messages",
      badge: unreadMessages > 0 ? String(unreadMessages) : null,
    },
    {
      id: "wallet",
      label: t("wallet"),
      icon: Wallet,
      path: "/firm/wallet",
      badge: null,
    },
    {
      id: "portfolio",
      label: t("portfolio"),
      icon: Briefcase,
      path: "/firm/portfolio",
      badge: null,
    },
    {
      id: "browse",
      label: t("browseProjects"),
      icon: Search,
      path: "/firm/browse",
      badge: null,
    },
    {
      id: "settings",
      label: t("settings"),
      icon: Settings,
      path: "/firm/settings",
      badge: null,
    },
    {
      id: "help",
      label: t("helpSupport"),
      icon: HelpCircle,
      path: "/firm/help",
      badge: null,
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("authUser");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out
        ${dir === "rtl" ? "right-0" : "left-0"}
        ${
          isOpen
            ? "translate-x-0"
            : dir === "rtl"
            ? "translate-x-full"
            : "-translate-x-full"
        }
        lg:translate-x-0 lg:static lg:inset-0
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <CaHupLogo className="h-8 w-8" />
            <span className="ml-3 text-xl font-semibold text-gray-800 dark:text-white">
              {t("accountingPlatform")}
            </span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              // Check if current path matches the item path
              // For dashboard (/firm), only exact match. For others, exact match or starts with path + "/"
              const isActive = item.path === "/firm" 
                ? currentPath === item.path
                : currentPath === item.path || currentPath.startsWith(item.path + "/");

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                    ${
                      isActive
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    }
                    ${dir === "rtl" ? "flex-row-reverse" : ""}
                  `}
                >
                  <div className="flex items-center">
                    <Icon
                      className={`w-5 h-5 ${dir === "rtl" ? "ml-3" : "mr-3"}`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Logout Button */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLogout}
              className={`
                w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900 rounded-lg transition-colors duration-200
                ${dir === "rtl" ? "flex-row-reverse" : ""}
              `}
            >
              <LogOut
                className={`w-5 h-5 ${dir === "rtl" ? "ml-3" : "mr-3"}`}
              />
              <span>{t("logout")}</span>
            </button>
          </div>
        </nav>

        {/* User Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center overflow-hidden">
              {userData?.avatar ? (
                <img
                  src={userData.avatar}
                  alt={userData.name || "User"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-600 dark:text-gray-300 font-medium">
                  {(userData?.name || "U").charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div className={`ml-3 ${dir === "rtl" ? "mr-3 ml-0" : ""}`}>
              <p className="text-sm font-medium text-gray-800 dark:text-white">
                {userData?.name || "User"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {userData?.role === "serviceProvider" ? t("serviceProvider") || "Service Provider" :
                 userData?.role === "client" ? t("client") || "Client" :
                 userData?.role === "admin" ? t("admin") || "Admin" : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

