import React, { useState } from 'react';

const mockRequest = {
  id: '1',
  title: 'Q4 2024 Tax Filing',
  description: 'Complete tax return preparation for Q4 2024',
  status: 'in-progress',
};

const mockOffers = [
  { id: 'o1', agency: 'TaxExperts LLC', price: 2500, duration: '2 weeks' },
  { id: 'o2', agency: 'AccountPro Firm', price: 2200, duration: '10 days' },
];

const StatusTracker = ({ status }) => {
  const steps = ['submitted', 'in-progress', 'completed'];
  const idx = steps.indexOf(status);
  return (
    <div className="flex items-center space-x-4">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${i <= idx ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>{i + 1}</div>
          {i < steps.length - 1 && <div className={`w-10 h-0.5 ${i < idx ? 'bg-blue-600' : 'bg-gray-200'}`} />}
        </div>
      ))}
    </div>
  );
};

export const RequestDetails = ({ requestId }) => {
  const [tab, setTab] = useState('offers');
  const request = mockRequest; // fetch by requestId in real app

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{request.title}</h1>
          <p className="text-gray-600">{request.description}</p>
        </div>
        <StatusTracker status={request.status} />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <div className="flex space-x-4 border-b border-gray-100 mb-4">
          {['offers', 'chat', 'delivered'].map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-3 py-2 text-sm ${tab === t ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>
          ))}
        </div>

        {tab === 'offers' && (
          <div className="space-y-3">
            {mockOffers.map((o) => (
              <div key={o.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
                <div>
                  <div className="font-medium text-gray-900">{o.agency}</div>
                  <div className="text-sm text-gray-600">Duration: {o.duration}</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="font-semibold text-gray-900">${o.price.toLocaleString()}</div>
                  <button className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700">Accept</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'chat' && (
          <div className="text-sm text-gray-600">Chat UI placeholder</div>
        )}

        {tab === 'delivered' && (
          <div className="text-sm text-gray-600">Delivered files placeholder</div>
        )}
      </div>
    </div>
  );
};


