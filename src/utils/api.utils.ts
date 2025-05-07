// src/api/apiClient.js
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const BASE_URL = 'https://your-api-url.com/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle token expiration and refresh logic here if needed
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Handle token refresh or logout
    }

    return Promise.reject(error);
  }
);

export default apiClient;
