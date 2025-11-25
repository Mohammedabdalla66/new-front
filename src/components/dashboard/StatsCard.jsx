import React from "react";

const StatsCard = ({ title, value, change, icon: Icon, color, delta, format, loading }) => {
  // Support both old format (change object) and new format (delta number)
  const changeValue = change?.value || (delta ? `${delta > 0 ? '+' : ''}${delta.toFixed(1)}%` : null);
  const changeType = change?.type || (delta > 0 ? 'increase' : delta < 0 ? 'decrease' : 'neutral');

  // Format value based on format prop
  const formattedValue = format === 'currency' 
    ? typeof value === 'number' ? `$${value.toLocaleString()}` : value
    : format === 'number'
    ? typeof value === 'number' ? value.toLocaleString() : value
    : value;

  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
    yellow: "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400",
    green: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
    purple: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</h3>
        {Icon && (
          <div className={`p-2 rounded-lg ${colorClasses[color] || colorClasses.blue}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      <div className="flex items-baseline justify-between">
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{formattedValue}</p>
        {changeValue && (
          <span
            className={`text-sm font-medium ${
              changeType === 'increase'
                ? 'text-green-600 dark:text-green-400'
                : changeType === 'decrease'
                ? 'text-red-600 dark:text-red-400'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            {changeValue}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatsCard;

