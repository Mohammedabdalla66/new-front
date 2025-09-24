import React from 'react';
import { CheckCircle2, Clock, MessageSquare } from 'lucide-react';

export const RecentActivity = () => {
  const activities = [
    { id: 1, type: 'booking', title: 'Tax Filing', time: '2 hours ago', icon: CheckCircle2 },
    { id: 2, type: 'message', title: 'Message from TaxExperts LLC', time: '5 hours ago', icon: MessageSquare },
    { id: 3, type: 'deadline', title: 'Payroll Processing due soon', time: '1 day ago', icon: Clock },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50">
            <activity.icon className="w-5 h-5 text-gray-400" />
            <div>
              <p className="font-medium text-gray-900">{activity.title}</p>
              <p className="text-sm text-gray-600">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};