import React from 'react';
import { Box, Typography, Paper, Chip, IconButton, Tooltip } from '@mui/material';
import { LocationOn, Sensors, ZoomIn, Layers, MyLocation } from '@mui/icons-material';
import type { Field } from '../../api/types';

type Props = { field: Field };

export default function FieldMap({ field }: Props) {
  return (
    <Paper 
      elevation={3}
      sx={{ 
        height: { xs: 280, md: 350 }, 
        width: '100%', 
        borderRadius: 3,
        background: 'linear-gradient(135deg, #E8F5E8 0%, #C8E6C9 50%, #A5D6A7 100%)',
        border: '1px solid #E0E0E0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 25px rgba(76, 175, 80, 0.3)',
        }
      }}
    >
      {/* Background Pattern */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        backgroundImage: `
          radial-gradient(circle at 20% 20%, #4CAF50 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, #2196F3 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, #FF9800 0%, transparent 50%)
        `,
        backgroundSize: '100px 100px',
        zIndex: 0
      }} />

      {/* Map Controls */}
      <Box sx={{
        position: 'absolute',
        top: 8,
        right: 8,
        display: 'flex',
        gap: 1,
        zIndex: 2
      }}>
        <Tooltip title="הגדל מפה">
          <IconButton 
            size="small"
            sx={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              '&:hover': { 
                backgroundColor: 'rgba(255, 255, 255, 1)',
                transform: 'scale(1.1)'
              }
            }}
          >
            <ZoomIn fontSize="small" />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="שכבות מפה">
          <IconButton 
            size="small"
            sx={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              '&:hover': { 
                backgroundColor: 'rgba(255, 255, 255, 1)',
                transform: 'scale(1.1)'
              }
            }}
          >
            <Layers fontSize="small" />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="מיקום נוכחי">
          <IconButton 
            size="small"
            sx={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              '&:hover': { 
                backgroundColor: 'rgba(255, 255, 255, 1)',
                transform: 'scale(1.1)'
              }
            }}
          >
            <MyLocation fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Map Content */}
      <Box sx={{ 
        textAlign: 'center', 
        p: { xs: 2, md: 3 },
        position: 'relative',
        zIndex: 1
      }}>
        <Box sx={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #4CAF50 0%, #45A049 100%)',
          width: 60,
          height: 60,
          mx: 'auto',
          mb: 2,
          boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)'
        }}>
          <LocationOn sx={{ 
            fontSize: 28, 
            color: 'white' 
          }} />
        </Box>
        
        <Typography variant="h6" gutterBottom sx={{ 
          fontSize: { xs: '1rem', md: '1.25rem' },
          fontWeight: 600,
          color: '#2E7D32',
          mb: 1
        }}>
          מפת השדה: {field.name}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" gutterBottom sx={{ 
          fontSize: { xs: '0.75rem', md: '0.875rem' },
          fontFamily: 'monospace',
          background: 'rgba(255, 255, 255, 0.7)',
          p: 1,
          borderRadius: 1,
          display: 'inline-block',
          mb: 2
        }}>
          {field.center.lat.toFixed(4)}, {field.center.lng.toFixed(4)}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center', mb: 2 }}>
          <Sensors sx={{ color: '#2196F3', fontSize: 18 }} />
          <Typography variant="body2" sx={{ 
            fontSize: { xs: '0.75rem', md: '0.875rem' },
            fontWeight: 600,
            color: '#1976D2'
          }}>
            {field.sensors.length} חיישנים
          </Typography>
        </Box>

        {/* Field Info Chips */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Chip 
            label={field.crop} 
            color="primary" 
            size="small"
            variant="outlined"
            sx={{ 
              borderColor: '#4CAF50',
              color: '#4CAF50',
              fontWeight: 600
            }}
          />
          <Chip 
            label="פעיל" 
            color="success" 
            size="small"
            sx={{ fontWeight: 600 }}
          />
        </Box>
      </Box>
      
      {/* Sensor Dots */}
      <Box sx={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 1
      }}>
        {field.sensors.map((sensor, index) => (
          <Box
            key={sensor.id}
            sx={{
              position: 'absolute',
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: `linear-gradient(135deg, #4CAF50 0%, #45A049 100%)`,
              border: '2px solid white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              top: `${25 + (index * 65)}px`,
              left: `${35 + (index * 35)}px`,
              animation: 'pulse 2s infinite',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: -4,
                left: -4,
                right: -4,
                bottom: -4,
                borderRadius: '50%',
                border: '1px solid rgba(76, 175, 80, 0.3)',
                animation: 'ripple 2s infinite'
              }
            }}
          />
        ))}
      </Box>

      {/* Grid Lines */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        backgroundImage: `
          linear-gradient(rgba(76, 175, 80, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(76, 175, 80, 0.3) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
        zIndex: 0
      }} />

      {/* Scale Bar */}
      <Box sx={{
        position: 'absolute',
        bottom: 8,
        left: 8,
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        p: 1,
        borderRadius: 1,
        border: '1px solid rgba(0,0,0,0.1)',
        zIndex: 2
      }}>
        <Typography variant="caption" sx={{ 
          fontSize: '0.7rem',
          fontWeight: 600,
          color: '#666'
        }}>
          קנה מידה: 1:1000
        </Typography>
      </Box>
      
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
          }
          
          @keyframes ripple {
            0% { transform: scale(1); opacity: 0.5; }
            100% { transform: scale(2); opacity: 0; }
          }
        `}
      </style>
    </Paper>
  );
}
