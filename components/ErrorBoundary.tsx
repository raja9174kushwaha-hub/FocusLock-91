import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

// Fixed: Inheriting from Component directly and making children optional in the Props interface to resolve property access and children missing errors.
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="h-full w-full flex items-center justify-center bg-base p-6 text-center">
          <div className="max-w-md bg-surface p-10 rounded-[2.5rem] border border-stroke shadow-2xl">
            <div className="w-20 h-20 bg-red-100 text-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
               <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
            </div>
            <h1 className="text-2xl font-black text-on-surface mb-2">System Interruption</h1>
            <p className="text-muted text-sm mb-8">FocusLock encountered an unexpected error. Your focus state has been preserved.</p>
            <button 
              onClick={() => window.location.reload()}
              className="w-full bg-dark-surface text-on-dark-surface py-4 rounded-2xl font-black uppercase tracking-widest text-xs"
            >
              Restart System
            </button>
          </div>
        </div>
      );
    }
    
    // Fixed: Accessed this.props.children which is now correctly recognized due to proper inheritance from Component.
    return this.props.children;
  }
}
