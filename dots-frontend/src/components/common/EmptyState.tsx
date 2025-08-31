

import React from 'react';
import { Box, Typography, Paper, Button, Chip } from '@mui/material';
import { 
  Search, 
  Notifications, 
  Error, 
  Info, 
  Warning,
  Add,
  Refresh
} from '@mui/icons-material';

interface EmptyStateProps {
  icon: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
  showActionButton?: boolean;
  actionText?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  icon, 
  title, 
  description, 
  action,
  variant = 'default',
  showActionButton = false,
  actionText = 'פעולה',
  onAction
}) => {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'search':
        return <Search sx={{ fontSize: 'inherit', color: '#2196F3' }} />;
      case 'notifications':
        return <Notifications sx={{ fontSize: 'inherit', color: '#FF9800' }} />;
      case 'error':
        return <Error sx={{ fontSize: 'inherit', color: '#F44336' }} />;
      case 'info':
        return <Info sx={{ fontSize: 'inherit', color: '#2196F3' }} />;
      case 'warning':
        return <Warning sx={{ fontSize: 'inherit', color: '#FF9800' }} />;
      default:
        return <Info sx={{ fontSize: 'inherit', color: '#9E9E9E' }} />;
    }
  };

  const getPaperProps = () => {
    switch (variant) {
      case 'outlined':
        return { 
          variant: 'outlined' as const, 
          sx: { 
            borderColor: '#E0E0E0',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)'
          } 
        };
      case 'elevated':
        return { 
          elevation: 3,
          sx: { 
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            border: '1px solid #E0E0E0'
          }
        };
      default:
        return { 
          elevation: 0, 
          sx: { 
            backgroundColor: 'transparent',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 249, 250, 0.8) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(224, 224, 224, 0.5)'
          } 
        };
    }
  };

  const getIconColor = (iconName: string) => {
    switch (iconName) {
      case 'search':
        return '#2196F3';
      case 'notifications':
        return '#FF9800';
      case 'error':
        return '#F44336';
      case 'info':
        return '#2196F3';
      case 'warning':
        return '#FF9800';
      default:
        return '#9E9E9E';
    }
  };

  return (
    <Paper {...getPaperProps()} sx={{ 
      p: { xs: 3, md: 4 }, 
      textAlign: 'center',
      borderRadius: 3,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.03,
        backgroundImage: `
          radial-gradient(circle at 25% 25%, ${getIconColor(icon)} 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, ${getIconColor(icon)} 0%, transparent 50%)
        `,
        backgroundSize: '100px 100px',
        zIndex: 0
      }} />

      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        gap: { xs: 2, md: 3 },
        position: 'relative',
        zIndex: 1
      }}>
        {/* Icon Container */}
        <Box sx={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${getIconColor(icon)}20 0%, ${getIconColor(icon)}10 100%)`,
          border: `2px solid ${getIconColor(icon)}30`,
          width: 80,
          height: 80,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: -2,
            left: -2,
            right: -2,
            bottom: -2,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${getIconColor(icon)}40 0%, transparent 100%)`,
            zIndex: -1,
            animation: 'pulse 2s infinite'
          }
        }}>
          <Box sx={{ 
            color: getIconColor(icon),
            fontSize: { xs: 48, md: 64 },
            lineHeight: 1,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
          }}>
            {getIconComponent(icon)}
          </Box>
        </Box>
        
        {/* Title */}
        <Typography variant="h5" sx={{ 
          color: 'text.primary',
          fontWeight: 700,
          fontSize: { xs: '1.25rem', md: '1.5rem' },
          background: `linear-gradient(135deg, ${getIconColor(icon)} 0%, ${getIconColor(icon)}80 100%)`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {title}
        </Typography>
        
        {/* Description */}
        {description && (
          <Typography variant="body1" color="text.secondary" sx={{ 
            maxWidth: { xs: 300, md: 400 },
            fontSize: { xs: '0.875rem', md: '1rem' },
            lineHeight: 1.6,
            opacity: 0.8
          }}>
            {description}
          </Typography>
        )}
        
        {/* Action Button */}
        {showActionButton && onAction && (
          <Button
            variant="contained"
            startIcon={icon === 'search' ? <Refresh /> : <Add />}
            onClick={onAction}
            sx={{
              background: `linear-gradient(135deg, ${getIconColor(icon)} 0%, ${getIconColor(icon)}80 100%)`,
              boxShadow: `0 4px 15px ${getIconColor(icon)}40`,
              borderRadius: 2,
              px: 3,
              py: 1.5,
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': {
                background: `linear-gradient(135deg, ${getIconColor(icon)}80 0%, ${getIconColor(icon)} 100%)`,
                transform: 'translateY(-2px)',
                boxShadow: `0 6px 20px ${getIconColor(icon)}60`,
              }
            }}
          >
            {actionText}
          </Button>
        )}
        
        {/* Custom Action */}
        {action && (
          <Box sx={{ mt: { xs: 1, md: 2 } }}>
            {action}
          </Box>
        )}

        {/* Status Chip */}
        <Chip 
          label={icon === 'error' ? 'שגיאה' : icon === 'warning' ? 'אזהרה' : 'מידע'} 
          color={icon === 'error' ? 'error' : icon === 'warning' ? 'warning' : 'info'} 
          size="small"
          variant="outlined"
          sx={{ 
            mt: 1,
            fontWeight: 600,
            borderWidth: 2
          }}
        />
      </Box>

      <style>
        {`
          @keyframes pulse {
            0% { 
              transform: scale(1); 
              opacity: 0.3; 
            }
            50% { 
              transform: scale(1.1); 
              opacity: 0.1; 
            }
            100% { 
              transform: scale(1); 
              opacity: 0.3; 
            }
          }
        `}
      </style>
    </Paper>
  );
};

export default EmptyState;
