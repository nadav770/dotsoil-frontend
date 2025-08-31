import axios from 'axios';
import * as mockApi from './mockApi';

// API client that currently points to mockApi
// In the future, this will point to real REST endpoints
const api = {
  fetchKpis: mockApi.fetchKpis,
  fetchAlerts: mockApi.fetchAlerts,
  fetchFields: mockApi.fetchFields,
  fetchFieldById: mockApi.fetchFieldById,
  fetchReadings: mockApi.fetchReadings,
  fetchRecommendations: mockApi.fetchRecommendations,
};

// When switching to REST API, uncomment and configure:
// axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
// 
// const api = {
//   fetchKpis: () => axios.get('/kpis').then(res => res.data),
//   fetchAlerts: () => axios.get('/alerts').then(res => res.data),
//   fetchFields: () => axios.get('/fields').then(res => res.data),
//   fetchFieldById: (id: string) => axios.get(`/fields/${id}`).then(res => res.data),
//   fetchReadings: (params?: any) => axios.get('/readings', { params }).then(res => res.data),
//   fetchRecommendations: (fieldId: string) => axios.get(`/fields/${fieldId}/recommendations`).then(res => res.data),
// };

export default api;