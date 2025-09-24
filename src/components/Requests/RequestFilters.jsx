import React from 'react';

export const RequestFilters = ({ filters, onFiltersChange }) => {
  const handleChange = (key, value) => onFiltersChange({ ...filters, [key]: value });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            type="text"
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            placeholder="Search requests..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
            value={filters.status}
            onChange={(e) => handleChange('status', e.target.value)}
          >
            <option value="">All</option>
            <option value="submitted">Submitted</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
            value={filters.serviceType}
            onChange={(e) => handleChange('serviceType', e.target.value)}
          >
            <option value="">All</option>
            <option value="tax-filing">Tax Filing</option>
            <option value="bookkeeping">Bookkeeping</option>
            <option value="auditing">Auditing</option>
            <option value="payroll">Payroll</option>
            <option value="consultation">Consultation</option>
          </select>
        </div>
      </div>
    </div>
  );
};


