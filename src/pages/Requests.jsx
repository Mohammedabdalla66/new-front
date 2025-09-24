import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { RequestFilters } from '../components/Requests/RequestFilters.jsx';
import { RequestsTable } from '../components/Requests/RequestsTable.jsx';

const mockRequests = [
  {
    id: '1',
    title: 'Q4 2024 Tax Filing',
    description: 'Complete tax return preparation for Q4 2024',
    serviceType: 'tax-filing',
    status: 'submitted',
    offers: 8,
    lastUpdated: '2025-01-12',
  },
  {
    id: '2',
    title: 'Monthly Bookkeeping Services',
    description: 'Ongoing monthly bookkeeping for small business',
    serviceType: 'bookkeeping',
    status: 'in-progress',
    offers: 12,
    lastUpdated: '2025-01-15',
  },
  {
    id: '3',
    title: 'Financial Audit 2024',
    description: 'Complete financial audit for annual compliance',
    serviceType: 'auditing',
    status: 'submitted',
    offers: 4,
    lastUpdated: '2025-01-05',
  },
];

export const Requests = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ search: '', status: '', serviceType: '' });

  const filtered = mockRequests.filter((r) => {
    if (filters.search && !r.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.status && r.status !== filters.status) return false;
    if (filters.serviceType && r.serviceType !== filters.serviceType) return false;
    return true;
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">My Requests</h1>
          <p className="text-gray-600">Create and manage your service requests.</p>
        </div>
        <button onClick={() => navigate('/request/new')} className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>New Request</span>
        </button>
      </div>

      <RequestFilters filters={filters} onFiltersChange={setFilters} />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <RequestsTable requests={filtered} onViewDetails={(id) => navigate(`/request/${id}`)} />
      </div>
    </div>
  );
};
