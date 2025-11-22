import React from "react";
import { useLanguage } from "../../contexts/LanguageContext.jsx";

export const RequestsTable = ({ requests, onViewDetails }) => {
  const { t } = useLanguage();
  
  return (
    <div className="overflow-x-auto">
      {/* Desktop Table */}
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 hidden sm:table">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              {t("requestTitle")}
            </th>
            <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              {t("status")}
            </th>
            <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              {t("offers")}
            </th>
            <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              {t("lastUpdated")}
            </th>
            <th className="px-3 lg:px-6 py-3" />
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {requests.map((r) => (
            <tr key={r.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="px-3 lg:px-6 py-4 text-sm text-gray-900 dark:text-white">
                <div className="font-medium">{r.title}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-xs">
                  {r.description}
                </div>
              </td>
              <td className="px-3 lg:px-6 py-4 text-sm capitalize">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    r.status === "pending"
                      ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                      : r.status === "submitted"
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                      : r.status === "open"
                      ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                      : r.status === "in-progress"
                      ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                      : r.status === "completed"
                      ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                      : r.status === "rejected"
                      ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {r.status.replace("-", " ")}
                </span>
              </td>
              <td className="px-3 lg:px-6 py-4 text-sm text-gray-900 dark:text-white">
                {r.offers}
              </td>
              <td className="px-3 lg:px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                {new Date(r.lastUpdated).toLocaleDateString()}
              </td>
              <td className="px-3 lg:px-6 py-4 text-right">
                <button
                  onClick={() => onViewDetails?.(r.id)}
                  className="px-3 py-1 text-xs sm:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t("viewDetails")}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Cards */}
      <div className="sm:hidden space-y-3">
        {requests.map((r) => (
          <div
            key={r.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {r.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                  {r.description}
                </p>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded-full ml-2 ${
                  r.status === "pending"
                    ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                    : r.status === "submitted"
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                    : r.status === "open"
                    ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                    : r.status === "in-progress"
                    ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                    : r.status === "completed"
                    ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                    : r.status === "rejected"
                    ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                }`}
              >
                {r.status.replace("-", " ")}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
              <span>{r.offers} {t("offers").toLowerCase()}</span>
              <span>{new Date(r.lastUpdated).toLocaleDateString()}</span>
            </div>
            <button
              onClick={() => onViewDetails?.(r.id)}
              className="w-full px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t("viewDetails")}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
