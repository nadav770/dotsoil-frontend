import axios from 'axios';
import * as mockApi from './mockApi';

// API client that currently points to mockApi
// In the future, this will point to real REST endpoints
const api = {
  fetchKpis: mockApi.fetchKpis,
  fetchAlerts: mockApi.fetchAlerts,
  fetchFields: mockApi.fetchFields,
  fetchFieldById: (id: string) => {
    console.log('API client: fetchFieldById called with id:', id);
    const result = mockApi.fetchFieldById(id);
    console.log('API client: fetchFieldById result:', result);
    return result;
  },
  fetchReadings: mockApi.fetchReadings,
  fetchRecommendations: mockApi.fetchRecommendations,
  addField: mockApi.addField,
  updateField: mockApi.updateField,
  deleteField: mockApi.deleteField,
  fetchAlertThresholds: mockApi.fetchAlertThresholds,
  addAlertThreshold: mockApi.addAlertThreshold,
  updateAlertThreshold: mockApi.updateAlertThreshold,
  deleteAlertThreshold: mockApi.deleteAlertThreshold,
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
//   addField: (data: any) => axios.post('/fields', data).then(res => res.data),
//   updateField: (id: string, data: any) => axios.put(`/fields/${id}`, data).then(res => res.data),
//   deleteField: (id: string) => axios.delete(`/fields/${id}`).then(res => res.data),
//   fetchAlertThresholds: () => axios.get('/alert-thresholds').then(res => res.data),
//   addAlertThreshold: (data: any) => axios.post('/alert-thresholds', data).then(res => res.data),
//   updateAlertThreshold: (id: string, data: any) => axios.put(`/alert-thresholds/${id}`, data).then(res => res.data),
//   deleteAlertThreshold: (id: string) => axios.delete(`/alert-thresholds/${id}`).then(res => res.data),
// };

export default api;