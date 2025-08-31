import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Card, 
  CardContent, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Chip,
  Box 
} from '@mui/material';
import { Alert } from '../../api/types';
import api from '../../api/client';

const Alerts: React.FC = () => {
  const { data: alerts, isLoading, error } = useQuery<Alert[]>({
    queryKey: ['alerts'],
    queryFn: api.fetchAlerts,
    refetchInterval: 15000, // Refresh every 15 seconds
  });

  if (isLoading) return <div>Loading alerts...</div>;
  if (error) return <div>Error loading alerts</div>;

  const getAlertColor = (level: Alert['level']) => {
    switch (level) {
      case 'info': return 'info';
      case 'warn': return 'warning';
      case 'critical': return 'error';
      default: return 'default';
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          התראות
        </Typography>
        
        {alerts && alerts.length > 0 ? (
          <List>
            {alerts.map((alert) => (
              <ListItem key={alert.id} divider>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip 
                        label={alert.level.toUpperCase()} 
                        color={getAlertColor(alert.level)}
                        size="small"
                      />
                      <Typography variant="body2">
                        {alert.message}
                      </Typography>
                    </Box>
                  }
                  secondary={`Field: ${alert.fieldId} • ${new Date(alert.createdAt).toLocaleString('he-IL')}`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="textSecondary">
            אין התראות חדשות
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default Alerts;