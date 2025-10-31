import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Users, 
  DollarSign, 
  Clock,
  Calendar,
  User,
  Check,
  X
} from 'lucide-react';

import Navbar from '../components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';
import StatsCard from './components/Dashboard/StatsCard';
import RevenueChart from './components/Dashboard/RevenueChart';
import ServicePie from './components/Dashboard/ServicePie';

import {
  fetchDashboard,
  fetchRecentActivity,
  fetchPendingItems,
  approveFirm,
  rejectFirm,
  approvePayment,
  rejectPayment,
  selectDashboardStats,
  selectRevenueSeries,
  selectRequestsByService,
  selectRecentActivity,
  selectPendingItems,
  selectDashboardLoading,
  selectDashboardError,
} from './features/dashboard/dashboardSlice';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const slideIn = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Recent Activity Table Component
const ActivityTable = ({ data, loading, t }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const locale = isRTL ? 'ar-SA' : 'en-US';
    
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatCurrency = (amount) => {
    if (!amount) return '-';
    const locale = isRTL ? 'ar-SA' : 'en-US';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700">
        <div className="animate-pulse">
          <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-48 mb-6"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="grid gap-4 md:grid-cols-4 grid-cols-1 space-y-2 md:space-y-0">
                <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden"
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
    >
      <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white flex items-center space-x-2 rtl:space-x-reverse">
          <Calendar className="w-5 h-5" />
          <span>{t('recentActivityTable')}</span>
        </h3>
      </div>
      
      <div className="overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden md:block">
          <table className="w-full">
            <thead className="bg-neutral-50 dark:bg-neutral-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                  {t('date')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                  {t('userFirm')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                  {t('action')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                  {t('amount')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-neutral-800">
              {data.map((activity, index) => (
                <motion.tr 
                  key={activity.id}
                  className="border-b border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  <td className="px-6 py-4 text-sm text-neutral-900 dark:text-white">
                    {formatDate(activity.timestamp)}
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-900 dark:text-white">
                    {activity.userOrFirm}
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-900 dark:text-white">
                    {activity.action}
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-900 dark:text-white">
                    {formatCurrency(activity.amount)}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Stacked View */}
        <div className="md:hidden">
          {data.map((activity, index) => (
            <motion.div 
              key={activity.id}
              className="p-4 border-b border-neutral-200 dark:border-neutral-700 last:border-0"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">{t('date')}</p>
                  <p className="text-sm text-neutral-900 dark:text-white">{formatDate(activity.timestamp)}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">{t('amount')}</p>
                  <p className="text-sm text-neutral-900 dark:text-white">{formatCurrency(activity.amount)}</p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-1 gap-2">
                <div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">{t('userFirm')}</p>
                  <p className="text-sm text-neutral-900 dark:text-white">{activity.userOrFirm}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">{t('action')}</p>
                  <p className="text-sm text-neutral-900 dark:text-white">{activity.action}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Pending Firm Card Component
const PendingFirmCard = ({ firms, loading, dispatch, actionLoading, t }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const handleApprove = (firmId) => {
    dispatch(approveFirm(firmId));
  };

  const handleReject = (firmId) => {
    dispatch(rejectFirm(firmId));
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const locale = isRTL ? 'ar-SA' : 'en-US';
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700">
        <div className="animate-pulse">
          <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-32 mb-6"></div>
          <div className="space-y-3">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg space-y-2">
                <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2"></div>
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-16"></div>
                  <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700"
      variants={slideIn}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.1 }}
    >
      <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white flex items-center space-x-2 rtl:space-x-reverse">
          <Building2 className="w-5 h-5" />
          <span>{t('pendingFirms')}</span>
        </h3>
      </div>
      
      <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
        {firms.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6 text-neutral-400" />
            </div>
            <p className="text-neutral-500 dark:text-neutral-400">No pending firms</p>
          </div>
        ) : (
          firms.map((firm, index) => (
            <motion.div 
              key={firm.id}
              className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between space-x-4 rtl:space-x-reverse">
                <div className="flex-1 min-w-0">
                  <div className="hidden md:block">
                    <h4 className="font-semibold text-neutral-900 dark:text-white">{firm.name}</h4>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">{firm.email}</p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{firm.phone}</p>
                    <p className="text-xs text-neutral-400 mt-1">{formatDate(firm.submittedAt)}</p>
                  </div>
                  <div className="md:hidden space-y-1">
                    <h4 className="font-semibold text-neutral-900 dark:text-white">{firm.name}</h4>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{firm.email}</p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{firm.phone}</p>
                    <p className="text-xs text-neutral-400">{formatDate(firm.submittedAt)}</p>
                  </div>
                </div>
                
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <button
                    onClick={() => handleApprove(firm.id)}
                    disabled={actionLoading[`firm-${firm.id}`]}
                    className="px-3 py-1.5 bg-accent-600 text-white rounded-lg hover:bg-accent-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1 rtl:space-x-reverse text-sm"
                  >
                    <Check className="w-4 h-4" />
                    <span>{t('approve')}</span>
                  </button>
                  <button
                    onClick={() => handleReject(firm.id)}
                    disabled={actionLoading[`firm-${firm.id}`]}
                    className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center space-x-1 rtl:space-x-reverse text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <X className="w-4 h-4" />
                    <span>{t('reject')}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

// Pending Payments Card Component
const PendingPaymentsCard = ({ transactions, loading, dispatch, actionLoading, t }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const handleApprove = (transactionId) => {
    dispatch(approvePayment(transactionId));
  };

  const handleReject = (transactionId) => {
    dispatch(rejectPayment(transactionId));
  };

  const formatCurrency = (amount) => {
    const locale = isRTL ? 'ar-SA' : 'en-US';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const locale = isRTL ? 'ar-SA' : 'en-US';
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700">
        <div className="animate-pulse">
          <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-36 mb-6"></div>
          <div className="space-y-3">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg space-y-2">
                <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2"></div>
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-16"></div>
                  <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700"
      variants={slideIn}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.2 }}
    >
      <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white flex items-center space-x-2 rtl:space-x-reverse">
          <DollarSign className="w-5 h-5" />
          <span>{t('pendingPayments')}</span>
        </h3>
      </div>
      
      <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
        {transactions.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6 text-neutral-400" />
            </div>
            <p className="text-neutral-500 dark:text-neutral-400">No pending payments</p>
          </div>
        ) : (
          transactions.map((transaction, index) => (
            <motion.div 
              key={transaction.id}
              className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between space-x-4 rtl:space-x-reverse">
                <div className="flex-1 min-w-0">
                  <div className="hidden md:block">
                    <h4 className="font-semibold text-neutral-900 dark:text-white">{transaction.clientName}</h4>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">{transaction.serviceName}</p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{transaction.firmName}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm font-medium text-neutral-900 dark:text-white">{formatCurrency(transaction.amount)}</p>
                      <p className="text-xs text-neutral-400">{formatDate(transaction.submittedAt)}</p>
                    </div>
                  </div>
                  <div className="md:hidden space-y-1">
                    <h4 className="font-semibold text-neutral-900 dark:text-white">{transaction.clientName}</h4>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{transaction.serviceName}</p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{transaction.firmName}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm font-medium text-neutral-900 dark:text-white">{formatCurrency(transaction.amount)}</p>
                      <p className="text-xs text-neutral-400">{formatDate(transaction.submittedAt)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <button
                    onClick={() => handleApprove(transaction.id)}
                    disabled={actionLoading[`transaction-${transaction.id}`]}
                    className="px-3 py-1.5 bg-accent-600 text-white rounded-lg hover:bg-accent-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1 rtl:space-x-reverse text-sm"
                  >
                    <Check className="w-4 h-4" />
                    <span>{t('approve')}</span>
                  </button>
                  <button
                    onClick={() => handleReject(transaction.id)}
                    disabled={actionLoading[`transaction-${transaction.id}`]}
                    className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center space-x-1 rtl:space-x-reverse text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <X className="w-4 h-4" />
                    <span>{t('reject')}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

const DashboardHome = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const stats = useSelector(selectDashboardStats);
  const revenueSeries = useSelector(selectRevenueSeries);
  const requestsByService = useSelector(selectRequestsByService);
  const recentActivity = useSelector(selectRecentActivity);
  const pendingItems = useSelector(selectPendingItems);
  const loading = useSelector(selectDashboardLoading);
  const error = useSelector(selectDashboardError);

  useEffect(() => {
    dispatch(fetchDashboard());
    dispatch(fetchRecentActivity());
    dispatch(fetchPendingItems());
  }, [dispatch]);

  const statsCards = [
    {
      title: t('totalFirms'),
      value: stats.totalFirms,
      delta: 12.5,
      icon: Building2,
      format: 'number'
    },
    {
      title: t('activeClients'),
      value: stats.activeClients,
      delta: 8.2,
      icon: Users,
      format: 'number'
    },
    {
      title: t('totalRevenue'),
      value: stats.totalRevenue,
      delta: 15.3,
      icon: DollarSign,
      format: 'currency'
    },
    {
      title: t('pendingTransactions'),
      value: stats.pendingTransactions,
      delta: -2.1,
      icon: Clock,
      format: 'number'
    },
  ];

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
            {t('error')}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsCards.map((card, index) => (
                <StatsCard
                  key={index}
                  title={card.title}
                  value={card.value}
                  delta={card.delta}
                  icon={card.icon}
                  format={card.format}
                  loading={loading.dashboard}
                />
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RevenueChart 
                data={revenueSeries} 
                loading={loading.dashboard}
              />
              <ServicePie 
                data={requestsByService} 
                loading={loading.dashboard}
              />
            </div>

            {/* Recent Activity Table */}
            <ActivityTable 
              data={recentActivity} 
              loading={loading.activity}
              t={t}
            />

            {/* Pending Approvals Section */}
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              variants={staggerChildren}
              initial="hidden"
              animate="visible"
            >
              <PendingFirmCard 
                firms={pendingItems.firms || []}
                loading={loading.pending}
                dispatch={dispatch}
                actionLoading={loading.actions}
                t={t}
              />
              <PendingPaymentsCard 
                transactions={pendingItems.transactions || []}
                loading={loading.pending}
                dispatch={dispatch}
                actionLoading={loading.actions}
                t={t}
              />
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardHome;

