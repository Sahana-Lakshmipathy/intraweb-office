import React from 'react';
import { NAV_ITEMS, ICONS } from '../constants';

const Sidebar = ({ currentView, setCurrentView, isOpen, setIsOpen }) => {
  const handleNavigation = (view) => {
    setCurrentView(view);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      <aside
        className={`fixed md:relative flex flex-col w-64 bg-white/20 dark:bg-gray-900/30 backdrop-blur-lg border-r border-white/20 dark:border-white/10 h-full z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/20 dark:border-white/10">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">ColleagueConnect</h1>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-700 dark:text-gray-300">
            {ICONS.close}
          </button>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`flex items-center w-full pr-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out ${
                currentView === item.id
                  ? 'bg-white/40 dark:bg-white/20 text-blue-900 dark:text-white pl-6'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-white/10 pl-4 hover:pl-6'
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="px-4 py-2 border-t border-white/20 dark:border-white/10">
          <p className="text-xs text-center text-gray-700 dark:text-gray-300">© 2025 Company Name</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
