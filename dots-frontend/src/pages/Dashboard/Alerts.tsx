import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Chip, 
  Button, 
  Switch, 
  FormControlLabel,
  Paper,
  Divider,
  IconButton,
  Tooltip,
  Alert,
  Badge,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse
} from '@mui/material';
import { 
  Notifications, 
  Warning, 
  Error, 
  Info, 
  CheckCircle,
  Settings,
  Refresh,
  ExpandMore,
  ExpandLess,
  Delete,
  Archive,
  Visibility
} from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/client';
import { Alert as AlertType } from '../../api/types';

const Alerts: React.FC = () => {
  const [showResolved, setShowResolved] = useState(false);
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data: alerts, isLoading, error } = useQuery({
    queryKey: ['alerts'],
    queryFn: api.fetchAlerts,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const resolveAlertMutation = useMutation({
    mutationFn: (alertId: string) => Promise.resolve(), // Placeholder for future implementation
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    },
  });

  const deleteAlertMutation = useMutation({
    mutationFn: (alertId: string) => Promise.resolve(), // Placeholder for future implementation
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    },
  });

  const handleResolve = (alertId: string) => {
    resolveAlertMutation.mutate(alertId);
  };

  const handleDelete = (alertId: string) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק התראה זו?')) {
      deleteAlertMutation.mutate(alertId);
    }
  };

  const handleExpand = (alertId: string) => {
    setExpandedAlert(expandedAlert === alertId ? null : alertId);
  };

  const getSeverityIcon = (level: string) => {
    switch (level) {
      case 'critical':
        return <Error sx={{ color: '#f44336' }} />;
      case 'warn':
        return <Warning sx={{ color: '#ff9800' }} />;
      case 'info':
        return <Info sx={{ color: '#2196f3' }} />;
      default:
        return <Info sx={{ color: '#9e9e9e' }} />;
    }
  };

  const getSeverityColor = (level: string) => {
    switch (level) {
      case 'critical':
        return '#f44336';
      case 'warn':
        return '#ff9800';
      case 'info':
        return '#2196f3';
      default:
        return '#9e9e9e';
    }
  };

  const getSeverityLabel = (level: string) => {
    switch (level) {
      case 'critical':
        return 'קריטי';
      case 'warn':
        return 'אזהרה';
      case 'info':
        return 'מידע';
      default:
        return 'לא ידוע';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'moisture':
        return 'לחות';
      case 'nitrate':
        return 'חנקן';
      case 'temperature':
        return 'טמפרטורה';
      case 'system':
        return 'מערכת';
      default:
        return type;
    }
  };

  const filteredAlerts = alerts?.filter(alert => 
    showResolved ? true : alert.level !== 'info'
  ) || [];

  const activeAlerts = alerts?.filter(alert => alert.level === 'critical' || alert.level === 'warn') || [];
  const criticalAlerts = activeAlerts.filter(alert => alert.level === 'critical');

  if (isLoading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          טוען התראות...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        שגיאה בטעינת ההתראות
      </Alert>
    );
  }

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
            <Box sx={{ 
              p: 2, 
              borderRadius: '50%', 
              background: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)',
              boxShadow: '0 4px 15px rgba(244, 67, 54, 0.3)'
            }}>
              <Notifications sx={{ fontSize: { xs: 32, md: 40 }, color: 'white' }} />
            </Box>
            <Box>
              <Typography variant="h4" sx={{ 
                fontSize: { xs: '1.5rem', md: '2.125rem' },
                fontWeight: 700,
                background: 'linear-gradient(135deg, #d32f2f 0%, #f44336 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                התראות מערכת
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                ניהול התראות וניטור מצב המערכת
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
            <Tooltip title="הגדרות התראות">
              <IconButton
                onClick={() => setSettingsOpen(!settingsOpen)}
                sx={{ 
                  color: '#666',
                  '&:hover': { 
                    backgroundColor: 'rgba(244, 67, 54, 0.1)',
                    color: '#f44336'
                  }
                }}
              >
                <Settings />
              </IconButton>
            </Tooltip>
            
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={() => queryClient.invalidateQueries({ queryKey: ['alerts'] })}
              sx={{
                borderColor: '#2196F3',
                color: '#2196F3',
                '&:hover': {
                  borderColor: '#1976D2',
                  backgroundColor: 'rgba(33, 150, 243, 0.1)'
                }
              }}
            >
              רענן
            </Button>
          </Box>
        </Box>

        {/* Summary Stats */}
        <Box sx={{ 
          display: 'flex', 
          gap: { xs: 1, md: 2 }, 
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <Chip 
            label={`${activeAlerts.length} התראות פעילות`} 
            color="error" 
            variant="outlined"
            icon={<Notifications />}
            sx={{ 
              borderColor: '#f44336',
              color: '#f44336',
              fontWeight: 600
            }}
          />
          <Chip 
            label={`${criticalAlerts.length} קריטיות`} 
            color="error" 
            variant="outlined"
            icon={<Error />}
            sx={{ 
              borderColor: '#d32f2f',
              color: '#d32f2f',
              fontWeight: 600
            }}
          />
                     <Chip 
             label={`${alerts?.filter(a => a.level === 'info').length || 0} נפתרו`} 
             color="success" 
             variant="outlined"
             icon={<CheckCircle />}
             sx={{ 
               borderColor: '#4CAF50',
               color: '#4CAF50',
               fontWeight: 600
             }}
           />
        </Box>

        {/* Settings Panel */}
        <Collapse in={settingsOpen}>
          <Box sx={{ mt: 3, p: 2, background: 'rgba(0,0,0,0.02)', borderRadius: 2 }}>
            <FormControlLabel
              control={
                <Switch 
                  checked={showResolved} 
                  onChange={(e) => setShowResolved(e.target.checked)}
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
              label="הצג התראות שנפתרו"
              sx={{ fontWeight: 600 }}
            />
          </Box>
        </Collapse>
      </Paper>

      {/* Critical Alert Banner */}
      {criticalAlerts.length > 0 && (
        <Alert 
          severity="error" 
          sx={{ 
            mb: 3,
            borderRadius: 3,
            border: '2px solid #f44336',
            background: 'rgba(244, 67, 54, 0.1)',
            '& .MuiAlert-icon': { fontSize: 32 },
            '& .MuiAlert-message': { fontSize: '1.1rem', fontWeight: 600 }
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            ⚠️ התראות קריטיות דורשות תשומת לב מיידית!
          </Typography>
          <Typography variant="body2">
            יש {criticalAlerts.length} התראות קריטיות שדורשות טיפול מיידי. אנא בדוק אותן בהקדם האפשרי.
          </Typography>
        </Alert>
      )}

      {/* Alerts List */}
      {filteredAlerts.length === 0 ? (
        <Paper 
          elevation={2}
          sx={{ 
            p: 4, 
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid #E0E0E0',
            borderRadius: 3
          }}
        >
          <CheckCircle sx={{ fontSize: 64, color: '#4CAF50', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            אין התראות פעילות
          </Typography>
          <Typography variant="body2" color="text.secondary">
            המערכת פועלת כשורה ואין התראות דורשות טיפול
          </Typography>
        </Paper>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {filteredAlerts.map((alert) => (
            <Card 
              key={alert.id}
              elevation={3}
              sx={{ 
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid #E0E0E0',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                }
              }}
            >
              {/* Priority Indicator */}
              <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: `linear-gradient(90deg, ${getSeverityColor(alert.level)} 0%, ${getSeverityColor(alert.level)}80 100%)`
              }} />

              <CardContent sx={{ p: { xs: 2, md: 3 }, position: 'relative' }}>
                {/* Alert Header */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ 
                      p: 1, 
                      borderRadius: '50%', 
                      background: `${getSeverityColor(alert.level)}20`,
                      border: `1px solid ${getSeverityColor(alert.level)}40`
                    }}>
                      {getSeverityIcon(alert.level)}
                    </Box>
                    
                    <Box>
                      <Typography variant="h6" sx={{ 
                        fontWeight: 600,
                        color: '#2E7D32',
                        fontSize: { xs: '1rem', md: '1.125rem' }
                      }}>
                        {alert.message}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 0.5 }}>
                        <Chip 
                          label={getSeverityLabel(alert.level)} 
                          size="small"
                          sx={{ 
                            backgroundColor: `${getSeverityColor(alert.level)}20`,
                            color: getSeverityColor(alert.level),
                            fontWeight: 600,
                            fontSize: '0.7rem'
                          }}
                        />
                        <Chip 
                          label="התראה" 
                          size="small"
                          variant="outlined"
                          sx={{ 
                            borderColor: '#666',
                            color: '#666',
                            fontWeight: 600,
                            fontSize: '0.7rem'
                          }}
                        />
                                                 {alert.level === 'info' && (
                           <Chip 
                             label="נפתר" 
                             size="small"
                             color="success"
                             sx={{ fontWeight: 600, fontSize: '0.7rem' }}
                           />
                         )}
                      </Box>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title={expandedAlert === alert.id ? "צמצם" : "הרחב"}>
                      <IconButton
                        size="small"
                        onClick={() => handleExpand(alert.id)}
                        sx={{ 
                          color: '#666',
                          '&:hover': { 
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            transform: 'scale(1.1)'
                          }
                        }}
                      >
                        {expandedAlert === alert.id ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>

                {/* Alert Message */}
                <Typography variant="body2" color="text.secondary" sx={{ 
                  mb: 2,
                  lineHeight: 1.6,
                  fontSize: { xs: '0.875rem', md: '1rem' }
                }}>
                  {alert.message}
                </Typography>

                {/* Alert Details */}
                <Collapse in={expandedAlert === alert.id}>
                  <Box sx={{ 
                    p: 2, 
                    background: 'rgba(0,0,0,0.02)', 
                    borderRadius: 2,
                    border: '1px solid rgba(0,0,0,0.05)',
                    mb: 2
                  }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
                      <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                          שדה:
                        </Typography>
                        <Typography variant="body2" fontWeight="600">
                          {alert.fieldId || 'לא צוין'}
                        </Typography>
                      </Box>
                      
                      <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                          זמן יצירה:
                        </Typography>
                        <Typography variant="body2" fontWeight="600">
                          {new Date(alert.createdAt).toLocaleString('he-IL')}
                        </Typography>
                      </Box>
                    </Box>
                    
                                         {/* Metadata section removed as it doesn't exist in Alert interface */}
                  </Box>
                </Collapse>

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                                     {alert.level !== 'info' && (
                     <Button
                       variant="contained"
                       size="small"
                       startIcon={<CheckCircle />}
                       onClick={() => handleResolve(alert.id)}
                       sx={{
                         background: 'linear-gradient(135deg, #4CAF50 0%, #45A049 100%)',
                         boxShadow: '0 2px 8px rgba(76, 175, 80, 0.3)',
                         borderRadius: 2,
                         px: 2,
                         py: 0.5,
                         fontWeight: 600,
                         textTransform: 'none',
                         fontSize: '0.8rem',
                         '&:hover': {
                           background: 'linear-gradient(135deg, #45A049 0%, #2E7D32 100%)',
                           transform: 'translateY(-1px)',
                           boxShadow: '0 4px 12px rgba(76, 175, 80, 0.4)',
                         }
                       }}
                     >
                       פתור
                     </Button>
                   )}
                  
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Delete />}
                    onClick={() => handleDelete(alert.id)}
                    sx={{
                      borderColor: '#f44336',
                      color: '#f44336',
                      borderRadius: 2,
                      px: 2,
                      py: 0.5,
                      fontWeight: 600,
                      textTransform: 'none',
                      fontSize: '0.8rem',
                      '&:hover': {
                        borderColor: '#d32f2f',
                        backgroundColor: 'rgba(244, 67, 54, 0.1)',
                        transform: 'translateY(-1px)',
                      }
                    }}
                  >
                    מחק
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Alerts;