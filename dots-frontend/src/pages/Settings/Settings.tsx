import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  TextField, 
  Switch, 
  FormControlLabel, 
  Divider,
  Button,
  Alert,
  Grid,
  Paper,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  Settings as SettingsIcon, 
  Save, 
  Refresh, 
  Map, 
  Palette,
  Notifications,
  Security,
  Speed
} from '@mui/icons-material';

const Settings: React.FC = () => {
  const [apiBaseUrl, setApiBaseUrl] = React.useState('http://localhost:3001/api');
  const [mapTileUrl, setMapTileUrl] = React.useState('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
  const [autoRefresh, setAutoRefresh] = React.useState(true);
  const [rtlMode, setRtlMode] = React.useState(true);
  const [saved, setSaved] = React.useState(false);
  const [colorScheme, setColorScheme] = React.useState<'green' | 'red' | 'yellow' | 'blue'>('green');

  const handleSave = () => {
    // כאן בעתיד נשמור ל-localStorage או נשלח לשרת
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    setApiBaseUrl('http://localhost:3001/api');
    setMapTileUrl('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    setAutoRefresh(true);
    setRtlMode(true);
  };

  return (
    <Box sx={{ 
      p: { xs: 2, md: 3 },
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <Paper 
        elevation={3}
        sx={{ 
          p: { xs: 2, md: 3 }, 
          mb: { xs: 3, md: 4 },
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          border: '1px solid #E0E0E0',
          borderRadius: 3
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2 }, mb: { xs: 2, md: 3 } }}>
          <Box sx={{ 
            p: 2, 
            borderRadius: '50%', 
            background: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
            boxShadow: '0 4px 15px rgba(255, 152, 0, 0.3)'
          }}>
            <SettingsIcon sx={{ fontSize: { xs: 32, md: 40 }, color: 'white' }} />
          </Box>
          <Box>
            <Typography variant="h4" sx={{ 
              fontSize: { xs: '1.5rem', md: '2.125rem' },
              fontWeight: 700,
              background: 'linear-gradient(135deg, #F57C00 0%, #FF9800 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              הגדרות מערכת
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              התאמה אישית של המערכת לפי העדפותיך
            </Typography>
          </Box>
        </Box>

        {saved && (
          <Alert 
            severity="success" 
            sx={{ 
              mb: 3,
              borderRadius: 2,
              border: '1px solid #4CAF50',
              background: 'rgba(76, 175, 80, 0.1)'
            }}
          >
            ההגדרות נשמרו בהצלחה!
          </Alert>
        )}
      </Paper>

      <Grid container spacing={{ xs: 2, md: 3 }}>
        {/* API Settings */}
        <Grid item xs={12} md={6}>
          <Card 
            elevation={3}
            sx={{ 
              height: '100%',
              background: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
              border: '1px solid #E0E0E0',
              borderRadius: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(33, 150, 243, 0.3)',
              }
            }}
          >
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Security sx={{ color: '#1976D2', fontSize: 24 }} />
                <Typography variant="h6" sx={{ 
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  fontWeight: 600,
                  color: '#1976D2'
                }}>
                  הגדרות API
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              
              <TextField
                fullWidth
                label="API Base URL"
                value={apiBaseUrl}
                onChange={(e) => setApiBaseUrl(e.target.value)}
                margin="normal"
                helperText="כתובת הבסיס של ה-API (לעתיד)"
                disabled
                size="small"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#1976D2',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976D2',
                    },
                  },
                }}
              />
              
              <TextField
                fullWidth
                label="Map Tile URL"
                value={mapTileUrl}
                onChange={(e) => setMapTileUrl(e.target.value)}
                margin="normal"
                helperText="כתובת מפת העולם (OSM)"
                size="small"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#1976D2',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976D2',
                    },
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Display Settings */}
        <Grid item xs={12} md={6}>
          <Card 
            elevation={3}
            sx={{ 
              height: '100%',
              background: 'linear-gradient(135deg, #E8F5E8 0%, #C8E6C9 100%)',
              border: '1px solid #E0E0E0',
              borderRadius: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(76, 175, 80, 0.3)',
              }
            }}
          >
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Palette sx={{ color: '#2E7D32', fontSize: 24 }} />
                <Typography variant="h6" sx={{ 
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  fontWeight: 600,
                  color: '#2E7D32'
                }}>
                  הגדרות תצוגה
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              
              <FormControlLabel
                control={
                  <Switch 
                    checked={autoRefresh} 
                    onChange={(e) => setAutoRefresh(e.target.checked)}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#4CAF50',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#4CAF50',
                      },
                    }}
                  />
                }
                label="רענון אוטומטי של נתונים"
                sx={{ mb: 2, fontWeight: 600 }}
              />
              
              <FormControlLabel
                control={
                  <Switch 
                    checked={rtlMode} 
                    onChange={(e) => setRtlMode(e.target.checked)}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#4CAF50',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#4CAF50',
                      },
                    }}
                  />
                }
                label="מצב RTL (עברית)"
                sx={{ mb: 2, fontWeight: 600 }}
              />
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontWeight: 600 }}>
                צבע האתר:
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Button
                  variant={colorScheme === 'green' ? 'contained' : 'outlined'}
                  onClick={() => setColorScheme('green')}
                  sx={{ 
                    bgcolor: colorScheme === 'green' ? '#4CAF50' : 'transparent',
                    color: colorScheme === 'green' ? 'white' : '#4CAF50',
                    borderColor: '#4CAF50',
                    borderRadius: 2,
                    '&:hover': { 
                      bgcolor: '#4CAF50', 
                      color: 'white',
                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  🟢 ירוק
                </Button>
                <Button
                  variant={colorScheme === 'red' ? 'contained' : 'outlined'}
                  onClick={() => setColorScheme('red')}
                  sx={{ 
                    bgcolor: colorScheme === 'red' ? '#F44336' : 'transparent',
                    color: colorScheme === 'red' ? 'white' : '#F44336',
                    borderColor: '#F44336',
                    borderRadius: 2,
                    '&:hover': { 
                      bgcolor: '#F44336', 
                      color: 'white',
                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  🔴 אדום
                </Button>
                <Button
                  variant={colorScheme === 'yellow' ? 'contained' : 'outlined'}
                  onClick={() => setColorScheme('yellow')}
                  sx={{ 
                    bgcolor: colorScheme === 'yellow' ? '#FF9800' : 'transparent',
                    color: colorScheme === 'yellow' ? 'white' : '#FF9800',
                    borderColor: '#FF9800',
                    borderRadius: 2,
                    '&:hover': { 
                      bgcolor: '#FF9800', 
                      color: 'white',
                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  🟡 צהוב
                </Button>
                <Button
                  variant={colorScheme === 'blue' ? 'contained' : 'outlined'}
                  onClick={() => setColorScheme('blue')}
                  sx={{ 
                    bgcolor: colorScheme === 'blue' ? '#2196F3' : 'transparent',
                    color: colorScheme === 'blue' ? 'white' : '#2196F3',
                    borderColor: '#2196F3',
                    borderRadius: 2,
                    '&:hover': { 
                      bgcolor: '#2196F3', 
                      color: 'white',
                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  🔵 כחול
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Map Demo */}
        <Grid item xs={12}>
          <Card 
            elevation={3}
            sx={{ 
              background: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)',
              border: '1px solid #E0E0E0',
              borderRadius: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(255, 152, 0, 0.3)',
              }
            }}
          >
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Map sx={{ color: '#F57C00', fontSize: 24 }} />
                <Typography variant="h6" sx={{ 
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  fontWeight: 600,
                  color: '#F57C00'
                }}>
                  דוגמת מפה
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ 
                height: 200, 
                background: 'linear-gradient(135deg, #E8F5E8 0%, #C8E6C9 50%, #A5D6A7 100%)',
                borderRadius: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid #E0E0E0'
              }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Map sx={{ fontSize: 48, color: '#2E7D32', mb: 2 }} />
                  <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 600 }}>
                    מפה דמו - כאן תהיה מפה אמיתית בעתיד
                  </Typography>
                </Box>
                
                {/* Demo Sensor Dots */}
                <Box sx={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  right: 0, 
                  bottom: 0,
                  pointerEvents: 'none'
                }}>
                  {[1, 2, 3].map((index) => (
                    <Box
                      key={index}
                      sx={{
                        position: 'absolute',
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        backgroundColor: '#4CAF50',
                        border: '2px solid white',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        top: `${30 + (index * 50)}px`,
                        left: `${40 + (index * 30)}px`,
                        animation: 'pulse 2s infinite'
                      }}
                    />
                  ))}
                </Box>
              </Box>
              
              <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip 
                  label="חיישן פעיל" 
                  color="success" 
                  size="small"
                  icon={<Speed />}
                />
                <Chip 
                  label="מפה זמינה" 
                  color="info" 
                  size="small"
                  icon={<Map />}
                />
                <Chip 
                  label="נתונים בזמן אמת" 
                  color="warning" 
                  size="small"
                  icon={<Notifications />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Actions */}
        <Grid item xs={12}>
          <Card 
            elevation={3}
            sx={{ 
              background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
              border: '1px solid #E0E0E0',
              borderRadius: 3
            }}
          >
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Box sx={{ 
                display: 'flex', 
                gap: { xs: 1, md: 2 }, 
                justifyContent: 'flex-end',
                flexDirection: { xs: 'column', sm: 'row' }
              }}>
                <Button
                  variant="outlined"
                  startIcon={<Refresh />}
                  onClick={handleReset}
                  fullWidth={false}
                  sx={{ 
                    minWidth: { xs: '100%', sm: 'auto' },
                    borderColor: '#9E9E9E',
                    color: '#9E9E9E',
                    '&:hover': {
                      borderColor: '#757575',
                      backgroundColor: 'rgba(158, 158, 158, 0.1)'
                    }
                  }}
                >
                  איפוס הגדרות
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSave}
                  fullWidth={false}
                  sx={{ 
                    minWidth: { xs: '100%', sm: 'auto' },
                    background: 'linear-gradient(135deg, #4CAF50 0%, #45A049 100%)',
                    boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #45A049 0%, #2E7D32 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(76, 175, 80, 0.4)',
                    }
                  }}
                >
                  שמירת הגדרות
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </Box>
  );
};

export default Settings;