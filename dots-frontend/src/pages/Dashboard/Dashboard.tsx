import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  Paper
} from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  TrendingUp,
  Notifications
} from '@mui/icons-material';

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      {/* Welcome Header */}
      <Paper 
        elevation={3}
        sx={{ 
          p: 4, 
          mb: 4,
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          border: '1px solid #E0E0E0',
          borderRadius: 3
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Box sx={{ 
            p: 2, 
            borderRadius: '50%', 
            background: 'linear-gradient(135deg, #4CAF50 0%, #45A049 100%)',
            boxShadow: '0 8px 25px rgba(76, 175, 80, 0.3)'
          }}>
            <DashboardIcon sx={{ fontSize: 40, color: 'white' }} />
          </Box>
          <Box>
            <Typography variant="h3" sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1
            }}>
              ברוך הבא למערכת DOTS
            </Typography>
            <Typography variant="h6" color="text.secondary">
              מערכת ניהול שדות חכמה עם חיישנים מתקדמים
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Quick Stats */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
            color: 'white',
            boxShadow: '0 8px 25px rgba(76, 175, 80, 0.3)'
          }}>
            <CardContent sx={{ textAlign: 'center', p: 4 }}>
              <TrendingUp sx={{ fontSize: 60, mb: 2, opacity: 0.9 }} />
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                4
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                שדות פעילים
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #2196F3 0%, #42A5F5 100%)',
            color: 'white',
            boxShadow: '0 8px 25px rgba(33, 150, 243, 0.3)'
          }}>
            <CardContent sx={{ textAlign: 'center', p: 4 }}>
              <Notifications sx={{ fontSize: 60, mb: 2, opacity: 0.9 }} />
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                2
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                התראות פעילות
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #FF9800 0%, #FFB74D 100%)',
            color: 'white',
            boxShadow: '0 8px 25px rgba(255, 152, 0, 0.3)'
          }}>
            <CardContent sx={{ textAlign: 'center', p: 4 }}>
              <DashboardIcon sx={{ fontSize: 60, mb: 2, opacity: 0.9 }} />
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                100%
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                מערכת פעילה
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;