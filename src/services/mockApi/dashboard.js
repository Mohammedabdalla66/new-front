// Mock API service for dashboard data
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const mockStats = {
  totalFirms: 124,
  activeClients: 502,
  totalRevenue: 254320.50,
  pendingTransactions: 7,
};

const mockRevenueSeries = [
  { date: '2025-01-01', amount: 18500 },
  { date: '2025-01-02', amount: 22300 },
  { date: '2025-01-03', amount: 19800 },
  { date: '2025-01-04', amount: 25600 },
  { date: '2025-01-05', amount: 21400 },
  { date: '2025-01-06', amount: 28900 },
  { date: '2025-01-07', amount: 24700 },
  { date: '2025-01-08', amount: 31200 },
  { date: '2025-01-09', amount: 27800 },
  { date: '2025-01-10', amount: 33500 },
];

const mockRequestsByService = [
  { service: 'Audit', count: 45, color: '#0B61FF' },
  { service: 'Tax Preparation', count: 30, color: '#00A86B' },
  { service: 'Bookkeeping', count: 25, color: '#F59E0B' },
  { service: 'Consulting', count: 15, color: '#EF4444' },
  { service: 'Payroll', count: 9, color: '#8B5CF6' },
];

const mockRecentActivity = [
  {
    id: 1,
    type: 'firm_request',
    message: 'New firm registration request from Al-Rashid Accounting',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
    userOrFirm: 'Al-Rashid Accounting',
    action: 'Registration Request',
    amount: null
  },
  {
    id: 2,
    type: 'payment',
    message: 'Payment received: $2,500 from Client #4521',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    status: 'completed',
    userOrFirm: 'Ahmed Al-Mahmoud',
    action: 'Payment Received',
    amount: 2500
  },
  {
    id: 3,
    type: 'dispute',
    message: 'Dispute flagged: Service quality complaint #DS-001',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    status: 'flagged',
    userOrFirm: 'Fatima Trading Co.',
    action: 'Dispute Flagged',
    amount: 3500
  },
  {
    id: 4,
    type: 'firm_approved',
    message: 'Firm approved: Modern Accounting Solutions',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    status: 'approved',
    userOrFirm: 'Modern Accounting Solutions',
    action: 'Firm Approved',
    amount: null
  },
  {
    id: 5,
    type: 'transaction',
    message: 'New transaction: Audit service for $3,200',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    status: 'processing',
    userOrFirm: 'Salma Ahmed',
    action: 'Transaction Initiated',
    amount: 3200
  },
];

const mockPendingItems = {
  firms: [
    {
      id: 1,
      name: 'Al-Rashid Accounting Services',
      email: 'info@alrashid-accounting.com',
      phone: '+966 11 234 5678',
      submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      documents: ['license.pdf', 'certificate.pdf'],
      status: 'pending'
    },
    {
      id: 2,
      name: 'Gulf Financial Consultancy',
      email: 'contact@gulffinancial.com',
      phone: '+966 12 345 6789',
      submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      documents: ['registration.pdf', 'insurance.pdf'],
      status: 'pending'
    },
  ],
  transactions: [
    {
      id: 1,
      clientName: 'Ahmed Al-Mahmoud',
      serviceName: 'Annual Audit',
      amount: 5500,
      firmName: 'Professional Auditors LLC',
      submittedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      status: 'pending_approval'
    },
    {
      id: 2,
      clientName: 'Fatima Trading Co.',
      serviceName: 'Tax Consultation',
      amount: 1200,
      firmName: 'Tax Experts Group',
      submittedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      status: 'dispute'
    },
  ],
};

export const getDashboardStats = async () => {
  await delay(800);
  return {
    stats: mockStats,
    revenueSeries: mockRevenueSeries,
    requestsByService: mockRequestsByService,
  };
};

export const getRecentActivity = async () => {
  await delay(600);
  return mockRecentActivity;
};

export const getPendingItems = async () => {
  await delay(700);
  return mockPendingItems;
};

export const approveFirm = async (firmId) => {
  await delay(1000);
  return { success: true, firmId };
};

export const rejectFirm = async (firmId) => {
  await delay(1000);
  return { success: true, firmId };
};

export const resolveTransaction = async (transactionId) => {
  await delay(1000);
  return { success: true, transactionId };
};

export const rejectPayment = async (transactionId) => {
  await delay(1000);
  return { success: true, transactionId };
};
console.log("first")