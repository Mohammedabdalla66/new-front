import React, { useState } from "react";
import {
  LayoutDashboard,
  Calendar,
  User,
  Settings,
  FileText,
  MessageSquare,
  Wallet,
  HelpCircle,
  LogOut,
  X,
} from "lucide-react";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "requests", label: "My Requests", icon: Calendar },
  { id: "messages", label: "Messages", icon: MessageSquare, badge: 3 },
  { id: "wallet", label: "Wallet", icon: Wallet },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "profile", label: "My Profile", icon: User },
];

const bottomItems = [
  { id: "settings", label: "Settings", icon: Settings },
  { id: "help", label: "Help & Support", icon: HelpCircle },
  { id: "logout", label: "Logout", icon: LogOut },
];

export default function ClientSidebar({
  activeTab,
  onTabChange,
  unreadMessagesCount = 0,
  isMobileOpen = false,
  onMobileClose = () => {},
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const containerWidth = isCollapsed ? "w-20" : "w-64";
  const labelClass = `inline ${isCollapsed ? "md:hidden" : "md:inline"}`;
  const mobileVisibility = isMobileOpen ? "translate-x-0" : "-translate-x-full";

  const handleTabClick = (tabId) => {
    onTabChange(tabId);
    onMobileClose();
  };

  return (
    <div
      className={`${containerWidth} bg-slate-900 text-slate-300 min-h-screen flex flex-col fixed inset-y-0 left-0 z-40 transform ${mobileVisibility} transition-transform duration-200 ease-in-out shadow-xl md:shadow-none md:static md:translate-x-0`}
    >
      <div className="flex items-center justify-between px-3 md:px-4 py-4 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-[#0a6308] text-white flex items-center justify-center shadow-sm">
            AF
          </div>
          <span
            className={`${labelClass} text-sm font-semibold text-white bg-slate-700 rounded-full px-3 py-1`}
          >
            AccounTax Pro
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onMobileClose}
            className="inline-flex md:hidden items-center justify-center w-9 h-9 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsCollapsed((v) => !v)}
            className="hidden md:inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
              className="w-5 h-5"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <nav className="flex-1 px-2 md:px-3 py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleTabClick(item.id)}
                  className={`group w-full flex items-center gap-3 px-3 md:px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                    isActive
                      ? "bg-slate-700 text-white"
                      : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isActive
                        ? "text-white"
                        : "text-slate-400 group-hover:text-white"
                    }`}
                  />
                  <span className={`font-medium ${labelClass}`}>
                    {item.label}
                  </span>
                  {item.id === "messages" && unreadMessagesCount > 0 && (
                    <span
                      className={`ml-auto text-xs rounded-full px-2 py-1 min-w-[20px] text-center ${labelClass} bg-red-500 text-white`}
                    >
                      {unreadMessagesCount}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-2 md:px-3 py-3 border-t border-slate-800">
        <ul className="space-y-1">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleTabClick(item.id)}
                  className={`group w-full flex items-center gap-3 px-3 md:px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                    isActive
                      ? "bg-slate-700 text-white"
                      : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isActive
                        ? "text-white"
                        : "text-slate-400 group-hover:text-white"
                    }`}
                  />
                  <span className={`font-medium ${labelClass}`}>
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
