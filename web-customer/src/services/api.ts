import axios from 'axios';
import { TowingRequest, ApiResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://192.168.1.76:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
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
  create: async (data: Omit<TowingRequest, 'id' | 'status' | 'created_at' | 'updated_at'>): Promise<ApiResponse<TowingRequest>> => {
    const response = await api.post('/requests', data);
    return response.data;
  },

  getAll: async (): Promise<ApiResponse<TowingRequest[]>> => {
    const response = await api.get('/requests');
    return response.data;
  },

  getById: async (id: number): Promise<ApiResponse<TowingRequest>> => {
    const response = await api.get(`/requests/${id}`);
    return response.data;
  },

  checkHealth: async (): Promise<ApiResponse<any>> => {
    const response = await api.get('/health');
    return response.data;
  }
};

export default api;