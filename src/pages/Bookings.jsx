import React, { useState } from 'react';
import { BookingFilters } from '../components/Bookings/BookingFilters.jsx';
import { BookingsTable } from '../components/Bookings/BookingsTable.jsx';
import { Plus } from 'lucide-react';

const mockBookings = [
  {
    id: '1',
    title: 'Q4 2024 Tax Filing',
    description: 'Complete tax return preparation for Q4 2024',
    serviceType: 'tax-filing',
    status: 'confirmed',
    budget: 2500,
    currency: 'USD',
    deadline: '2025-02-15',
    createdAt: '2025-01-10',
    updatedAt: '2025-01-12',
    proposals: 8,
    provider: {
      id: 'p1',
      name: 'TaxExperts LLC',
      rating: 4.9,
      avatar:
        'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
    },
  },
  {
    id: '2',
    title: 'Monthly Bookkeeping Services',
    description: 'Ongoing monthly bookkeeping for small business',
    serviceType: 'bookkeeping',
    status: 'in-progress',
    budget: 800,
    currency: 'USD',
    deadline: '2025-02-28',
    createdAt: '2025-01-08',
    updatedAt: '2025-01-15',
    proposals: 12,
    provider: {
      id: 'p2',
      name: 'AccountPro Firm',
      rating: 4.7,
      avatar:
        'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
    },
  },
  {
    id: '3',
    title: 'Financial Audit 2024',
    description: 'Complete financial audit for annual compliance',
    serviceType: 'auditing',
    status: 'pending',
    budget: 5000,
    currency: 'USD',
    deadline: '2025-03-31',
    createdAt: '2025-01-05',
    updatedAt: '2025-01-05',
    proposals: 4,
  },
  {
    id: '4',
    title: 'Payroll Management Setup',
    description: 'Setup and configure payroll system for 50 employees',
    serviceType: 'payroll',
    status: 'completed',
    budget: 1200,
    currency: 'USD',
    deadline: '2025-01-20',
    createdAt: '2024-12-15',
    updatedAt: '2025-01-18',
    proposals: 6,
    provider: {
      id: 'p3',
      name: 'PayrollPros Inc',
      rating: 4.8,
      avatar:
        'https://images.pexels.com/photos/3184305/pexels-photo-3184305.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
    },
  },
  {
    id: '5',
    title: 'Tax Consultation',
    description: 'Strategic tax planning consultation for 2025',
    serviceType: 'consultation',
    status: 'canceled',
    budget: 400,
    currency: 'USD',
    deadline: '2025-01-25',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-10',
    proposals: 2,
  },
];

export const Bookings = () => {
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    serviceType: '',
    dateRange: '',
  });

  const filteredBookings = mockBookings.filter((booking) => {
    if (filters.search && !booking.title.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.status && booking.status !== filters.status) {
      return false;
    }
    if (filters.serviceType && booking.serviceType !== filters.serviceType) {
      return false;
    }
    return true;
  });

  const handleBookingClick = (booking) => {
    console.log('Booking clicked:', booking);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage all your service requests and track their progress.</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>New Booking</span>
        </button>
      </div>

      <BookingFilters filters={filters} onFiltersChange={setFilters} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">{mockBookings.length}</div>
          <div className="text-sm text-gray-600">Total Bookings</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-2xl font-bold text-yellow-600">{mockBookings.filter((b) => b.status === 'pending').length}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-2xl font-bold text-green-600">{mockBookings.filter((b) => b.status === 'confirmed' || b.status === 'in-progress').length}</div>
          <div className="text-sm text-gray-600">Active</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-2xl font-bold text-gray-600">{mockBookings.filter((b) => b.status === 'completed').length}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
      </div>

      <BookingsTable bookings={filteredBookings} onBookingClick={handleBookingClick} />
    </div>
  );
};