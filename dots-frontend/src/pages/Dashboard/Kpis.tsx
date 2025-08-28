import React from 'react';
import { useQuery } from 'react-query';
import { getKpis } from '../../api/mockApi';

const Kpis: React.FC = () => {
  const { data, isLoading, error } = useQuery('kpis', getKpis);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading KPIs</div>;

  return (
    <div>
      <h2>Key Performance Indicators</h2>
      <ul>
        <li>Nitrate: {data.nitrate_mg_l} mg/L</li>
        <li>Moisture: {data.moisture_pct} %</li>
        <li>Temperature: {data.temperature_c} °C</li>
      </ul>
    </div>
  );
};

export default Kpis;