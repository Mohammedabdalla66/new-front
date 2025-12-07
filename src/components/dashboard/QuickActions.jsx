import React from "react";
import { Plus, FileText, Search, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext.jsx";

export const QuickActions = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const actions = [
    {
      id: "new-request",
      label: t("newRequest"),
      icon: Plus,
      onClick: () => navigate("/requests/new"),
      color: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
    },
    {
      id: "my-requests",
      label: t("myRequests"),
      icon: FileText,
      onClick: () => navigate("/requests"),
      color:
        "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
    },
    // {
    //   id: "browse",
    //   label: t("browseServices"),
    //   icon: Search,
    //   onClick: () => navigate("/browse"),
    //   color:
    //     "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
    // },
    {
      id: "settings",
      label: t("settings"),
      icon: Settings,
      onClick: () => navigate("/settings"),
      color: "bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-400",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {t("quickActions")}
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={action.onClick}
              className={`flex flex-col items-center justify-center p-4 rounded-lg ${action.color} hover:opacity-80 transition-opacity`}
            >
              <Icon className="w-6 h-6 mb-2" />
              <span className="text-xs font-medium text-center">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
