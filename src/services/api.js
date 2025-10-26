import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.yourdomain.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

// Auth API endpoints
export const authAPI = {
  login: async (data) => {
    try {
      // Mock API call - replace with actual endpoint
      console.log('Login attempt:', data);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful response
      return {
        data: {
          token: 'mock-jwt-token-' + Date.now(),
          user: {
            id: 1,
            email: data.email,
            type: 'client'
          }
        }
      };
    } catch (error) {
      throw error;
    }
  },

  registerCompany: async (formData) => {
    try {
      // Mock API call - replace with actual endpoint
      console.log('Company registration attempt');
      console.log('Form data entries:', [...formData.entries()]);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful response
      return {
        data: {
          message: 'Company registered successfully',
          userId: Date.now()
        }
      };
    } catch (error) {
      throw error;
    }
  },

  registerClient: async (data) => {
    try {
      // Mock API call - replace with actual endpoint
      console.log('Client registration attempt:', data);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful response
      return {
        data: {
          message: 'Client registered successfully',
          userId: Date.now()
        }
      };
    } catch (error) {
      throw error;
    }
  },

  forgotPassword: async (email) => {
    try {
      console.log('Forgot password request for:', email);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { data: { message: 'Reset instructions sent to your email' } };
    } catch (error) {
      throw error;
    }
  }
};

export default api;