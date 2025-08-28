import { Reading, Sensor } from './types';

const simulateData = (sensor: Sensor): Reading => {
  const currentTime = new Date().toISOString();
  return {
    timestamp: currentTime,
    nitrate_mg_l: Math.random() * 100,
    moisture_pct: Math.random() * 100,
    temperature_c: Math.random() * 40,
  };
};

const updateSensorData = (sensors: Sensor[]): Sensor[] => {
  return sensors.map(sensor => ({
    ...sensor,
    lastReading: simulateData(sensor),
  }));
};

const startSimulation = (sensors: Sensor[], callback: (updatedSensors: Sensor[]) => void) => {
  setInterval(() => {
    const updatedSensors = updateSensorData(sensors);
    callback(updatedSensors);
  }, 5000); // Update every 5 seconds
};

export { startSimulation };