import React, { createContext, useState, useEffect, useCallback } from 'react';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('focus'); // 'focus', 'shortBreak', 'longBreak'
  const [customTime, setCustomTime] = useState(25);

  const handleTimerComplete = useCallback(() => {
    setIsActive(false);
    alert(`Time's up! ${mode === 'focus' ? 'Take a break!' : 'Time to focus!'}`);

    if (mode === 'focus') {
      setMode('shortBreak');
      setMinutes(5);
    } else {
      setMode('focus');
      setMinutes(customTime);
    }
    setSeconds(0);
  }, [mode, customTime]);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            handleTimerComplete();
          } else {
            setMinutes((prev) => prev - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prev) => prev - 1);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, handleTimerComplete]);

  const startTimer = () => {
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    if (mode === 'focus') {
      setMinutes(customTime);
    } else if (mode === 'shortBreak') {
      setMinutes(5);
    } else {
      setMinutes(15);
    }
    setSeconds(0);
  };

  const setFocusTime = (minutes) => {
    setCustomTime(minutes);
    if (mode === 'focus') {
      setMinutes(minutes);
      setSeconds(0);
    }
  };

  const switchMode = (newMode) => {
    setIsActive(false);
    setMode(newMode);
    if (newMode === 'focus') {
      setMinutes(customTime);
    } else if (newMode === 'shortBreak') {
      setMinutes(5);
    } else {
      setMinutes(15);
    }
    setSeconds(0);
  };

  return (
    <TimerContext.Provider value={{
      minutes,
      seconds,
      isActive,
      mode,
      customTime,
      startTimer,
      pauseTimer,
      resetTimer,
      setFocusTime,
      switchMode
    }}>
      {children}
    </TimerContext.Provider>
  );
};