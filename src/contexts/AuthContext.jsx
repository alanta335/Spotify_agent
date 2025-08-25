import React, { createContext, useContext, useState, useEffect } from 'react';
import spotifyAuth from '../services/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isOAuthFlow, setIsOAuthFlow] = useState(false);
  const [user, setUser] = useState(null);

  const checkAuthStatus = () => {
    const authenticated = spotifyAuth.isAuthenticated();
    console.log('Checking auth status:', authenticated);
    setIsAuthenticated(authenticated);
    setIsLoading(false);
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = async () => {
    try {
      setIsOAuthFlow(true);
      await spotifyAuth.authorize();
    } catch (error) {
      setIsOAuthFlow(false);
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    spotifyAuth.logout();
    setIsAuthenticated(false);
    setUser(null);
    setIsOAuthFlow(false);
  };

  const refreshToken = async () => {
    try {
      await spotifyAuth.refreshToken();
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Token refresh error:', error);
      logout();
      throw error;
    }
  };

  const getAuthHeaders = () => {
    return spotifyAuth.getAuthHeaders();
  };

  // Method to update auth state after successful callback
  const updateAuthState = () => {
    console.log('Updating auth state...');
    setIsOAuthFlow(false);
    checkAuthStatus();
  };

  // Force refresh auth state (useful for debugging)
  const forceRefreshAuth = () => {
    console.log('Force refreshing auth state...');
    setIsLoading(true);
    setTimeout(() => {
      checkAuthStatus();
    }, 100);
  };

  const value = {
    isAuthenticated,
    isLoading,
    isOAuthFlow,
    user,
    login,
    logout,
    refreshToken,
    getAuthHeaders,
    updateAuthState,
    forceRefreshAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
