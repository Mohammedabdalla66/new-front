import React from "react";
import { TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";

const RevenueChart = ({ data = [], loading }) => {
  const { t } = useTranslation();
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  // Default mock data if no data provided
  const chartData = data.length > 0 ? data : [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 19000 },
    { month: "Mar", revenue: 15000 },
    { month: "Apr", revenue: 25000 },
    { month: "May", revenue: 22000 },
    { month: "Jun", revenue: 30000 },
  ];

  const maxRevenue = Math.max(...chartData.map((d) => d.revenue || 0));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {t("revenueTrend")}
        </h3>
        <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
      </div>
      <div className="h-64 flex items-end justify-between space-x-2">
        {chartData.map((item, index) => {
          const height = ((item.revenue || 0) / maxRevenue) * 100;
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full flex flex-col items-center justify-end h-full">
                <div
                  className="w-full bg-blue-600 dark:bg-blue-500 rounded-t-lg transition-all hover:opacity-80"
                  style={{ height: `${Math.max(height, 5)}%` }}
                  title={`${item.month}: ${item.revenue?.toLocaleString() || 0} OMR`}
                />
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                {item.month}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RevenueChart;

