// ClubsView.jsx
import React from 'react';
import Card from './Card';
import clubdata from '../public/data/Clubs.json'; // Assuming default export

const categoryColors = {
  'Technology': 'text-blue-500 dark:text-blue-400',
  'Arts & Culture': 'text-pink-500 dark:text-pink-400',
  'Business': 'text-yellow-500 dark:text-yellow-400',
  'Social Cause': 'text-green-600 dark:text-green-400',
  'Hobbies': 'text-orange-500 dark:text-orange-400',
  'Research & Development': 'text-indigo-500 dark:text-indigo-400',
};

const ClubCard = ({ club }) => {
  return (
    <Card className="flex flex-col h-full">
      <div className="p-5 flex-grow">
        <p
          className={`text-sm font-semibold ${
            categoryColors[club.category] || 'text-gray-500 dark:text-gray-400'
          }`}
        >
          {club.category}
        </p>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1">
          {club.name}
        </h3>
        <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm overflow-y-auto pr-2">
          {club.description}
        </p>
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
        <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Learn More</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Contact: {club.contact}
        </p>
      </div>
    </Card>
  );
};

const ClubsView = () => {
  const allClubs = clubdata.flatMap((group) =>
    group.clubs.map((club) => ({
      ...club,
      category: group.category,
    }))
  );

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Clubs & Centers of Excellence
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Discover communities and collaborate with peers across campus
          </p>
        </div>
        <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
          Create Club
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allClubs.map((club, index) => (
          <div
            key={`${club.name}-${index}`}
            className="animate-pop-in"
            style={{ animationDelay: `${index * 75}ms` }}
          >
            <ClubCard club={club} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubsView;
