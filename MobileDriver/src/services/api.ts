import axios from 'axios';
import { TowingRequest, ApiResponse } from '../types';

// Replace YOUR_COMPUTER_IP with your actual IP address
const API_BASE_URL = __DEV__ 
  ? 'http://192.168.1.76:8000/api' // Update this with your computer's IP
  : 'https://your-production-api.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const towingRequestAPI = {
  getAll: async (): Promise<ApiResponse<TowingRequest[]>> => {
    const response = await api.get('/requests');
    return response.data;
  },

  getById: async (id: number): Promise<ApiResponse<TowingRequest>> => {
    const response = await api.get(`/requests/${id}`);
    return response.data;
  },

  updateStatus: async (id: number, status: string): Promise<ApiResponse<TowingRequest>> => {
    const response = await api.put(`/requests/${id}`, { status });
    return response.data;
  },

  checkHealth: async (): Promise<ApiResponse<any>> => {
    const response = await api.get('/health');
    return response.data;
  }
};

export default api;