import React from 'react';
import Button from '../ui/Button';

const WelcomeMessage = ({ onQuickAction }) => {
  const quickActions = [
    { label: 'Play Music', command: 'play some music' },
    { label: 'Pause', command: 'pause the music' },
    { label: 'Next Track', command: 'skip to next song' },
    { label: 'Previous Track', command: 'play previous song' },
    { label: 'Volume Up', command: 'increase volume' },
    { label: 'Volume Down', command: 'decrease volume' },
    { label: 'Create Playlist', command: 'create a new playlist' },
    { label: 'Search Songs', command: 'search for songs' }
  ];

  return (
    <div className="bg-gray-800 rounded-2xl p-6 mb-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm4.61 14.44c-.25.37-.77.49-1.14.24-3.11-1.9-7.02-2.33-11.62-1.28-.44.13-.88-.17-1.01-.61-.13-.44.17-.88.61-1.01 5.1-1.15 9.47-.67 12.98 1.48.37.25.49.77.24 1.14l-.06.04z"/>
          </svg>
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Welcome to Spotify AI Agent</h2>
        <p className="text-gray-400 text-sm">
          I can help you control your Spotify music with natural language commands.
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {quickActions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onQuickAction(action.command)}
            className="text-xs"
          >
            {action.label}
          </Button>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gray-700 rounded-lg">
        <h3 className="text-sm font-semibold text-white mb-2">💡 Try these commands:</h3>
        <ul className="text-xs text-gray-300 space-y-1">
          <li>• "Play [song name] by [artist]"</li>
          <li>• "Create a playlist called [name]"</li>
          <li>• "Play my liked songs"</li>
          <li>• "What's currently playing?"</li>
          <li>• "Set volume to 50%"</li>
        </ul>
      </div>
    </div>
  );
};

export default WelcomeMessage;
