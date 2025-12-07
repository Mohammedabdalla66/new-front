import React from "react";
import { Clock, CheckCircle, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const PendingList = ({ data = [], loading }) => {
  const { t } = useTranslation();
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  const pendingItems = data.length > 0 ? data : [
    {
      id: 1,
      type: "request",
      title: t("q4TaxFilingRequest"),
      user: "John Doe",
      date: "2024-01-15",
      status: "pending",
    },
    {
      id: 2,
      type: "proposal",
      title: t("bookkeepingServiceProposal"),
      user: "Jane Smith",
      date: "2024-01-14",
      status: "pending",
    },
    {
      id: 3,
      type: "transaction",
      title: t("paymentDispute"),
      user: "Mike Johnson",
      date: "2024-01-13",
      status: "pending",
    },
  ];

  const getIcon = (type) => {
    switch (type) {
      case "request":
        return Clock;
      case "proposal":
        return CheckCircle;
      case "transaction":
        return XCircle;
      default:
        return Clock;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {t("pendingApprovals")}
      </h3>
      <div className="space-y-3">
        {pendingItems.map((item) => {
          const Icon = getIcon(item.type);
          return (
            <div
              key={item.id}
              className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                <Icon className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {item.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {item.user} • {new Date(item.date).toLocaleDateString()}
                </p>
              </div>
              <button className="px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                {t("review")}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PendingList;

