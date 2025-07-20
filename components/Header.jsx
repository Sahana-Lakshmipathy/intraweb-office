import React from 'react';
import { ICONS } from '../constants';
import mikasa from '../public/assets/mikasa.jpg'; 

const Header = ({ toggleSidebar }) => {
  return (
    <header className="flex items-center justify-between h-16 px-4 bg-white/20 dark:bg-gray-900/30 backdrop-blur-lg border-b border-white/20 dark:border-white/10">
      <button onClick={toggleSidebar} className="text-gray-700 dark:text-gray-300 focus:outline-none md:hidden">
        {ICONS.menu}
      </button>
      <div className="flex items-center">
      </div>
      <div className="flex items-center">
        <img
          className="h-8 w-8 rounded-full object-cover"
          src={mikasa}
          alt="User avatar"
        />
      </div>
    </header>
  );
};

export default Header;
