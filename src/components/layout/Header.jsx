import React from 'react';

const Header = () => {
  return (
    <header className="bg-black text-white px-6 py-4 border-b border-gray-800">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm4.61 14.44c-.25.37-.77.49-1.14.24-3.11-1.9-7.02-2.33-11.62-1.28-.44.13-.88-.17-1.01-.61-.13-.44.17-.88.61-1.01 5.1-1.15 9.47-.67 12.98 1.48.37.25.49.77.24 1.14l-.06.04zm1.24-2.76c-.32.49-.99.64-1.48.32-3.55-2.18-8.97-2.81-13.18-1.54-.53.16-1.08-.13-1.24-.66-.16-.53.13-1.08.66-1.24 4.8-1.45 10.8-.75 14.85 1.77.49.32.64.99.32 1.48l-.93.87zm.12-2.89c-.4.61-1.25.8-1.86.4-4.54-2.77-11.47-3.57-16.85-1.95-.64.2-1.31-.12-1.51-.76-.2-.64.12-1.31.76-1.51 6.1-1.85 13.7-.95 18.8 2.25.61.4.8 1.25.4 1.86l-.74 1.11z"/>
            </svg>
          </div>
          <h1 className="text-xl font-bold">Spotify AI Agent</h1>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Chat</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Settings</a>
        </nav>
        <div className="flex items-center space-x-4">
          <button className="bg-green-500 hover:bg-green-600 text-black font-semibold px-4 py-2 rounded-full transition-colors">
            Connect Spotify
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
