import api from './api.js';

// Admin API endpoints
export const adminAPI = {
  // Service Providers
  listServiceProviders: (params = {}) => {
    const { page = 1, limit = 25, q = '', status = '', sort = '-createdAt' } = params;
    return api.get('/admin/service-providers', {
      params: { page, limit, q, status, sort },
    });
  },
  getServiceProvider: (id) => api.get(`/admin/service-providers/${id}`),

  // Clients
  listClients: (params = {}) => {
    const { page = 1, limit = 25, q = '', sort = '-createdAt' } = params;
    return api.get('/admin/clients', {
      params: { page, limit, q, sort },
    });
  },
  getClient: (id) => api.get(`/admin/clients/${id}`),

  // Transactions
  listTransactions: (params = {}) => {
    const {
      page = 1,
      limit = 25,
      type = '',
      status = '',
      fromDate = '',
      toDate = '',
      sort = '-createdAt',
    } = params;
    return api.get('/admin/transactions', {
      params: { page, limit, type, status, fromDate, toDate, sort },
    });
  },

  // Reports
  dailyReport: (date) => {
    return api.get('/admin/reports/daily', {
      params: { date: date || new Date().toISOString().split('T')[0] },
    });
  },

  // Sub-admins
  createSubAdmin: (data) => api.post('/admin/subadmins', data),

  // Legacy endpoints (for backward compatibility)
  listCompanies: (params = {}) => {
    const { page = 1, limit = 25, q = '', status = '', sort = '-createdAt' } = params;
    return api.get('/admin/companies', {
      params: { page, limit, q, status, sort },
    });
  },
  getCompany: (id) => api.get(`/admin/companies/${id}`),
};

export default adminAPI;

