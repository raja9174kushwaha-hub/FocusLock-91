
import React from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { NavigationTab } from './types';
import { Icons } from './constants';
import Dashboard from './components/Dashboard';
import RulesManager from './components/RulesManager';
import TimetableManager from './components/TimetableManager';
import Analytics from './components/Analytics';
import AIInsights from './components/AIInsights';
import Settings from './components/Settings';

const NavItems = [
  { tab: NavigationTab.Dashboard, icon: Icons.Dashboard, label: 'Dashboard' },
  { tab: NavigationTab.Rules, icon: Icons.Rules, label: 'Rules' },
  { tab: NavigationTab.Timetable, icon: Icons.Timetable, label: 'Timetable' },
  { tab: NavigationTab.Analytics, icon: Icons.Analytics, label: 'Analytics' },
  { tab: NavigationTab.AIInsights, icon: Icons.AI, label: 'AI Insights' },
  { tab: NavigationTab.Settings, icon: Icons.Settings, label: 'Settings' },
];

const Header = () => {
  const { isFocusMode } = useApp();
  return (
    <header className="h-24 px-8 lg:px-12 flex items-center justify-between sticky top-0 z-40 bg-base/80 backdrop-blur-xl border-b border-stroke">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-dark-surface rounded-xl flex items-center justify-center shadow-lg">
           <div className="w-5 h-5 border-2 border-accent rounded-sm rotate-45"></div>
        </div>
        <div className="font-black text-2xl tracking-tighter text-on-surface">
          FocusLock <span className="text-accent">AI</span>
        </div>
      </div>
       <div className="flex items-center bg-surface px-5 py-2.5 rounded-2xl border border-stroke shadow-sm space-x-3">
         <div className={`w-2.5 h-2.5 rounded-full ${isFocusMode ? 'bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-accent animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]'}`}></div>
         <span className="text-[10px] font-black text-on-surface uppercase tracking-[0.2em] select-none">
           {isFocusMode ? 'Lockdown Active' : 'System Secure'}
         </span>
       </div>
    </header>
  );
};

const NavigationBar = () => {
  const location = useLocation();
  const currentTab = location.pathname.split('/')[1] || NavigationTab.Dashboard;

  return (
    <nav 
      className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-lg bg-dark-surface/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] px-6 h-22 flex justify-around items-center z-50 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]"
      role="tablist"
    >
      {NavItems.map(({ tab, icon: Icon, label }) => {
        const isActive = currentTab === tab;
        return (
          <Link 
            key={tab} 
            to={`/${tab}`} 
            aria-label={label}
            role="tab"
            aria-selected={isActive}
            className={`group relative h-16 w-16 flex items-center justify-center rounded-2xl transition-all duration-300 ${isActive ? 'bg-accent text-on-accent scale-110 shadow-lg' : 'text-on-dark-surface/40 hover:text-on-dark-surface hover:bg-white/5'}`}
          >
            <Icon />
            {isActive && (
              <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[9px] font-black uppercase tracking-widest text-on-surface opacity-100 transition-opacity whitespace-nowrap">
                {label}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
};

const MainContent = () => (
  <div className="flex h-full w-full bg-base flex-col overflow-hidden">
    <Header />
    <main className="flex-1 overflow-y-auto custom-scrollbar">
      <div className="p-8 lg:p-16 max-w-screen-xl mx-auto w-full pb-48">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/rules" element={<RulesManager />} />
            <Route path="/timetable" element={<TimetableManager />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/ai-insights" element={<AIInsights />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </ErrorBoundary>
      </div>
    </main>
    <NavigationBar />
  </div>
);

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <MainContent />
      </HashRouter>
    </AppProvider>
  );
};

export default App;
