import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Download } from 'lucide-react';

const RevenueChart = ({ data, loading = false }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [dateRange, setDateRange] = useState('30d');

  const formatCurrency = (value) => {
    return new Intl.NumberFormat(isRTL ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat(isRTL ? 'ar-SA' : 'en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-neutral-800 p-3 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {formatDate(label)}
          </p>
          <p className="text-lg font-semibold text-primary-600">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center justify-between mb-6">
          <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-32 animate-pulse"></div>
          <div className="flex space-x-2 rtl:space-x-reverse">
            <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-20 animate-pulse"></div>
            <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-8 animate-pulse"></div>
          </div>
        </div>
        <div className="h-80 bg-neutral-100 dark:bg-neutral-700 rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
          {t('revenueTrends')}
        </h3>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-1.5 text-sm border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="7d">7 {t('daysAgo')}</option>
            <option value="30d">30 {t('daysAgo')}</option>
            <option value="90d">90 {t('daysAgo')}</option>
          </select>
          <button
            className="p-1.5 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            title={t('export')}
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              stroke="#64748b"
              fontSize={12}
            />
            <YAxis 
              tickFormatter={(value) => formatCurrency(value)}
              stroke="#64748b"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="amount" 
              stroke="#0B61FF" 
              strokeWidth={3}
              dot={{ fill: '#0B61FF', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#0B61FF', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;