import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography, 
  Box,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import { Visibility, LocationOn, Crop } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import api from '../../api/client';
import { Field } from '../../api/types';

const FieldsList: React.FC = () => {
  const { data: fields, isLoading, error } = useQuery<Field[]>({
    queryKey: ['fields'],
    queryFn: api.fetchFields,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  if (isLoading) return <div>Loading fields...</div>;
  if (error) return <div>Error loading fields</div>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        רשימת שדות
      </Typography>
      
      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.main' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                שם השדה
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                גידול
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                חיישנים
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                מיקום
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                פעולות
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fields?.map((field) => (
              <TableRow key={field.id} hover>
                <TableCell>
                  <Typography variant="h6">{field.name}</Typography>
                </TableCell>
                <TableCell>
                  <Chip 
                    icon={<Crop />} 
                    label={field.crop} 
                    color="primary" 
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={`${field.sensors.length} חיישנים`}
                    color="secondary"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOn color="action" />
                    <Typography variant="body2">
                      {field.center.lat.toFixed(4)}, {field.center.lng.toFixed(4)}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Tooltip title="צפה בפרטי השדה">
                    <IconButton 
                      component={Link} 
                      to={`/fields/${field.id}`}
                      color="primary"
                      size="large"
                    >
                      <Visibility />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FieldsList;