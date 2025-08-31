import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Container
} from '@mui/material';
import { 
  Dashboard as DashboardIcon, 
  Map as MapIcon, 
  Settings as SettingsIcon
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/dashboard', label: 'דשבורד', icon: <DashboardIcon /> },
    { path: '/fields', label: 'שדות', icon: <MapIcon /> },
    { path: '/settings', label: 'הגדרות', icon: <SettingsIcon /> }
  ];

  return (
    <AppBar 
      position="static" 
      elevation={0} 
      sx={{ 
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        borderBottom: '2px solid #E0E0E0',
        position: 'relative'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: '80px' }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2 } }}>
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              p: 1,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #4CAF50 0%, #45A049 100%)',
              boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)'
            }}>
              <Typography variant="h5" component="div" sx={{ 
                fontWeight: 800,
                color: 'white',
                letterSpacing: '0.1em',
                fontSize: { xs: '1.2rem', md: '1.5rem' }
              }}>
                DOTS
              </Typography>
            </Box>
          </Box>

          {/* Navigation Items */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                startIcon={item.icon}
                onClick={() => navigate(item.path)}
                sx={{
                  color: location.pathname === item.path ? '#4CAF50' : '#666',
                  fontWeight: location.pathname === item.path ? 700 : 500,
                  backgroundColor: location.pathname === item.path ? 'rgba(76, 175, 80, 0.1)' : 'transparent',
                  borderRadius: 2,
                  px: 3,
                  py: 1.5,
                  textTransform: 'none',
                  fontSize: '1rem',
                  '&:hover': {
                    backgroundColor: 'rgba(76, 175, 80, 0.15)',
                    color: '#4CAF50',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;
