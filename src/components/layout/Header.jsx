import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { apiService } from '../../services/api';

// Extracted components for better organization
const Logo = React.memo(() => (
  <div className="flex items-center space-x-3">
    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
      <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
        <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm4.61 14.44c-.25.37-.77.49-1.14.24-3.11-1.9-7.02-2.33-11.62-1.28-.44.13-.88-.17-1.01-.61-.13-.44.17-.88.61-1.01 5.1-1.15 9.47-.67 12.98 1.48.37.25.49.77.24 1.14l-.06.04zm1.24-2.76c-.32.49-.99.64-1.48.32-3.55-2.18-8.97-2.81-13.18-1.54-.53.16-1.08-.13-1.24-.66-.16-.53.13-1.08.66-1.24 4.8-1.45 10.8-.75 14.85 1.77.49.32.64.99.32 1.48l-.93.87zm.12-2.89c-.4.61-1.25.8-1.86.4-4.54-2.77-11.47-3.57-16.85-1.95-.64.2-1.31-.12-1.51-.76-.2-.64.12-1.31.76-1.51 6.1-1.85 13.7-.95 18.8 2.25.61.4.8 1.25.4 1.86l-.74 1.11z"/>
      </svg>
    </div>
    <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
      Spotify AI Agent
    </h1>
  </div>
));

const Navigation = React.memo(() => {
  const navItems = useMemo(() => [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/chat', label: 'Chat', icon: '💬' },
    { href: '/settings', label: 'Settings', icon: '⚙️' }
  ], []);

  return (
    <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
      {navItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-200 hover:scale-105 font-medium group"
          aria-label={item.label}
        >
          <span className="text-lg group-hover:scale-110 transition-transform duration-200">
            {item.icon}
          </span>
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  );
});

const UserProfile = React.memo(({ userProfile, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
        <div className="h-4 bg-gray-700 rounded w-20 animate-pulse"></div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <span className="text-sm text-gray-300 font-medium">Connected</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3 group">
      {userProfile.images && userProfile.images[0] ? (
        <img 
          src={userProfile.images[0].url} 
          alt={`${userProfile.display_name}'s profile`}
          className="w-8 h-8 rounded-full ring-2 ring-gray-600 group-hover:ring-green-500 transition-all duration-200"
          loading="lazy"
        />
      ) : (
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
          {userProfile.display_name?.charAt(0)?.toUpperCase() || 'U'}
        </div>
      )}
      <span className="text-sm text-gray-300 font-medium hidden sm:block group-hover:text-white transition-colors duration-200">
        {userProfile.display_name}
      </span>
    </div>
  );
});

const LogoutButton = React.memo(({ onLogout }) => (
  <button 
    onClick={onLogout}
    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold px-4 py-2 rounded-full transition-all duration-200 text-sm shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
    aria-label="Logout from Spotify"
  >
    <span className="flex items-center space-x-2">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      <span>Logout</span>
    </span>
  </button>
));

const MobileMenuButton = React.memo(({ isOpen, onToggle }) => (
  <button
    onClick={onToggle}
    className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
    aria-label={isOpen ? 'Close menu' : 'Open menu'}
    aria-expanded={isOpen}
  >
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {isOpen ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      )}
    </svg>
  </button>
));

const Header = () => {
  const { isAuthenticated, logout, getAuthHeaders } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const fetchUserProfile = useCallback(async () => {
    if (isAuthenticated) {
      try {
        setIsLoading(true);
        setError(null);
        const authHeaders = getAuthHeaders();
        const profile = await apiService.getSpotifyUserProfile(authHeaders);
        setUserProfile(profile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Failed to load user profile');
      } finally {
        setIsLoading(false);
      }
    }
  }, [isAuthenticated, getAuthHeaders]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const handleLogout = useCallback(() => {
    logout();
    setUserProfile(null);
    setError(null);
  }, [logout]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  return (
         <header className="bg-gradient-to-r from-gray-900 to-black text-white px-4 sm:px-6 py-4 border-b border-gray-800 shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
       <div className="flex items-center justify-between w-full">
         <Logo />
         
         <Navigation />
         
         <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <UserProfile userProfile={userProfile} isLoading={isLoading} />
              <LogoutButton onLogout={handleLogout} />
            </>
          ) : (
            <div className="flex items-center space-x-2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-sm font-medium">Not connected</span>
            </div>
          )}
          
          <MobileMenuButton isOpen={isMobileMenuOpen} onToggle={toggleMobileMenu} />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900 border-b border-gray-800 shadow-xl">
          <nav className="px-4 py-4 space-y-3">
            <a href="/" className="block text-gray-300 hover:text-white transition-colors duration-200 py-2">
              🏠 Home
            </a>
            <a href="/chat" className="block text-gray-300 hover:text-white transition-colors duration-200 py-2">
              💬 Chat
            </a>
            <a href="/settings" className="block text-gray-300 hover:text-white transition-colors duration-200 py-2">
              ⚙️ Settings
            </a>
          </nav>
        </div>
      )}

      {/* Error Toast */}
      {error && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-in slide-in-from-top-2">
          {error}
        </div>
      )}
    </header>
  );
};

export default React.memo(Header);
