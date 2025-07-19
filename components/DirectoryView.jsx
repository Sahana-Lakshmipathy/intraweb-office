import React, { useState, useMemo } from 'react';
import { STATIC_CONTACTS } from '../constants';
import { Search } from 'lucide-react';

const DirectoryView = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = useMemo(() => {
    if (!searchTerm) return STATIC_CONTACTS;
    const lowercasedFilter = searchTerm.toLowerCase();
    return STATIC_CONTACTS.filter(contact =>
      contact.leaderName.toLowerCase().includes(lowercasedFilter) ||
      contact.name.toLowerCase().includes(lowercasedFilter) ||
      contact.category.toLowerCase().includes(lowercasedFilter)
    );
  }, [searchTerm]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Contact Directory</h1>
          <p className="text-gray-600 dark:text-gray-400">Find club leaders and contact information</p>
        </div>
        <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
          Add Contact
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search by name, club, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredContacts.map((contact, index) => (
          <div
            key={contact.name}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-pop-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex flex-col items-center gap-4 mb-4">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full overflow-hidden">
                <img
                  src={contact.image}
                  alt={contact.leaderName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 dark:text-white">{contact.leaderName}</h3>
                <p className="text-indigo-600 dark:text-indigo-400">{contact.name}</p>
                <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-lg text-xs font-medium mt-1">
                  {contact.category}
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
              <a
                href={`mailto:${contact.leaderEmail}`}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {contact.leaderEmail}
              </a>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg hover:opacity-90 transition-opacity">
                Contact
              </button>
            </div>
          </div>
        ))}
        {filteredContacts.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8 col-span-full">
            No contacts found matching your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default DirectoryView;
