
export interface AppUsage {
  id: string;
  name: string;
  category: 'Productivity' | 'Social' | 'Entertainment' | 'Utility' | 'News';
  durationSeconds: number;
  timestamp: string;
}

export interface FocusRule {
  id: string;
  type: 'app' | 'website';
  target: string;
  isEnabled: boolean;
  isLocked?: boolean;
  lockedUntil?: string; 
  preventUninstall?: boolean;
  prerequisiteTarget?: string;
  prerequisiteSecondsRequired?: number;
  scheduleStart?: string;
  scheduleEnd?: string;
  isWhitelistMode?: boolean;
  dailyLimitSeconds?: number;
}

export interface FocusSession {
  startTime: string;
  durationMinutes: number;
  label: string;
}

export type AlarmChallengeType = 'keyword' | 'math' | 'custom';

export interface AlarmSettings {
  challengeType: AlarmChallengeType;
  customQuestion: string;
  customAnswer: string;
}

export enum NavigationTab {
  Dashboard = 'dashboard',
  Rules = 'rules',
  Timetable = 'timetable',
  Analytics = 'analytics',
  AIInsights = 'ai-insights',
  Settings = 'settings'
}