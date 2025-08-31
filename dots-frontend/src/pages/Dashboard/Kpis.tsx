import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { Kpis as KpisType } from '../../api/types';
import api from '../../api/client';

const Kpis: React.FC = () => {
  const { data: kpis, isLoading, error } = useQuery<KpisType>({
    queryKey: ['kpis'],
    queryFn: api.fetchKpis,
    refetchInterval: 10000, // Refresh every 10 seconds
  });

  if (isLoading) return <div>Loading KPIs...</div>;
  if (error) return <div>Error loading KPIs</div>;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          מדדי ביצוע מרכזיים
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Box textAlign="center">
              <Typography variant="h4" color="primary">
                {kpis?.avgNitrate.toFixed(1)}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                ניטרט ממוצע (mg/L)
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Box textAlign="center">
              <Typography variant="h4" color="primary">
                {kpis?.avgMoisture.toFixed(1)}%
              </Typography>
              <Typography variant="body2" color="textSecondary">
                לחות ממוצעת
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Box textAlign="center">
              <Typography variant="h4" color="primary">
                {kpis?.avgTemp.toFixed(1)}°C
              </Typography>
              <Typography variant="body2" color="textSecondary">
                טמפרטורה ממוצעת
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Kpis;