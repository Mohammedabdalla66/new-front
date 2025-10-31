import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { 
  Check, 
  X, 
  Building2, 
  CreditCard, 
  Mail, 
  Phone,
  Calendar,
  DollarSign
} from 'lucide-react';
import { 
  approveFirm, 
  resolveTransaction,
  selectDashboardLoading 
} from '../../features/dashboard/dashboardSlice';

const PendingList = ({ data, loading = false }) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const actionLoading = useSelector(selectDashboardLoading).actions;

  const handleApproveFirm = async (firmId) => {
    await dispatch(approveFirm(firmId));
  };

  const handleResolveTransaction = async (transactionId) => {
    await dispatch(resolveTransaction(transactionId));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat(isRTL ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat(isRTL ? 'ar-SA' : 'en-US', {
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
        <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-40 mb-6 animate-pulse"></div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg animate-pulse">
              <div className="flex items-center justify-between">
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2"></div>
                  <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-1/3"></div>
                </div>
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-16"></div>
                  <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-16"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700">
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-6">
        {t('pendingApprovals')}
      </h3>

      <div className="space-y-6">
        {/* Pending Firms */}
        {data.firms && data.firms.length > 0 && (
          <div>
            <h4 className="text-md font-medium text-neutral-700 dark:text-neutral-300 mb-4 flex items-center space-x-2 rtl:space-x-reverse">
              <Building2 className="w-4 h-4" />
              <span>{t('pendingFirms')}</span>
            </h4>
            <div className="space-y-3">
              {data.firms.map((firm) => (
                <div key={firm.id} className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
                  {/* Desktop View */}
                  <div className="hidden md:flex items-center justify-between">
                    <div className="flex-1 grid grid-cols-3 gap-4">
                      <div>
                        <p className="font-medium text-neutral-900 dark:text-white">
                          {firm.name}
                        </p>
                        <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm text-neutral-500 mt-1">
                          <Mail className="w-3 h-3" />
                          <span>{firm.email}</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm text-neutral-500">
                          <Phone className="w-3 h-3" />
                          <span>{firm.phone}</span>
                        </div>
                        <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm text-neutral-500 mt-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(firm.submittedAt)}</span>
                        </div>
                      </div>
                      <div className="text-sm text-neutral-500">
                        <p>{firm.documents.length} documents</p>
                      </div>
                    </div>
                    <div className="flex space-x-2 rtl:space-x-reverse ml-4">
                      <button
                        onClick={() => handleApproveFirm(firm.id)}
                        disabled={actionLoading[`firm-${firm.id}`]}
                        className="px-3 py-1.5 bg-accent-600 text-white rounded-lg hover:bg-accent-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1 rtl:space-x-reverse text-sm"
                      >
                        <Check className="w-4 h-4" />
                        <span>{t('approve')}</span>
                      </button>
                      <button className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center space-x-1 rtl:space-x-reverse text-sm">
                        <X className="w-4 h-4" />
                        <span>{t('reject')}</span>
                      </button>
                    </div>
                  </div>

                  {/* Mobile View */}
                  <div className="md:hidden space-y-3">
                    <div>
                      <p className="font-medium text-neutral-900 dark:text-white">
                        {firm.name}
                      </p>
                      <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm text-neutral-500 mt-1">
                        <Mail className="w-3 h-3" />
                        <span>{firm.email}</span>
                      </div>
                      <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm text-neutral-500 mt-1">
                        <Phone className="w-3 h-3" />
                        <span>{firm.phone}</span>
                      </div>
                      <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm text-neutral-500 mt-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(firm.submittedAt)}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <button
                        onClick={() => handleApproveFirm(firm.id)}
                        disabled={actionLoading[`firm-${firm.id}`]}
                        className="flex-1 px-3 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1 rtl:space-x-reverse text-sm"
                      >
                        <Check className="w-4 h-4" />
                        <span>{t('approve')}</span>
                      </button>
                      <button className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center space-x-1 rtl:space-x-reverse text-sm">
                        <X className="w-4 h-4" />
                        <span>{t('reject')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pending Transactions */}
        {data.transactions && data.transactions.length > 0 && (
          <div>
            <h4 className="text-md font-medium text-neutral-700 dark:text-neutral-300 mb-4 flex items-center space-x-2 rtl:space-x-reverse">
              <CreditCard className="w-4 h-4" />
              <span>{t('pendingTransactionsList')}</span>
            </h4>
            <div className="space-y-3">
              {data.transactions.map((transaction) => (
                <div key={transaction.id} className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
                  {/* Desktop View */}
                  <div className="hidden md:flex items-center justify-between">
                    <div className="flex-1 grid grid-cols-4 gap-4">
                      <div>
                        <p className="font-medium text-neutral-900 dark:text-white">
                          {transaction.clientName}
                        </p>
                        <p className="text-sm text-neutral-500">
                          {transaction.serviceName}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm text-neutral-500">
                          <DollarSign className="w-3 h-3" />
                          <span>{formatCurrency(transaction.amount)}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500">
                          {transaction.firmName}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm text-neutral-500">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(transaction.submittedAt)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4">
                      <button
                        onClick={() => handleResolveTransaction(transaction.id)}
                        disabled={actionLoading[`transaction-${transaction.id}`]}
                        className="px-3 py-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                      >
                        {t('resolve')}
                      </button>
                    </div>
                  </div>

                  {/* Mobile View */}
                  <div className="md:hidden space-y-3">
                    <div>
                      <p className="font-medium text-neutral-900 dark:text-white">
                        {transaction.clientName}
                      </p>
                      <p className="text-sm text-neutral-500">
                        {transaction.serviceName}
                      </p>
                      <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm text-neutral-500 mt-1">
                        <DollarSign className="w-3 h-3" />
                        <span>{formatCurrency(transaction.amount)}</span>
                      </div>
                      <p className="text-sm text-neutral-500 mt-1">
                        {transaction.firmName}
                      </p>
                      <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm text-neutral-500 mt-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(transaction.submittedAt)}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleResolveTransaction(transaction.id)}
                      disabled={actionLoading[`transaction-${transaction.id}`]}
                      className="w-full px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      {t('resolve')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {(!data.firms || data.firms.length === 0) && (!data.transactions || data.transactions.length === 0) && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-neutral-400" />
            </div>
            <p className="text-neutral-500 dark:text-neutral-400">
              No pending approvals at the moment
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingList;