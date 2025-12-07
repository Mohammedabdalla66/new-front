import React from "react";
import { Clock, User, FileText, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const RecentActivity = ({ data = [], loading }) => {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 bg-gray-200 dark:bg-gray-700 rounded"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  const activities =
    data.length > 0
      ? data
      : [
          {
            id: 1,
            type: "request",
            title: t("newServiceRequestCreated"),
            user: "John Doe",
            time: `2 ${t("hoursAgo")}`,
            status: "pending",
          },
          {
            id: 2,
            type: "proposal",
            title: t("proposalSubmitted"),
            user: "Jane Smith",
            time: `5 ${t("hoursAgo")}`,
            status: "active",
          },
          {
            id: 3,
            type: "booking",
            title: t("bookingConfirmed"),
            user: "Mike Johnson",
            time: `1 ${t("daysAgo")}`,
            status: "completed",
          },
        ];

  const getIcon = (type) => {
    switch (type) {
      case "request":
        return FileText;
      case "proposal":
        return CheckCircle;
      case "booking":
        return User;
      default:
        return Clock;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "active":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {t("recentActivity")}
      </h3>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = getIcon(activity.type);
          return (
            <div
              key={activity.id}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {activity.title}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.user}
                  </p>
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    •
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.time}
                  </p>
                </div>
              </div>
              {activity.status && (
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                    activity.status
                  )}`}
                >
                  {t(activity.status)}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;
