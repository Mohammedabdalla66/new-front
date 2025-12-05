import React from "react";
import { Outlet } from "react-router-dom";
import StatsCard from "../components/dashboard/StatsCard.jsx";
import RecentActivity from "../components/dashboard/RecentActivity.jsx";
import { QuickActions } from "../components/dashboard/QuickActions.jsx";
import { useLanguage } from "../contexts/LanguageContext.jsx";
import {
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  TrendingUp,
} from "lucide-react";

export const ClientDashboard = () => {
  const { t } = useLanguage();

  const stats = [
    {
      title: t("totalBookings"),
      value: 24,
      change: { value: "+12%", type: "increase" },
      icon: Calendar,
      color: "blue",
    },
    {
      title: t("activeProjects"),
      value: 8,
      change: { value: "+3", type: "increase" },
      icon: Clock,
      color: "yellow",
    },
    {
      title: t("completed"),
      value: 16,
      change: { value: "+8", type: "increase" },
      icon: CheckCircle,
      color: "green",
    },
    {
      title: t("totalSpent"),
      value: "$45,280",
      change: { value: "+18%", type: "increase" },
      icon: DollarSign,
      color: "purple",
    },
  ];

  return (
    <div className="p-4 sm:p-6">
      {/* Header Section */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t("clientDashboardTitle")}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          {t("clientDashboardSubtitle")}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="lg:col-span-2">
          <RecentActivity data={[]} />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Upcoming Deadlines Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t("upcomingDeadlines")}
          </h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div className="min-w-0 flex-1">
                <p className="font-medium text-gray-900 dark:text-white truncate">
                  {t("q4TaxFiling")}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  {t("dueIn")} 3 {t("days")}
                </p>
              </div>
              <span className="text-red-600 dark:text-red-400 font-medium text-xs sm:text-sm ml-2">
                {t("urgent")}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="min-w-0 flex-1">
                <p className="font-medium text-gray-900 dark:text-white truncate">
                  {t("monthlyBookkeeping")}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  {t("dueIn")} 1 {t("week")}
                </p>
              </div>
              <span className="text-yellow-600 dark:text-yellow-400 font-medium text-xs sm:text-sm ml-2">
                {t("soon")}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="min-w-0 flex-1">
                <p className="font-medium text-gray-900 dark:text-white truncate">
                  {t("payrollProcessing")}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  {t("dueIn")} 2 {t("weeks")}
                </p>
              </div>
              <span className="text-blue-600 dark:text-blue-400 font-medium text-xs sm:text-sm ml-2">
                {t("scheduled")}
              </span>
            </div>
          </div>
        </div>

        {/* Monthly Overview Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t("monthlyOverview")}
          </h3>
          <div className="h-32 sm:h-48 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <div className="text-center p-4">
              <TrendingUp className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {t("chartVisualization")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClientDashboard;
