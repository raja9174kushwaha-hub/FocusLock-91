
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FocusRule } from '../types';

const TimetableManager: React.FC = () => {
  const { rules, setRules } = useApp();
  
  const timetableRules = rules.filter(r => r.scheduleStart && r.scheduleEnd);
  const timeBlocks: { [key: string]: { start: string, end: string, apps: { target: string, id: string }[] } } = {};
  
  timetableRules.forEach(rule => {
    const key = `${rule.scheduleStart}-${rule.scheduleEnd}`;
    if (!timeBlocks[key]) {
      timeBlocks[key] = { start: rule.scheduleStart!, end: rule.scheduleEnd!, apps: [] };
    }
    timeBlocks[key].apps.push({ target: rule.target, id: rule.id });
  });

  const [newStart, setNewStart] = useState('09:00');
  const [newEnd, setNewEnd] = useState('11:00');
  const [newApp, setNewApp] = useState('');

  const addBlock = () => {
    if (!newApp.trim()) return;
    const newRule: FocusRule = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'app',
      target: newApp.trim(),
      isEnabled: true,
      scheduleStart: newStart,
      scheduleEnd: newEnd,
      isWhitelistMode: true,
    };
    setRules([...rules, newRule]);
    setNewApp('');
  };

  const removeRule = (id: string) => {
    setRules(rules.filter(r => r.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <h1 className="text-4xl lg:text-5xl font-black text-on-surface tracking-tighter">Timetable</h1>
        <p className="text-muted mt-2 max-w-xl mx-auto">Schedule dedicated focus blocks where only approved apps are allowed.</p>
      </div>

      <div className="bg-surface p-6 lg:p-8 rounded-3xl border border-stroke shadow-lg">
        <h3 className="text-lg font-black text-on-surface mb-6">Create Focus Window</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-base p-6 rounded-2xl border border-stroke">
          <div>
            <label className="text-xs font-bold text-muted uppercase tracking-wider px-1">Start</label>
            <input type="time" value={newStart} onChange={e => setNewStart(e.target.value)} className="w-full bg-surface border-2 border-stroke rounded-2xl px-5 py-4 font-bold text-lg mt-1 outline-none focus:border-accent" />
          </div>
          <div>
            <label className="text-xs font-bold text-muted uppercase tracking-wider px-1">End</label>
            <input type="time" value={newEnd} onChange={e => setNewEnd(e.target.value)} className="w-full bg-surface border-2 border-stroke rounded-2xl px-5 py-4 font-bold text-lg mt-1 outline-none focus:border-accent" />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs font-bold text-muted uppercase tracking-wider px-1">Whitelist App Name</label>
            <div className="flex items-center space-x-2 mt-1">
              <input type="text" value={newApp} onChange={e => setNewApp(e.target.value)} placeholder="e.g. VS Code" className="w-full bg-surface border-2 border-stroke rounded-2xl px-5 py-4 font-bold text-lg outline-none focus:border-accent" />
              <button onClick={addBlock} disabled={!newApp.trim()} className="h-16 w-16 bg-dark-surface text-on-dark-surface rounded-2xl font-black text-3xl hover:bg-on-surface transition-all disabled:opacity-30 shrink-0">+</button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 pt-6">
        <h4 className="text-xs font-black text-muted uppercase tracking-[0.2em] px-4">Active Schedules</h4>
        {Object.keys(timeBlocks).length === 0 ? (
          <div className="text-center py-16 bg-surface rounded-3xl border border-stroke border-dashed text-muted font-bold">
            No scheduled blocks. Create one above.
          </div>
        ) : (
          Object.entries(timeBlocks).map(([key, block]) => (
            <div key={key} className="bg-surface rounded-3xl border border-stroke p-8 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-6 border-b border-stroke">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-emerald-100 text-emerald-600 font-bold">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  </div>
                  <div>
                    <p className="text-xl font-black text-on-surface tracking-tight tabular-nums">{block.start} &ndash; {block.end}</p>
                    <p className="text-[10px] font-black uppercase mt-1 tracking-widest text-muted">Strict Whitelist Window</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {block.apps.map(app => (
                  <div key={app.id} className="bg-base border border-stroke px-4 py-2 rounded-full flex items-center space-x-2">
                    <span className="font-bold text-xs">{app.target}</span>
                    <button onClick={() => removeRule(app.id)} className="text-muted hover:text-red-500 p-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"><path d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TimetableManager;
