// Firebase User profile information
export interface FirebaseUser {
  id: string;
  email: string | null;
  name: string | null;
  picture: string | null;
  verified: boolean;
  provider: string;
}

// Authentication state
export interface AuthState {
  isAuthenticated: boolean;
  user: FirebaseUser | null;
  isLoading: boolean;
  error: string | null;
}

// Authentication context
export interface AuthContextType {
  auth: AuthState;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: FirebaseUser) => void;
}
