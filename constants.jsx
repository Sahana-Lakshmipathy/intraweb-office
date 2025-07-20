import Alex from './assets/Alex.jpg';
import Maria from './assets/Maria.jpg';    
import Christine from './assets/Christine.jpg';
import Tim from './assets/Tim.jpg';
import Sam from './assets/Sam.jpg';
import Evelyn from './assets/Evelyn.jpg';
import Ben from './assets/Ben.jpg';


export const ICONS = {
  dashboard: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  events: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  announcements: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.363a1.76 1.76 0 013.417-.592zM11 5.882a1.76 1.76 0 012.834.878l1.732 3.031a1.76 1.76 0 01-3.417.592l-2.147-6.363a1.76 1.76 0 013.417-.592z" />
    </svg>
  ),
  clubs: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  'coe-goals': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3v18h18M9 15l3-3 3 3M12 3v12" />
    </svg>
  ),
  freelance: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  directory: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  'ai-assistant': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 16.634c.32.176.68.294 1.05.366m-1.05-.366a3.5 3.5 0 01-3.5-3.5V7.5a3.5 3.5 0 017 0v5.634a3.5 3.5 0 01-3.5 3.5zm-1.05-.366c.32.176.68.294 1.05.366m0 0a3.5 3.5 0 003.5-3.5V7.5a3.5 3.5 0 00-7 0v5.634a3.5 3.5 0 003.5 3.5z" />
    </svg>
  ),
  forum: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V10a2 2 0 012-2h8zM7 8H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l4-4h2" />
    </svg>
  ),
  'poll-history': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  market: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  menu: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
  ),
  close: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
};

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: ICONS.dashboard },
  { id: 'events', label: 'Events', icon: ICONS.events },
  { id: 'announcements', label: 'Announcements', icon: ICONS.announcements },
  { id: 'clubs', label: 'Clubs Activities', icon: ICONS.clubs },
  { id: 'coe-goals', label: 'Goals', icon: ICONS['coe-goals'] },
  { id: 'freelance', label: 'Freelance Board', icon: ICONS.freelance },
  { id: 'directory', label: 'Directory', icon: ICONS.directory },
  { id: 'forum', label: 'Discussion Forum', icon: ICONS.forum },
  { id: 'poll-history', label: 'Poll History', icon: ICONS['poll-history'] },
  { id: 'market', label: 'Market', icon: ICONS.market },
  { id: 'ai-assistant', label: 'AI Assistant', icon: ICONS['ai-assistant'] }
];

export const STATIC_CONTACTS = [
  { name: "Experience in Tech", category: "CEO", contact: "tech.innovators@yourcompany.org", leaderName: "Alex Johnson", leaderEmail: "alex.j@yourcompany.org" , image: Alex },
  { name: "Tries new things boldly", category: "President", contact: "maria.@yourcompany.org", leaderName: "Maria Garcia", leaderEmail: "maria.g@yourcompany.org" , image: Maria },
  { name: "Likes interacting with People", category: "Customer Success Manager", contact: "e-hub@yourcompany.org", leaderName: "Christine Lee", leaderEmail: "chris.l@yourcompany.org", image: Christine },
  { name: "Strategist in Marketing", category: "Market Lead", contact: "green.earth@yourcompany.org", leaderName: "Tim Wong", leaderEmail: "tim.w@yourcompany.org", image: Tim },
  { name: "Delivers products consitently", category: "Hobbies", contact: "photo.club@yourcompany.org", leaderName: "Sam Taylor", leaderEmail: "sam.t@yourcompany.org" , image: Sam },
  { name: "Lead Data Expert", category: "Data Scientist", contact: "coe.ai@yourcompany.org", leaderName: "Dr. Evelyn Reed", leaderEmail: "e.reed@yourcompany.org" , image: Evelyn },
  { name: "Frontend + Backend", category: "Lead Full Stack Developer", contact: "coe.quantum@yourcompany.org", leaderName: "Dr. Ben Carter", leaderEmail: "b.carter@yourcompany.org" , image: Ben }
];

export const STATIC_CLUBS = [
  { name: "Tech Innovators", category: "Technology", description: "A club for tech enthusiasts to explore and innovate.", contact: "Steve Cook" },
  { name: "Creative Minds", category: "Arts", description: "A space for artists and creators to collaborate and showcase their work.", contact: "Jane Austen" },
  { name: "Health & Wellness", category: "Health", description: "A club focused on promoting health and wellness among students.", contact: "Leela Patel" },
  { name: "Business Leaders", category: "Business", description: "A club for aspiring business leaders to connect and grow.", contact: "Sahana Laks" }
];