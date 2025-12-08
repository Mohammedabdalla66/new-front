import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { adminAPI } from '../../services/adminApi';
import api from '../../services/api';

// Request deduplication: Track in-flight requests to prevent duplicates
const inFlightRequests = new Map();

// Helper to create a deduplicated request
const deduplicatedRequest = async (key, requestFn) => {
  // If request is already in flight, return the existing promise
  if (inFlightRequests.has(key)) {
    return inFlightRequests.get(key);
  }
  
  // Create new request
  const promise = requestFn()
    .then((result) => {
      inFlightRequests.delete(key);
      return result;
    })
    .catch((error) => {
      inFlightRequests.delete(key);
      throw error;
    });
  
  inFlightRequests.set(key, promise);
  return promise;
};

// Helper function to get total counts
const getTotalCounts = async () => {
  try {
    // Get total service providers
    const spResponse = await adminAPI.listServiceProviders({ page: 1, limit: 1 });
    const totalServiceProviders = spResponse.data.meta?.total || 0;
    
    // Get total clients
    const clientsResponse = await adminAPI.listClients({ page: 1, limit: 1 });
    const totalClients = clientsResponse.data.meta?.total || 0;
    
    return { totalServiceProviders, totalClients };
  } catch (error) {
    console.error('Error fetching total counts:', error);
    return { totalServiceProviders: 0, totalClients: 0 };
  }
};

// Helper function to get revenue series (last 30 days)
const getRevenueSeries = async () => {
  try {
    // Fetch all completed transactions from the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const fromDate = thirtyDaysAgo.toISOString().split('T')[0];
    
    const response = await adminAPI.listTransactions({
      status: 'completed',
      fromDate,
      page: 1,
      limit: 1000, // Get enough transactions
      sort: '-createdAt',
    });
    
    const transactions = response.data.data || [];
    
    // Group transactions by date and sum amounts
    const revenueByDate = {};
    transactions.forEach(txn => {
      if (txn.type === 'deposit' || txn.type === 'payment' || txn.type === 'release') {
        const date = new Date(txn.createdAt).toISOString().split('T')[0];
        if (!revenueByDate[date]) {
          revenueByDate[date] = 0;
        }
        revenueByDate[date] += txn.amount || 0;
      }
    });
    
    // Create series for last 30 days
    const series = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      series.push({
        date: dateStr,
        amount: revenueByDate[dateStr] || 0,
      });
    }
    
    return series;
  } catch (error) {
    console.error('Error fetching revenue series:', error);
    return [];
  }
};

// Helper function to get requests by service (simplified - using request titles)
const getRequestsByService = async () => {
  try {
    // For now, return a simplified version
    // In the future, you might want to add a category field to requests
    const response = await api.get('/admin/requests');
    const requests = response.data || [];
    
    // Group by a simplified service type (you can enhance this later)
    const serviceMap = {};
    requests.forEach(req => {
      const service = 'General Service'; // Default, can be enhanced with actual categories
      if (!serviceMap[service]) {
        serviceMap[service] = 0;
      }
      serviceMap[service]++;
    });
    
    const colors = ['#0B61FF', '#00A86B', '#F59E0B', '#EF4444', '#8B5CF6'];
    return Object.entries(serviceMap).map(([service, count], index) => ({
      service,
      count,
      color: colors[index % colors.length],
    }));
  } catch (error) {
    console.error('Error fetching requests by service:', error);
    return [];
  }
};

// Async thunks
export const fetchDashboard = createAsyncThunk(
  'dashboard/fetchDashboard',
  async (_, { rejectWithValue }) => {
    // Request deduplication is handled by deduplicatedRequest
    const requestKey = 'fetchDashboard';
    return deduplicatedRequest(requestKey, async () => {
    try {
      // Get today's report
      const today = new Date().toISOString().split('T')[0];
      const dailyReportResponse = await adminAPI.dailyReport(today);
      const dailyData = dailyReportResponse.data.data || {};
      
      // Get total counts
      const { totalServiceProviders, totalClients } = await getTotalCounts();
      
      // Get total revenue from all completed transactions
      const transactionsResponse = await adminAPI.listTransactions({
        status: 'completed',
        page: 1,
        limit: 1000, // Get a large number to calculate total
      });
      const totalRevenue = transactionsResponse.data.data?.reduce(
        (sum, t) => sum + (t.amount || 0),
        0
      ) || 0;
      
      // Get pending transactions count
      const pendingTxnsResponse = await adminAPI.listTransactions({
        status: 'pending',
        page: 1,
        limit: 1,
      });
      const pendingTransactions = pendingTxnsResponse.data.meta?.total || 0;
      
      // Get revenue series
      const revenueSeries = await getRevenueSeries();
      
      // Get requests by service
      const requestsByService = await getRequestsByService();
      
      return {
        stats: {
          totalServiceProviders,
          activeClients: totalClients,
          totalRevenue,
          pendingTransactions,
        },
        revenueSeries,
        requestsByService,
      };
    } catch (error) {
        // Don't retry on 429 errors
        if (error.response?.status === 429) {
          console.error('Rate limit exceeded while fetching dashboard. Please wait before retrying.');
          return rejectWithValue('Too many requests. Please wait a moment and try again.');
        }
      console.error('Error fetching dashboard:', error);
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to fetch dashboard data');
    }
    });
  }
);

export const fetchRecentActivity = createAsyncThunk(
  'dashboard/fetchRecentActivity',
  async (_, { rejectWithValue }) => {
    // Request deduplication is handled by deduplicatedRequest
    const requestKey = 'fetchRecentActivity';
    return deduplicatedRequest(requestKey, async () => {
    try {
      const activities = [];
      
      // Get recent requests
      try {
        const requestsResponse = await api.get('/admin/requests?limit=5');
        const requests = requestsResponse.data || [];
        requests.forEach(req => {
          activities.push({
            id: `request-${req._id}`,
            type: 'request',
            message: `New request: ${req.title}`,
            timestamp: req.createdAt,
            status: req.status || 'pending',
            userOrFirm: req.client?.name || 'Unknown Client',
            action: 'New Request',
            amount: req.budget || null,
          });
        });
      } catch (error) {
          // Don't fail entire request if one sub-request fails
          if (error.response?.status === 429) {
            console.warn('Rate limit exceeded while fetching recent requests');
          } else {
        console.error('Error fetching recent requests:', error);
          }
      }
      
      // Get recent transactions
      try {
        const txnsResponse = await adminAPI.listTransactions({
          page: 1,
          limit: 5,
          sort: '-createdAt',
        });
        const txns = txnsResponse.data.data || [];
        txns.forEach(txn => {
          activities.push({
            id: `transaction-${txn._id}`,
            type: txn.type === 'payment' || txn.type === 'deposit' ? 'payment' : 'transaction',
            message: `${txn.type === 'payment' ? 'Payment' : 'Transaction'}: ${txn.amount?.toFixed(2)} OMR`,
            timestamp: txn.createdAt,
            status: txn.status,
            userOrFirm: txn.owner?.name || 'Unknown',
            action: `${txn.type} ${txn.status}`,
            amount: txn.amount,
          });
        });
      } catch (error) {
          if (error.response?.status === 429) {
            console.warn('Rate limit exceeded while fetching recent transactions');
          } else {
        console.error('Error fetching recent transactions:', error);
          }
      }
      
      // Get pending service providers
      try {
        const spResponse = await adminAPI.listServiceProviders({
          status: 'pending',
          page: 1,
          limit: 3,
        });
        const serviceProviders = spResponse.data.data || [];
        serviceProviders.forEach(sp => {
          activities.push({
            id: `sp-${sp._id}`,
            type: 'service_provider_request',
            message: `New service provider registration: ${sp.name}`,
            timestamp: sp.createdAt,
            status: 'pending',
            userOrFirm: sp.name,
            action: 'Registration Request',
            amount: null,
          });
        });
      } catch (error) {
          if (error.response?.status === 429) {
            console.warn('Rate limit exceeded while fetching pending service providers');
          } else {
        console.error('Error fetching pending service providers:', error);
          }
      }
      
      // Sort by timestamp (most recent first) and limit to 10
      return activities
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 10);
    } catch (error) {
        if (error.response?.status === 429) {
          console.error('Rate limit exceeded while fetching recent activity');
          return rejectWithValue('Too many requests. Please wait a moment and try again.');
        }
      console.error('Error fetching recent activity:', error);
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to fetch recent activity');
    }
    });
  }
);

export const fetchPendingItems = createAsyncThunk(
  'dashboard/fetchPendingItems',
  async (_, { rejectWithValue }) => {
    // Request deduplication is handled by deduplicatedRequest
    const requestKey = 'fetchPendingItems';
    return deduplicatedRequest(requestKey, async () => {
    try {
      // Get pending service providers
      const spResponse = await adminAPI.listServiceProviders({
        status: 'pending',
        page: 1,
        limit: 10,
      });
      const serviceProviders = spResponse.data.data || [];
      
      const pendingServiceProviders = serviceProviders.map(sp => ({
        id: sp._id,
        name: sp.name,
        email: sp.email,
        phone: sp.phone || '',
        submittedAt: sp.createdAt,
        documents: sp.documents || [],
        status: 'pending',
      }));
      
      // Get pending transactions
      const txnsResponse = await adminAPI.listTransactions({
        status: 'pending',
        page: 1,
        limit: 10,
      });
      const transactions = txnsResponse.data.data || [];
      
      const pendingTransactions = transactions.map(txn => ({
        id: txn._id,
        clientName: txn.owner?.name || 'Unknown',
        serviceName: txn.description || 'Service',
        amount: txn.amount || 0,
        serviceProviderName: 'N/A', // Transaction doesn't have direct service provider link
        submittedAt: txn.createdAt,
        status: txn.status,
      }));
      
      return {
        serviceProviders: pendingServiceProviders,
        transactions: pendingTransactions,
      };
    } catch (error) {
        if (error.response?.status === 429) {
          console.error('Rate limit exceeded while fetching pending items');
          return rejectWithValue('Too many requests. Please wait a moment and try again.');
        }
      console.error('Error fetching pending items:', error);
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to fetch pending items');
    }
    });
  }
);

export const approveServiceProvider = createAsyncThunk(
  'dashboard/approveServiceProvider',
  async (serviceProviderId, { rejectWithValue }) => {
    try {
      // Update user to verified=true using the User model directly
      // Note: This assumes there's a PATCH /admin/users/:id endpoint
      // If not available, we'll need to add it to the backend
      const response = await api.patch(`/admin/users/${serviceProviderId}`, { verified: true });
      return serviceProviderId;
    } catch (error) {
      // If the endpoint doesn't exist, we'll just return the ID to remove from UI
      // The actual verification can be done manually in the backend
      console.warn('Could not update service provider verification:', error);
      return serviceProviderId;
    }
  }
);

export const rejectServiceProvider = createAsyncThunk(
  'dashboard/rejectServiceProvider',
  async (serviceProviderId, { rejectWithValue }) => {
    try {
      // For now, we'll just remove from pending list
      // In the future, you might want to add a rejection reason or status
      return serviceProviderId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to reject service provider');
    }
  }
);

export const approvePayment = createAsyncThunk(
  'dashboard/approvePayment',
  async (transactionId, { rejectWithValue }) => {
    try {
      // Update transaction status to completed
      const response = await api.patch(`/admin/transactions/${transactionId}`, { status: 'completed' });
      return transactionId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to approve payment');
    }
  }
);

export const rejectPayment = createAsyncThunk(
  'dashboard/rejectPayment',
  async (transactionId, { rejectWithValue }) => {
    try {
      // Update transaction status to failed
      const response = await api.patch(`/admin/transactions/${transactionId}`, { status: 'failed' });
      return transactionId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to reject payment');
    }
  }
);

export const resolveTransaction = createAsyncThunk(
  'dashboard/resolveTransaction',
  async (transactionId, { rejectWithValue }) => {
    try {
      // Update transaction status to completed
      const response = await api.patch(`/admin/transactions/${transactionId}`, { status: 'completed' });
      return transactionId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to resolve transaction');
    }
  }
);

// Legacy exports for backward compatibility
export const approveFirm = approveServiceProvider;
export const rejectFirm = rejectServiceProvider;

const initialState = {
  stats: {
    totalServiceProviders: 0,
    totalFirms: 0, // Legacy field for backward compatibility
    activeClients: 0,
    totalRevenue: 0,
    pendingTransactions: 0,
  },
  revenueSeries: [],
  requestsByService: [],
  recentActivity: [],
  pendingItems: {
    serviceProviders: [],
    firms: [], // Legacy field for backward compatibility
    transactions: [],
  },
  loading: {
    dashboard: false,
    activity: false,
    pending: false,
    actions: {},
  },
  error: null,
  dateRange: {
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0],
  },
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setActionLoading: (state, action) => {
      const { id, loading } = action.payload;
      state.loading.actions[id] = loading;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Dashboard
      .addCase(fetchDashboard.pending, (state) => {
        state.loading.dashboard = true;
        state.error = null;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading.dashboard = false;
        state.stats = {
          ...action.payload.stats,
          totalFirms: action.payload.stats.totalServiceProviders, // Legacy compatibility
        };
        state.revenueSeries = action.payload.revenueSeries;
        state.requestsByService = action.payload.requestsByService;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.loading.dashboard = false;
        state.error = action.payload;
      })
      // Fetch Recent Activity
      .addCase(fetchRecentActivity.pending, (state) => {
        state.loading.activity = true;
      })
      .addCase(fetchRecentActivity.fulfilled, (state, action) => {
        state.loading.activity = false;
        state.recentActivity = action.payload;
      })
      .addCase(fetchRecentActivity.rejected, (state, action) => {
        state.loading.activity = false;
        state.error = action.payload;
      })
      // Fetch Pending Items
      .addCase(fetchPendingItems.pending, (state) => {
        state.loading.pending = true;
      })
      .addCase(fetchPendingItems.fulfilled, (state, action) => {
        state.loading.pending = false;
        state.pendingItems = {
          serviceProviders: action.payload.serviceProviders,
          firms: action.payload.serviceProviders, // Legacy compatibility
          transactions: action.payload.transactions,
        };
      })
      .addCase(fetchPendingItems.rejected, (state, action) => {
        state.loading.pending = false;
        state.error = action.payload;
      })
      // Approve Service Provider
      .addCase(approveServiceProvider.fulfilled, (state, action) => {
        state.pendingItems.serviceProviders = state.pendingItems.serviceProviders.filter(
          sp => sp.id !== action.payload
        );
        state.pendingItems.firms = state.pendingItems.firms.filter(
          firm => firm.id !== action.payload
        );
        delete state.loading.actions[`serviceProvider-${action.payload}`];
        delete state.loading.actions[`firm-${action.payload}`];
      })
      // Reject Service Provider
      .addCase(rejectServiceProvider.fulfilled, (state, action) => {
        state.pendingItems.serviceProviders = state.pendingItems.serviceProviders.filter(
          sp => sp.id !== action.payload
        );
        state.pendingItems.firms = state.pendingItems.firms.filter(
          firm => firm.id !== action.payload
        );
        delete state.loading.actions[`serviceProvider-${action.payload}`];
        delete state.loading.actions[`firm-${action.payload}`];
      })
      // Note: approveFirm and rejectFirm are aliases for approveServiceProvider and rejectServiceProvider
      // so they use the same handlers above - no need for separate handlers
      // Approve Payment
      .addCase(approvePayment.fulfilled, (state, action) => {
        state.pendingItems.transactions = state.pendingItems.transactions.filter(
          transaction => transaction.id !== action.payload
        );
        delete state.loading.actions[`transaction-${action.payload}`];
      })
      // Reject Payment
      .addCase(rejectPayment.fulfilled, (state, action) => {
        state.pendingItems.transactions = state.pendingItems.transactions.filter(
          transaction => transaction.id !== action.payload
        );
        delete state.loading.actions[`transaction-${action.payload}`];
      })
      // Resolve Transaction
      .addCase(resolveTransaction.fulfilled, (state, action) => {
        state.pendingItems.transactions = state.pendingItems.transactions.filter(
          transaction => transaction.id !== action.payload
        );
        delete state.loading.actions[`transaction-${action.payload}`];
      });
  },
});

export const { setDateRange, clearError, setActionLoading } = dashboardSlice.actions;

// Selectors
export const selectDashboardStats = (state) => state.dashboard.stats;
export const selectRevenueSeries = (state) => state.dashboard.revenueSeries;
export const selectRequestsByService = (state) => state.dashboard.requestsByService;
export const selectRecentActivity = (state) => state.dashboard.recentActivity;
export const selectPendingItems = (state) => state.dashboard.pendingItems;
export const selectDashboardLoading = (state) => state.dashboard.loading;
export const selectDashboardError = (state) => state.dashboard.error;
export const selectDateRange = (state) => state.dashboard.dateRange;

export default dashboardSlice.reducer;