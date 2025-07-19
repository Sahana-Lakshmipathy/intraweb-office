import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white/30 dark:bg-gray-900/40 backdrop-blur-md border border-white/20 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 ease-in-out overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

export default Card;
