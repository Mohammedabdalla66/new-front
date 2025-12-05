import React from 'react';

export const BookingsTable = ({ bookings, onBookingClick }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bookings.map((booking) => (
            <tr key={booking.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => onBookingClick(booking)}>
              <td className="px-6 py-4 text-sm text-gray-900">{booking.title}</td>
              <td className="px-6 py-4 text-sm text-gray-600 capitalize">{booking.serviceType.replace('-', ' ')}</td>
              <td className="px-6 py-4 text-sm">
                <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                  {booking.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-right text-gray-900">
                {booking.currency} {booking.budget}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};