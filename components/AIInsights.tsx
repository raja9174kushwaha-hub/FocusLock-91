
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { generateFocusStrategy } from '../services/geminiService';
import { Icons } from '../constants';

const SkeletonRow = () => (
  <div className="h-4 w-full bg-muted/10 rounded-full animate-pulse mb-3 last:mb-0"></div>
);

const AIInsights: React.FC = () => {
  const { usage } = useApp();
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateStrategy = async () => {
    setLoading(true);
    setAiResponse(null);
    setError(null);
    try {
      const strategy = await generateFocusStrategy(usage);
      setAiResponse(strategy);
    } catch (err: any) {
      console.error(err);
      // Fix: Removed the specific check and message for missing API keys to comply with guidelines prohibiting prompting users for key configuration.
      setError(err.message || "An unknown error occurred while contacting the AI core.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-dark-surface p-8 lg:p-16 rounded-[3rem] text-on-dark-surface relative overflow-hidden shadow-2xl">
        {/* Abstract background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 text-center">
           <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-on-dark-surface/10 text-accent mb-8 shadow-inner">
             <Icons.AI />
           </div>
          <h2 className="text-4xl lg:text-7xl font-black mb-6 tracking-tighter">Neural Strategy</h2>
          <p className="text-on-dark-surface/60 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Harness high-performance reasoning to analyze your digital behavior and synthesize an optimal productivity protocol.
          </p>

          <button 
            onClick={generateStrategy}
            disabled={loading}
            className="group bg-accent text-on-accent h-16 px-12 rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-[0_15px_35px_-10px_rgba(16,185,129,0.5)] active:scale-95 disabled:opacity-50 flex items-center justify-center mx-auto"
            aria-busy={loading}
          >
            {loading ? (
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-on-accent/30 border-t-on-accent"></div>
                <span>Analyzing Habits...</span>
              </div>
            ) : (
              'Synthesize Action Plan'
            )}
          </button>
        </div>
      </div>

      {loading && !aiResponse && (
        <div className="bg-surface p-10 rounded-[2.5rem] border border-stroke shadow-sm animate-pulse">
          <div className="w-48 h-6 bg-muted/10 rounded-full mb-8"></div>
          <div className="bg-base p-8 rounded-3xl border border-stroke">
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
            <div className="h-4 w-3/4 bg-muted/10 rounded-full animate-pulse mt-3"></div>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 p-8 rounded-[2rem] border border-red-100 flex items-center space-x-4 animate-in slide-in-from-top-2">
          <div className="shrink-0 text-red-600">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M12 9v4m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 17c-.77 1.333.192 3 1.732 3z"/></svg>
          </div>
          <p className="font-bold text-red-900 text-sm">{error}</p>
        </div>
      )}

      {aiResponse && (
        <div className="bg-surface p-10 rounded-[2.5rem] border border-stroke shadow-lg shadow-slate-200/50 animate-in fade-in zoom-in-95 duration-500">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-black tracking-[0.2em] text-muted uppercase">Intelligence Briefing</h3>
            <span className="text-[10px] font-black bg-accent/10 text-accent px-3 py-1 rounded-full uppercase tracking-widest">Optimized</span>
          </div>
          <div className="text-on-surface font-semibold text-lg leading-relaxed whitespace-pre-line bg-base p-8 rounded-3xl border border-stroke shadow-inner">
            {aiResponse}
          </div>
          <div className="mt-8 p-6 bg-emerald-50 rounded-[1.5rem] border border-emerald-100 flex items-start space-x-4">
            <div className="w-10 h-10 bg-accent text-on-accent rounded-xl flex items-center justify-center shrink-0 shadow-lg">
               <Icons.Rules />
            </div>
            <div>
              <p className="text-xs font-black text-emerald-900 uppercase tracking-widest mb-1">Execution Protocol</p>
              <p className="text-sm text-emerald-700 font-medium">Map these insights to your block rules for maximum performance yield.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIInsights;
