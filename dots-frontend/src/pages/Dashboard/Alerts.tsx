import React from 'react';

const Alerts: React.FC = () => {
  // Mock alerts data
  const alerts = [
    { id: 1, message: 'High nitrate levels detected in Field A', timestamp: '2023-10-01T12:00:00Z' },
    { id: 2, message: 'Moisture levels below threshold in Field B', timestamp: '2023-10-01T12:05:00Z' },
    { id: 3, message: 'Temperature spike in Field C', timestamp: '2023-10-01T12:10:00Z' },
  ];

  return (
    <div>
      <h2>Alerts</h2>
      <ul>
        {alerts.map(alert => (
          <li key={alert.id}>
            <strong>{alert.message}</strong> - {new Date(alert.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Alerts;