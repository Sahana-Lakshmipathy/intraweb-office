import React, { useState, useEffect } from 'react';
import { Megaphone, Pin, Clock, User } from 'lucide-react';
import announcementsJson from '../data/announcements.json';
import Spinner from './Spinner';
import Card from './Card';

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high': return 'from-red-500 to-orange-500';
    case 'medium': return 'from-yellow-500 to-amber-500';
    case 'low': return 'from-green-500 to-emerald-500';
    default: return 'from-gray-500 to-slate-500';
  }
};

const AnnouncementsView = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnnouncements(announcementsJson.announcements);
      setIsLoading(false);
    }, 400);
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Announcements</h1>
          <p className="text-gray-600 dark:text-gray-400">Stay updated with important campus news</p>
        </div>
        <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
          Create Announcement
        </button>
      </div>

      <div className="space-y-6">
        {announcements.map((announcement, index) => (
          <div
            key={announcement.id}
            className="animate-pop-in"
            style={{ animationDelay: `${index * 75}ms` }}
          >
            <Card className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    {announcement.pinned && <Pin size={16} className="text-blue-500 fill-current" />}
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getPriorityColor(announcement.priority)}`}></div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{announcement.title}</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{announcement.content}</p>
                  <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <User size={14} />
                      <span>{announcement.postedBy}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} />
                      <span>{new Date(announcement.datePosted).toLocaleDateString(undefined, {
                        year: 'numeric', month: 'long', day: 'numeric'
                      })}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Megaphone size={16} className="text-gray-500" />
                  </button>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsView;
