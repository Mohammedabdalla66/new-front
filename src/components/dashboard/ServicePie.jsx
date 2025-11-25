import React from "react";
import { PieChart } from "lucide-react";

const ServicePie = ({ data = [], loading }) => {
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      </div>
    );
  }

  // Default mock data if no data provided
  const pieData = data.length > 0 ? data : [
    { name: "Tax Preparation", value: 35, color: "#3B82F6" },
    { name: "Bookkeeping", value: 25, color: "#10B981" },
    { name: "Auditing", value: 20, color: "#F59E0B" },
    { name: "Consulting", value: 20, color: "#8B5CF6" },
  ];

  const total = pieData.reduce((sum, item) => sum + (item.value || 0), 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Service Distribution
        </h3>
        <PieChart className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      </div>
      <div className="space-y-4">
        {pieData.map((item, index) => {
          const percentage = total > 0 ? ((item.value || 0) / total) * 100 : 0;
          return (
            <div key={index} className="flex items-center space-x-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.name}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {percentage.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServicePie;

