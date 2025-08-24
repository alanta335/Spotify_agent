import React from 'react';

const Sidebar = () => {
  const menuItems = [
    { icon: '🏠', label: 'Home', active: true },
    { icon: '🔍', label: 'Search' },
    { icon: '📚', label: 'Your Library' },
    { icon: '➕', label: 'Create Playlist' },
    { icon: '❤️', label: 'Liked Songs' },
    { icon: '🎵', label: 'Your Episodes' },
  ];

  const playlists = [
    'Recently Added',
    'Liked from Radio',
    'Your Top Mixes',
    'Discover Weekly',
    'Release Radar',
    'Chill Hits',
    'Rock Classics',
  ];

  return (
    <div className="w-64 bg-black text-white h-full overflow-y-auto">
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm4.61 14.44c-.25.37-.77.49-1.14.24-3.11-1.9-7.02-2.33-11.62-1.28-.44.13-.88-.17-1.01-.61-.13-.44.17-.88.61-1.01 5.1-1.15 9.47-.67 12.98 1.48.37.25.49.77.24 1.14l-.06.04z"/>
            </svg>
          </div>
          <span className="text-xl font-bold">Spotify</span>
        </div>

        {/* Main Menu */}
        <nav className="mb-8">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className={`flex items-center space-x-3 px-2 py-2 rounded-md transition-colors ${
                    item.active
                      ? 'text-white bg-gray-800'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Divider */}
        <div className="border-t border-gray-800 mb-6"></div>

        {/* Playlists */}
        <div>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Playlists
          </h3>
          <ul className="space-y-2">
            {playlists.map((playlist, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors text-sm py-1 truncate"
                >
                  {playlist}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* User Profile */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Alan</p>
            <p className="text-xs text-gray-400 truncate">Premium User</p>
          </div>
          <button className="text-gray-400 hover:text-white">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
