import React, { useState, useEffect } from 'react';
import {
  Star, Award, TrendingUp, Users, Calendar,
  ChevronLeft, ChevronRight,
} from 'lucide-react';

const Spotlight = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const spotlightItems = [
    {
      id: 1,
      type: 'achievement',
      title: 'Q4 Innovation Award Winner',
      description:
        'Our AI development team achieved breakthrough results in machine learning optimization, improving system performance by 40%.',
      author: 'Sarah Chen, AI Team Lead',
      date: '2024-03-15',
      image:
        'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
      stats: [
        { label: 'Performance Boost', value: '40%' },
        { label: 'Team Size', value: '12' },
      ],
    },
    {
      id: 2,
      type: 'milestone',
      title: '10,000 Hours of Community Service',
      description:
        'Our volunteer program has reached an incredible milestone, contributing over 10,000 hours to local community initiatives.',
      author: 'Community Outreach Team',
      date: '2024-03-10',
      image:
        'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800',
      stats: [
        { label: 'Total Hours', value: '10,000+' },
        { label: 'Projects', value: '25' },
      ],
    },
    {
      id: 3,
      type: 'recognition',
      title: 'Employee of the Month',
      description:
        'Congratulations to Marcus Johnson for exceptional leadership in the sustainability initiative and mentoring junior developers.',
      author: 'Marcus Johnson, Senior Developer',
      date: '2024-03-08',
      image:
        'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800',
      stats: [
        { label: 'Projects Led', value: '8' },
        { label: 'Team Members Mentored', value: '15' },
      ],
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % spotlightItems.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, spotlightItems.length]);

  const currentItem = spotlightItems[currentIndex];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % spotlightItems.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + spotlightItems.length) % spotlightItems.length);
    setIsAutoPlaying(false);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'achievement':
        return <Award className="text-yellow-400" size={24} />;
      case 'milestone':
        return <TrendingUp className="text-green-400" size={24} />;
      case 'recognition':
        return <Star className="text-purple-400" size={24} />;
      case 'event':
        return <Calendar className="text-blue-400" size={24} />;
      default:
        return <Star className="text-yellow-400" size={24} />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'achievement':
        return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30';
      case 'milestone':
        return 'from-green-500/20 to-emerald-500/20 border-green-500/30';
      case 'recognition':
        return 'from-purple-500/20 to-pink-500/20 border-purple-500/30';
      case 'event':
        return 'from-blue-500/20 to-indigo-500/20 border-blue-500/30';
      default:
        return 'from-gray-500/20 to-slate-500/20 border-gray-500/30';
    }
  };

  return (
    <div className="relative w-full h-full bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={currentItem.image}
          alt={currentItem.title}
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-6 md:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div
            className={`flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r ${getTypeColor(
              currentItem.type
            )} border backdrop-blur-sm`}
          >
            {getTypeIcon(currentItem.type)}
            <span className="text-white font-semibold capitalize">
              {currentItem.type}
            </span>
          </div>
          <span className="text-white/80 text-sm">{currentItem.date}</span>
        </div>

        {/* Main Info */}
        <div className="flex-1 flex flex-col justify-center gap-4">
          <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight max-w-4xl">
            {currentItem.title}
          </h2>

          <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-4xl overflow-wrap break-word">
            {currentItem.description}
          </p>

          {currentItem.author && (
            <div className="flex items-center gap-2 text-white/80 mt-2">
              <Users size={16} />
              <span>{currentItem.author}</span>
            </div>
          )}

          {currentItem.stats && (
            <div className="flex flex-wrap gap-6 mt-4">
              {currentItem.stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4">
          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition"
            >
              <ChevronLeft size={20} className="text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition"
            >
              <ChevronRight size={20} className="text-white" />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex gap-2">
            {spotlightItems.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentIndex(i);
                  setIsAutoPlaying(false);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  i === currentIndex
                    ? 'bg-white w-6'
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          {/* Auto Toggle */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200 ${
              isAutoPlaying
                ? 'bg-green-500/20 text-green-300 border-green-500/30'
                : 'bg-white/10 text-white/70 border-white/20'
            }`}
          >
            {isAutoPlaying ? 'Auto' : 'Manual'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Spotlight;