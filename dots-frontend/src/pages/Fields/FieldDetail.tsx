import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { mockApi } from '../../api/mockApi';
import FieldMap from '../../components/Map/FieldMap';
import TimeSeries from '../../components/Charts/TimeSeries';
import { Field } from '../../api/types';

const FieldDetail: React.FC = () => {
  const { fieldId } = useParams<{ fieldId: string }>();
  
  const { data: field, isLoading, error } = useQuery<Field>(
    ['field', fieldId],
    () => mockApi.getFieldById(fieldId!)
  );
  const fieldQ = useQuery({ queryKey: ['field', id], queryFn: () => api.fetchFieldById(id!) });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading field details</div>;

  return (
    <div>
      <h1>{field?.name}</h1>
      <h2>Crop: {field?.crop}</h2>
      <FieldMap sensors={field?.sensors} />
      <TimeSeries readings={field?.sensors.map(sensor => sensor.lastReading)} />
    </div>
  );
};

export default FieldDetail;