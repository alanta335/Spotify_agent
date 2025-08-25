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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuthStatus = () => {
      const authenticated = spotifyAuth.isAuthenticated();
      setIsAuthenticated(authenticated);
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async () => {
    try {
      await spotifyAuth.authorize();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    spotifyAuth.logout();
    setIsAuthenticated(false);
    setUser(null);
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

  const value = {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    refreshToken,
    getAuthHeaders,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
