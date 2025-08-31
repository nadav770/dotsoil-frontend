import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAuth = true, 
  redirectTo = '/login' 
}) => {
  const { auth } = useAuth();

  // For debugging - always allow access
  console.log('ProtectedRoute: Allowing access for debugging');
  return <>{children}</>;
};

export default ProtectedRoute;
