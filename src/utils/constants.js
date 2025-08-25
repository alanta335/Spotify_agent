// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8080',
  ENDPOINTS: {
    CHAT: '/chat',
    USER_PROFILE: '/user',
    PLAYBACK: '/playback'
  }
};

// Spotify API Configuration
export const SPOTIFY_CONFIG = {
  CLIENT_ID: import.meta.env.VITE_SPOTIFY_CLIENT_ID || '',
  REDIRECT_URI: import.meta.env.VITE_REDIRECT_URI || 'http://localhost:5173/callback',
  SCOPES: [
    'user-read-private',
    'user-read-email',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'playlist-read-private',
    'playlist-modify-public',
    'playlist-modify-private'
  ].join(' ')
};

// Chat Configuration
export const CHAT_CONFIG = {
  MAX_MESSAGES: 100,
  TYPING_INDICATOR_DELAY: 1000,
  MESSAGE_TIMEOUT: 30000
};

// UI Configuration
export const UI_CONFIG = {
  THEME: {
    PRIMARY: '#1DB954', // Spotify Green
    SECONDARY: '#191414', // Spotify Black
    ACCENT: '#1ED760', // Spotify Light Green
    BACKGROUND: '#121212', // Dark Background
    SURFACE: '#282828', // Card Background
    TEXT_PRIMARY: '#FFFFFF',
    TEXT_SECONDARY: '#B3B3B3',
    TEXT_MUTED: '#727272'
  },
  BREAKPOINTS: {
    MOBILE: '640px',
    TABLET: '768px',
    DESKTOP: '1024px',
    LARGE: '1280px'
  }
};

// Default User Data
export const DEFAULT_USER_DATA = {
  userName: "Alan",
  userId: "123"
  // Removed hardcoded apiKey - now using OAuth authentication
};

// Local Storage Keys
export const STORAGE_KEYS = {
  USER_DATA: 'spotify_agent_user_data',
  CHAT_HISTORY: 'spotify_agent_chat_history',
  SETTINGS: 'spotify_agent_settings',
  ACCESS_TOKEN: 'spotify_access_token',
  REFRESH_TOKEN: 'spotify_refresh_token',
  CODE_VERIFIER: 'spotify_code_verifier'
};
