import React from "react";
import { Link } from "react-router-dom";
import { Bell, Search, Menu, User } from "lucide-react";
import CaHupLogo from "../CaHupLogo";
import { useAuth } from "../../hooks/useAuth";


export const Header = ({ user: userProp, onToggleSidebar }) => {
  const { user: authUser } = useAuth();
  
  // Use auth user directly, fallback to prop if provided
  const user = authUser || userProp;
  
  // Get profile route - always go to client profile
  const getProfileRoute = () => {
    return "/client/profile";
  };
  

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
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
         <div className="flex items-center space-x-2">
            <CaHupLogo className="h-8 w-8" />
            <h1 className="text-xl font-bold text-gray-900">CaHup</h1>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:block md:flex-1 md:max-w-lg md:mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search bookings, services..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile Link */}
          {user && (
            <Link
              to={getProfileRoute()}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-2 py-1"
            >
              {/* Avatar */}
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center overflow-hidden">
                {user?.avatar ? (
                  <img
                    key={user.avatar} // Force re-render when avatar changes
                    src={user.avatar}
                    alt={user.name || user.email || "User"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to default if image fails to load
                      e.target.style.display = 'none';
                    }}
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
          )}
        </div>
      </div>
    </header>
  );
};
