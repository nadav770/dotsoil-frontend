import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, Typography, Grid, Box, Paper, Chip } from '@mui/material';
import { TrendingUp, TrendingDown, WaterDrop, Thermostat, Science } from '@mui/icons-material';
import { Kpis as KpisType } from '../../api/types';
import api from '../../api/client';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const Kpis: React.FC = () => {
  const { data: kpis, isLoading, error } = useQuery<KpisType>({
    queryKey: ['kpis'],
    queryFn: api.fetchKpis,
    refetchInterval: 10000, // Refresh every 10 seconds
  });

  if (isLoading) return <LoadingSpinner message="טוען KPIs..." size={30} />;
  if (error) return (
    <Box sx={{ 
      p: 2, 
      textAlign: 'center',
      backgroundColor: '#ffebee',
      borderRadius: 2,
      border: '1px solid #f44336'
    }}>
      <Typography variant="body2" color="error">
        שגיאה בטעינת KPIs
      </Typography>
    </Box>
  );

  const getTrendIcon = (value: number, baseline: number = 50) => {
    if (value > baseline) return <TrendingUp color="success" />;
    if (value < baseline) return <TrendingDown color="error" />;
    return <TrendingUp color="info" />;
  };

  const getStatusColor = (value: number, min: number, max: number) => {
    if (value < min) return 'error';
    if (value > max) return 'warning';
    return 'success';
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6" sx={{ 
          fontWeight: 600, 
          color: '#2E7D32',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <Science sx={{ fontSize: 20 }} />
          מדדי ביצוע מרכזיים
        </Typography>
        <Chip 
          label="זמן אמת" 
          color="success" 
          size="small"
          sx={{ 
            background: 'linear-gradient(135deg, #4CAF50 0%, #45A049 100%)',
            color: 'white',
            fontWeight: 600
          }}
        />
      </Box>
      
      <Grid container spacing={3}>
        {/* Nitrate KPI */}
        <Grid item xs={12} sm={4}>
          <Paper 
            elevation={3}
            sx={{ 
              p: 3,
              textAlign: 'center',
              background: 'linear-gradient(135deg, #E8F5E8 0%, #C8E6C9 100%)',
              border: '1px solid #E0E0E0',
              borderRadius: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(76, 175, 80, 0.3)',
              }
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mb: 2,
              p: 2,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #4CAF50 0%, #45A049 100%)',
              width: 60,
              height: 60,
              mx: 'auto'
            }}>
              <Science sx={{ fontSize: 28, color: 'white' }} />
            </Box>
            <Typography variant="h3" sx={{ 
              fontWeight: 700, 
              color: '#2E7D32',
              mb: 1,
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              {kpis?.avgNitrate.toFixed(1)}
            </Typography>
            <Typography variant="body1" sx={{ 
              color: '#2E7D32',
              fontWeight: 600,
              mb: 1
            }}>
              ניטרט ממוצע
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              mg/L
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              {getTrendIcon(kpis?.avgNitrate || 0, 10)}
              <Typography variant="caption" color="text.secondary">
                בטווח תקין
              </Typography>
            </Box>
          </Paper>
        </Grid>
        
        {/* Moisture KPI */}
        <Grid item xs={12} sm={4}>
          <Paper 
            elevation={3}
            sx={{ 
              p: 3,
              textAlign: 'center',
              background: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
              border: '1px solid #E0E0E0',
              borderRadius: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(33, 150, 243, 0.3)',
              }
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mb: 2,
              p: 2,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
              width: 60,
              height: 60,
              mx: 'auto'
            }}>
              <WaterDrop sx={{ fontSize: 28, color: 'white' }} />
            </Box>
            <Typography variant="h3" sx={{ 
              fontWeight: 700, 
              color: '#1976D2',
              mb: 1,
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              {kpis?.avgMoisture.toFixed(1)}%
            </Typography>
            <Typography variant="body1" sx={{ 
              color: '#1976D2',
              fontWeight: 600,
              mb: 1
            }}>
              לחות ממוצעת
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              אחוזים
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              {getTrendIcon(kpis?.avgMoisture || 0, 50)}
              <Typography variant="caption" color="text.secondary">
                רמה טובה
              </Typography>
            </Box>
          </Paper>
        </Grid>
        
        {/* Temperature KPI */}
        <Grid item xs={12} sm={4}>
          <Paper 
            elevation={3}
            sx={{ 
              p: 3,
              textAlign: 'center',
              background: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)',
              border: '1px solid #E0E0E0',
              borderRadius: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(255, 152, 0, 0.3)',
              }
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mb: 2,
              p: 2,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
              width: 60,
              height: 60,
              mx: 'auto'
            }}>
              <Thermostat sx={{ fontSize: 28, color: 'white' }} />
            </Box>
            <Typography variant="h3" sx={{ 
              fontWeight: 700, 
              color: '#F57C00',
              mb: 1,
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              {kpis?.avgTemp.toFixed(1)}°C
            </Typography>
            <Typography variant="body1" sx={{ 
              color: '#F57C00',
              fontWeight: 600,
              mb: 1
            }}>
              טמפרטורה ממוצעת
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              צלזיוס
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              {getTrendIcon(kpis?.avgTemp || 0, 25)}
              <Typography variant="caption" color="text.secondary">
                טמפרטורה נורמלית
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Summary Stats */}
      <Paper 
        elevation={2}
        sx={{ 
          mt: 3, 
          p: 2, 
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          borderRadius: 2,
          border: '1px solid #E0E0E0'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
            עדכון אחרון: {new Date().toLocaleTimeString('he-IL')}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip 
              label="ניטרט: תקין" 
              color="success" 
              size="small"
              variant="outlined"
            />
            <Chip 
              label="לחות: טובה" 
              color="info" 
              size="small"
              variant="outlined"
            />
            <Chip 
              label="טמפרטורה: נורמלית" 
              color="warning" 
              size="small"
              variant="outlined"
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Kpis;