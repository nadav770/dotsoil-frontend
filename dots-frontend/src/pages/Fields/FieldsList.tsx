import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { getFields } from '../../api/mockApi';
import { Field } from '../../api/types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const FieldsList: React.FC = () => {
  const { data: fields, isLoading, error } = useQuery<Field[]>('fields', getFields);
const { data: fields, isLoading, error } = useQuery({
  queryKey: ['fields'],
  queryFn: api.fetchFields /* או mockApi.fetchFields */
});
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading fields</div>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Crop</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fields?.map((field) => (
            <TableRow key={field.id} component={Link} to={`/fields/${field.id}`}>
              <TableCell>{field.name}</TableCell>
              <TableCell>{field.crop}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FieldsList;