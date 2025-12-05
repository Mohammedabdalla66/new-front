import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Users,
  CreditCard,
  FileText,
  Settings,
  User,
  X,
  LogOut,
  ClipboardList,
  FileCheck,
  Package,
} from "lucide-react";
import { selectSidebarCollapsed } from "../../features/theme/themeSlice";
import { useAuth } from "../../hooks/useAuth";
import CaHupLogo from "../CaHupLogo";

export default function AdminSidebar({
  isMobileOpen = false,
  onMobileClose = () => {},
}) {
  const { t } = useTranslation();
  const collapsed = useSelector(selectSidebarCollapsed);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: t("dashboard"),
      path: "/admin",
      active: location.pathname === "/admin",
    },
    {
      icon: Building2,
      label: t("serviceProviders") || "Service Providers",
      path: "/admin/service-providers",
      active: location.pathname.startsWith("/admin/service-providers") || location.pathname === "/admin/firms",
    },
    {
      icon: Users,
      label: t("clients"),
      path: "/admin/clients",
      active: location.pathname === "/admin/clients",
    },
    {
      icon: FileCheck,
      label: "Pending Requests",
      path: "/admin/requests/pending",
      active: location.pathname === "/admin/requests/pending",
    },
    {
      icon: ClipboardList,
      label: "Proposals",
      path: "/admin/proposals",
      active: location.pathname === "/admin/proposals",
    },
    {
      icon: Package,
      label: "In-Progress Orders",
      path: "/admin/orders/in-progress",
      active: location.pathname === "/admin/orders/in-progress",
    },
    {
      icon: CreditCard,
      label: t("transactions"),
      path: "/admin/transactions",
      active: location.pathname === "/admin/transactions",
    },
    {
      icon: FileText,
      label: t("reports"),
      path: "/admin/reports",
      active: location.pathname === "/admin/reports",
    },
    {
      icon: Settings,
      label: t("settings"),
      path: "/admin/settings",
      active: location.pathname === "/admin/settings",
    },
    {
      icon: User,
      label: t("profile"),
      path: "/admin/profile",
      active: location.pathname === "/admin/profile",
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    onMobileClose();
  };

  const handleLogout = () => {
    // Use provided hook to logout, fallback to clearing storage
    try {
      logout && logout();
    } catch (e) {
      try {
        localStorage.removeItem("user");
      } catch (err) {}
    }
    navigate("/auth/login");
    onMobileClose();
  };

  return (
    <aside
      className={`${
        collapsed ? "w-64 md:w-16" : "w-64"
      } bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 transition-all duration-300 flex flex-col fixed inset-y-0 left-0 z-40 transform ${
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      } shadow-xl md:shadow-none md:static md:translate-x-0`}
    >
      <div className="p-4 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <CaHupLogo className="h-8 w-8" />
          {(!collapsed || isMobileOpen) && (
            <span className="font-bold text-lg text-neutral-900 dark:text-white">
              CaHup
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onMobileClose}
          className="inline-flex md:hidden items-center justify-center w-9 h-9 rounded-lg border border-neutral-200 dark:border-neutral-600 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 px-4 pb-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`${
                    item.active
                      ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border-r-2 border-primary-500"
                      : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                  } flex items-center space-x-3 rtl:space-x-reverse w-full px-3 py-2 rounded-lg transition-colors text-left rtl:text-right`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {(!collapsed || isMobileOpen) && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="px-4 py-3 border-t border-neutral-200 dark:border-neutral-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 rtl:space-x-reverse px-3 py-2 rounded-lg transition-colors text-left text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {(!collapsed || isMobileOpen) && (
            <span className="font-medium">{t("logout")}</span>
          )}
        </button>
      </div>
    </aside>
  );
}
