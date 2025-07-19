import React from 'react';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import EventsView from './components/EventsView';
import AnnouncementsView from './components/AnnouncementsView';
import ClubsView from './components/ClubsView';
import AIAssistantView from './components/AIAssistantView';
import ForumView from './components/ForumView';
import OfficeGoalsView from './components/OfficeGoalsView';
import FreelanceView from './components/FreelanceView';
import DirectoryView from './components/DirectoryView';
import PollHistoryView from './components/PollHistoryView';
import StockMarketView from './components/StockMarketView';

const App = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard setCurrentView={setCurrentView} />;
      case 'events':
        return <EventsView />;
      case 'announcements':
        return <AnnouncementsView />;
      case 'clubs':
        return <ClubsView />;
      case 'forum':
        return <ForumView />;
      case 'coe-goals':
        return <OfficeGoalsView />;
      case 'freelance':
        return <FreelanceView />;
      case 'directory':
        return <DirectoryView />;
      case 'poll-history':
        return <PollHistoryView />;
      case 'market':
        return <StockMarketView />;
      case 'ai-assistant':
        return <AIAssistantView />;
      default:
        return <Dashboard setCurrentView={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-screen bg-transparent text-gray-800 dark:text-gray-200">
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div
            key={currentView}
            className={currentView === 'dashboard' ? '' : 'p-4 sm:p-6 md:p-8 animate-fade-in-up'}
          >
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;