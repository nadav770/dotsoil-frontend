import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

export const Kpis: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>ניטרט</Typography>
            <Typography variant="h5">75 mg/l</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>לחות</Typography>
            <Typography variant="h5">65%</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>טמפרטורה</Typography>
            <Typography variant="h5">23°C</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};