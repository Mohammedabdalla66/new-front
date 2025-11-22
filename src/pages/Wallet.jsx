import React, { useEffect, useMemo, useState } from "react";
import { walletAPI } from "../services/api";

export const Wallet = () => {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("Visa");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [notice, setNotice] = useState("");
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isCard = useMemo(
    () => method === "Visa" || method === "MasterCard",
    [method]
  );

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await walletAPI.get();
        const data = res.data || {};
        if (mounted) {
          setBalance(Number(data.balance || 0));
          const tx = Array.isArray(data.transactions) ? data.transactions : [];
          // normalize
          const mapped = tx.map((t) => ({
            id: t._id || t.id,
            date: t.createdAt || t.date,
            description: t.description || t.type || "",
            amount: Number(t.amount || 0) * (t.direction === 'debit' ? -1 : 1),
            status: (t.status || 'completed').toString().toLowerCase() === 'pending' ? 'Pending' : 'Completed',
          }));
          setTransactions(mapped);
        }
      } catch (e) {
        console.error(e);
        if (mounted) setError(e?.response?.data?.message || "Failed to load wallet");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        amount: Number(amount),
        method,
        cardNumber: isCard ? cardNumber : undefined,
        expiry: isCard ? expiry : undefined,
        cvv: isCard ? cvv : undefined,
      };
      await walletAPI.deposit(payload);
      setNotice("Funds added successfully.");
      // refresh wallet
      const res = await walletAPI.get();
      const data = res.data || {};
      setBalance(Number(data.balance || 0));
      const tx = Array.isArray(data.transactions) ? data.transactions : [];
      const mapped = tx.map((t) => ({
        id: t._id || t.id,
        date: t.createdAt || t.date,
        description: t.description || t.type || "",
        amount: Number(t.amount || 0) * (t.direction === 'debit' ? -1 : 1),
        status: (t.status || 'completed').toString().toLowerCase() === 'pending' ? 'Pending' : 'Completed',
      }));
      setTransactions(mapped);
      setAmount("");
      setCardNumber("");
      setExpiry("");
      setCvv("");
    } catch (e) {
      console.error(e);
      setNotice("");
      setError(e?.response?.data?.message || "Failed to add funds");
      setTimeout(() => setError(""), 4000);
    } finally {
      if (!error) setTimeout(() => setNotice(""), 4000);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Balance Section */}
      <div className="mb-4 sm:mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Current Wallet Balance
              </div>
              <div className="mt-1 text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                {loading ? "Loading..." : `$${Number(balance).toLocaleString()}`}
              </div>
            </div>
            <div className="mt-2 sm:mt-0 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Updated just now
            </div>
          </div>
        </div>
      </div>

      {/* Add Funds & Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Add Funds */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Add Funds
            </h2>
            {notice && (
              <div className="mb-3 rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 p-2 text-xs sm:text-sm text-green-800 dark:text-green-200">
                {notice}
              </div>
            )}
            {error && (
              <div className="mb-3 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-2 text-xs sm:text-sm text-red-800 dark:text-red-200">
                {error}
              </div>
            )}
            <form onSubmit={onSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Amount (USD)
                </label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 250"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Payment Method
                </label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>Visa</option>
                  <option>MasterCard</option>
                  <option>PayPal</option>
                  <option>Bank Transfer</option>
                </select>
              </div>

              {isCard && (
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Expiry
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        inputMode="numeric"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm sm:text-base text-white hover:bg-blue-700 transition-colors"
              >
                Add Funds
              </button>
            </form>
          </div>
        </div>

        {/* Transactions */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Transactions
            </h2>
            <div className="overflow-x-auto">
              {/* Desktop Table */}
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 hidden sm:table">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-3 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {transactions.map((t) => (
                    <tr
                      key={t.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-3 lg:px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {t.date ? new Date(t.date).toLocaleDateString() : "—"}
                      </td>
                      <td className="px-3 lg:px-6 py-4 text-sm text-gray-900 dark:text-white">
                        {t.description}
                      </td>
                      <td
                        className={`px-3 lg:px-6 py-4 text-sm text-right ${
                          t.amount < 0
                            ? "text-red-600 dark:text-red-400"
                            : "text-green-600 dark:text-green-400"
                        }`}
                      >
                        {t.amount < 0 ? "-" : "+"}$
                        {Math.abs(t.amount).toLocaleString()}
                      </td>
                      <td className="px-3 lg:px-6 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                            t.status === "Completed"
                              ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200"
                              : t.status === "Pending"
                              ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200"
                              : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200"
                          }`}
                        >
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile Cards */}
              <div className="sm:hidden space-y-3">
                {transactions.map((t) => (
                  <div
                    key={t.id}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {t.description}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {t.date ? new Date(t.date).toLocaleDateString() : "—"}
                        </p>
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          t.amount < 0
                            ? "text-red-600 dark:text-red-400"
                            : "text-green-600 dark:text-green-400"
                        }`}
                      >
                        {t.amount < 0 ? "-" : "+"}$
                        {Math.abs(t.amount).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                          t.status === "Completed"
                            ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200"
                            : t.status === "Pending"
                            ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200"
                            : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200"
                        }`}
                      >
                        {t.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
