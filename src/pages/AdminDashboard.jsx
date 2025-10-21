import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { 
  Building2, 
  Users, 
  DollarSign, 
  Clock 
} from 'lucide-react';

import Navbar from '../components/Layout/Navbar';
import AdminSidebar from '../components/sidebar/AdminSidebar';
import StatsCard from '../components/Dashboard/StatsCard';
import RevenueChart from '../components/Dashboard/RevenueChart';
import ServicePie from '../components/Dashboard/ServicePie';
import RecentActivity from '../components/Dashboard/RecentActivity';
import PendingList from '../components/Dashboard/PendingList';

import {
  fetchDashboard,
  fetchRecentActivity,
  fetchPendingItems,
  selectDashboardStats,
  selectRevenueSeries,
  selectRequestsByService,
  selectRecentActivity,
  selectPendingItems,
  selectDashboardLoading,
  selectDashboardError,
} from '../features/dashboard/dashboardSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  
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
      <AdminSidebar />
      
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

            {/* Activity and Pending Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecentActivity 
                data={recentActivity} 
                loading={loading.activity}
              />
              <PendingList 
                data={pendingItems} 
                loading={loading.pending}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;