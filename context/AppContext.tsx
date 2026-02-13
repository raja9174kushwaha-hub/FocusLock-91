
import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { FocusRule, AppUsage, AlarmSettings } from '../types';
import { MOCK_RULES, MOCK_USAGE } from '../constants';

interface AppContextType {
  rules: FocusRule[];
  setRules: (rules: FocusRule[]) => void;
  usage: AppUsage[];
  isFocusMode: boolean;
  setIsFocusMode: (val: boolean) => void;
  alarmSettings: AlarmSettings;
  setAlarmSettings: (settings: AlarmSettings) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_ALARM: AlarmSettings = {
  challengeType: 'keyword',
  customQuestion: '',
  customAnswer: '',
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [rules, setRules] = useLocalStorage<FocusRule[]>('focusRules', MOCK_RULES);
  const [usage] = useLocalStorage<AppUsage[]>('focusUsage', MOCK_USAGE);
  const [isFocusMode, setIsFocusMode] = useLocalStorage<boolean>('focusMode', false);
  const [alarmSettings, setAlarmSettings] = useLocalStorage<AlarmSettings>('alarmSettings', DEFAULT_ALARM);

  return (
    <AppContext.Provider value={{
      rules, setRules,
      usage,
      isFocusMode, setIsFocusMode,
      alarmSettings, setAlarmSettings
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
