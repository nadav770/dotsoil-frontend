import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/client';
import { Kpis } from '../../api/types';
import KpisComponent from './Kpis';
import Alerts from './Alerts';
import TimeSeries from '../../components/Charts/TimeSeries';

const Dashboard: React.FC = () => {
  const { data: kpis, isLoading, error } = useQuery<Kpis>({
    queryKey: ['kpis'],
    queryFn: api.fetchKpis,
    refetchInterval: 10000, // Refresh every 10 seconds
  });

  if (isLoading) return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '50vh',
      flexDirection: 'column',
      gap: 2
    }}>
      <Typography variant="h6" color="text.secondary">טוען דשבורד...</Typography>
      <Box sx={{ 
        width: 40, 
        height: 40, 
        border: '4px solid #f3f3f3', 
        borderTop: '4px solid #16B34F', 
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Box>
  );
  
  if (error) return (
    <Box sx={{ 
      p: 3, 
      textAlign: 'center',
      backgroundColor: '#fff3e0',
      borderRadius: 2,
      border: '1px solid #ffb74d'
    }}>
      <Typography variant="h6" color="error" gutterBottom>
        שגיאה בטעינת הדשבורד
      </Typography>
      <Typography variant="body2" color="text.secondary">
        אנא נסה שוב מאוחר יותר או פנה לתמיכה
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" gutterBottom sx={{ 
        mb: 4, 
        color: '#16B34F',
        fontWeight: 700,
        textAlign: 'center',
        '&::after': {
          content: '""',
          display: 'block',
          width: '60px',
          height: '4px',
          backgroundColor: '#16B34F',
          margin: '16px auto 0',
          borderRadius: '2px'
        }
      }}>
        דשבורד ניטור קרקע
      </Typography>
      
      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            height: '100%',
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            border: '1px solid #dee2e6',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 25px rgba(22, 179, 79, 0.15)',
              borderColor: '#16B34F'
            }
          }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Typography color="text.secondary" gutterBottom variant="h6" sx={{ mb: 2 }}>
                ניטרט ממוצע
              </Typography>
              <Typography variant="h3" sx={{ 
                color: '#16B34F', 
                fontWeight: 700,
                mb: 1
              }}>
                {kpis?.avgNitrate.toFixed(1)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                mg/L
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            height: '100%',
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            border: '1px solid #dee2e6',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 25px rgba(22, 179, 79, 0.15)',
              borderColor: '#16B34F'
            }
          }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Typography color="text.secondary" gutterBottom variant="h6" sx={{ mb: 2 }}>
                לחות ממוצעת
              </Typography>
              <Typography variant="h3" sx={{ 
                color: '#16B34F', 
                fontWeight: 700,
                mb: 1
              }}>
                {kpis?.avgMoisture.toFixed(1)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                %
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            height: '100%',
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            border: '1px solid #dee2e6',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 25px rgba(22, 179, 79, 0.15)',
              borderColor: '#16B34F'
            }
          }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Typography color="text.secondary" gutterBottom variant="h6" sx={{ mb: 2 }}>
                טמפרטורה ממוצעת
              </Typography>
              <Typography variant="h3" sx={{ 
                color: '#16B34F', 
                fontWeight: 700,
                mb: 1
              }}>
                {kpis?.avgTemp.toFixed(1)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                °C
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts and Alerts Row */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Card sx={{
            border: '1px solid #dee2e6',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 4px 20px rgba(22, 179, 79, 0.1)',
              borderColor: '#16B34F'
            }
          }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ 
                color: '#16B34F',
                fontWeight: 600,
                mb: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                📊 נתוני חיישנים בזמן אמת
              </Typography>
              <TimeSeries 
                fieldId="all"
                sensorId="all"
              />
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} lg={4}>
          <Card sx={{
            border: '1px solid #dee2e6',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 4px 20px rgba(22, 179, 79, 0.1)',
              borderColor: '#16B34F'
            }
          }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ 
                color: '#16B34F',
                fontWeight: 600,
                mb: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                ⚠️ התראות מערכת
              </Typography>
              <Alerts />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;