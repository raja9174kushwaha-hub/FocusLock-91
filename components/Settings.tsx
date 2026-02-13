
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AlarmChallengeType } from '../types';

const Settings: React.FC = () => {
  const { alarmSettings, setAlarmSettings } = useApp();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleChallengeTypeChange = (type: AlarmChallengeType) => {
    setAlarmSettings({ ...alarmSettings, challengeType: type });
  };

  const options: { id: AlarmChallengeType; label: string; description: string }[] = [
    { id: 'keyword', label: 'Default Keyword', description: 'A simple, memorable word to type.' },
    { id: 'math', label: 'Math Problem', description: 'A randomly generated math question.' },
    { id: 'custom', label: 'Custom Question', description: 'A personal question you define.' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <h1 className="text-4xl lg:text-5xl font-black text-on-surface tracking-tighter">Settings</h1>
        <p className="text-muted mt-2 max-w-xl mx-auto">Configure the core components of your focus system.</p>
      </div>

      <div className="space-y-6">
        <h3 className="text-xs font-black text-muted uppercase tracking-[0.3em] px-4">System Configuration</h3>
        
        <div className="bg-surface p-8 lg:p-10 rounded-[2.5rem] border border-stroke shadow-lg shadow-slate-200/50">
          <h3 className="text-lg font-black text-on-surface tracking-tight mb-2">Timer Challenge</h3>
          <p className="text-muted text-sm mb-8">Select the type of challenge to disengage the focus timer alarm.</p>
          
          <div className="space-y-4">
            {options.map(option => (
              <div
                key={option.id}
                onClick={() => handleChallengeTypeChange(option.id)}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${alarmSettings.challengeType === option.id ? 'border-accent bg-emerald-50/50' : 'border-stroke bg-base hover:border-slate-300'}`}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 ${alarmSettings.challengeType === option.id ? 'border-accent bg-accent' : 'border-muted'}`}>
                    {alarmSettings.challengeType === option.id && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                  <div>
                    <p className="font-bold text-on-surface">{option.label}</p>
                    <p className="text-xs text-muted">{option.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {alarmSettings.challengeType === 'custom' && (
            <div className="mt-6 pt-6 border-t border-stroke space-y-4 animate-in fade-in duration-300">
              <div>
                <label className="text-xs font-bold text-muted uppercase tracking-wider px-1">Your Question</label>
                <input
                  type="text"
                  value={alarmSettings.customQuestion}
                  onChange={e => setAlarmSettings({ ...alarmSettings, customQuestion: e.target.value })}
                  placeholder="e.g., What is my primary goal?"
                  className="w-full bg-base border-2 border-stroke rounded-2xl px-5 py-4 font-bold text-lg mt-1 outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-muted uppercase tracking-wider px-1">Required Answer</label>
                <input
                  type="text"
                  value={alarmSettings.customAnswer}
                  onChange={e => setAlarmSettings({ ...alarmSettings, customAnswer: e.target.value })}
                  placeholder="e.g., Finish Q3 report"
                  className="w-full bg-base border-2 border-stroke rounded-2xl px-5 py-4 font-bold text-lg mt-1 outline-none focus:border-accent"
                />
              </div>
            </div>
          )}
          
          <div className="flex justify-end mt-8">
            <button 
              onClick={handleSave}
              className={`w-full md:w-48 bg-dark-surface text-on-dark-surface h-14 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-on-surface transition-all active:scale-[0.98] ${saved ? '!bg-accent' : ''}`}
            >
              {saved ? 'Saved!' : 'Save Settings'}
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xs font-black text-muted uppercase tracking-[0.3em] px-4">Mobile Access</h3>
        
        <div className="bg-dark-surface text-on-dark-surface p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-3xl rounded-full"></div>
          <div className="relative z-10">
            <h3 className="text-xl font-black mb-4 tracking-tight">Installation Guide (Android/iOS)</h3>
            <p className="text-on-dark-surface/60 text-sm mb-8 leading-relaxed">
              FocusLock is a Progressive Web App (PWA). You don't need a Play Store APK to use it natively.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <p className="text-[10px] font-black uppercase tracking-widest text-accent mb-3">For Android</p>
                <ol className="text-xs space-y-3 text-on-dark-surface/80 list-decimal pl-4">
                  <li>Open this URL in <span className="text-white font-bold">Chrome</span>.</li>
                  <li>Tap the <span className="text-white font-bold">Menu (⋮)</span>.</li>
                  <li>Tap <span className="text-white font-bold">"Install App"</span> or "Add to Home Screen".</li>
                </ol>
              </div>
              
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <p className="text-[10px] font-black uppercase tracking-widest text-accent mb-3">For iOS (iPhone)</p>
                <ol className="text-xs space-y-3 text-on-dark-surface/80 list-decimal pl-4">
                  <li>Open this URL in <span className="text-white font-bold">Safari</span>.</li>
                  <li>Tap the <span className="text-white font-bold">Share Button</span> (square with arrow).</li>
                  <li>Scroll and tap <span className="text-white font-bold">"Add to Home Screen"</span>.</li>
                </ol>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/10 text-center">
              <p className="text-[9px] text-on-dark-surface/30 font-black uppercase tracking-[0.2em]">
                Built with Native PWA Standards • Version 1.0.4-PROD
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
