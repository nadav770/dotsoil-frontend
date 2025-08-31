// Google OAuth Configuration
export const GOOGLE_OAUTH_CONFIG = {
  // Replace with your actual Google OAuth Client ID
  clientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
  
  // Scopes for the OAuth request
  scopes: [
    'openid',
    'profile',
    'email'
  ].join(' '),
  
  // Redirect URI after successful authentication
  redirectUri: window.location.origin,
  
  // Response type
  responseType: 'code',
  
  // Access type
  accessType: 'offline',
  
  // Prompt for consent
  prompt: 'consent'
};

// Google OAuth endpoints
export const GOOGLE_ENDPOINTS = {
  auth: 'https://accounts.google.com/o/oauth2/v2/auth',
  token: 'https://oauth2.googleapis.com/token',
  userInfo: 'https://www.googleapis.com/oauth2/v2/userinfo',
  revoke: 'https://oauth2.googleapis.com/revoke'
};

// Local storage keys
export const STORAGE_KEYS = {
  accessToken: 'google_access_token',
  refreshToken: 'google_refresh_token',
  userInfo: 'google_user_info',
  expiresAt: 'google_token_expires_at'
};
