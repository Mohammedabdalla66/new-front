import React from 'react';
import { Outlet } from 'react-router-dom';
import { StatsCard } from '../components/Dashboard/StatsCard.jsx';
import { RecentActivity } from '../components/Dashboard/RecentActivity.jsx';
import { QuickActions } from '../components/Dashboard/QuickActions.jsx';
import { Calendar, DollarSign, CheckCircle, Clock, TrendingUp } from 'lucide-react';

export const ClientDashboard = () => {
  const stats = [
    {
      title: 'Total Bookings',
      value: 24,
      change: { value: '+12%', type: 'increase' },
      icon: Calendar,
      color: 'blue',
    },
    {
      title: 'Active Projects',
      value: 8,
      change: { value: '+3', type: 'increase' },
      icon: Clock,
      color: 'yellow',
    },
    {
      title: 'Completed',
      value: 16,
      change: { value: '+8', type: 'increase' },
      icon: CheckCircle,
      color: 'green',
    },
    {
      title: 'Total Spent',
      value: '$45,280',
      change: { value: '+18%', type: 'increase' },
      icon: DollarSign,
      color: 'purple',
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your account.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Q4 Tax Filing</p>
                <p className="text-sm text-gray-600">Due in 3 days</p>
              </div>
              <span className="text-red-600 font-medium">Urgent</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Monthly Bookkeeping</p>
                <p className="text-sm text-gray-600">Due in 1 week</p>
              </div>
              <span className="text-yellow-600 font-medium">Soon</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Payroll Processing</p>
                <p className="text-sm text-gray-600">Due in 2 weeks</p>
              </div>
              <span className="text-blue-600 font-medium">Scheduled</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Overview</h3>
          <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Chart visualization would go here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClientDashboard ;