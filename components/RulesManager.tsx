
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FocusRule } from '../types';
import { Icons } from '../constants';

const RulesManager: React.FC = () => {
  const { rules, setRules } = useApp();
  const [newTarget, setNewTarget] = useState('');
  const [isStrict, setIsStrict] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const addRule = () => {
    const trimmedTarget = newTarget.trim();
    if (!trimmedTarget) return;
    
    const newRule: FocusRule = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'app',
      target: trimmedTarget,
      isEnabled: true,
      isLocked: isStrict,
      lockedUntil: isStrict ? new Date(Date.now() + 7776000000).toISOString() : undefined,
    };
    
    setRules([...rules, newRule]);
    setNewTarget('');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const deleteRule = (id: string) => {
    setRules(rules.filter(r => r.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500">
      <div className="text-center space-y-3">
        <h1 className="text-5xl lg:text-6xl font-black text-on-surface tracking-tighter">Rule Engine</h1>
        <p className="text-muted font-medium text-lg">Define the logical boundaries of your workspace.</p>
      </div>

      <div className="bg-surface p-10 rounded-[3rem] border border-stroke shadow-xl shadow-slate-200/50 relative">
        {showSuccess && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-on-accent px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg animate-in slide-in-from-bottom-2">
            Rule Deployed
          </div>
        )}
        
        <div className="flex flex-col space-y-6">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Enter app or website identifier..." 
              value={newTarget}
              onChange={e => setNewTarget(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addRule()}
              className="w-full h-16 bg-base border-2 border-stroke rounded-2xl px-6 font-bold text-lg focus:border-accent outline-none transition-all shadow-inner focus:ring-4 focus:ring-accent/10"
              aria-label="New block rule target"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setIsStrict(!isStrict)} 
              className={`h-12 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all flex items-center space-x-2 ${isStrict ? 'bg-red-50 border-red-200 text-red-600' : 'bg-base border-stroke text-muted hover:border-slate-300'}`}
              aria-pressed={isStrict}
            >
              <div className={`w-2 h-2 rounded-full ${isStrict ? 'bg-red-600 animate-pulse' : 'bg-muted'}`}></div>
              <span>Strict Mode: {isStrict ? 'ON' : 'OFF'}</span>
            </button>
            <button 
              onClick={addRule} 
              disabled={!newTarget.trim()} 
              className="bg-dark-surface text-on-dark-surface h-14 px-10 rounded-2xl font-black uppercase tracking-widest text-xs disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 active:scale-95 transition-all shadow-lg"
            >
              Add Rule
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        <h3 className="text-[10px] font-black text-muted uppercase tracking-[0.3em] px-6">Active Protocol</h3>
        {rules.length === 0 ? (
          <div className="text-center py-20 bg-base rounded-[2.5rem] border-2 border-dashed border-stroke text-muted font-bold italic">
            Zero rules active. The system is currently unrestricted.
          </div>
        ) : (
          rules.map(rule => (
            <div key={rule.id} className="bg-surface p-6 px-8 rounded-[2rem] border border-stroke flex items-center justify-between group hover:border-accent hover:shadow-md transition-all duration-300">
              <div className="flex items-center space-x-6">
                <div className="w-14 h-14 bg-base rounded-2xl flex items-center justify-center text-muted group-hover:text-accent transition-colors">
                  <Icons.Rules />
                </div>
                <div>
                  <p className="font-black text-on-surface text-lg tracking-tight">{rule.target}</p>
                  <p className={`text-[10px] font-black uppercase tracking-widest ${rule.isLocked ? 'text-red-500' : 'text-muted'}`}>
                    {rule.isLocked ? 'Immutable Lockdown' : 'Mutable Boundary'}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => deleteRule(rule.id)} 
                className="w-12 h-12 flex items-center justify-center text-muted hover:text-red-500 hover:bg-red-50 rounded-xl opacity-0 group-hover:opacity-100 transition-all active:scale-90"
                aria-label={`Delete rule for ${rule.target}`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RulesManager;
