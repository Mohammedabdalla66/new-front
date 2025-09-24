import React from 'react';

export const Confirmation = ({ requestId }) => {
  const goToOrders = () => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: { to: 'requests' } }));
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Thank you!</h1>
        <p className="text-gray-600 mb-6">Your payment was successful. Your request is now confirmed.</p>
        <div className="text-sm text-gray-700 mb-8">Request ID: {requestId || '—'}</div>
        <button onClick={goToOrders} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Go to Orders</button>
      </div>
    </div>
  );
};


