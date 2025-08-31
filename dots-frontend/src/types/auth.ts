// User profile information from Google
export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture: string;
  given_name?: string;
  family_name?: string;
  locale?: string;
  verified_email: boolean;
}

// Authentication state
export interface AuthState {
  isAuthenticated: boolean;
  user: GoogleUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
  isLoading: boolean;
  error: string | null;
}

// Login response
export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
}

// Token refresh response
export interface TokenRefreshResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
}

// Authentication context
export interface AuthContextType {
  auth: AuthState;
  login: () => void;
  logout: () => void;
  refreshToken: () => Promise<void>;
  updateUser: (user: GoogleUser) => void;
}
