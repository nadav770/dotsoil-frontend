import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/client';
import { Reading } from '../../api/types';

interface TimeSeriesProps {
  data?: any[];
  readings?: any[];
  fieldId?: string;
  sensorId?: string;
}

const TimeSeries: React.FC<TimeSeriesProps> = ({ fieldId, sensorId }) => {
  const { data: readings, isLoading, error } = useQuery<Reading[]>({
    queryKey: ['readings', { fieldId, sensorId }],
    queryFn: () => api.fetchReadings({ fieldId, sensorId, limit: 60 }),
    refetchInterval: 10000, // Refresh every 10 seconds
  });

  if (isLoading) return <div>Loading chart data...</div>;
  if (error) return <div>Error loading chart data</div>;

  // Transform data for Recharts
  const chartData = readings?.map(reading => ({
    timestamp: new Date(reading.timestamp).toLocaleTimeString('he-IL'),
    nitrate: reading.nitrate,
    moisture: reading.moisture,
    temp: reading.temp,
  })) || [];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <Line type="monotone" dataKey="nitrate" stroke="#8884d8" name="ניטרט (mg/L)" />
        <Line type="monotone" dataKey="moisture" stroke="#82ca9d" name="לחות (%)" />
        <Line type="monotone" dataKey="temp" stroke="#ffc658" name="טמפרטורה (°C)" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TimeSeries;