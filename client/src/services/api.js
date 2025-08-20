import axios from 'axios';
import { auth } from '../config/firebase';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API functions for placements
export const placementsAPI = {
  getAll: (filters = {}) => api.get('/placements', { params: filters }),
  getById: (id) => api.get(`/placements/${id}`),
  getFilterOptions: () => api.get('/placements/filters/options'),
  create: (data) => api.post('/admin/placements', data),
  update: (id, data) => api.put(`/admin/placements/${id}`, data),
  delete: (id) => api.delete(`/admin/placements/${id}`),
};

// API functions for higher education
export const higherEducationAPI = {
  getAll: (filters = {}) => api.get('/higher-education', { params: filters }),
  getById: (id) => api.get(`/higher-education/${id}`),
  getFilterOptions: () => api.get('/higher-education/filters/options'),
  create: (data) => api.post('/admin/higher-education', data),
  update: (id, data) => api.put(`/admin/higher-education/${id}`, data),
  delete: (id) => api.delete(`/admin/higher-education/${id}`),
};

// API functions for admin
export const adminAPI = {
  login: (credentials) => api.post('/admin/login', credentials),
};

export default api;
