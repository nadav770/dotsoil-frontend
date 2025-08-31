import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import ErrorBoundary from './components/common/ErrorBoundary';

// Pages
import Dashboard from './pages/Dashboard/Dashboard';
import FieldsList from './pages/Fields/FieldsList';
import FieldDetail from './pages/Fields/FieldDetail';
import Settings from './pages/Settings/Settings';
import Login from './pages/Auth/Login';

// Components
import Navigation from './components/Navigation/Navigation';
import Hero from './components/Hero/Hero';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Create theme
const theme = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#4CAF50',
    },
    secondary: {
      main: '#FF9800',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Router>
            <AuthProvider>
              <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Routes>
                  {/* Public routes */}
                  <Route path="/login" element={<Login />} />
                  
                  {/* Protected routes */}
                  <Route path="/" element={
                    <Box sx={{ display: 'flex' }}>
                      <Navigation />
                      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <Hero />
                        <Dashboard />
                      </Box>
                    </Box>
                  } />
                  
                  <Route path="/dashboard" element={
                    <Box sx={{ display: 'flex' }}>
                      <Navigation />
                      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <Dashboard />
                      </Box>
                    </Box>
                  } />
                  
                  <Route path="/fields" element={
                    <Box sx={{ display: 'flex' }}>
                      <Navigation />
                      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <FieldsList />
                      </Box>
                    </Box>
                  } />
                  
                  <Route path="/fields/:fieldId" element={
                    <Box sx={{ display: 'flex' }}>
                      <Navigation />
                      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <FieldDetail />
                      </Box>
                    </Box>
                  } />
                  
                  <Route path="/settings" element={
                    <Box sx={{ display: 'flex' }}>
                      <Navigation />
                      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <Settings />
                      </Box>
                    </Box>
                  } />
                  
                  {/* Redirect root to dashboard */}
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </Box>
            </AuthProvider>
          </Router>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;