import { Reading, Sensor, Kpis, Alert, Recommendation } from './types';

// Simulator for real-time data updates
let simulationInterval: number | null = null;

const generateRandomReading = (sensorId: string): Reading => {
  const currentTime = new Date().toISOString();
  return {
    sensorId,
    timestamp: currentTime,
    nitrate: Math.random() * 10 + 2, // 2-12 mg/L
    moisture: Math.random() * 40 + 20, // 20-60%
    temp: Math.random() * 20 + 15, // 15-35°C
  };
};

const updateKpis = (): Kpis => ({
  avgNitrate: Math.random() * 8 + 3, // 3-11 mg/L
  avgMoisture: Math.random() * 30 + 25, // 25-55%
  avgTemp: Math.random() * 15 + 18, // 18-33°C
});

const generateRandomAlert = (): Alert => {
  const levels: Alert['level'][] = ['info', 'warn', 'critical'];
  const messages = [
    'Nitrate levels above threshold',
    'Moisture levels below recommended range',
    'Temperature spike detected',
    'Sensor calibration needed',
    'Irrigation system malfunction'
  ];
  
  return {
    id: `alert_${Date.now()}`,
    fieldId: `field${Math.floor(Math.random() * 2) + 1}`,
    message: messages[Math.floor(Math.random() * messages.length)],
    level: levels[Math.floor(Math.random() * levels.length)],
    createdAt: new Date().toISOString()
  };
};

const generateRandomRecommendation = (): Recommendation => {
  const severities: Recommendation['severity'][] = ['low', 'medium', 'high'];
  const texts = [
    'Consider irrigation due to low moisture',
    'Fertilizer application recommended',
    'Monitor temperature trends',
    'Check sensor connections',
    'Schedule maintenance visit'
  ];
  
  return {
    id: `rec_${Date.now()}`,
    fieldId: `field${Math.floor(Math.random() * 2) + 1}`,
    text: texts[Math.floor(Math.random() * texts.length)],
    severity: severities[Math.floor(Math.random() * severities.length)],
    createdAt: new Date().toISOString()
  };
};

export const startSimulator = (intervalMs: number = 5000) => {
  if (simulationInterval) {
    clearInterval(simulationInterval);
  }
  
  simulationInterval = setInterval(() => {
    // Generate new readings for all sensors
    const newReadings = ['sensor1', 'sensor2'].map(sensorId => 
      generateRandomReading(sensorId)
    );
    
    // Update KPIs
    const newKpis = updateKpis();
    
    // Generate new alerts (occasionally)
    if (Math.random() < 0.3) { // 30% chance
      const newAlert = generateRandomAlert();
      console.log('New alert generated:', newAlert);
    }
    
    // Generate new recommendations (occasionally)
    if (Math.random() < 0.2) { // 20% chance
      const newRecommendation = generateRandomRecommendation();
      console.log('New recommendation generated:', newRecommendation);
    }
    
    console.log('Simulator update:', { 
      readings: newReadings.length, 
      kpis: newKpis,
      timestamp: new Date().toISOString() 
    });
  }, intervalMs);
  
  console.log(`Simulator started with ${intervalMs}ms interval`);
};

export const stopSimulator = () => {
  if (simulationInterval) {
    clearInterval(simulationInterval);
    simulationInterval = null;
    console.log('Simulator stopped');
  }
};