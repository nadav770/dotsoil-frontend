import { Reading, Sensor, Recommendation, Field, Kpis, Alert } from './types';

// Generate real-time mock data
const generateRealTimeReadings = (): Reading[] => {
  const now = new Date();
  const readings: Reading[] = [];
  
  // Generate data for last 24 hours with 10-minute intervals
  for (let i = 0; i < 144; i++) {
    const timestamp = new Date(now.getTime() - (143 - i) * 10 * 60 * 1000);
    
    // Simulate realistic agricultural data with some randomness
    const baseNitrate = 5.0 + Math.sin(i * 0.1) * 2 + (Math.random() - 0.5) * 0.5;
    const baseMoisture = 30 + Math.sin(i * 0.05) * 10 + (Math.random() - 0.5) * 3;
    const baseTemp = 22 + Math.sin(i * 0.03) * 8 + (Math.random() - 0.5) * 2;
    
    readings.push({
      sensorId: 'sensor1',
      timestamp: timestamp.toISOString(),
      nitrate: Math.max(0, Math.min(15, baseNitrate)),
      moisture: Math.max(10, Math.min(80, baseMoisture)),
      temp: Math.max(15, Math.min(35, baseTemp))
    });
    
    readings.push({
      sensorId: 'sensor2',
      timestamp: timestamp.toISOString(),
      nitrate: Math.max(0, Math.min(15, baseNitrate + (Math.random() - 0.5) * 1)),
      moisture: Math.max(10, Math.min(80, baseMoisture + (Math.random() - 0.5) * 5)),
      temp: Math.max(15, Math.min(35, baseTemp + (Math.random() - 0.5) * 3))
    });
  }
  
  return readings;
};

const mockReadings: Reading[] = generateRealTimeReadings();

const mockSensors: Sensor[] = [
  { id: 'sensor1', type: 'multi', lat: 34.0, lng: -118.0 },
  { id: 'sensor2', type: 'multi', lat: 34.1, lng: -118.1 },
];

const mockRecommendations: Recommendation[] = [
  { id: 'rec1', fieldId: 'field1', text: 'Low moisture levels detected - recommend irrigation', severity: 'medium', createdAt: '2023-10-01T12:00:00Z' },
  { id: 'rec2', fieldId: 'field2', text: 'Nutrient deficiency - recommend fertilization', severity: 'high', createdAt: '2023-10-01T12:01:00Z' },
];

let mockFields: Field[] = [
  { id: 'field1', name: 'שדה עגבניות', crop: 'Tomato', center: { lat: 32.0853, lng: 34.7818 }, sensors: [mockSensors[0]] },
  { id: 'field2', name: 'שדה תפוחי אדמה', crop: 'Potato', center: { lat: 32.0853, lng: 34.7818 }, sensors: [mockSensors[1]] },
  { id: 'field3', name: 'שדה חיטה', crop: 'Wheat', center: { lat: 32.0853, lng: 34.7818 }, sensors: [mockSensors[0]] },
  { id: 'field4', name: 'שדה תירס', crop: 'Corn', center: { lat: 32.0853, lng: 34.7818 }, sensors: [mockSensors[1]] },
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

// Alert thresholds management
let mockAlertThresholds = [
  { id: '1', parameter: 'nitrate', minValue: 0, maxValue: 10, enabled: true },
  { id: '2', parameter: 'moisture', minValue: 20, maxValue: 80, enabled: true },
  { id: '3', parameter: 'temp', minValue: 15, maxValue: 35, enabled: true }
];

// Mock API functions according to specification
export const fetchKpis = (): Promise<Kpis> => 
  new Promise(resolve => setTimeout(() => resolve(mockKpis), 100));

export const fetchAlerts = (): Promise<Alert[]> => 
  new Promise(resolve => setTimeout(() => resolve(mockAlerts), 100));

export const fetchFields = (): Promise<Field[]> => 
  new Promise(resolve => setTimeout(() => resolve(mockFields), 100));

export const fetchFieldById = (id: string): Promise<Field> => {
  console.log('mockApi: fetchFieldById called with id:', id);
  console.log('mockApi: Available fields:', mockFields);
  
  const field = mockFields.find(f => f.id === id);
  console.log('mockApi: Found field:', field);
  
  if (!field) {
    console.error('mockApi: Field not found for id:', id);
    throw new Error(`Field with id ${id} not found`);
  }
  
  console.log('mockApi: Returning field:', field);
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

// CRUD operations for fields
export const addField = (fieldData: Omit<Field, 'id'>): Promise<Field> => {
  const newField: Field = {
    ...fieldData,
    id: `field${Date.now()}`,
    sensors: []
  };
  mockFields.push(newField);
  return new Promise(resolve => setTimeout(() => resolve(newField), 100));
};

export const updateField = (id: string, fieldData: Partial<Field>): Promise<Field> => {
  const fieldIndex = mockFields.findIndex(f => f.id === id);
  if (fieldIndex === -1) throw new Error(`Field with id ${id} not found`);
  
  mockFields[fieldIndex] = { ...mockFields[fieldIndex], ...fieldData };
  return new Promise(resolve => setTimeout(() => resolve(mockFields[fieldIndex]), 100));
};

export const deleteField = (id: string): Promise<void> => {
  const fieldIndex = mockFields.findIndex(f => f.id === id);
  if (fieldIndex === -1) throw new Error(`Field with id ${id} not found`);
  
  mockFields.splice(fieldIndex, 1);
  return new Promise(resolve => setTimeout(() => resolve(), 100));
};

// Alert thresholds management
export const fetchAlertThresholds = (): Promise<any[]> => 
  new Promise(resolve => setTimeout(() => resolve(mockAlertThresholds), 100));

export const addAlertThreshold = (thresholdData: { parameter: string; minValue: number; maxValue: number; enabled: boolean }): Promise<any> => {
  const newThreshold = {
    ...thresholdData,
    id: `threshold${Date.now()}`
  };
  mockAlertThresholds.push(newThreshold);
  return new Promise(resolve => setTimeout(() => resolve(newThreshold), 100));
};

export const updateAlertThreshold = (id: string, thresholdData: Partial<{ parameter: string; minValue: number; maxValue: number; enabled: boolean }>): Promise<any> => {
  const thresholdIndex = mockAlertThresholds.findIndex(t => t.id === id);
  if (thresholdIndex === -1) throw new Error(`Threshold with id ${id} not found`);
  
  mockAlertThresholds[thresholdIndex] = { ...mockAlertThresholds[thresholdIndex], ...thresholdData };
  return new Promise(resolve => setTimeout(() => resolve(mockAlertThresholds[thresholdIndex]), 100));
};

export const deleteAlertThreshold = (id: string): Promise<void> => {
  const thresholdIndex = mockAlertThresholds.findIndex(t => t.id === id);
  if (thresholdIndex === -1) throw new Error(`Threshold with id ${id} not found`);
  
  mockAlertThresholds.splice(thresholdIndex, 1);
  return new Promise(resolve => setTimeout(() => resolve(), 100));
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
  fetchRecommendations,
  addField,
  updateField,
  deleteField,
  fetchAlertThresholds,
  addAlertThreshold,
  updateAlertThreshold,
  deleteAlertThreshold
};