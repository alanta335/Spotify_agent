import React from 'react';

const ChatMessage = ({ message, isUser, timestamp }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
        isUser 
          ? 'bg-green-500 text-black' 
          : 'bg-gray-800 text-white'
      }`}>
        <div className="flex items-start space-x-3">
          {!isUser && (
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm4.61 14.44c-.25.37-.77.49-1.14.24-3.11-1.9-7.02-2.33-11.62-1.28-.44.13-.88-.17-1.01-.61-.13-.44.17-.88.61-1.01 5.1-1.15 9.47-.67 12.98 1.48.37.25.49.77.24 1.14l-.06.04z"/>
              </svg>
            </div>
          )}
          <div className="flex-1">
            <p className="text-sm font-medium mb-1">
              {isUser ? 'You' : 'Spotify AI'}
            </p>
            <p className="text-sm leading-relaxed">{message}</p>
            {timestamp && (
              <p className={`text-xs mt-2 ${
                isUser ? 'text-gray-700' : 'text-gray-400'
              }`}>
                {timestamp}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
