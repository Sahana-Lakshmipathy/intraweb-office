import React, { useState, useEffect, useRef, useCallback } from 'react';
import Spotlight from './Spotlight';
import Card from './Card';
import { generateEvents } from '../services/geminiService';
import { STATIC_CLUBS, STATIC_CONTACTS } from '../constants';
import { gigService } from '../services/gigService';
import { marketService } from '../services/marketService';
import WeeklyPoll from './WeeklyPoll';
import Spinner from './Spinner';
import { Calendar, Users, Briefcase, TrendingUp, MessageSquare, User, ChevronDown, ArrowRight, Sparkles, SendToBack , Clock, MapPin, Target } from 'lucide-react';


const useScrollAnimation = () => {
  const observer = useRef(null);
  const animateRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          const children = entry.target.querySelectorAll('.stagger-child');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('is-visible');
            }, index * 150);
          });
          observer.current?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    if (node) observer.current.observe(node);
  }, []);
  return animateRef;
};

const Section = ({ children, className = '', id, title, subtitle, icon, backgroundPattern = 'none' }) => {
  const animateRef = useScrollAnimation();
  const getPatternClass = () => {
    switch (backgroundPattern) {
      case 'dots': return 'bg-dots-pattern';
      case 'grid': return 'bg-grid-pattern';
      case 'waves': return 'bg-waves-pattern';
      default: return '';
    }
  };
  return (
    <section ref={animateRef} id={id} className={`scroll-animate min-h-screen flex flex-col justify-center items-center p-8 md:p-16 text-white relative ${className} ${getPatternClass()}`}>
      <div className="w-full max-w-6xl mx-auto relative z-10">
        {(title || subtitle) && (
          <div className="text-center mb-12 stagger-child">
            {icon && <div className="flex justify-center mb-4"><div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">{icon}</div></div>}
            {title && <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">{title}</h2>}
            {subtitle && <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};




const StockChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { indexFundData } = await marketService.getMarketData();
        setData(indexFundData);
      } catch (error) {
        console.error('Error fetching market data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || data.length < 2) return <p>Loading chart...</p>;

  const width = 600, height = 200, padding = 20;
  const prices = data.map(p => p.price);
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);
  const priceRange = maxPrice - minPrice === 0 ? 1 : maxPrice - minPrice;

  const getX = (i) =>
    (i / (data.length - 1)) * (width - 2 * padding) + padding;

  const getY = (p) =>
    height - padding - ((p - minPrice) / priceRange) * (height - 2 * padding);

  const pathData = data.map((point, i) =>
    `${i === 0 ? 'M' : 'L'} ${getX(i).toFixed(2)} ${getY(point.price).toFixed(2)}`
  ).join(' ');

  const startPrice = data[0].price;
  const endPrice = data[data.length - 1].price;
  const isUp = endPrice >= startPrice;
  const change = ((endPrice - startPrice) / startPrice * 100).toFixed(2);

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Company Endowment Fund
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            30-Day Performance Journey
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            ${endPrice.toFixed(2)}
          </p>
          <p className={`text-sm font-semibold ${isUp ? 'text-green-500' : 'text-red-500'}`}>
            {isUp ? '+' : ''}{change}%
          </p>
        </div>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        <defs>
          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isUp ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'} />
            <stop offset="100%" stopColor={isUp ? 'rgba(34, 197, 94, 0)' : 'rgba(239, 68, 68, 0)'} />
          </linearGradient>
        </defs>
        <path
          d={`${pathData} V ${height} H ${padding} Z`}
          fill="url(#chartGradient)"
        />
        <path
          d={pathData}
          fill="none"
          stroke={isUp ? '#22c55e' : '#ef4444'}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};


const EventCard = ({ event }) => (
  <Card className={`text-gray-800 dark:text-gray-200 stagger-child hover:scale-105 transition-all duration-300 group`}>
    <div className="p-6 relative overflow-hidden"><div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500" /><div className="relative z-10"><div className="flex items-center gap-2 mb-3"><Calendar size={16} className="text-blue-500" /><span className="text-sm text-blue-500 dark:text-blue-400 font-semibold">{event.department}</span></div><h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">{event.title}</h3><div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400"><div className="flex items-center gap-1"><Clock size={14} /><span>{event.date} at {event.time}</span></div>{event.location && (<div className="flex items-center gap-1"><MapPin size={14} /><span>{event.location}</span></div>)}</div></div></div>
  </Card>
);

const Dashboard = ({ setCurrentView }) => {
  const [events, setEvents] = useState([]);
  const [gigs, setGigs] = useState([]);
  const [marketData, setMarketData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventData, gigData, marketDataResult] = await Promise.all([generateEvents(3), Promise.resolve(gigService.getGigs()), marketService.getMarketData()]);
        setEvents(eventData);
        setGigs(gigData.slice(0, 3));
        setMarketData(marketDataResult);
      } catch (error) { console.error("Failed to load dashboard data:", error); }
      finally { setIsLoading(false); }
    };
    fetchData();
  }, []);

  const CtaButton = ({ onClick, children }) => (
    <button onClick={onClick} className="group px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl font-semibold transition-all duration-300 border border-white/20 hover:border-white/40">
      <span className="flex items-center gap-2">{children}<ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></span>
    </button>
  );

  return (
    <div className="bg-transparent relative text-white">
      <section className="min-h-screen flex flex-col justify-center items-center text-center p-4 relative overflow-hidden" id="welcome">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-gray-900 to-purple-900" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="mb-8"><SendToBack size={48} className="mx-auto mb-4 text-emerald-400 animate-pulse" /></div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent animate-fade-in-up">Welcome to Colleague Connect</h1>
          <p className="text-lg md:text-2xl mb-8 text-gray-300 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.3s' }}>Your journey through our dynamic workplace begins here—explore opportunities, build meaningful connections, and shape your professional path.</p>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}><p className="text-blue-300 mb-4">Scroll to begin your journey</p><a href="#spotlight" className="inline-block animate-bounce"><ChevronDown size={32} /></a></div>
        </div>
      </section>

      <Section id="spotlight" title="Inside the Office" subtitle="Celebrating achievements, milestones, and the people who make our organization extraordinary" icon={<Sparkles size={32} className="text-yellow-400" />} backgroundPattern="dots" className="bg-gray-900"><div className="w-full h-[60vh] max-h-[700px] stagger-child"><Spotlight /></div></Section>

      <Section id="events" title="What's Happening" subtitle="The cornerstone of our community—events that foster connection, encourage growth, and leave a lasting impact." icon={<Calendar size={32} className="text-blue-400" />} backgroundPattern="waves" className="bg-gray-900">
        {isLoading ? <div className="stagger-child"><Spinner /></div> : <div className="grid md:grid-cols-3 gap-8 mb-12">{events.map((event, index) => (<EventCard key={index} event={event} />))}</div>}
        <div className="text-center stagger-child"><CtaButton onClick={() => setCurrentView('events')}>Explore Full Calendar</CtaButton></div>
      </Section>

      <Section id="clubs" title="Clubs & Communities" subtitle="Where passions meet purpose - join communities that align with your interests and academic goals" icon={<Users size={32} className="text-green-400" />} backgroundPattern="grid" className="bg-gray-900/95 backdrop-blur-sm">
        <div className="grid md:grid-cols-3 gap-8 mb-12">{STATIC_CLUBS.slice(0, 3).map((club, index) => (<Card key={index} className="text-gray-800 dark:text-gray-200 text-center p-6 stagger-child hover:scale-105 transition-all duration-300 group"><div className="relative"><div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform"><Users size={24} className="text-white" /></div><h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{club.name}</h3><p className="text-sm font-semibold text-green-500 dark:text-green-400 mb-2">{club.category}</p><p className="text-sm text-gray-600 dark:text-gray-400">Led by {club.contact}</p></div></Card>))}</div>
        <div className="text-center stagger-child"><CtaButton onClick={() => setCurrentView('clubs')}>Discover All Communities</CtaButton></div>
      </Section>

      <Section id="freelance" title="Side Hustles" subtitle="Freelance gigs, research assistantships, and part-time jobs in our internal marketplace" icon={<Briefcase size={32} className="text-purple-400" />} className="bg-gray-900">
        {isLoading ? <div className="stagger-child"><Spinner /></div> : <div className="grid md:grid-cols-3 gap-8 mb-12">{gigs.map((gig) => (<Card key={gig.id} className="text-gray-800 dark:text-gray-200 p-6 stagger-child hover:scale-105 transition-all duration-300 group"><div className="relative overflow-hidden"><div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform" /><div className="relative z-10"><div className="flex items-center gap-2 mb-3"><span className={`text-xs font-semibold px-3 py-1 rounded-full ${gig.type === 'offering' ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300' : 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300'}`}>{gig.type === 'offering' ? 'Offering Skill' : 'Seeking Help'}</span></div><h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600">{gig.title}</h3><p className="text-sm text-gray-500 dark:text-gray-400">By {gig.author}</p></div></div></Card>))}</div>}
        <div className="text-center stagger-child"><CtaButton onClick={() => setCurrentView('freelance')}>Explore Opportunity Board</CtaButton></div>
      </Section>

      <Section id="polls" title="Office Pulse" subtitle="Your voice matters - participate in polls that shape our campus culture and decision-making" icon={<MessageSquare size={32} className="text-orange-400" />} backgroundPattern="dots" className="bg-gray-900/95 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto w-full stagger-child"><WeeklyPoll /></div>
        <div className="text-center mt-12 stagger-child"><CtaButton onClick={() =>setCurrentView('poll-history')}>View Poll History</CtaButton></div>
      </Section>

      <Section
        id="market"
        title="Enterprise Growth"
        subtitle="Track the financial pulse of our company's endowment fund - understanding growth and performance"
        icon={<TrendingUp size={32} className="text-green-400" />}
        className="bg-gray-900"
      >
        <Card className="p-6 md:p-8 text-gray-800 dark:text-gray-200 stagger-child">
          <StockChart />
        </Card>
      </Section>

     <Section id="directory" title="Connect with Leaders" subtitle="At the heart of every achievement are the people who make it possible—discover the professors, mentors, and innovators shaping our community’s future." icon={<Target size={32} className="text-blue-400" />} backgroundPattern="waves" className="bg-gray-900/95 backdrop-blur-sm">
  <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
    {STATIC_CONTACTS.slice(0, 5).map((contact) => (
      <div key={contact.leaderEmail} className="text-center stagger-child group">
        <div className="relative mb-4">
          <img
            src={contact.image}
            alt={contact.leaderName}
            className="w-24 h-24 rounded-full mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <h4 className="font-semibold text-white mb-1 group-hover:text-blue-300">{contact.leaderName}</h4>
        <p className="text-sm text-blue-200 mb-1">{contact.name}</p>
        <p className="text-xs text-gray-400">{contact.category}</p>
      </div>
    ))}
  </div>

  <div className="text-center stagger-child">
    <CtaButton onClick={() => setCurrentView('directory')}>Open Full Directory</CtaButton>
  </div>
</Section>
    </div>
  );
};

export default Dashboard;