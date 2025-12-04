import React, { useState, useEffect } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { walletAPI, serviceProviderAPI } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Download,
  Plus,
  CreditCard,
  Banknote,
  Calendar,
  Filter,
  Clock,
} from "lucide-react";

const WalletPage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const isServiceProvider = user?.role === 'serviceProvider' || user?.role === 'firm' || user?.role === 'company';
  
  const [activeTab, setActiveTab] = useState("overview");
  const [walletData, setWalletData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadWallet = async () => {
      try {
        setLoading(true);
        
        // Use the correct endpoint based on user role
        const response = isServiceProvider 
          ? await serviceProviderAPI.getWallet()
          : await walletAPI.get();
        
        // Handle response format: { success: true, data: { balance, pendingPayouts, transactions } }
        const walletResponse = response.data?.data || response.data;
        setWalletData({
          balance: walletResponse.balance || 0,
          pendingPayouts: walletResponse.pendingPayouts || 0,
          transactions: walletResponse.transactions || [],
        });
      } catch (err) {
        console.error("Error loading wallet:", err);
        console.error("Error response:", err?.response?.data);
        console.error("Error status:", err?.response?.status);
<<<<<<< HEAD
        setError(err?.response?.data?.message || err?.response?.data?.error || "Failed to load wallet data");
=======
        setError(err?.response?.data?.message || err?.response?.data?.error || t("failedToLoadWallet"));
>>>>>>> origin/mohamedAbdo
      } finally {
        setLoading(false);
      }
    };
    loadWallet();
  }, [isServiceProvider]);

  // Calculate stats from transactions
  const walletStats = walletData ? {
    balance: walletData.balance || 0,
    pending: walletData.pendingPayouts || walletData.transactions
      ?.filter(t => t.status === 'pending' && (t.type === 'payment' || t.type === 'release'))
      .reduce((sum, t) => sum + (t.amount || 0), 0) || 0,
    totalEarnings: walletData.transactions
      ?.filter(t => (t.type === 'release' || t.type === 'payment') && t.status === 'completed')
      .reduce((sum, t) => sum + (t.amount || 0), 0) || 0,
    thisMonth: walletData.transactions
      ?.filter(t => {
        const date = new Date(t.createdAt);
        const now = new Date();
        return date.getMonth() === now.getMonth() && 
               date.getFullYear() === now.getFullYear() &&
               (t.type === 'release' || t.type === 'payment') && 
               t.status === 'completed';
      })
      .reduce((sum, t) => sum + (t.amount || 0), 0) || 0,
  } : {
    balance: 0,
    pending: 0,
    totalEarnings: 0,
    thisMonth: 0,
  };

  const transactions = walletData?.transactions?.map(t => ({
    id: t._id || t.id,
    type: t.type === 'release' || t.type === 'deposit' ? 'earning' : 
          t.type === 'hold' ? 'hold' : 'withdrawal',
    amount: t.type === 'hold' ? -t.amount : t.amount,
    description: t.description || `${t.type} transaction`,
    date: new Date(t.createdAt).toLocaleDateString(),
    status: t.status,
    method: 'wallet',
  })) || [];

  const getTransactionIcon = (type) => {
    switch (type) {
      case "earning":
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case "withdrawal":
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      case "hold":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <DollarSign className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const tabs = [
<<<<<<< HEAD
    { id: "overview", label: "Overview" },
    { id: "transactions", label: "Transactions" },
=======
    { id: "overview", label: t("overview") },
    { id: "transactions", label: t("transactions") },
>>>>>>> origin/mohamedAbdo
    { id: "withdrawals", label: t("withdrawals") },
  ];

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
<<<<<<< HEAD
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading wallet...</p>
=======
        <p className="mt-4 text-gray-600 dark:text-gray-400">{t("loading")}...</p>
>>>>>>> origin/mohamedAbdo
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t("wallet")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
<<<<<<< HEAD
            Manage your earnings and withdrawals
=======
            {t("manageEarnings")}
>>>>>>> origin/mohamedAbdo
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Download className="w-4 h-4 mr-2" />
<<<<<<< HEAD
            Export
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            <Plus className="w-4 h-4 mr-2" />
            Withdraw
=======
            {t("export")}
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            <Plus className="w-4 h-4 mr-2" />
            {t("withdraw")}
>>>>>>> origin/mohamedAbdo
          </button>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
<<<<<<< HEAD
                Available {t("balance")}
=======
                {t("availableBalance")}
>>>>>>> origin/mohamedAbdo
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${walletStats.balance.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
<<<<<<< HEAD
                Pending
=======
                {t("pending")}
>>>>>>> origin/mohamedAbdo
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${walletStats.pending.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900">
              <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
<<<<<<< HEAD
                Total {t("earnings")}
=======
                {t("totalEarnings")}
>>>>>>> origin/mohamedAbdo
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${walletStats.totalEarnings.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900">
              <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
<<<<<<< HEAD
                This Month
=======
                {t("thisMonth")}
>>>>>>> origin/mohamedAbdo
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${walletStats.thisMonth.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900">
              <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Transactions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
<<<<<<< HEAD
              Recent Transactions
=======
              {t("recentTransactions")}
>>>>>>> origin/mohamedAbdo
            </h3>
            <div className="space-y-4">
              {transactions.slice(0, 5).map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    {getTransactionIcon(transaction.type)}
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {transaction.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {transaction.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-medium ${
                        transaction.type === "earning"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.type === "earning" ? "+" : ""}$
                      {transaction.amount.toLocaleString()}
                    </p>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        transaction.status
                      )}`}
                    >
                      {transaction.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
<<<<<<< HEAD
              Quick Actions
=======
              {t("quickActions")}
>>>>>>> origin/mohamedAbdo
            </h3>
            <div className="space-y-3">
              <button className="w-full flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <CreditCard className="w-5 h-5 text-blue-600 mr-3" />
                <div className="text-left">
                  <p className="font-medium text-gray-900 dark:text-white">
<<<<<<< HEAD
                    Withdraw to Bank
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Transfer funds to your bank account
=======
                    {t("withdrawToBank")}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t("transferFundsToBank")}
>>>>>>> origin/mohamedAbdo
                  </p>
                </div>
              </button>
              <button className="w-full flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Banknote className="w-5 h-5 text-green-600 mr-3" />
                <div className="text-left">
                  <p className="font-medium text-gray-900 dark:text-white">
<<<<<<< HEAD
                    Set Up Auto-Withdrawal
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Automatically transfer earnings
=======
                    {t("setUpAutoWithdrawal")}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t("automaticallyTransferEarnings")}
>>>>>>> origin/mohamedAbdo
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "transactions" && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t("paymentHistory")}
              </h3>
              <button className="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-lg">
                <Filter className="w-4 h-4 mr-2" />
<<<<<<< HEAD
                Filter
=======
                {t("filter")}
>>>>>>> origin/mohamedAbdo
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getTransactionIcon(transaction.type)}
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {transaction.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {transaction.date} •{" "}
                        {transaction.method.replace("_", " ")}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-lg font-semibold ${
                        transaction.type === "earning"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.type === "earning" ? "+" : ""}$
                      {transaction.amount.toLocaleString()}
                    </p>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        transaction.status
                      )}`}
                    >
                      {transaction.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "withdrawals" && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t("withdrawals")}
          </h3>
          <div className="text-center py-12">
            <Banknote className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
<<<<<<< HEAD
              No withdrawals yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              You haven't made any withdrawals from your wallet.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              Make First Withdrawal
=======
              {t("noWithdrawalsYet")}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {t("noWithdrawalsMessage")}
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              {t("makeFirstWithdrawal")}
>>>>>>> origin/mohamedAbdo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletPage;
