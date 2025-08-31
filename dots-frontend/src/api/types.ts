export type Reading = { 
  sensorId: string; 
  timestamp: string; 
  nitrate: number; 
  moisture: number; 
  temp: number; 
};

export type Sensor = { 
  id: string; 
  type: 'multi'; 
  lat: number; 
  lng: number; 
};

export type Recommendation = { 
  id: string; 
  fieldId: string; 
  text: string; 
  severity: 'low'|'medium'|'high'; 
  createdAt: string; 
};

export type Field = { 
  id: string; 
  name: string; 
  crop: string; 
  center: { lat: number; lng: number }; 
  sensors: Sensor[]; 
};

export type Kpis = { 
  avgNitrate: number; 
  avgMoisture: number; 
  avgTemp: number; 
};

export type Alert = { 
  id: string; 
  fieldId: string; 
  message: string; 
  level: 'info'|'warn'|'critical'; 
  createdAt: string; 
};