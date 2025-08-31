import React from 'react';
import { Box, Typography, CircularProgress, Paper, Chip } from '@mui/material';
import { Refresh, HourglassEmpty } from '@mui/icons-material';

interface LoadingSpinnerProps {
  message?: string;
  size?: number;
  fullHeight?: boolean;
  variant?: 'default' | 'card' | 'minimal';
  showIcon?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'טוען...', 
  size = 40,
  fullHeight = false,
  variant = 'default',
  showIcon = true
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'card':
        return {
          container: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid #E0E0E0',
            borderRadius: 3,
            p: 3,
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          },
          spinner: {
            color: '#4CAF50'
          }
        };
      case 'minimal':
        return {
          container: {
            background: 'transparent'
          },
          spinner: {
            color: '#666'
          }
        };
      default:
        return {
          container: {
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(224, 224, 224, 0.5)',
            borderRadius: 2,
            p: 2
          },
          spinner: {
            color: '#4CAF50'
          }
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      height: fullHeight ? '100vh' : '50vh',
      gap: { xs: 2, md: 3 },
      position: 'relative'
    }}>
      {/* Background Pattern */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.02,
        backgroundImage: `
          radial-gradient(circle at 25% 25%, #4CAF50 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, #2196F3 0%, transparent 50%)
        `,
        backgroundSize: '200px 200px',
        zIndex: 0
      }} />

      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        position: 'relative',
        zIndex: 1,
        ...styles.container
      }}>
        {/* Icon */}
        {showIcon && (
          <Box sx={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #4CAF50 0%, #45A049 100%)',
            width: 60,
            height: 60,
            boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
            animation: 'float 3s ease-in-out infinite'
          }}>
            <HourglassEmpty sx={{ fontSize: 28, color: 'white' }} />
          </Box>
        )}

        {/* Spinner */}
        <Box sx={{ position: 'relative' }}>
          <CircularProgress 
            size={size} 
            sx={{ 
              ...styles.spinner,
              '& .MuiCircularProgress-circle': {
                strokeLinecap: 'round',
                strokeWidth: 3,
                animation: 'spin 1.5s linear infinite'
              }
            }} 
          />
          
          {/* Pulsing Ring */}
          <Box sx={{
            position: 'absolute',
            top: -5,
            left: -5,
            right: -5,
            bottom: -5,
            borderRadius: '50%',
            border: `2px solid ${styles.spinner.color}20`,
            animation: 'pulse 2s ease-in-out infinite'
          }} />
        </Box>

        {/* Message */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              color: '#2E7D32',
              mb: 1,
              animation: 'fadeIn 0.5s ease-in'
            }}
          >
            {message}
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              opacity: 0.7,
              animation: 'fadeIn 0.5s ease-in 0.2s both'
            }}
          >
            אנא המתן...
          </Typography>
        </Box>

        {/* Status Chip */}
        <Chip 
          label="טוען" 
          color="success" 
          size="small"
          icon={<Refresh sx={{ fontSize: 16 }} />}
          sx={{ 
            background: 'linear-gradient(135deg, #4CAF50 0%, #45A049 100%)',
            color: 'white',
            fontWeight: 600,
            animation: 'fadeIn 0.5s ease-in 0.4s both'
          }}
        />
      </Box>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes pulse {
            0% { 
              transform: scale(1); 
              opacity: 0.5; 
            }
            50% { 
              transform: scale(1.1); 
              opacity: 0.2; 
            }
            100% { 
              transform: scale(1); 
              opacity: 0.5; 
            }
          }
          
          @keyframes float {
            0%, 100% { 
              transform: translateY(0px); 
            }
            50% { 
              transform: translateY(-10px); 
            }
          }
          
          @keyframes fadeIn {
            0% { 
              opacity: 0; 
              transform: translateY(10px); 
            }
            100% { 
              opacity: 1; 
              transform: translateY(0); 
            }
          }
        `}
      </style>
    </Box>
  );
};

export default LoadingSpinner;
