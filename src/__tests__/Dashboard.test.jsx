import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import dashboardReducer from '../features/dashboard/dashboardSlice';
import themeReducer from '../features/theme/themeSlice';
import '../i18n';

// Mock recharts to avoid canvas issues in tests
jest.mock('recharts', () => ({
  LineChart: ({ children }) => <div data-testid="line-chart">{children}</div>,
  Line: () => <div data-testid="line" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  ResponsiveContainer: ({ children }) => <div data-testid="responsive-container">{children}</div>,
  PieChart: ({ children }) => <div data-testid="pie-chart">{children}</div>,
  Pie: () => <div data-testid="pie" />,
  Cell: () => <div data-testid="cell" />,
  Legend: () => <div data-testid="legend" />,
}));

// Mock API calls
jest.mock('../services/mockApi/dashboard', () => ({
  getDashboardStats: jest.fn(() => Promise.resolve({
    stats: {
      totalFirms: 124,
      activeClients: 502,
      totalRevenue: 254320.50,
      pendingTransactions: 7,
    },
    revenueSeries: [
      { date: '2025-01-01', amount: 18500 },
      { date: '2025-01-02', amount: 22300 },
    ],
    requestsByService: [
      { service: 'Audit', count: 45, color: '#0B61FF' },
      { service: 'Tax', count: 30, color: '#00A86B' },
    ],
  })),
  getRecentActivity: jest.fn(() => Promise.resolve([
    {
      id: 1,
      type: 'firm_request',
      message: 'New firm registration request',
      timestamp: new Date().toISOString(),
      status: 'pending'
    }
  ])),
  getPendingItems: jest.fn(() => Promise.resolve({
    firms: [
      {
        id: 1,
        name: 'Test Firm',
        email: 'test@firm.com',
        phone: '+1234567890',
        submittedAt: new Date().toISOString(),
        documents: ['license.pdf'],
        status: 'pending'
      }
    ],
    transactions: []
  })),
  approveFirm: jest.fn(() => Promise.resolve({ success: true })),
  resolveTransaction: jest.fn(() => Promise.resolve({ success: true })),
}));

const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      dashboard: dashboardReducer,
      theme: themeReducer,
    },
    preloadedState: initialState,
  });
};

const renderWithProviders = (component, { initialState = {} } = {}) => {
  const store = createTestStore(initialState);
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  );
};

describe('Dashboard', () => {
  test('renders stats cards', async () => {
    renderWithProviders(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.getByText('Total Firms')).toBeInTheDocument();
      expect(screen.getByText('Active Clients')).toBeInTheDocument();
      expect(screen.getByText('Total Revenue')).toBeInTheDocument();
      expect(screen.getByText('Pending Transactions')).toBeInTheDocument();
    });
  });

  test('language toggle flips direction', async () => {
    renderWithProviders(<Dashboard />);
    
    // Find and click language switcher
    const languageButton = screen.getByText('English');
    fireEvent.click(languageButton);
    
    // Click Arabic option
    const arabicOption = await screen.findByText('العربية');
    fireEvent.click(arabicOption);
    
    // Check if document direction changed to RTL
    await waitFor(() => {
      expect(document.documentElement.dir).toBe('rtl');
    });
  });

  test('charts receive data', async () => {
    renderWithProviders(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.getByTestId('line-chart')).toBeInTheDocument();
      expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
    });
  });

  test('approve action dispatches thunk', async () => {
    const store = createTestStore();
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );
    
    await waitFor(() => {
      const approveButton = screen.getByText('Approve');
      fireEvent.click(approveButton);
    });
    
    expect(dispatchSpy).toHaveBeenCalled();
  });

  test('responsive layout - mobile stacked cards', () => {
    // Mock window.matchMedia for mobile viewport
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query.includes('max-width: 768px'),
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    renderWithProviders(<Dashboard />);
    
    // Check if cards are stacked (grid-cols-1 on mobile)
    const statsContainer = document.querySelector('.grid-cols-1');
    expect(statsContainer).toBeInTheDocument();
  });
});