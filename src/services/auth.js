import { SPOTIFY_CONFIG, STORAGE_KEYS } from '../utils/constants';

class SpotifyAuthService {
  constructor() {
    this.clientId = SPOTIFY_CONFIG.CLIENT_ID;
    this.redirectUri = SPOTIFY_CONFIG.REDIRECT_URI;
    this.scope = SPOTIFY_CONFIG.SCOPES;
  }

  // Generate a random string for code verifier
  generateRandomString(length) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  }

  // Generate SHA256 hash
  async sha256(plain) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
  }

  // Base64 encode with URL-safe characters
  base64encode(input) {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }

  // Generate code challenge from code verifier
  async generateCodeChallenge() {
    const codeVerifier = this.generateRandomString(64);
    const hashed = await this.sha256(codeVerifier);
    const codeChallenge = this.base64encode(hashed);
    
    // Store code verifier for later use
    localStorage.setItem(STORAGE_KEYS.CODE_VERIFIER, codeVerifier);
    
    return { codeVerifier, codeChallenge };
  }

  // Initiate authorization flow
  async authorize() {
    try {
      const { codeChallenge } = await this.generateCodeChallenge();
      
      const authUrl = new URL("https://accounts.spotify.com/authorize");
      const params = {
        response_type: 'code',
        client_id: this.clientId,
        scope: this.scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: this.redirectUri,
        state: this.generateRandomString(16) // Add state for CSRF protection
      };

      authUrl.search = new URLSearchParams(params).toString();
      window.location.href = authUrl.toString();
    } catch (error) {
      console.error('Error initiating authorization:', error);
      throw error;
    }
  }

  // Handle authorization callback and exchange code for token
  async handleCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');
    const state = urlParams.get('state');

    if (error) {
      throw new Error(`Authorization failed: ${error}`);
    }

    if (!code) {
      throw new Error('No authorization code received');
    }

    return await this.exchangeCodeForToken(code);
  }

  // Exchange authorization code for access token
  async exchangeCodeForToken(code) {
    try {
      const codeVerifier = localStorage.getItem(STORAGE_KEYS.CODE_VERIFIER);
      
      if (!codeVerifier) {
        throw new Error('Code verifier not found in localStorage');
      }

      const url = "https://accounts.spotify.com/api/token";
      const payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: this.clientId,
          grant_type: 'authorization_code',
          code,
          redirect_uri: this.redirectUri,
          code_verifier: codeVerifier,
        }),
      };

      const response = await fetch(url, payload);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Token exchange failed: ${errorData.error_description || errorData.error}`);
      }

      const tokenData = await response.json();
      
      // Store tokens
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokenData.access_token);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokenData.refresh_token);
      
      // Clean up code verifier
      localStorage.removeItem(STORAGE_KEYS.CODE_VERIFIER);
      
      return tokenData;
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      throw error;
    }
  }

  // Refresh access token
  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const url = "https://accounts.spotify.com/api/token";
      const payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: this.clientId,
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        }),
      };

      const response = await fetch(url, payload);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Token refresh failed: ${errorData.error_description || errorData.error}`);
      }

      const tokenData = await response.json();
      
      // Update stored tokens
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokenData.access_token);
      if (tokenData.refresh_token) {
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokenData.refresh_token);
      }
      
      return tokenData;
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  }

  // Get current access token
  getAccessToken() {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = this.getAccessToken();
    return !!token;
  }

  // Logout user
  logout() {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.CODE_VERIFIER);
  }

  // Get authenticated headers for API requests
  getAuthHeaders() {
    const token = this.getAccessToken();
    if (!token) {
      throw new Error('No access token available');
    }
    
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }
}

export const spotifyAuth = new SpotifyAuthService();
export default spotifyAuth;
