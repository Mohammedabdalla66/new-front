import React from 'react';
import { useTranslation } from 'react-i18next';

const StatsCard = ({ 
  title, 
  value, 
  delta, 
  icon: Icon, 
  loading = false,
  format = 'number' 
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const formatValue = (val) => {
    if (loading) return '---';
    
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat(isRTL ? 'ar-SA' : 'en-US', {
          style: 'currency',
          currency: 'SAR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(val);
      case 'number':
        return new Intl.NumberFormat(isRTL ? 'ar-SA' : 'en-US').format(val);
      default:
        return val;
    }
  };

  const getDeltaColor = (delta) => {
    if (delta > 0) return 'text-accent-600';
    if (delta < 0) return 'text-red-600';
    return 'text-neutral-500';
  };

  const getDeltaIcon = (delta) => {
    if (delta > 0) return '↗';
    if (delta < 0) return '↘';
    return '→';
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-24"></div>
            <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-20"></div>
            <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-16"></div>
          </div>
          <div className="w-12 h-12 bg-neutral-200 dark:bg-neutral-700 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
            {title}
          </p>
          <p className="text-2xl font-bold text-neutral-900 dark:text-white">
            {formatValue(value)}
          </p>
          {delta !== undefined && (
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <span className={`text-sm font-medium ${getDeltaColor(delta)}`}>
                {getDeltaIcon(delta)} {Math.abs(delta)}%
              </span>
              <span className="text-xs text-neutral-500">
                {t('last30Days')}
              </span>
            </div>
          )}
        </div>
        <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;