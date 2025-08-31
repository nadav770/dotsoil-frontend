import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Chip, 
  Button, 
  Paper,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  Lightbulb, 
  TrendingUp, 
  WaterDrop, 
  Thermostat, 
  Science,
  CheckCircle,
  Warning,
  Info,
  ArrowForward,
  Star
} from '@mui/icons-material';

interface Recommendation {
  id: string;
  type: 'irrigation' | 'fertilizer' | 'pest_control' | 'harvest';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  impact: 'positive' | 'negative' | 'neutral';
  estimatedCost: number;
  estimatedSavings: number;
}

const mockRecommendations: Recommendation[] = [
  {
    id: '1',
    type: 'irrigation',
    title: 'הפחתת השקיה בשדה הצפוני',
    description: 'רמות הלחות גבוהות מדי. מומלץ להפחית את כמות המים ב-20%',
    priority: 'high',
    impact: 'positive',
    estimatedCost: 0,
    estimatedSavings: 1500
  },
  {
    id: '2',
    type: 'fertilizer',
    title: 'הוספת דשן חנקני',
    description: 'רמות החנקן נמוכות. מומלץ להוסיף דשן חנקני בשבוע הבא',
    priority: 'medium',
    impact: 'positive',
    estimatedCost: 800,
    estimatedSavings: 2000
  },
  {
    id: '3',
    type: 'pest_control',
    title: 'טיפול נגד מזיקים',
    description: 'זיהוי מוקדם של מזיקים. מומלץ לבצע ריסוס מניעתי',
    priority: 'high',
    impact: 'positive',
    estimatedCost: 1200,
    estimatedSavings: 3000
  },
  {
    id: '4',
    type: 'harvest',
    title: 'תזמון קציר אופטימלי',
    description: 'הגידול מוכן לקציר. מומלץ לקצור בשבוע הבא לתפוקה מקסימלית',
    priority: 'medium',
    impact: 'positive',
    estimatedCost: 500,
    estimatedSavings: 2500
  }
];

const RecList: React.FC = () => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'irrigation':
        return <WaterDrop sx={{ fontSize: 20, color: '#2196F3' }} />;
      case 'fertilizer':
        return <Science sx={{ fontSize: 20, color: '#4CAF50' }} />;
      case 'pest_control':
        return <Warning sx={{ fontSize: 20, color: '#FF9800' }} />;
      case 'harvest':
        return <TrendingUp sx={{ fontSize: 20, color: '#9C27B0' }} />;
      default:
        return <Info sx={{ fontSize: 20, color: '#9E9E9E' }} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#f44336';
      case 'medium':
        return '#ff9800';
      case 'low':
        return '#4caf50';
      default:
        return '#9e9e9e';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive':
        return '#4caf50';
      case 'negative':
        return '#f44336';
      case 'neutral':
        return '#9e9e9e';
      default:
        return '#9e9e9e';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'irrigation':
        return 'השקיה';
      case 'fertilizer':
        return 'דישון';
      case 'pest_control':
        return 'הדברה';
      case 'harvest':
        return 'קציר';
      default:
        return 'כללי';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'גבוה';
      case 'medium':
        return 'בינוני';
      case 'low':
        return 'נמוך';
      default:
        return 'לא ידוע';
    }
  };

  const getImpactLabel = (impact: string) => {
    switch (impact) {
      case 'positive':
        return 'חיובי';
      case 'negative':
        return 'שלילי';
      case 'neutral':
        return 'ניטרלי';
      default:
        return 'לא ידוע';
    }
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
            <Lightbulb sx={{ fontSize: { xs: 32, md: 40 }, color: 'white' }} />
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
              המלצות חכמות
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              המלצות מבוססות בינה מלאכותית לשיפור התפוקה
            </Typography>
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
            label={`${mockRecommendations.length} המלצות`} 
            color="primary" 
            variant="outlined"
            icon={<Lightbulb />}
            sx={{ 
              borderColor: '#FF9800',
              color: '#FF9800',
              fontWeight: 600
            }}
          />
          <Chip 
            label="חיסכון מוערך: ₪7,500" 
            color="success" 
            variant="outlined"
            icon={<TrendingUp />}
            sx={{ 
              borderColor: '#4CAF50',
              color: '#4CAF50',
              fontWeight: 600
            }}
          />
          <Chip 
            label="עלות מוערכת: ₪2,500" 
            color="warning" 
            variant="outlined"
            icon={<Info />}
            sx={{ 
              borderColor: '#FF9800',
              color: '#FF9800',
              fontWeight: 600
            }}
          />
        </Box>
      </Paper>

      {/* Recommendations Grid */}
      <Box sx={{ 
        display: 'grid', 
        gap: { xs: 2, md: 3 },
        gridTemplateColumns: { 
          xs: '1fr', 
          sm: 'repeat(auto-fit, minmax(350px, 1fr))',
          lg: 'repeat(auto-fit, minmax(400px, 1fr))'
        }
      }}>
        {mockRecommendations.map((rec) => (
          <Card 
            key={rec.id}
            elevation={3}
            sx={{ 
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              border: '1px solid #E0E0E0',
              borderRadius: 3,
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                transform: 'translateY(-4px)',
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
              background: `linear-gradient(90deg, ${getPriorityColor(rec.priority)} 0%, ${getPriorityColor(rec.priority)}80 100%)`
            }} />

            {/* Background Pattern */}
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.03,
              backgroundImage: `
                radial-gradient(circle at 25% 25%, ${getPriorityColor(rec.priority)} 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, ${getImpactColor(rec.impact)} 0%, transparent 50%)
              `,
              backgroundSize: '100px 100px',
              zIndex: 0
            }} />

            <CardContent sx={{ p: { xs: 2, md: 3 }, position: 'relative', zIndex: 1 }}>
              {/* Header */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ 
                    p: 1, 
                    borderRadius: '50%', 
                    background: `${getPriorityColor(rec.priority)}20`,
                    border: `1px solid ${getPriorityColor(rec.priority)}40`
                  }}>
                    {getTypeIcon(rec.type)}
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 600,
                      color: '#2E7D32',
                      fontSize: { xs: '1rem', md: '1.125rem' }
                    }}>
                      {rec.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                      {getTypeLabel(rec.type)}
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {rec.priority === 'high' && (
                    <Star sx={{ color: '#f44336', fontSize: 16 }} />
                  )}
                  <Chip 
                    label={getPriorityLabel(rec.priority)} 
                    size="small"
                    sx={{ 
                      backgroundColor: `${getPriorityColor(rec.priority)}20`,
                      color: getPriorityColor(rec.priority),
                      fontWeight: 600,
                      fontSize: '0.7rem'
                    }}
                  />
                </Box>
              </Box>

              <Divider sx={{ mb: 2 }} />

              {/* Description */}
              <Typography variant="body2" color="text.secondary" sx={{ 
                mb: 3,
                lineHeight: 1.6,
                fontSize: { xs: '0.875rem', md: '1rem' }
              }}>
                {rec.description}
              </Typography>

              {/* Impact and Cost Info */}
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: 2, 
                mb: 3,
                p: 2,
                background: 'rgba(0,0,0,0.02)',
                borderRadius: 2,
                border: '1px solid rgba(0,0,0,0.05)'
              }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                    עלות מוערכת
                  </Typography>
                  <Typography variant="h6" sx={{ 
                    color: '#f44336',
                    fontWeight: 600,
                    fontSize: { xs: '1rem', md: '1.125rem' }
                  }}>
                    ₪{rec.estimatedCost.toLocaleString()}
                  </Typography>
                </Box>
                
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                    חיסכון מוערך
                  </Typography>
                  <Typography variant="h6" sx={{ 
                    color: '#4CAF50',
                    fontWeight: 600,
                    fontSize: { xs: '1rem', md: '1.125rem' }
                  }}>
                    ₪{rec.estimatedSavings.toLocaleString()}
                  </Typography>
                </Box>
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip 
                    label={getImpactLabel(rec.impact)} 
                    size="small"
                    icon={rec.impact === 'positive' ? <CheckCircle /> : <Warning />}
                    sx={{ 
                      backgroundColor: `${getImpactColor(rec.impact)}20`,
                      color: getImpactColor(rec.impact),
                      fontWeight: 600,
                      fontSize: '0.7rem'
                    }}
                  />
                </Box>
                
                <Button
                  variant="contained"
                  endIcon={<ArrowForward />}
                  size="small"
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
                  יישום
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Empty State */}
      {mockRecommendations.length === 0 && (
        <Paper 
          elevation={2}
          sx={{ 
            mt: 3, 
            p: 4, 
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid #E0E0E0',
            borderRadius: 3
          }}
        >
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            אין המלצות זמינות כרגע
          </Typography>
          <Typography variant="body2" color="text.secondary">
            המערכת תבדוק שוב בקרוב ותציג המלצות חדשות
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default RecList;