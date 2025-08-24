import React from 'react';
import Header from './Header';
import Sidebar from '../sidebar/Sidebar';
import MusicPlayer from '../player/MusicPlayer';

const Layout = ({ children }) => {
  return (
    <div className="h-screen bg-black flex flex-col">
      {/* Header */}
      <Header />
      
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
      
      {/* Music Player */}
      <MusicPlayer />
    </div>
  );
};

export default Layout;
