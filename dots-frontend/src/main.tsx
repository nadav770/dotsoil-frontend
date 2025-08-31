// dots-frontend/src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import App from './App';
import 'leaflet/dist/leaflet.css';
import { startSimulator } from './api/simulator';

// React Query client with sensible defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 30_000,
      retry: 2
    }
  }
});

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root element with id "root" not found');

// Start the simulator for real-time data (only in development)
// In production, this will be replaced by real API calls
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
  startSimulator(5000);
}

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
