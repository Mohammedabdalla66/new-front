import React from 'react';
import { PlusCircle, Calendar, FileText } from 'lucide-react';

export const QuickActions = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="space-y-3">
        <button className="w-full flex items-center justify-between px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors">
          <span className="flex items-center space-x-3">
            <PlusCircle className="w-5 h-5" />
            <span>Create new booking</span>
          </span>
        </button>
        <button className="w-full flex items-center justify-between px-4 py-3 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition-colors">
          <span className="flex items-center space-x-3">
            <Calendar className="w-5 h-5" />
            <span>Schedule a call</span>
          </span>
        </button>
        <button className="w-full flex items-center justify-between px-4 py-3 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors">
          <span className="flex items-center space-x-3">
            <FileText className="w-5 h-5" />
            <span>Upload document</span>
          </span>
        </button>
      </div>
    </div>
  );
};