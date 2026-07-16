/**
 * Axios API Client
 * ----------------
 * Pre-configured Axios instance for backend communication.
 * Includes interceptors for auth headers and error handling.
 */

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

/**
 * Configured Axios instance with base URL and default headers.
 * All API calls should use this client.
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

// Request interceptor - add auth token when available
apiClient.interceptors.request.use(
  (config) => {
    // TODO: Add auth token from state/storage
    // const token = localStorage.getItem('auth_token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle common error patterns
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // TODO: Handle 401 unauthorized, token refresh, etc.
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
