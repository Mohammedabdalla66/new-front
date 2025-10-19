import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  Calendar,
  TrendingUp,
  CheckCircle,
  DollarSign,
  Plus,
  Phone,
  Upload,
  Clock,
  FileText,
  MessageSquare,
  AlertCircle,
} from "lucide-react";

const DashboardPage = () => {
  const { t } = useLanguage();

  const statsCards = [
    {
      title: t("totalBookings"),
      value: "24",
      change: "+12%",
      changeType: "positive",
      icon: Calendar,
      color: "blue",
    },
    {
      title: t("activeProjects"),
      value: "8",
      change: "+3",
      changeType: "positive",
      icon: TrendingUp,
      color: "green",
    },
    {
      title: t("completedProjects"),
      value: "156",
      change: "+8%",
      changeType: "positive",
      icon: CheckCircle,
      color: "purple",
    },
    {
      title: t("earnings"),
      value: "$12,450",
      change: "+15%",
      changeType: "positive",
      icon: DollarSign,
      color: "yellow",
    },
  ];

  const quickActions = [
    {
      title: t("createProposal"),
      icon: Plus,
      color: "blue",
      description: "Submit a new project proposal",
    },
    {
      title: t("scheduleCall"),
      icon: Phone,
      color: "green",
      description: "Schedule a client meeting",
    },
    {
      title: t("uploadDocument"),
      icon: Upload,
      color: "purple",
      description: "Upload project documents",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "proposal",
      title: "New proposal submitted for Tax Filing project",
      time: "2 hours ago",
      icon: FileText,
      color: "blue",
    },
    {
      id: 2,
      type: "message",
      title: "Received message from Sarah Johnson",
      time: "4 hours ago",
      icon: MessageSquare,
      color: "green",
    },
    {
      id: 3,
      type: "deadline",
      title: "Financial Statements project deadline in 2 days",
      time: "1 day ago",
      icon: AlertCircle,
      color: "red",
    },
    {
      id: 4,
      type: "completion",
      title: "Bookkeeping project completed successfully",
      time: "2 days ago",
      icon: CheckCircle,
      color: "green",
    },
  ];

  const upcomingDeadlines = [
    {
      id: 1,
      title: "Q4 Financial Statements",
      client: "ABC Company",
      deadline: "Dec 31, 2024",
      priority: "high",
      daysLeft: 3,
    },
    {
      id: 2,
      title: "Tax Return Filing",
      client: "XYZ Corp",
      deadline: "Jan 15, 2025",
      priority: "medium",
      daysLeft: 18,
    },
    {
      id: 3,
      title: "Monthly Bookkeeping",
      client: "DEF Ltd",
      deadline: "Jan 31, 2025",
      priority: "low",
      daysLeft: 34,
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900";
      case "medium":
        return "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900";
      case "low":
        return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900";
      default:
        return "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {card.value}
                  </p>
                  <p
                    className={`text-sm ${
                      card.changeType === "positive"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {card.change} from last month
                  </p>
                </div>
                <div
                  className={`p-3 rounded-lg bg-${card.color}-100 dark:bg-${card.color}-900`}
                >
                  <Icon
                    className={`w-6 h-6 text-${card.color}-600 dark:text-${card.color}-400`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t("quickActions")}
            </h3>
            <div className="space-y-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    className="w-full flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div
                      className={`p-2 rounded-lg bg-${action.color}-100 dark:bg-${action.color}-900 mr-3`}
                    >
                      <Icon
                        className={`w-5 h-5 text-${action.color}-600 dark:text-${action.color}-400`}
                      />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {action.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {action.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t("recentActivity")}
            </h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div
                      className={`p-2 rounded-lg bg-${activity.color}-100 dark:bg-${activity.color}-900`}
                    >
                      <Icon
                        className={`w-4 h-4 text-${activity.color}-600 dark:text-${activity.color}-400`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Deadlines */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t("upcomingDeadlines")}
          </h3>
          <div className="space-y-4">
            {upcomingDeadlines.map((deadline) => (
              <div
                key={deadline.id}
                className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {deadline.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {deadline.client}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    Due: {deadline.deadline}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                      deadline.priority
                    )}`}
                  >
                    {deadline.priority}
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {deadline.daysLeft}d
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Overview Chart Placeholder */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t("monthlyOverview")}
          </h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 dark:text-gray-400">
                Chart placeholder for monthly performance
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
