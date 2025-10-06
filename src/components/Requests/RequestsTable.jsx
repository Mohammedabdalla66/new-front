import React from 'react';

export const RequestsTable = ({ requests, onViewDetails }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Title</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Offers</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
          <th className="px-6 py-3"/>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {requests.map((r) => (
          <tr key={r.id}>
            <td className="px-6 py-4 text-sm text-gray-900">{r.title}</td>
            <td className="px-6 py-4 text-sm capitalize">
              <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">{r.status.replace('-', ' ')}</span>
            </td>
            <td className="px-6 py-4 text-sm text-gray-900">{r.offers}</td>
            <td className="px-6 py-4 text-sm text-gray-600">{new Date(r.lastUpdated).toLocaleDateString()}</td>
            <td className="px-6 py-4 text-right">
              <button onClick={() => onViewDetails?.(r.id)} className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">View Details</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};


