import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000, // Default timeout for regular requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create a separate instance for file uploads with longer timeout
const uploadApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 60000, // 60 seconds for file uploads
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for uploadApi
uploadApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // If data is FormData, remove Content-Type to let browser set it with boundary
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for uploadApi
uploadApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // If data is FormData, remove Content-Type to let browser set it with boundary
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Requests API per spec
export const requestsAPI = {
  list: (params = {}) => {
    const { page = 1, limit = 25, status = '', q = '', sort = '-createdAt' } = params;
    return api.get('/requests/my', { params: { page, limit, status, q, sort } });
  },
  create: (data) => api.post('/requests/create', data), // JSON payload (no files)
  createWithFiles: (formData) => {
    // FormData requests - Content-Type will be automatically set by browser with boundary
    // The interceptor already handles this, so we just need to pass the FormData
    return api.post('/requests/create', formData);
  },
  get: (id) => api.get(`/requests/${id}`),
  getWithProposals: (id) => api.get(`/requests/${id}/proposals`),
  update: (id, data) => api.patch(`/requests/${id}`, data),
  remove: (id) => api.delete(`/requests/${id}`),
  // Service Provider API - browse available requests
  browse: (params = {}) => {
    const { page = 1, limit = 25, status = '', q = '', sort = '-createdAt' } = params;
    return api.get('/service-provider/requests', { params: { page, limit, status, q, sort } });
  },
  getForServiceProvider: (id) => api.get(`/service-provider/requests/${id}`),
};

// Proposals API
export const proposalsAPI = {
  // Service Provider: List my proposals
  listMy: () => api.get('/service-provider/proposals/my'),
  // Service Provider: Get single proposal
  get: (id) => api.get(`/service-provider/proposals/${id}`),
  // Service Provider: Create proposal with files
  create: (requestId, formData) => {
    // FormData should include: price, durationDays, notes, and files as 'documents'
    return api.post(`/service-provider/requests/${requestId}/proposals`, formData);
  },
  // Service Provider: Update proposal
  update: (id, formData) => api.patch(`/service-provider/proposals/${id}`, formData),
  // Service Provider: Cancel proposal
  cancel: (id) => api.delete(`/service-provider/proposals/${id}`),
  // Client: List proposals for a request
  listByRequest: (requestId) => api.get(`/requests/${requestId}/proposals`),
};

// Bookings API
export const bookingsAPI = {
  // Client: List my bookings
  listMy: () => api.get('/bookings/my'),
  // Client: Get single booking
  get: (id) => api.get(`/bookings/${id}`),
  // Client: Accept a proposal (creates booking and wallet hold)
  acceptProposal: (proposalId) => api.post(`/bookings/proposals/${proposalId}/accept`),
  // Client: Cancel booking
  cancel: (id) => api.patch(`/bookings/${id}/cancel`),
  // Service Provider: List my bookings
  listMyForProvider: () => api.get('/service-provider/bookings/my'),
  // Service Provider: Update booking status (accept, start, complete)
  updateStatus: (id, action) => api.patch(`/service-provider/bookings/${id}/${action}`),
};

// Wallet API per spec
export const walletAPI = {
  // Client wallet endpoint
  get: () => api.get('/wallet'), // returns { balance, transactions }
  // Service provider wallet endpoint
  getForServiceProvider: () => api.get('/service-provider/wallet'), // returns { balance, transactions }
  deposit: (amount) => api.post('/wallet/deposit', { amount }),
  // Note: hold/release/refund are typically called by backend when accepting proposals
};

// Messages API per spec
export const messagesAPI = {
  // Client APIs (legacy - using serviceProviderId)
  getConversation: (serviceProviderId) => api.get(`/messages/${serviceProviderId}`),
  send: (serviceProviderId, data) => api.post(`/messages/${serviceProviderId}`, data),
  // Service Provider APIs (legacy - using clientId)
  getConversationForServiceProvider: (clientId) => api.get(`/messages/service-provider/${clientId}`),
  sendFromServiceProvider: (clientId, data) => api.post(`/messages/service-provider/${clientId}`, data),
  // List conversations
  listClientConversations: () => api.get('/messages/conversations/client'),
  listServiceProviderConversations: () => api.get('/messages/conversations/service-provider'),
  // Conversation-based APIs (using conversationId)
  getMessagesByConversation: (conversationId) => api.get(`/messages/conversation/${conversationId}`),
  sendToConversation: (conversationId, data) => api.post(`/messages/conversation/${conversationId}`, data),
  // Create chat for proposal
  createChatForProposal: (proposalId) => api.post(`/messages/proposals/${proposalId}/chat`),
  // Legacy support
  getConversationLegacy: (companyId) => api.get(`/messages/${companyId}`),
  sendLegacy: (companyId, data) => api.post(`/messages/${companyId}`, data),
};

// Service Provider API
export const serviceProviderAPI = {
  // Dashboard stats
  getDashboardStats: () => api.get('/service-provider/dashboard/stats'),
  // Browse available requests
  browseRequests: (params) => api.get('/service-provider/requests', { params }),
  getRequest: (id) => api.get(`/service-provider/requests/${id}`),
  // Wallet for service providers
  getWallet: () => api.get('/service-provider/wallet'),
  // Bookings
  listMyBookings: () => api.get('/service-provider/bookings/my'),
  updateBooking: (id, action) => api.patch(`/service-provider/bookings/${id}/${action}`),
};

// Admin API (users, requests, bookings, proposals)
export const adminAPI = {
  listUsers: (params) => api.get('/admin/users', { params }),
  updateUserStatus: (id, status) => api.patch(`/admin/users/${id}/status`, { status }),
  listRequests: (params) => api.get('/admin/requests', { params }),
  listPendingRequests: (params) => {
    // Filter requests with status=pending
    const queryParams = { ...params, status: 'pending' };
    return api.get('/admin/requests', { params: queryParams });
  },
  getRequest: (id) => api.get(`/admin/requests/${id}`),
  approveRequest: (id) => api.patch(`/admin/requests/${id}/approve`),
  rejectRequest: (id, reason) => {
    if (!reason || !reason.trim()) {
      return Promise.reject(new Error('Rejection reason is required'));
    }
    return api.patch(`/admin/requests/${id}/reject`, { reason: reason.trim() });
  },
  listBookings: (params) => api.get('/admin/bookings', { params }),
  listPendingProposals: (params) => api.get('/admin/proposals/pending', { params }),
  approveProposal: (id) => api.patch(`/admin/proposals/${id}/approve`),
  rejectProposal: (id, reason) => api.patch(`/admin/proposals/${id}/reject`, { reason }),
};

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

// Users API endpoints
export const usersAPI = {
  // Get logged-in user profile
  getMe: () => api.get('/users/me'),
  // Update user profile
  updateProfile: (data) => api.put('/users/update-profile', data),
  // Upload avatar (FormData with 'avatar' field) - uses uploadApi with longer timeout
  uploadAvatar: (formData) => uploadApi.post('/users/upload-avatar', formData),
};

// Portfolio API endpoints
export const portfolioAPI = {
  // Get all portfolio items for logged-in user (optionally filtered by type)
  getMyItems: (type) => {
    const params = type ? { type } : {};
    return api.get('/portfolio/my-items', { params });
  },
  // Get single portfolio item
  getItem: (id) => api.get(`/portfolio/${id}`),
  // Create new portfolio item (with files)
  create: (formData) => uploadApi.post('/portfolio', formData),
  // Update portfolio item (with optional new files)
  update: (id, formData) => uploadApi.put(`/portfolio/${id}`, formData),
  // Delete portfolio item
  delete: (id) => api.delete(`/portfolio/${id}`),
  // Delete a specific file from a portfolio item
  deleteFile: (id, fileIndex) => api.delete(`/portfolio/${id}/files/${fileIndex}`),
};

// Auth API endpoints
export const authAPI = {
  // Login with email/password
  login: (data) => api.post('/auth/login', data),
  // Register (generic)
  register: (data) => api.post('/auth/register', data),
  // Get current profile
  getProfile: () => api.get('/auth/me'),
  // Phone verification
  sendPhoneCode: (phone) => api.post('/auth/verify/send', { phone }),
  verifyPhoneCode: (phone, code) => api.post('/auth/verify/check', { phone, code }),

  // Service Provider registration (multipart/form-data with documents)
  // NOTE: Content-Type is automatically removed by interceptor for FormData
  registerServiceProvider: (formData) =>
    api.post('/auth/register/service-provider', formData),
  // Legacy endpoint for backward compatibility
  registerCompany: (formData) =>
    api.post('/auth/register/company', formData),

  // Client registration (JSON payload)
  registerClient: (data) => api.post('/auth/register/client', data),

  // Forgot password
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
};

export default api;