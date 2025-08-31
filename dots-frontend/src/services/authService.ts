import { GOOGLE_OAUTH_CONFIG, GOOGLE_ENDPOINTS, STORAGE_KEYS } from '../config/google';
import { GoogleUser, LoginResponse, TokenRefreshResponse } from '../types/auth';

class AuthService {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private expiresAt: number | null = null;

  constructor() {
    this.loadTokensFromStorage();
  }

  // Load tokens from localStorage
  private loadTokensFromStorage(): void {
    this.accessToken = localStorage.getItem(STORAGE_KEYS.accessToken);
    this.refreshToken = localStorage.getItem(STORAGE_KEYS.refreshToken);
    const expiresAt = localStorage.getItem(STORAGE_KEYS.expiresAt);
    this.expiresAt = expiresAt ? parseInt(expiresAt) : null;
  }

  // Save tokens to localStorage
  private saveTokensToStorage(accessToken: string, refreshToken: string, expiresIn: number): void {
    const expiresAt = Date.now() + (expiresIn * 1000);
    
    localStorage.setItem(STORAGE_KEYS.accessToken, accessToken);
    localStorage.setItem(STORAGE_KEYS.refreshToken, refreshToken);
    localStorage.setItem(STORAGE_KEYS.expiresAt, expiresAt.toString());
    
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.expiresAt = expiresAt;
  }

  // Clear tokens from localStorage
  private clearTokensFromStorage(): void {
    localStorage.removeItem(STORAGE_KEYS.accessToken);
    localStorage.removeItem(STORAGE_KEYS.refreshToken);
    localStorage.removeItem(STORAGE_KEYS.expiresAt);
    localStorage.removeItem(STORAGE_KEYS.userInfo);
    
    this.accessToken = null;
    this.refreshToken = null;
    this.expiresAt = null;
  }

  // Check if token is expired
  private isTokenExpired(): boolean {
    if (!this.expiresAt) return true;
    return Date.now() >= this.expiresAt;
  }

  // Get current access token
  getAccessToken(): string | null {
    if (this.isTokenExpired()) {
      return null;
    }
    return this.accessToken;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!(this.accessToken && !this.isTokenExpired());
  }

  // Initiate Google OAuth login
  login(): void {
    const params = new URLSearchParams({
      client_id: GOOGLE_OAUTH_CONFIG.clientId,
      redirect_uri: GOOGLE_OAUTH_CONFIG.redirectUri,
      response_type: GOOGLE_OAUTH_CONFIG.responseType,
      scope: GOOGLE_OAUTH_CONFIG.scopes,
      access_type: GOOGLE_OAUTH_CONFIG.accessType,
      prompt: GOOGLE_OAUTH_CONFIG.prompt
    });

    const authUrl = `${GOOGLE_ENDPOINTS.auth}?${params.toString()}`;
    window.location.href = authUrl;
  }

  // Handle OAuth callback and exchange code for tokens
  async handleOAuthCallback(code: string): Promise<GoogleUser> {
    try {
      // Exchange authorization code for tokens
      const tokenResponse = await this.exchangeCodeForTokens(code);
      
      // Get user information
      const userInfo = await this.fetchUserInfoFromGoogle(tokenResponse.access_token);
      
      // Save tokens
      this.saveTokensToStorage(
        tokenResponse.access_token,
        tokenResponse.refresh_token,
        tokenResponse.expires_in
      );
      
      // Save user info
      localStorage.setItem(STORAGE_KEYS.userInfo, JSON.stringify(userInfo));
      
      return userInfo;
    } catch (error) {
      console.error('OAuth callback error:', error);
      throw new Error('Failed to complete authentication');
    }
  }

  // Exchange authorization code for access and refresh tokens
  private async exchangeCodeForTokens(code: string): Promise<LoginResponse> {
    const response = await fetch(GOOGLE_ENDPOINTS.token, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: GOOGLE_OAUTH_CONFIG.clientId,
        client_secret: '', // Client secret should be handled server-side
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: GOOGLE_OAUTH_CONFIG.redirectUri,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to exchange code for tokens');
    }

    return response.json();
  }

  // Get user information from Google
  private async fetchUserInfoFromGoogle(accessToken: string): Promise<GoogleUser> {
    const response = await fetch(GOOGLE_ENDPOINTS.userInfo, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get user info');
    }

    return response.json();
  }

  // Refresh access token using refresh token
  async refreshAccessToken(): Promise<string> {
    if (!this.refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await fetch(GOOGLE_ENDPOINTS.token, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: GOOGLE_OAUTH_CONFIG.clientId,
          client_secret: '', // Client secret should be handled server-side
          refresh_token: this.refreshToken,
          grant_type: 'refresh_token',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const tokenData: TokenRefreshResponse = await response.json();
      
      // Update access token and expiration
      this.accessToken = tokenData.access_token;
      const expiresAt = Date.now() + (tokenData.expires_in * 1000);
      this.expiresAt = expiresAt;
      
      localStorage.setItem(STORAGE_KEYS.accessToken, tokenData.access_token);
      localStorage.setItem(STORAGE_KEYS.expiresAt, expiresAt.toString());
      
      return tokenData.access_token;
    } catch (error) {
      console.error('Token refresh error:', error);
      this.logout();
      throw new Error('Failed to refresh token');
    }
  }

  // Get user info from storage
  getUserInfo(): GoogleUser | null {
    const userInfo = localStorage.getItem(STORAGE_KEYS.userInfo);
    return userInfo ? JSON.parse(userInfo) : null;
  }

  // Logout user
  logout(): void {
    this.clearTokensFromStorage();
    
    // Redirect to home page
    window.location.href = '/';
  }

  // Revoke access token
  async revokeAccess(): Promise<void> {
    if (this.accessToken) {
      try {
        await fetch(`${GOOGLE_ENDPOINTS.revoke}?token=${this.accessToken}`, {
          method: 'POST',
        });
      } catch (error) {
        console.error('Failed to revoke token:', error);
      }
    }
    
    this.logout();
  }
}

// Create singleton instance
export const authService = new AuthService();
export default authService;
