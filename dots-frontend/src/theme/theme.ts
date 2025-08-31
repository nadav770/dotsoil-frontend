import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#16B34F', // ירוק DOTS - צבע ראשי
      light: '#4CAF50', // ירוק בהיר
      dark: '#14A043', // ירוק כהה יותר
    },
    secondary: {
      main: '#00D9FF', // תכלת זוהר - צבע משני
      light: '#40E0FF', // תכלת בהיר
      dark: '#00B8CC', // תכלת כהה
    },
    success: {
      main: '#4CAF50', // ירוק הצלחה
      light: '#81C784',
      dark: '#388E3C',
    },
    warning: {
      main: '#FF9800', // כתום אזהרה
      light: '#FFB74D',
      dark: '#F57C00',
    },
    error: {
      main: '#F44336', // אדום שגיאה
      light: '#E57373',
      dark: '#D32F2F',
    },
    info: {
      main: '#2196F3', // כחול מידע
      light: '#64B5F6',
      dark: '#1976D2',
    },
    background: {
      default: '#F1F8E9', // רקע ירוק בהיר מאוד
      paper: '#ffffff',
    },
    text: {
      primary: '#1B5E20', // טקסט ראשי ירוק כהה
      secondary: '#388E3C', // טקסט משני ירוק
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
      color: '#1B5E20',
    },
    h2: {
      fontWeight: 600,
      color: '#1B5E20',
    },
    h3: {
      fontWeight: 600,
      color: '#1B5E20',
    },
    h4: {
      fontWeight: 600,
      color: '#2E7D32',
    },
    h5: {
      fontWeight: 600,
      color: '#2E7D32',
    },
    h6: {
      fontWeight: 600,
      color: '#2E7D32',
    },
    body1: {
      fontWeight: 400,
      color: '#1B5E20',
    },
    body2: {
      fontWeight: 400,
      color: '#388E3C',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #E8F5E8', // גבול ירוק בהיר
          '&:hover': {
            borderColor: '#4CAF50',
            boxShadow: '0 4px 12px rgba(76, 175, 80, 0.15)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12, // DOTS border radius
          textTransform: 'none',
          fontWeight: 600,
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #16B34F 30%, #4CAF50 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #14A043 30%, #16B34F 90%)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

export default theme;