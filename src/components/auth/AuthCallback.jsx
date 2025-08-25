import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import spotifyAuth from '../../services/auth';
import LoadingSpinner from '../ui/LoadingSpinner';

const AuthCallback = () => {
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        setIsProcessing(true);
        await spotifyAuth.handleCallback();
        
        // Redirect to main app after successful authentication
        navigate('/', { replace: true });
      } catch (err) {
        console.error('Authentication callback error:', err);
        setError(err.message);
        setIsProcessing(false);
      }
    };

    handleCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-white mb-4">Authentication Failed</h2>
            <p className="text-gray-300 mb-6">{error}</p>
            <button
              onClick={() => navigate('/')}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center">
          <LoadingSpinner size="large" />
          <h2 className="text-2xl font-bold text-white mt-4 mb-2">Authenticating...</h2>
          <p className="text-gray-300">Please wait while we complete your Spotify login.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthCallback;
