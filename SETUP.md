# Spotify Agent Setup Guide

## Prerequisites

1. A Spotify account
2. Node.js and npm installed
3. A Spotify Developer account

## Spotify App Setup

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click "Create App"
4. Fill in the app details:
   - App name: "Spotify AI Agent" (or any name you prefer)
   - App description: "AI-powered Spotify assistant"
   - Website: `http://localhost:3000`
   - Redirect URI: `http://localhost:3000/callback`
   - API/SDKs: Web API
5. Accept the terms and create the app
6. Copy your **Client ID** from the app dashboard

## Environment Configuration

1. Create a `.env` file in the root directory of the project
2. Add the following variables:

```env
VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id_here
VITE_REDIRECT_URI=http://localhost:3000/callback
```

Replace `your_spotify_client_id_here` with the Client ID you copied from the Spotify Developer Dashboard.

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

## Authentication Flow

The app now uses Spotify's Authorization Code with PKCE flow:

1. **Login**: Users click "Connect with Spotify" to initiate OAuth
2. **Authorization**: Users are redirected to Spotify to grant permissions
3. **Callback**: Spotify redirects back to the app with an authorization code
4. **Token Exchange**: The app exchanges the code for access and refresh tokens
5. **API Access**: The app can now make authenticated requests to Spotify API

## Security Features

- **PKCE (Proof Key for Code Exchange)**: Prevents authorization code interception attacks
- **State Parameter**: Protects against CSRF attacks
- **Secure Token Storage**: Tokens are stored in localStorage (consider using httpOnly cookies for production)
- **Automatic Token Refresh**: Access tokens are automatically refreshed when they expire

## Troubleshooting

### Common Issues

1. **"Invalid redirect URI" error**:
   - Make sure the redirect URI in your `.env` file exactly matches what's configured in your Spotify app
   - Check for trailing slashes or protocol differences

2. **"Client ID not found" error**:
   - Verify your Client ID is correctly set in the `.env` file
   - Make sure the `.env` file is in the root directory

3. **"Authentication failed" error**:
   - Check that your Spotify app is properly configured
   - Verify the scopes requested match what your app needs

### Development vs Production

For production deployment:
- Update the redirect URI to your production domain
- Consider using environment-specific Spotify apps
- Implement proper session management
- Use secure token storage (httpOnly cookies)

## API Endpoints

The app now makes authenticated requests to:
- Spotify Web API (for user profile, playback control, etc.)
- Your backend API (for AI chat functionality)

All requests include the Spotify access token in the Authorization header.
