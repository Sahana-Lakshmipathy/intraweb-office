import React, { useState, useEffect, useMemo } from 'react';
import { gigService } from '../services/gigService';
import gigsData from '../data/Gigs.json';
import Card from './Card';
import Spinner from './Spinner';

const GigForm = ({ onGigAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const [type, setType] = useState('seeking');
  const [author, setAuthor] = useState('AuthorName'); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !contact.trim()) return;

    const newGig = gigService.addGig({
      title: title.trim(),
      description: description.trim(),
      contact: contact.trim(),
      author: author.trim(),
      type
    });

    onGigAdded(newGig);

    // Reset form
    setTitle('');
    setDescription('');
    setContact('');
    setType('seeking'); // Reset to default
  };

  return (
    <Card className="p-6 mb-8">
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Post on the Freelance Board</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Post Title (e.g., 'Logo Design Services')"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
            placeholder="Contact Info (Email or Socials)"
            value={contact}
            onChange={e => setContact(e.target.value)}
            className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <textarea
          placeholder="Describe your service or requirement..."
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows={3}
          required
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="gig-type"
                value="offering"
                checked={type === 'offering'}
                onChange={() => setType('offering')}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Offering Service</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="gig-type"
                value="seeking"
                checked={type === 'seeking'}
                onChange={() => setType('seeking')}
                className="form-radio text-pink-600"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Looking for Help</span>
            </label>
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!title.trim() || !description.trim() || !contact.trim()}
          >
            Post
          </button>
        </div>
      </form>
    </Card>
  );
};

const FreelanceView = () => {
  const [gigs, setGigs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('offering');

  // Initialize gigs data
  useEffect(() => {
    const initializeGigs = async () => {
      setIsLoading(true);

      try {
        const existingGigs = gigService.getGigs();

        // Seed with static data if no gigs exist
        if (existingGigs.length === 0) {
          const staticGigs = gigsData.Gigs;
          staticGigs.forEach(gigData => {
            gigService.addGig({
              title: gigData.title,
              description: gigData.description,
              author: gigData.author,
              contact: gigData.contact,
              type: gigData.type
            });
          });
        }

        // Get all gigs after seeding
        const allGigs = gigService.getGigs();
        setGigs(allGigs);

      } catch (error) {
        console.error('Error initializing gigs:', error);
        setGigs([]);
      } finally {
        setIsLoading(false);
      }
    };

    initializeGigs();
  }, []);

  const handleGigAdded = (newGig) => {
    setGigs(prevGigs => [newGig, ...prevGigs]);
  };

  // Filter gigs based on active tab
  const filteredGigs = useMemo(() => {
    const filtered = gigs.filter(gig => {
      // Ensure both values are strings and match exactly
      return String(gig.type).toLowerCase() === String(activeTab).toLowerCase();
    });

    // Sort by timestamp (newest first)
    return filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [gigs, activeTab]);

  // Debug information (remove in production)
  console.log('Current gigs:', gigs);
  console.log('Active tab:', activeTab);
  console.log('Filtered gigs:', filteredGigs);

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
  };

  const getGigCounts = () => {
    const offeringCount = gigs.filter(gig => gig.type === 'offering').length;
    const seekingCount = gigs.filter(gig => gig.type === 'seeking').length;
    return { offeringCount, seekingCount };
  };

  const { offeringCount, seekingCount } = getGigCounts();

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Freelance & Gigs Board</h2>
      <GigForm onGigAdded={handleGigAdded} />

      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-4">
          <button
            onClick={() => handleTabChange('offering')}
            className={`px-3 py-2 font-medium text-sm rounded-t-lg transition-colors ${
              activeTab === 'offering'
                ? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Offering Services ({offeringCount})
          </button>
          <button
            onClick={() => handleTabChange('seeking')}
            className={`px-3 py-2 font-medium text-sm rounded-t-lg transition-colors ${
              activeTab === 'seeking'
                ? 'border-b-2 border-pink-500 text-pink-600 dark:text-pink-400'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Looking for Help ({seekingCount})
          </button>
        </nav>
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredGigs.length > 0 ? (
            filteredGigs.map((gig, index) => (
              <div
                key={gig.id}
                className="animate-pop-in"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <Card className="flex flex-col h-full">
                  <div className="p-5 flex-grow">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      gig.type === 'offering'
                        ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300'
                        : 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300'
                    }`}>
                      {gig.type === 'offering' ? 'Service' : 'Request'}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-3">
                      {gig.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                      {gig.description}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                      Contact: {gig.contact}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Posted on {new Date(gig.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </Card>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No {activeTab === 'offering' ? 'service offerings' : 'help requests'} yet.
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                Be the first to post in this category!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FreelanceView;