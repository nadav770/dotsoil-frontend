import React from 'react';
import { Recommendation } from '../../api/types';

interface RecListProps {
  recommendations: Recommendation[];
}

const RecList: React.FC<RecListProps> = ({ recommendations }) => {
  return (
    <div>
      <h2>Recommendations</h2>
      <ul>
        {recommendations.map((rec) => (
          <li key={rec.id}>
            <strong>Action:</strong> {rec.action} <br />
            <strong>Amount:</strong> {rec.amount} {rec.units} <br />
            <strong>Reason:</strong> {rec.reason} <br />
            <strong>Timestamp:</strong> {rec.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecList;