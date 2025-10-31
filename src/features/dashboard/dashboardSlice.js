import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as dashboardApi from '../../services/mockApi/dashboard';

// Async thunks
export const fetchDashboard = createAsyncThunk(
  'dashboard/fetchDashboard',
  async (_, { rejectWithValue }) => {
    try {
      const data = await dashboardApi.getDashboardStats();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRecentActivity = createAsyncThunk(
  'dashboard/fetchRecentActivity',
  async (_, { rejectWithValue }) => {
    try {
      const data = await dashboardApi.getRecentActivity();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPendingItems = createAsyncThunk(
  'dashboard/fetchPendingItems',
  async (_, { rejectWithValue }) => {
    try {
      const data = await dashboardApi.getPendingItems();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const approveFirm = createAsyncThunk(
  'dashboard/approveFirm',
  async (firmId, { rejectWithValue }) => {
    try {
      await dashboardApi.approveFirm(firmId);
      return firmId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const rejectFirm = createAsyncThunk(
  'dashboard/rejectFirm',
  async (firmId, { rejectWithValue }) => {
    try {
      await dashboardApi.rejectFirm ? await dashboardApi.rejectFirm(firmId) : Promise.resolve();
      return firmId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const approvePayment = createAsyncThunk(
  'dashboard/approvePayment',
  async (transactionId, { rejectWithValue }) => {
    try {
      await dashboardApi.resolveTransaction(transactionId);
      return transactionId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const rejectPayment = createAsyncThunk(
  'dashboard/rejectPayment',
  async (transactionId, { rejectWithValue }) => {
    try {
      await dashboardApi.rejectPayment ? await dashboardApi.rejectPayment(transactionId) : Promise.resolve();
      return transactionId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const resolveTransaction = createAsyncThunk(
  'dashboard/resolveTransaction',
  async (transactionId, { rejectWithValue }) => {
    try {
      await dashboardApi.resolveTransaction(transactionId);
      return transactionId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  stats: {
    totalFirms: 0,
    activeClients: 0,
    totalRevenue: 0,
    pendingTransactions: 0,
  },
  revenueSeries: [],
  requestsByService: [],
  recentActivity: [],
  pendingItems: {
    firms: [],
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
        state.stats = action.payload.stats;
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
        state.pendingItems = action.payload;
      })
      .addCase(fetchPendingItems.rejected, (state, action) => {
        state.loading.pending = false;
        state.error = action.payload;
      })
      // Approve Firm
      .addCase(approveFirm.fulfilled, (state, action) => {
        state.pendingItems.firms = state.pendingItems.firms.filter(
          firm => firm.id !== action.payload
        );
        delete state.loading.actions[`firm-${action.payload}`];
      })
      // Reject Firm
      .addCase(rejectFirm.fulfilled, (state, action) => {
        state.pendingItems.firms = state.pendingItems.firms.filter(
          firm => firm.id !== action.payload
        );
        delete state.loading.actions[`firm-${action.payload}`];
      })
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