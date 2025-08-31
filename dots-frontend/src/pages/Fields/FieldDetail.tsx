import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Chip, 
  ToggleButton, 
  ToggleButtonGroup,
  Divider
} from '@mui/material';
import { Crop, LocationOn, Sensors } from '@mui/icons-material';
import api from '../../api/client';
import { Field } from '../../api/types';
import FieldMap from '../../components/Map/FieldMap';
import TimeSeries from '../../components/Charts/TimeSeries';
import RecList from '../../components/Recommendations/RecList';

const FieldDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedSensor, setSelectedSensor] = useState<string>('all');
  
  const { data: field, isLoading, error } = useQuery<Field>({
    queryKey: ['field', id],
    queryFn: () => api.fetchFieldById(id!),
    enabled: !!id
  });

  if (isLoading) return <div>Loading field details...</div>;
  if (error) return <div>Error loading field details</div>;

  const handleSensorChange = (event: React.MouseEvent<HTMLElement>, newSensor: string) => {
    if (newSensor !== null) {
      setSelectedSensor(newSensor);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          {field?.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Chip 
            icon={<Crop />} 
            label={field?.crop} 
            color="primary" 
            variant="outlined"
            size="large"
          />
          <Chip 
            icon={<LocationOn />} 
            label={`${field?.center.lat.toFixed(4)}, ${field?.center.lng.toFixed(4)}`}
            color="secondary"
            variant="outlined"
          />
          <Chip 
            icon={<Sensors />} 
            label={`${field?.sensors.length} חיישנים`}
            color="info"
            variant="outlined"
          />
        </Box>
        <Divider />
      </Box>

      {/* Map and Charts Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} lg={6}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                מפת השדה
              </Typography>
              <FieldMap field={field!} />
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} lg={6}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                נתוני חיישנים
              </Typography>
              
              {/* Sensor Toggle */}
              <Box sx={{ mb: 2 }}>
                <ToggleButtonGroup
                  value={selectedSensor}
                  exclusive
                  onChange={handleSensorChange}
                  size="small"
                >
                  <ToggleButton value="all">
                    כל החיישנים
                  </ToggleButton>
                  {field?.sensors.map(sensor => (
                    <ToggleButton key={sensor.id} value={sensor.id}>
                      {sensor.id}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Box>
              
              <TimeSeries 
                fieldId={field?.id}
                sensorId={selectedSensor === 'all' ? undefined : selectedSensor}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recommendations */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                המלצות
              </Typography>
              <RecList fieldId={field?.id!} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FieldDetail;