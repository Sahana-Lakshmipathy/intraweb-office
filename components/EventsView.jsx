import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Filter, Search } from 'lucide-react';
import eventJson from '../public/data/Events.json';
import Spinner from './Spinner';
import Modal from './Modal';




const formatDateTime = (iso) => {
  const date = new Date(iso);
  return {
    date: date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }),
    time: date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }),
  };
};

const EventsView = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      setIsLoading(true);
      setTimeout(() => {
        setEvents(eventJson.events);
        setIsLoading(false);
      }, 500);
    };
    loadEvents();
  }, []);

  const openModal = (event) => setSelectedEvent(event);
  const closeModal = () => setSelectedEvent(null);

  if (isLoading) return <Spinner />;

  return (
    <div className="space-y-6 px-4 sm:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Events</h1>
          <p className="text-gray-600 dark:text-gray-400">Discover and join upcoming campus events</p>
        </div>
        <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
          Create Event
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search events..."
            className="w-full pl-10 pr-4 py-3 bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
          <Filter size={20} />
          <span>Filter</span>
        </button>
      </div>

      {/* Event Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => {
          const { date, time } = formatDateTime(event.datetime);
          return (
            <div
              key={event.title + index}
              onClick={() => openModal(event)}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-pop-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
                <img
                  src={`./assets/${event.image}`}
                  alt={event.title}
                  className="w-full h-full object-cover mix-blend-overlay"
                />
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 px-2 py-1 rounded-lg text-xs font-medium">
                  {event.category || event.committee}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {event.title}
                </h3>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    <span>{event.attendees || '—'} attendees</span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg hover:opacity-90 transition-opacity">
                  Register Now
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      <Modal isOpen={!!selectedEvent} onClose={closeModal}>
        {selectedEvent && (
          <>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {selectedEvent.title}
            </h3>
            <p className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold mb-1">
              {selectedEvent.committee}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {selectedEvent.description}
            </p>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <p><strong>Location:</strong> {selectedEvent.location}</p>
              <p><strong>Time:</strong> {formatDateTime(selectedEvent.datetime).date} at {formatDateTime(selectedEvent.datetime).time}</p>
              <p><strong>Category:</strong> {selectedEvent.category}</p>
              <p><strong>Expected Attendees:</strong> {selectedEvent.attendees}</p>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default EventsView;
