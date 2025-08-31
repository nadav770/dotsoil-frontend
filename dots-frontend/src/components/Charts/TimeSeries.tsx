import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { Box, Typography, Paper, Chip, IconButton, Tooltip as MuiTooltip } from '@mui/material';
import { TrendingUp, Refresh, Info } from '@mui/icons-material';
import api from '../../api/client';
import { Reading } from '../../api/types';
import LoadingSpinner from '../common/LoadingSpinner';

interface TimeSeriesProps {
  data?: any[];
  readings?: any[];
  fieldId?: string;
  sensorId?: string;
}

const TimeSeries: React.FC<TimeSeriesProps> = ({ fieldId, sensorId }) => {
  const { data: readings, isLoading, error, refetch } = useQuery<Reading[]>({
    queryKey: ['readings', { fieldId, sensorId }],
    queryFn: () => api.fetchReadings({ fieldId, sensorId, limit: 60 }),
    refetchInterval: 5000, // Refresh every 5 seconds for real-time feel
  });

  if (isLoading) return <LoadingSpinner message="טוען נתוני גרף..." size={30} />;
  if (error) return (
    <Box sx={{ 
      p: 2, 
      textAlign: 'center',
      backgroundColor: '#ffebee',
      borderRadius: 2,
      border: '1px solid #f44336'
    }}>
      <Typography variant="body2" color="error">
        שגיאה בטעינת נתוני הגרף
      </Typography>
    </Box>
  );

  // Transform data for Recharts
  const chartData = readings?.map(reading => ({
    timestamp: new Date(reading.timestamp).toLocaleTimeString('he-IL'),
    nitrate: reading.nitrate,
    moisture: reading.moisture,
    temp: reading.temp,
  })) || [];

  const handleRefresh = () => {
    refetch();
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        mb: 3,
        p: 2,
        background: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
        borderRadius: 2,
        border: '1px solid #E0E0E0'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TrendingUp sx={{ color: '#1976D2', fontSize: 24 }} />
          <Typography variant="h6" sx={{ 
            fontWeight: 600, 
            color: '#1976D2',
            background: 'linear-gradient(135deg, #1976D2 0%, #1565C0 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            נתוני חיישנים בזמן אמת
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip 
            label="זמן אמת" 
            color="info" 
            size="small"
            sx={{ 
              background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
              color: 'white',
              fontWeight: 600
            }}
          />
          <MuiTooltip title="רענן נתונים">
            <IconButton 
              size="small" 
              onClick={handleRefresh}
              sx={{ 
                color: '#1976D2',
                '&:hover': { 
                  backgroundColor: 'rgba(33, 150, 243, 0.1)',
                  transform: 'rotate(180deg)',
                  transition: 'transform 0.3s ease'
                }
              }}
            >
              <Refresh />
            </IconButton>
          </MuiTooltip>
        </Box>
      </Box>

      {/* Chart Container */}
      <Paper 
        elevation={2}
        sx={{ 
          p: 2,
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          border: '1px solid #E0E0E0',
          borderRadius: 2
        }}
      >
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#e0e0e0" 
              opacity={0.5}
            />
            <XAxis 
              dataKey="timestamp" 
              stroke="#666"
              fontSize={11}
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={{ stroke: '#ccc', strokeWidth: 1 }}
            />
            <YAxis 
              stroke="#666"
              fontSize={11}
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={{ stroke: '#ccc', strokeWidth: 1 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid #E0E0E0',
                borderRadius: 8,
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}
              labelStyle={{ fontWeight: 600, color: '#333' }}
            />
            <Legend 
              wrapperStyle={{ 
                paddingTop: 10,
                fontWeight: 600
              }}
            />
            <Line 
              type="monotone" 
              dataKey="nitrate" 
              stroke="#8884d8" 
              name="ניטרט (mg/L)"
              strokeWidth={3}
              dot={{ 
                fill: '#8884d8', 
                strokeWidth: 2, 
                r: 4,
                stroke: '#fff'
              }}
              activeDot={{ 
                r: 6, 
                stroke: '#8884d8', 
                strokeWidth: 3, 
                fill: '#fff',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
              }}
              animationDuration={1000}
              animationEasing="ease-out"
            />
            <Line 
              type="monotone" 
              dataKey="moisture" 
              stroke="#82ca9d" 
              name="לחות (%)"
              strokeWidth={3}
              dot={{ 
                fill: '#82ca9d', 
                strokeWidth: 2, 
                r: 4,
                stroke: '#fff'
              }}
              activeDot={{ 
                r: 6, 
                stroke: '#82ca9d', 
                strokeWidth: 3, 
                fill: '#fff',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
              }}
              animationDuration={1000}
              animationEasing="ease-out"
            />
            <Line 
              type="monotone" 
              dataKey="temp" 
              stroke="#ffc658" 
              name="טמפרטורה (°C)"
              strokeWidth={3}
              dot={{ 
                fill: '#ffc658', 
                strokeWidth: 2, 
                r: 4,
                stroke: '#fff'
              }}
              activeDot={{ 
                r: 6, 
                stroke: '#ffc658', 
                strokeWidth: 3, 
                fill: '#fff',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
              }}
              animationDuration={1000}
              animationEasing="ease-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </Paper>

      {/* Info Section */}
      <Box sx={{ 
        mt: 2, 
        p: 2, 
        background: 'rgba(33, 150, 243, 0.05)', 
        borderRadius: 2,
        border: '1px solid rgba(33, 150, 243, 0.2)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Info sx={{ fontSize: 16, color: '#1976D2' }} />
          <Typography variant="body2" sx={{ 
            color: '#1976D2',
            fontWeight: 600
          }}>
            מידע על הגרף
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.5 }}>
          הגרף מציג נתונים בזמן אמת מהחיישנים בשדה. הנתונים מתעדכנים כל 5 שניות ומציגים את רמות הניטרט, הלחות והטמפרטורה לאורך זמן.
        </Typography>
      </Box>
    </Box>
  );
};

export default TimeSeries;