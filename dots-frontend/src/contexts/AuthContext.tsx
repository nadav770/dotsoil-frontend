import React, { createContext, useContext, ReactNode } from 'react';
import { AuthState, AuthContextType, FirebaseUser } from '../types/firebaseAuth';

// Create authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock authenticated state for debugging
const mockAuthState: AuthState = {
  isAuthenticated: true,
  user: {
    id: 'mock-user-1',
    email: 'user@example.com',
    name: 'Mock User',
    picture: null,
    verified: true,
    provider: 'google'
  },
  isLoading: false,
  error: null,
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // For debugging - always return authenticated state
  const auth = mockAuthState;

  const login = async () => {
    console.log('Mock login called');
  };

  const logout = async () => {
    console.log('Mock logout called');
  };

  const updateUser = (user: FirebaseUser) => {
    console.log('Mock updateUser called with:', user);
  };

  const value: AuthContextType = {
    auth,
    login,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
