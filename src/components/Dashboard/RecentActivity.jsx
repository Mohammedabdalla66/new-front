import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Building2, 
  CreditCard, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  ArrowRight
} from 'lucide-react';

const RecentActivity = ({ data, loading = false }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const getActivityIcon = (type) => {
    switch (type) {
      case 'firm_request':
        return Building2;
      case 'payment':
        return CreditCard;
      case 'dispute':
        return AlertTriangle;
      case 'firm_approved':
        return CheckCircle;
      default:
        return Clock;
    }
  };

  const getActivityColor = (status) => {
    switch (status) {
      case 'completed':
      case 'approved':
        return 'text-accent-600 bg-accent-100 dark:bg-accent-900/20';
      case 'pending':
      case 'processing':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'flagged':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default:
        return 'text-neutral-600 bg-neutral-100 dark:bg-neutral-700';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now - time) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return t('justNow');
    if (diffInHours < 24) return `${diffInHours} ${t('hoursAgo')}`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} ${t('daysAgo')}`;
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center justify-between mb-6">
          <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-32 animate-pulse"></div>
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-16 animate-pulse"></div>
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3 rtl:space-x-reverse animate-pulse">
              <div className="w-10 h-10 bg-neutral-200 dark:bg-neutral-700 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4"></div>
                <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
          {t('recentActivity')}
        </h3>
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1 rtl:space-x-reverse">
          <span>{t('viewAll')}</span>
          <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {data.map((activity) => {
          const Icon = getActivityIcon(activity.type);
          const colorClasses = getActivityColor(activity.status);
          
          return (
            <div key={activity.id} className="flex items-start space-x-3 rtl:space-x-reverse p-3 hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-lg transition-colors">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClasses}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-neutral-900 dark:text-white font-medium">
                  {activity.message}
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  {formatTimeAgo(activity.timestamp)}
                </p>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getActivityColor(activity.status)}`}>
                {t(activity.status)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;