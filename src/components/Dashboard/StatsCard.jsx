import React from 'react';

export const StatsCard = ({ title, value, change, icon: Icon, color }) => {
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-50',
    yellow: 'text-yellow-600 bg-yellow-50',
    green: 'text-green-600 bg-green-50',
    purple: 'text-purple-600 bg-purple-50',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        {Icon && (
          <div className={`p-3 rounded-lg ${colorClasses[color] || ''}`}>
            <Icon className={`w-6 h-6 ${colorClasses[color]?.split(' ')[0] || ''}`} />
          </div>
        )}
      </div>
      {change && (
        <p className={`mt-3 text-sm ${change.type === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
          {change.value} vs last period
        </p>
      )}
    </div>
  );
};