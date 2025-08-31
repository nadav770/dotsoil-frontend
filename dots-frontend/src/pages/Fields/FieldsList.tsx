import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Chip,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  Tooltip,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import { 
  Add, 
  Search, 
  Edit, 
  Delete, 
  Download, 
  LocationOn,
  Agriculture,
  Sensors,
  Visibility,
  FilterList,
  Refresh
} from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from '../../api/client';
import { Field, Sensor } from '../../api/types';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';

interface FieldFormData {
  name: string;
  crop: string;
  center: { lat: number; lng: number };
  sensors: Sensor[];
}

const FieldsList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCrop, setFilterCrop] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingField, setEditingField] = useState<Field | null>(null);
  const [formData, setFormData] = useState<FieldFormData>({
    name: '',
    crop: '',
    center: { lat: 0, lng: 0 },
    sensors: []
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const queryClient = useQueryClient();

  const { data: fields, isLoading, error, refetch } = useQuery({
    queryKey: ['fields'],
    queryFn: api.fetchFields
  });

  const addFieldMutation = useMutation({
    mutationFn: (data: FieldFormData) => api.addField(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fields'] });
      setSnackbar({ open: true, message: 'השדה נוסף בהצלחה!', severity: 'success' });
      handleCloseDialog();
    },
    onError: () => {
      setSnackbar({ open: true, message: 'שגיאה בהוספת השדה', severity: 'error' });
    }
  });

  const updateFieldMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FieldFormData }) => api.updateField(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fields'] });
      setSnackbar({ open: true, message: 'השדה עודכן בהצלחה!', severity: 'success' });
      handleCloseDialog();
    },
    onError: () => {
      setSnackbar({ open: true, message: 'שגיאה בעדכון השדה', severity: 'error' });
    }
  });

  const deleteFieldMutation = useMutation({
    mutationFn: (id: string) => api.deleteField(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fields'] });
      setSnackbar({ open: true, message: 'השדה נמחק בהצלחה!', severity: 'success' });
    },
    onError: () => {
      setSnackbar({ open: true, message: 'שגיאה במחיקת השדה', severity: 'error' });
    }
  });

  const handleOpenDialog = (field?: Field) => {
    if (field) {
      setEditingField(field);
      setFormData({
        name: field.name,
        crop: field.crop,
        center: field.center,
        sensors: field.sensors
      });
    } else {
      setEditingField(null);
      setFormData({ name: '', crop: '', center: { lat: 0, lng: 0 }, sensors: [] });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingField(null);
    setFormData({ name: '', crop: '', center: { lat: 0, lng: 0 }, sensors: [] });
  };

  const handleSubmit = () => {
    if (editingField) {
      updateFieldMutation.mutate({ id: editingField.id, data: formData });
    } else {
      addFieldMutation.mutate(formData);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק שדה זה?')) {
      deleteFieldMutation.mutate(id);
    }
  };

  const handleViewField = (fieldId: string) => {
    console.log('Navigating to field:', fieldId);
    navigate(`/fields/${fieldId}`);
  };

  const exportToCSV = () => {
    if (!fields) return;
    
    const csvContent = [
      ['שם השדה', 'גידול', 'קו רוחב', 'קו אורך', 'מספר חיישנים'],
      ...fields.map(field => [
        field.name,
        field.crop,
        field.center.lat,
        field.center.lng,
        field.sensors.length
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'fields_export.csv';
    link.click();
  };

  const filteredFields = fields?.filter(field => {
    const matchesSearch = field.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         field.crop.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filterCrop || field.crop === filterCrop;
    return matchesSearch && matchesFilter;
  }) || [];

  if (isLoading) return <LoadingSpinner message="טוען רשימת שדות..." />;
  if (error) return <EmptyState icon="error" title="שגיאה בטעינת שדות" description="לא ניתן לטעון את רשימת השדות" />;

  const uniqueCrops = [...new Set(fields?.map(f => f.crop) || [])];

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
          mb: 3,
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
                ניהול שדות
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                מערכת ניהול שדות חכמה עם חיישנים מתקדמים
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={() => refetch()}
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
            <Button
              variant="outlined"
              startIcon={<Download />}
              onClick={exportToCSV}
              disabled={!fields?.length}
              sx={{
                borderColor: '#FF9800',
                color: '#FF9800',
                '&:hover': {
                  borderColor: '#F57C00',
                  backgroundColor: 'rgba(255, 152, 0, 0.1)'
                }
              }}
            >
              ייצוא CSV
            </Button>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => handleOpenDialog()}
              sx={{
                background: 'linear-gradient(135deg, #4CAF50 0%, #45A049 100%)',
                boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #45A049 0%, #2E7D32 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(76, 175, 80, 0.4)',
                }
              }}
            >
              הוספת שדה
            </Button>
          </Box>
        </Box>

        {/* Search and Filter */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            placeholder="חיפוש בשדות..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#4CAF50' }} />
                </InputAdornment>
              ),
            }}
            sx={{ 
              minWidth: 250,
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#4CAF50',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4CAF50',
                },
              },
            }}
          />
          
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>סינון גידול</InputLabel>
            <Select
              value={filterCrop}
              label="סינון גידול"
              onChange={(e) => setFilterCrop(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <FilterList sx={{ color: '#4CAF50', fontSize: 20 }} />
                </InputAdornment>
              }
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#4CAF50',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#4CAF50',
                  },
                },
              }}
            >
              <MenuItem value="">כל הגידולים</MenuItem>
              {uniqueCrops.map(crop => (
                <MenuItem key={crop} value={crop}>{crop}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Paper>

      {/* Fields Table */}
      <Paper 
        elevation={3}
        sx={{ 
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid #E0E0E0',
          borderRadius: 3,
          overflow: 'hidden'
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
                <TableCell sx={{ fontWeight: 600, color: '#2E7D32' }}>שם השדה</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#2E7D32' }}>גידול</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#2E7D32' }}>מיקום</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#2E7D32' }}>חיישנים</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#2E7D32' }}>פעולות</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredFields.map((field) => (
                <TableRow 
                  key={field.id} 
                  hover
                  sx={{ 
                    '&:hover': {
                      backgroundColor: 'rgba(76, 175, 80, 0.05)',
                      transform: 'scale(1.01)',
                      transition: 'all 0.2s ease'
                    }
                  }}
                >
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="600" sx={{ color: '#2E7D32' }}>
                      {field.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={field.crop} 
                      color="primary" 
                      variant="outlined"
                      size="small"
                      sx={{ 
                        borderColor: '#4CAF50',
                        color: '#4CAF50',
                        fontWeight: 600
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationOn sx={{ color: '#FF9800', fontSize: 18 }} />
                      <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                        {field.center.lat.toFixed(4)}, {field.center.lng.toFixed(4)}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Sensors sx={{ color: '#2196F3', fontSize: 18 }} />
                      <Typography variant="body2" fontWeight="600">
                        {field.sensors.length}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="צפה בשדה">
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={() => handleViewField(field.id)}
                          sx={{ 
                            color: '#4CAF50',
                            '&:hover': { 
                              backgroundColor: 'rgba(76, 175, 80, 0.1)',
                              transform: 'scale(1.1)'
                            }
                          }}
                        >
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="ערוך שדה">
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={() => handleOpenDialog(field)}
                          sx={{ 
                            color: '#2196F3',
                            '&:hover': { 
                              backgroundColor: 'rgba(33, 150, 243, 0.1)',
                              transform: 'scale(1.1)'
                            }
                          }}
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="מחק שדה">
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => handleDelete(field.id)}
                          sx={{ 
                            '&:hover': { 
                              backgroundColor: 'rgba(244, 67, 54, 0.1)',
                              transform: 'scale(1.1)'
                            }
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {filteredFields.length === 0 && (
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
          <EmptyState 
            icon="search" 
            title="לא נמצאו שדות" 
            description="נסה לשנות את החיפוש או הסינון"
          />
        </Paper>
      )}

      {/* Add/Edit Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)'
          }
        }}
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(135deg, #4CAF50 0%, #45A049 100%)',
          color: 'white',
          fontWeight: 600
        }}>
          {editingField ? 'ערוך שדה' : 'הוסף שדה חדש'}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="שם השדה"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
              required
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#4CAF50',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#4CAF50',
                  },
                },
              }}
            />
            <TextField
              label="גידול"
              value={formData.crop}
              onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
              fullWidth
              required
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#4CAF50',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#4CAF50',
                  },
                },
              }}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="קו רוחב"
                type="number"
                value={formData.center.lat}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  center: { ...formData.center, lat: parseFloat(e.target.value) || 0 }
                })}
                fullWidth
                required
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#4CAF50',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#4CAF50',
                    },
                  },
                }}
              />
              <TextField
                label="קו אורך"
                type="number"
                value={formData.center.lng}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  center: { ...formData.center, lng: parseFloat(e.target.value) || 0 }
                })}
                fullWidth
                required
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#4CAF50',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#4CAF50',
                    },
                  },
                }}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button 
            onClick={handleCloseDialog}
            variant="outlined"
            sx={{
              borderColor: '#9E9E9E',
              color: '#9E9E9E',
              '&:hover': {
                borderColor: '#757575',
                backgroundColor: 'rgba(158, 158, 158, 0.1)'
              }
            }}
          >
            ביטול
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={!formData.name || !formData.crop}
            sx={{
              background: 'linear-gradient(135deg, #4CAF50 0%, #45A049 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #45A049 0%, #2E7D32 100%)',
              },
              '&:disabled': {
                background: '#E0E0E0',
                color: '#9E9E9E'
              }
            }}
          >
            {editingField ? 'עדכן' : 'הוסף'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          severity={snackbar.severity} 
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{ 
            borderRadius: 2,
            fontWeight: 600
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FieldsList;