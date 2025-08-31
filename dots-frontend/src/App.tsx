import React, { Suspense } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Container,
  CssBaseline,
  ThemeProvider
} from '@mui/material';
import { 
  Dashboard as DashboardIcon, 
  Map as MapIcon, 
  Settings as SettingsIcon 
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import AppRoutes from './routes';
import theme from './theme/theme';
import Hero from './components/Hero/Hero';

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', label: 'דשבורד', icon: <DashboardIcon /> },
    { path: '/fields', label: 'שדות', icon: <MapIcon /> },
    { path: '/settings', label: 'הגדרות', icon: <SettingsIcon /> }
  ];

  return (
    <AppBar position="static" elevation={0} sx={{ 
      backgroundColor: 'white',
      borderBottom: '1px solid #e0e0e0'
    }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: '70px' }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h5" component="div" sx={{ 
              fontWeight: 800,
              color: '#16B34F',
              letterSpacing: '0.1em'
            }}>
              DOTS
            </Typography>
            <Typography variant="body2" sx={{ 
              opacity: 0.7,
              color: '#666',
              fontWeight: 500
            }}>
              ניטור שדות חקלאיים
            </Typography>
          </Box>

          {/* Navigation */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={location.pathname === item.path ? "contained" : "text"}
                startIcon={item.icon}
                onClick={() => navigate(item.path)}
                sx={{
                  backgroundColor: location.pathname === item.path ? '#16B34F' : 'transparent',
                  color: location.pathname === item.path ? 'white' : '#666',
                  borderRadius: '12px',
                  px: 3,
                  py: 1.5,
                  fontWeight: 600,
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: location.pathname === item.path ? '#14A043' : 'rgba(22, 179, 79, 0.1)',
                    transform: 'translateY(-2px)',
                    boxShadow: location.pathname === item.path ? '0 4px 15px rgba(22, 179, 79, 0.3)' : 'none'
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
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navigation />
        <Box component="main" sx={{ flexGrow: 1 }}>
          {/* Hero Section */}
          <Hero />
          
          <Suspense fallback={
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
              <Typography variant="h6">טוען...</Typography>
            </Box>
          }>
            <AppRoutes />
          </Suspense>
        </Box>
      </Box>
    </ThemeProvider>
  );
}