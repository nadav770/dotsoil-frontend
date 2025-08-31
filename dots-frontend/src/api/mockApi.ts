import { Reading, Sensor, Recommendation, Field, Kpis, Alert } from './types';

// Mock data
const mockReadings: Reading[] = [
  { sensorId: 'sensor1', timestamp: '2023-10-01T12:00:00Z', nitrate: 5.0, moisture: 30, temp: 22 },
  { sensorId: 'sensor1', timestamp: '2023-10-01T12:01:00Z', nitrate: 5.5, moisture: 32, temp: 23 },
  { sensorId: 'sensor1', timestamp: '2023-10-01T12:02:00Z', nitrate: 6.0, moisture: 31, temp: 24 },
  { sensorId: 'sensor2', timestamp: '2023-10-01T12:00:00Z', nitrate: 4.5, moisture: 28, temp: 21 },
  { sensorId: 'sensor2', timestamp: '2023-10-01T12:01:00Z', nitrate: 4.8, moisture: 29, temp: 22 },
  { sensorId: 'sensor2', timestamp: '2023-10-01T12:02:00Z', nitrate: 5.2, moisture: 30, temp: 23 },
];

const mockSensors: Sensor[] = [
  { id: 'sensor1', type: 'multi', lat: 34.0, lng: -118.0 },
  { id: 'sensor2', type: 'multi', lat: 34.1, lng: -118.1 },
];

const mockRecommendations: Recommendation[] = [
  { id: 'rec1', fieldId: 'field1', text: 'Low moisture levels detected - recommend irrigation', severity: 'medium', createdAt: '2023-10-01T12:00:00Z' },
  { id: 'rec2', fieldId: 'field2', text: 'Nutrient deficiency - recommend fertilization', severity: 'high', createdAt: '2023-10-01T12:01:00Z' },
];

const mockFields: Field[] = [
  { id: 'field1', name: 'Field A', crop: 'Tomato', center: { lat: 34.0, lng: -118.0 }, sensors: [mockSensors[0]] },
  { id: 'field2', name: 'Field B', crop: 'Potato', center: { lat: 34.1, lng: -118.1 }, sensors: [mockSensors[1]] },
];

const mockKpis: Kpis = {
  avgNitrate: 5.2,
  avgMoisture: 30.0,
  avgTemp: 22.2
};

const mockAlerts: Alert[] = [
  { id: 'alert1', fieldId: 'field1', message: 'High nitrate levels detected', level: 'warn', createdAt: '2023-10-01T12:00:00Z' },
  { id: 'alert2', fieldId: 'field2', message: 'Moisture levels below threshold', level: 'critical', createdAt: '2023-10-01T12:05:00Z' },
];

// Mock API functions according to specification
export const fetchKpis = (): Promise<Kpis> => 
  new Promise(resolve => setTimeout(() => resolve(mockKpis), 100));

export const fetchAlerts = (): Promise<Alert[]> => 
  new Promise(resolve => setTimeout(() => resolve(mockAlerts), 100));

export const fetchFields = (): Promise<Field[]> => 
  new Promise(resolve => setTimeout(() => resolve(mockFields), 100));

export const fetchFieldById = (id: string): Promise<Field> => {
  const field = mockFields.find(f => f.id === id);
  if (!field) throw new Error(`Field with id ${id} not found`);
  return new Promise(resolve => setTimeout(() => resolve(field), 100));
};

export const fetchReadings = (params?: { fieldId?: string; sensorId?: string; limit?: number }): Promise<Reading[]> => {
  let filteredReadings = mockReadings;
  
  if (params?.sensorId) {
    filteredReadings = mockReadings.filter(r => r.sensorId === params.sensorId);
  } else if (params?.fieldId) {
    const field = mockFields.find(f => f.id === params.fieldId);
    if (field) {
      const sensorIds = field.sensors.map(s => s.id);
      filteredReadings = mockReadings.filter(r => sensorIds.includes(r.sensorId));
    }
  }
  
  if (params?.limit) {
    filteredReadings = filteredReadings.slice(-params.limit);
  }
  
  return new Promise(resolve => setTimeout(() => resolve(filteredReadings), 100));
};

export const fetchRecommendations = (fieldId: string): Promise<Recommendation[]> => {
  const recommendations = mockRecommendations.filter(r => r.fieldId === fieldId);
  return new Promise(resolve => setTimeout(() => resolve(recommendations), 100));
};

// Legacy exports for backward compatibility
export const getFields = fetchFields;
export const getFieldById = fetchFieldById;
export const getKpis = fetchKpis;

export default {
  fetchKpis,
  fetchAlerts,
  fetchFields,
  fetchFieldById,
  fetchReadings,
  fetchRecommendations
};