import { Reading, Sensor, Recommendation, Field } from './types';

const mockReadings: Reading[] = [
  { timestamp: '2023-10-01T12:00:00Z', nitrate_mg_l: 5.0, moisture_pct: 30, temperature_c: 22 },
  { timestamp: '2023-10-01T12:01:00Z', nitrate_mg_l: 5.5, moisture_pct: 32, temperature_c: 23 },
  { timestamp: '2023-10-01T12:02:00Z', nitrate_mg_l: 6.0, moisture_pct: 31, temperature_c: 24 },
];

const mockSensors: Sensor[] = [
  { id: 'sensor1', fieldId: 'field1', lat: 34.0, lng: -118.0, lastReading: mockReadings[2] },
  { id: 'sensor2', fieldId: 'field2', lat: 34.1, lng: -118.1, lastReading: mockReadings[1] },
];

const mockRecommendations: Recommendation[] = [
  { id: 'rec1', fieldId: 'field1', timestamp: '2023-10-01T12:00:00Z', action: 'IRRIGATE', amount: 100, units: 'L/ha', reason: 'Low moisture levels' },
  { id: 'rec2', fieldId: 'field2', timestamp: '2023-10-01T12:01:00Z', action: 'FERTILIZE', amount: 50, units: 'kg/ha', reason: 'Nutrient deficiency' },
];

const mockFields: Field[] = [
  { id: 'field1', name: 'Field A', crop: 'Tomato', lat: 34.0, lng: -118.0, sensors: [mockSensors[0]] },
  { id: 'field2', name: 'Field B', crop: 'Potato', lat: 34.1, lng: -118.1, sensors: [mockSensors[1]] },
];

const mockApi = {
  getReadings: () => Promise.resolve(mockReadings),
  getSensors: () => Promise.resolve(mockSensors),
  getRecommendations: () => Promise.resolve(mockRecommendations),
  getFields: () => Promise.resolve(mockFields),
};

export default mockApi;