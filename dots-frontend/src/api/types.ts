export type Reading = {
  timestamp: string;
  nitrate_mg_l: number;
  moisture_pct: number;
  temperature_c: number;
};

export type Sensor = {
  id: string;
  fieldId: string;
  lat: number;
  lng: number;
  lastReading: Reading;
};

export type Recommendation = {
  id: string;
  fieldId: string;
  timestamp: string;
  action: 'IRRIGATE' | 'FERTILIZE';
  amount: number;
  units: 'L/ha' | 'kg/ha';
  reason: string;
};

export type Field = {
  id: string;
  name: string;
  crop: 'Tomato' | 'Potato' | 'Wheat' | 'Corn';
  lat: number;
  lng: number;
  sensors: Sensor[];
};