
import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useFocusTimer } from '../hooks/useFocusTimer';
import { Icons } from '../constants';

export const Dashboard: React.FC = () => {
  const { isFocusMode, setIsFocusMode, alarmSettings } = useApp();
  const { timeLeft, isActive, isAlarmTriggered, setIsAlarmTriggered, startTimer, resetTimer, formatTime } = useFocusTimer();
  
  const [currentTime, setCurrentTime] = useState(new Date());
  const [challenge, setChallenge] = useState<{ q: string; a: string } | null>(null);
  const [userInput, setUserInput] = useState('');
  const [isWrong, setIsWrong] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const clock = setInterval(() => setCurrentTime(new Date()), 1000);
    
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    return () => {
      clearInterval(clock);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  const handleUnlock = () => {
    if (challenge && userInput.toLowerCase().trim() === challenge.a.toLowerCase().trim()) {
      setIsAlarmTriggered(false);
      setIsFocusMode(false);
      setUserInput('');
      setChallenge(null);
    } else {
      setIsWrong(true);
      setTimeout(() => setIsWrong(false), 500);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {isAlarmTriggered && challenge && (
        <div 
          className="fixed inset-0 z-[100] bg-dark-surface/95 backdrop-blur-2xl flex items-center justify-center p-6"
          role="alert"
          aria-live="assertive"
        >
          <div className={`w-full max-w-sm bg-surface rounded-[2.5rem] p-8 text-center shadow-2xl transition-transform ${isWrong ? 'translate-x-4' : ''}`}>
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Icons.Rules />
            </div>
            <h2 className="text-2xl font-black text-on-surface mb-2 tracking-tight">Lockdown Mode</h2>
            <p className="text-muted font-bold text-xs uppercase tracking-widest mb-8">{challenge.q}</p>
            <input 
              type="text" 
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleUnlock()}
              className="w-full bg-base border-2 border-stroke rounded-2xl px-4 py-4 text-center text-xl font-black focus:border-accent outline-none mb-6 focus:ring-4 focus:ring-accent/10 transition-all"
              autoFocus
              aria-label="Unlock challenge answer"
            />
            <button 
              onClick={handleUnlock} 
              className="w-full h-14 bg-dark-surface text-on-dark-surface rounded-2xl font-black uppercase tracking-widest text-sm hover:opacity-90 active:scale-[0.98] transition-all focus:ring-4 focus:ring-accent/30"
            >
              Verify Identity
            </button>
          </div>
        </div>
      )}

      {deferredPrompt && (
        <div className="bg-accent/10 border border-accent/20 rounded-3xl p-6 flex items-center justify-between animate-in slide-in-from-top-4">
          <div className="flex items-center space-x-4">
             <div className="w-10 h-10 bg-accent text-on-accent rounded-xl flex items-center justify-center shadow-lg">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
             </div>
             <div>
               <p className="text-sm font-black text-on-surface">Install FocusLock Native</p>
               <p className="text-[10px] text-muted font-bold uppercase tracking-wider">Fast access from your app drawer</p>
             </div>
          </div>
          <button 
            onClick={handleInstallClick}
            className="bg-accent text-on-accent px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
          >
            Install
          </button>
        </div>
      )}

      <div className="bg-dark-surface text-on-dark-surface rounded-[3rem] p-12 relative overflow-hidden flex flex-col items-center shadow-2xl shadow-slate-900/20">
        <div 
          className="absolute top-0 left-0 w-full h-1.5 bg-on-dark-surface/5" 
          role="progressbar" 
          aria-valuenow={timeLeft} 
          aria-valuemax={1500}
          aria-label="Focus cycle progress"
        >
          <div 
            className="h-full bg-accent transition-all duration-1000 ease-linear shadow-[0_0_12px_rgba(16,185,129,0.5)]" 
            style={{ width: `${(timeLeft / 1500) * 100}%` }}
          />
        </div>
        
        <div className="text-center" aria-live="polite">
          <h1 className="text-8xl md:text-[10rem] lg:text-[12rem] font-black tracking-tighter leading-none tabular-nums select-none opacity-95">
            {formatTime(timeLeft)}
          </h1>
          <p className="text-on-dark-surface/40 font-black text-[10px] uppercase tracking-[0.4em] mt-2 mb-12">Focus Cycle</p>
        </div>

        <div className="flex space-x-4">
          {!isActive ? (
            <button 
              onClick={() => startTimer()} 
              className="bg-accent text-on-accent h-16 px-14 rounded-full font-black uppercase tracking-widest text-xs shadow-xl shadow-emerald-900/40 hover:scale-105 active:scale-95 transition-all focus:ring-4 focus:ring-accent/50"
              aria-label="Start 25 minute focus session"
            >
              Start Session
            </button>
          ) : (
            <button 
              onClick={resetTimer} 
              className="bg-on-dark-surface/10 text-on-dark-surface/60 h-16 px-14 rounded-full font-black uppercase tracking-widest text-xs hover:bg-on-dark-surface/20 transition-all focus:ring-4 focus:ring-on-dark-surface/20"
              aria-label="Reset focus timer"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-surface p-8 rounded-[2.5rem] border border-stroke flex flex-col justify-between h-52 shadow-sm">
          <h3 className="text-[10px] font-black text-muted uppercase tracking-[0.2em]">Local Time</h3>
          <p className="text-5xl font-black tracking-tighter tabular-nums text-on-surface">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
          </p>
        </div>

        <div className={`p-8 rounded-[2.5rem] border flex flex-col justify-between h-52 transition-all duration-500 shadow-sm ${isFocusMode ? 'bg-red-600 border-red-500 shadow-xl shadow-red-100' : 'bg-surface border-stroke'}`}>
          <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] ${isFocusMode ? 'text-white/60' : 'text-muted'}`}>Enforcement</h3>
          <div className="flex items-end justify-between">
            <p className={`text-4xl font-black tracking-tighter uppercase ${isFocusMode ? 'text-white' : 'text-on-surface'}`}>
              {isFocusMode ? 'Restricted' : 'Open'}
            </p>
            <button 
              onClick={() => setIsFocusMode(!isFocusMode)} 
              className={`h-12 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all focus:ring-4 ${isFocusMode ? 'bg-white text-red-600 hover:bg-red-50 focus:ring-white/50' : 'bg-dark-surface text-on-dark-surface hover:opacity-90 focus:ring-dark-surface/20'}`}
              aria-pressed={isFocusMode}
            >
              {isFocusMode ? 'Release Lock' : 'Manual Lock'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
