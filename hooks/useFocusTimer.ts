
import { useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';

const DEFAULT_SECONDS = 1500;
const TIMER_KEY = 'focuslock_timer_end';

export function useFocusTimer() {
  const { isFocusMode, setIsFocusMode } = useApp();
  const [timeLeft, setTimeLeft] = useState<number>(DEFAULT_SECONDS);
  const [isActive, setIsActive] = useState(false);
  const [isAlarmTriggered, setIsAlarmTriggered] = useState(false);

  const startTimer = useCallback((seconds: number = DEFAULT_SECONDS) => {
    const endTime = Date.now() + seconds * 1000;
    localStorage.setItem(TIMER_KEY, endTime.toString());
    setIsActive(true);
    setIsAlarmTriggered(false);
  }, []);

  const resetTimer = useCallback(() => {
    localStorage.removeItem(TIMER_KEY);
    setTimeLeft(DEFAULT_SECONDS);
    setIsActive(false);
    setIsAlarmTriggered(false);
  }, []);

  const syncTimer = useCallback(() => {
    const storedEnd = localStorage.getItem(TIMER_KEY);
    if (!storedEnd) {
      if (!isActive) setTimeLeft(DEFAULT_SECONDS);
      return;
    }

    const end = parseInt(storedEnd, 10);
    const remaining = Math.max(0, Math.floor((end - Date.now()) / 1000));
    
    setTimeLeft(remaining);
    setIsActive(remaining > 0);

    if (remaining === 0 && !isAlarmTriggered) {
      setIsAlarmTriggered(true);
      setIsFocusMode(true);
      localStorage.removeItem(TIMER_KEY);
    }
  }, [isActive, isAlarmTriggered, setIsFocusMode]);

  useEffect(() => {
    syncTimer();
    const interval = setInterval(syncTimer, 1000);
    return () => clearInterval(interval);
  }, [syncTimer]);

  return {
    timeLeft,
    isActive,
    isAlarmTriggered,
    setIsAlarmTriggered,
    startTimer,
    resetTimer,
    formatTime: (s: number) => {
      const m = Math.floor(s / 60);
      const sec = s % 60;
      return `${m}:${sec.toString().padStart(2, '0')}`;
    }
  };
}
