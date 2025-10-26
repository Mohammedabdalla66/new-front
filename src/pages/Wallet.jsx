import React, { useMemo, useState } from 'react';

const mockBalance = 2480.5;
const mockTransactions = [
  { id: 't1', date: '2025-01-20', description: 'Funds Added', amount: 500.0, status: 'Completed' },
  { id: 't2', date: '2025-01-18', description: 'Service Payment - Bookkeeping', amount: -220.0, status: 'Completed' },
  { id: 't3', date: '2025-01-15', description: 'Refund - Audit Service', amount: 120.0, status: 'Completed' },
  { id: 't4', date: '2025-01-10', description: 'Funds Added', amount: 1000.0, status: 'Completed' },
  { id: 't5', date: '2025-01-07', description: 'Service Payment - Tax Filing', amount: -880.5, status: 'Completed' },
];

export const Wallet = () => {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('Visa');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [notice, setNotice] = useState('');

  const isCard = useMemo(() => method === 'Visa' || method === 'MasterCard', [method]);

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = { amount, method, cardNumber: isCard ? cardNumber : undefined, expiry: isCard ? expiry : undefined, cvv: isCard ? cvv : undefined };
    console.log('Add Funds:', payload);
    setNotice('Funds request submitted (check console for payload).');
    setTimeout(() => setNotice(''), 4000);
    setAmount('');
    setCardNumber('');
    setExpiry('');
    setCvv('');
  };

  return (
    <div className="p-6">
      {/* Balance */}
      <div className="mb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-600">Current Wallet Balance</div>
            <div className="mt-1 text-3xl font-bold text-gray-900">${mockBalance.toLocaleString()}</div>
          </div>
          <div className="hidden md:block text-sm text-gray-500">Updated just now</div>
        </div>
      </div>

      {/* Add Funds & Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Funds */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Add Funds</h2>
            {notice && (
              <div className="mb-3 rounded-lg border border-green-200 bg-green-50 p-2 text-sm text-green-800">{notice}</div>
            )}
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (USD)</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 250"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>Visa</option>
                  <option>MasterCard</option>
                  <option>PayPal</option>
                  <option>Bank Transfer</option>
                </select>
              </div>

              {isCard && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input
                        type="password"
                        inputMode="numeric"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              <button type="submit" className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Add Funds</button>
            </form>
          </div>
        </div>

        {/* Transactions */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Transactions</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockTransactions.map((t) => (
                    <tr key={t.id}>
                      <td className="px-6 py-4 text-sm text-gray-700">{new Date(t.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{t.description}</td>
                      <td className={`px-6 py-4 text-sm text-right ${t.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {t.amount < 0 ? '-' : '+'}${Math.abs(t.amount).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                          t.status === 'Completed' ? 'bg-green-100 text-green-700' : t.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


