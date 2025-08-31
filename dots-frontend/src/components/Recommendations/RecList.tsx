import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  List, 
  ListItem, 
  ListItemText, 
  Typography, 
  Chip, 
  Box,
  Alert,
  CircularProgress
} from '@mui/material';
import { Lightbulb, TrendingUp, TrendingDown } from '@mui/icons-material';
import api from '../../api/client';
import { Recommendation } from '../../api/types';

interface RecListProps {
  fieldId: string;
}

const RecList: React.FC<RecListProps> = ({ fieldId }) => {
  const { data: recommendations, isLoading, error } = useQuery<Recommendation[]>({
    queryKey: ['recommendations', fieldId],
    queryFn: () => api.fetchRecommendations(fieldId),
    refetchInterval: 60000, // Refresh every minute
  });

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        שגיאה בטעינת המלצות
      </Alert>
    );
  }

  if (!recommendations || recommendations.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', p: 3 }}>
        <Lightbulb sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
        <Typography variant="body2" color="textSecondary">
          אין המלצות חדשות כרגע
        </Typography>
      </Box>
    );
  }

  const getSeverityColor = (severity: Recommendation['severity']) => {
    switch (severity) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'error';
      default: return 'default';
    }
  };

  const getSeverityIcon = (severity: Recommendation['severity']) => {
    switch (severity) {
      case 'low': return <TrendingDown color="success" />;
      case 'medium': return <TrendingUp color="warning" />;
      case 'high': return <TrendingUp color="error" />;
      default: return <Lightbulb />;
    }
  };

  return (
    <List>
      {recommendations.map((rec) => (
        <ListItem key={rec.id} divider sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, width: '100%' }}>
            {getSeverityIcon(rec.severity)}
            <Chip 
              label={rec.severity.toUpperCase()} 
              color={getSeverityColor(rec.severity)}
              size="small"
            />
            <Typography variant="caption" color="textSecondary" sx={{ ml: 'auto' }}>
              {new Date(rec.createdAt).toLocaleDateString('he-IL')}
            </Typography>
          </Box>
          
          <ListItemText
            primary={
              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                {rec.text}
              </Typography>
            }
            secondary={
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                המלצה ל: {rec.fieldId}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default RecList;