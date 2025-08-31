import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { LocationOn, Sensors } from '@mui/icons-material';
import type { Field } from '../../api/types';

type Props = { field: Field };

export default function FieldMap({ field }: Props) {
  return (
    <Paper 
      elevation={2}
      sx={{ 
        height: 320, 
        width: '100%', 
        borderRadius: 2,
        background: 'linear-gradient(135deg, #E8F5E8 0%, #C8E6C9 50%, #A5D6A7 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Map Placeholder */}
      <Box sx={{ textAlign: 'center', p: 3 }}>
        <LocationOn sx={{ fontSize: 48, color: '#2E7D32', mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          מפת השדה: {field.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          מיקום: {field.center.lat.toFixed(4)}, {field.center.lng.toFixed(4)}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
          <Sensors color="action" />
          <Typography variant="body2">
            {field.sensors.length} חיישנים
          </Typography>
        </Box>
      </Box>
      
      {/* Sensor Dots */}
      <Box sx={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0,
        pointerEvents: 'none'
      }}>
        {field.sensors.map((sensor, index) => (
          <Box
            key={sensor.id}
            sx={{
              position: 'absolute',
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: 'primary.main',
              border: '2px solid white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              top: `${20 + (index * 60)}px`,
              left: `${30 + (index * 40)}px`,
              animation: 'pulse 2s infinite'
            }}
          />
        ))}
      </Box>
      
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </Paper>
  );
}
