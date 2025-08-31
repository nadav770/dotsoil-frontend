import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Alert,
  Container,
  Paper,
  Divider,
  Chip
} from '@mui/material';
import { Google, Login as LoginIcon, Security, Agriculture, Sensors } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { auth, login } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (auth.isAuthenticated) {
      navigate('/dashboard');
    }
  }, [auth.isAuthenticated, navigate]);

  const handleGoogleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  if (auth.isLoading) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}>
          <Paper elevation={8} sx={{ 
            p: 4, 
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: 3
          }}>
            <Typography variant="h6" sx={{ color: '#4CAF50', fontWeight: 600 }}>
              טוען...
            </Typography>
          </Paper>
        </Box>
      </Container>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
        opacity: 0.1,
        backgroundImage: `
          radial-gradient(circle at 25% 25%, #4CAF50 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, #2196F3 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, #FF9800 0%, transparent 50%)
        `,
        backgroundSize: '200px 200px',
        animation: 'float 20s ease-in-out infinite'
      }} />
      
      {/* Floating Icons */}
      <Box sx={{
        position: 'absolute',
        top: '10%',
        right: '15%',
        animation: 'float 6s ease-in-out infinite'
      }}>
        <Agriculture sx={{ fontSize: 48, color: 'rgba(76, 175, 80, 0.3)' }} />
      </Box>
      
      <Box sx={{
        position: 'absolute',
        bottom: '20%',
        left: '10%',
        animation: 'float 8s ease-in-out infinite reverse'
      }}>
        <Sensors sx={{ fontSize: 36, color: 'rgba(33, 150, 243, 0.3)' }} />
      </Box>

      <Container maxWidth="sm">
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh',
          position: 'relative',
          zIndex: 1
        }}>
          <Paper 
            elevation={24} 
            sx={{ 
              p: { xs: 3, md: 4 }, 
              width: '100%', 
              maxWidth: 450,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: 4,
              border: '1px solid rgba(255, 255, 255, 0.2)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Decorative Elements */}
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background: 'linear-gradient(90deg, #4CAF50 0%, #2196F3 50%, #FF9800 100%)'
            }} />
            
            <Box sx={{ 
              position: 'absolute',
              top: -20,
              right: -20,
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #4CAF50 0%, #45A049 100%)',
              opacity: 0.1
            }} />

            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box sx={{ 
                display: 'inline-flex',
                p: 2,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4CAF50 0%, #45A049 100%)',
                boxShadow: '0 8px 25px rgba(76, 175, 80, 0.3)',
                mb: 2
              }}>
                <LoginIcon sx={{ fontSize: 48, color: 'white' }} />
              </Box>
              
              <Typography variant="h4" gutterBottom sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1
              }}>
                התחברות למערכת
              </Typography>
              
              <Typography variant="body1" color="text.secondary" sx={{ 
                lineHeight: 1.6,
                maxWidth: 300,
                mx: 'auto'
              }}>
                התחבר עם חשבון Google שלך כדי לגשת למערכת ניהול השדות החכמה
              </Typography>
            </Box>

            {auth.error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3,
                  borderRadius: 2,
                  border: '1px solid #f44336'
                }}
              >
                {auth.error}
              </Alert>
            )}

            <Card 
              variant="outlined" 
              sx={{ 
                background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                border: '1px solid #E0E0E0',
                borderRadius: 3,
                overflow: 'hidden'
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: 1,
                  mb: 3 
                }}>
                  <Security sx={{ color: 'primary.main', fontSize: 20 }} />
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600,
                    color: '#2E7D32'
                  }}>
                    בחירת שיטת התחברות
                  </Typography>
                </Box>
                
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  startIcon={<Google />}
                  onClick={handleGoogleLogin}
                  sx={{ 
                    mb: 3,
                    py: 1.5,
                    background: 'linear-gradient(135deg, #4285f4 0%, #357ae8 100%)',
                    boxShadow: '0 4px 15px rgba(66, 133, 244, 0.3)',
                    borderRadius: 3,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #357ae8 0%, #2a56c6 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(66, 133, 244, 0.4)',
                    }
                  }}
                >
                  התחבר עם Google
                </Button>

                <Divider sx={{ my: 2 }}>
                  <Chip label="או" size="small" variant="outlined" />
                </Divider>

                <Typography variant="body2" color="text.secondary" sx={{ 
                  textAlign: 'center',
                  lineHeight: 1.6,
                  px: 2
                }}>
                  על ידי ההתחברות, אתה מסכים לתנאי השימוש ומדיניות הפרטיות שלנו
                </Typography>
              </CardContent>
            </Card>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ 
                fontWeight: 600,
                mb: 1
              }}>
                מערכת ניהול שדות חכמה
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ 
                display: 'block',
                fontFamily: 'monospace',
                letterSpacing: '0.1em'
              }}>
                DotSoil - Agricultural Intelligence Platform
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `}
      </style>
    </Box>
  );
};

export default Login;
