import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  Chip, 
  Button, 
  Divider,
  IconButton,
  Tooltip,
  Alert
} from '@mui/material';
import { 
  ArrowBack, 
  Edit, 
  Delete, 
  LocationOn, 
  Sensors, 
  Agriculture,
  TrendingUp,
  WaterDrop,
  Thermostat,
  Science,
  Refresh,
  Download,
  Share
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/client';
import { Field } from '../../api/types';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import TimeSeries from '../../components/Charts/TimeSeries';
import FieldMap from '../../components/Map/FieldMap';

const FieldDetail: React.FC = () => {
  const { fieldId } = useParams<{ fieldId: string }>();
  const navigate = useNavigate();

  console.log('FieldDetail: Component rendered with fieldId:', fieldId);

  const { data: field, isLoading, error } = useQuery<Field>({
    queryKey: ['field', fieldId],
    queryFn: () => {
      console.log('FieldDetail: Fetching field with ID:', fieldId);
      return api.fetchFieldById(fieldId!);
    },
    enabled: !!fieldId
  });

  console.log('FieldDetail: Query result:', { field, isLoading, error });

  if (isLoading) {
    console.log('FieldDetail: Showing loading spinner');
    return <LoadingSpinner message="טוען פרטי שדה..." />;
  }
  if (error) {
    console.error('FieldDetail: Error loading field:', error);
    const errorMessage = error instanceof Error ? error.message : 'שגיאה לא ידועה';
    return <EmptyState icon="error" title="שגיאה בטעינת השדה" description={`לא ניתן לטעון את פרטי השדה: ${errorMessage}`} />;
  }
  if (!field) {
    console.log('FieldDetail: No field data, showing empty state');
    return <EmptyState icon="error" title="שדה לא נמצא" description="השדה המבוקש לא נמצא במערכת" />;
  }

  console.log('FieldDetail: Rendering field details for:', field);

  const handleBack = () => navigate('/fields');
  const handleEdit = () => navigate(`/fields/${fieldId}/edit`);
  const handleDelete = () => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק שדה זה?')) {
      // Handle delete
      navigate('/fields');
    }
  };

  const exportData = () => {
    // Export field data logic
    console.log('Exporting field data...');
  };

  const shareField = () => {
    // Share field logic
    console.log('Sharing field...');
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
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={handleBack}
              sx={{
                borderColor: '#9E9E9E',
                color: '#9E9E9E',
                '&:hover': {
                  borderColor: '#757575',
                  backgroundColor: 'rgba(158, 158, 158, 0.1)'
                }
              }}
            >
              חזור
            </Button>
            
            <Box sx={{ 
              p: 2, 
              borderRadius: '50%', 
              background: 'linear-gradient(135deg, #4CAF50 0%, #45A049 100%)',
              boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)'
            }}>
              <Agriculture sx={{ fontSize: { xs: 32, md: 40 }, color: 'white' }} />
            </Box>
            
            <Box>
              <Typography variant="h4" sx={{ 
                fontSize: { xs: '1.5rem', md: '2.125rem' },
                fontWeight: 700,
                background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {field.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                פרטי השדה ונתוני החיישנים
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Tooltip title="ייצוא נתונים">
              <IconButton
                onClick={exportData}
                sx={{ 
                  color: '#FF9800',
                  '&:hover': { 
                    backgroundColor: 'rgba(255, 152, 0, 0.1)',
                    transform: 'scale(1.1)'
                  }
                }}
              >
                <Download />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="שתף שדה">
              <IconButton
                onClick={shareField}
                sx={{ 
                  color: '#2196F3',
                  '&:hover': { 
                    backgroundColor: 'rgba(33, 150, 243, 0.1)',
                    transform: 'scale(1.1)'
                  }
                }}
              >
                <Share />
              </IconButton>
            </Tooltip>
            
            <Button
              variant="outlined"
              startIcon={<Edit />}
              onClick={handleEdit}
              sx={{
                borderColor: '#2196F3',
                color: '#2196F3',
                '&:hover': {
                  borderColor: '#1976D2',
                  backgroundColor: 'rgba(33, 150, 243, 0.1)'
                }
              }}
            >
              ערוך
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<Delete />}
              onClick={handleDelete}
              sx={{
                borderColor: '#f44336',
                color: '#f44336',
                '&:hover': {
                  borderColor: '#d32f2f',
                  backgroundColor: 'rgba(244, 67, 54, 0.1)'
                }
              }}
            >
              מחק
            </Button>
          </Box>
        </Box>

        {/* Field Status */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Chip 
            label={field.crop} 
            color="primary" 
            variant="outlined"
            icon={<Agriculture />}
            sx={{ 
              borderColor: '#4CAF50',
              color: '#4CAF50',
              fontWeight: 600
            }}
          />
          <Chip 
            label={`${field.sensors.length} חיישנים`} 
            color="info" 
            variant="outlined"
            icon={<Sensors />}
            sx={{ 
              borderColor: '#2196F3',
              color: '#2196F3',
              fontWeight: 600
            }}
          />
          <Chip 
            label="פעיל" 
            color="success" 
            variant="outlined"
            icon={<TrendingUp />}
            sx={{ 
              borderColor: '#4CAF50',
              color: '#4CAF50',
              fontWeight: 600
            }}
          />
        </Box>
      </Paper>

      <Grid container spacing={{ xs: 2, md: 3 }}>
        {/* Field Map */}
        <Grid item xs={12} lg={6}>
          {field && <FieldMap field={field} />}
        </Grid>

        {/* Field Information */}
        <Grid item xs={12} lg={6}>
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
                <LocationOn sx={{ color: '#1976D2', fontSize: 24 }} />
                <Typography variant="h6" sx={{ 
                  fontWeight: 600,
                  color: '#1976D2'
                }}>
                  פרטי השדה
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">שם השדה:</Typography>
                  <Typography variant="body1" fontWeight="600">{field.name}</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">גידול:</Typography>
                  <Chip 
                    label={field.crop} 
                    size="small"
                    sx={{ 
                      backgroundColor: 'rgba(76, 175, 80, 0.1)',
                      color: '#4CAF50',
                      fontWeight: 600
                    }}
                  />
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">קו רוחב:</Typography>
                  <Typography variant="body1" fontFamily="monospace" fontWeight="600">
                    {field.center.lat.toFixed(6)}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">קו אורך:</Typography>
                  <Typography variant="body1" fontFamily="monospace" fontWeight="600">
                    {field.center.lng.toFixed(6)}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">מספר חיישנים:</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Sensors sx={{ color: '#2196F3', fontSize: 18 }} />
                    <Typography variant="body1" fontWeight="600">{field.sensors.length}</Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Sensor Status */}
        <Grid item xs={12} lg={6}>
          <Card 
            elevation={3}
            sx={{ 
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
                <Sensors sx={{ color: '#2E7D32', fontSize: 24 }} />
                <Typography variant="h6" sx={{ 
                  fontWeight: 600,
                  color: '#2E7D32'
                }}>
                  סטטוס חיישנים
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {field.sensors.map((sensor, index) => (
                  <Box key={sensor.id} sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    p: 1.5,
                    background: 'rgba(255, 255, 255, 0.5)',
                    borderRadius: 2,
                    border: '1px solid rgba(76, 175, 80, 0.2)'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ 
                        width: 8, 
                        height: 8, 
                        borderRadius: '50%', 
                        backgroundColor: '#4CAF50',
                        animation: 'pulse 2s infinite'
                      }} />
                      <Typography variant="body2" fontWeight="600">
                        חיישן {index + 1}
                      </Typography>
                    </Box>
                    <Chip 
                      label="פעיל" 
                      size="small"
                      color="success"
                      sx={{ fontWeight: 600, fontSize: '0.7rem' }}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} lg={6}>
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
                <TrendingUp sx={{ color: '#F57C00', fontSize: 24 }} />
                <Typography variant="h6" sx={{ 
                  fontWeight: 600,
                  color: '#F57C00'
                }}>
                  פעולות מהירות
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<Refresh />}
                  fullWidth
                  sx={{
                    borderColor: '#4CAF50',
                    color: '#4CAF50',
                    '&:hover': {
                      borderColor: '#45A049',
                      backgroundColor: 'rgba(76, 175, 80, 0.1)'
                    }
                  }}
                >
                  רענן נתונים
                </Button>
                
                <Button
                  variant="outlined"
                  startIcon={<WaterDrop />}
                  fullWidth
                  sx={{
                    borderColor: '#2196F3',
                    color: '#2196F3',
                    '&:hover': {
                      borderColor: '#1976D2',
                      backgroundColor: 'rgba(33, 150, 243, 0.1)'
                    }
                  }}
                >
                  ניהול השקיה
                </Button>
                
                <Button
                  variant="outlined"
                  startIcon={<Science />}
                  fullWidth
                  sx={{
                    borderColor: '#FF9800',
                    color: '#FF9800',
                    '&:hover': {
                      borderColor: '#F57C00',
                      backgroundColor: 'rgba(255, 152, 0, 0.1)'
                    }
                  }}
                >
                  ניהול דישון
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Time Series Chart */}
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
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Thermostat sx={{ color: '#666', fontSize: 24 }} />
                <Typography variant="h6" sx={{ 
                  fontWeight: 600,
                  color: '#666'
                }}>
                  נתוני חיישנים בזמן אמת
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              
              <TimeSeries />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Performance Alert */}
      <Alert 
        severity="info" 
        sx={{ 
          mt: 3,
          borderRadius: 2,
          border: '1px solid #2196F3',
          background: 'rgba(33, 150, 243, 0.1)'
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          💡 טיפ: השדה שלך מראה ביצועים טובים! שקול להוסיף חיישנים נוספים לקבלת נתונים מדויקים יותר.
        </Typography>
      </Alert>
      
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

export default FieldDetail;