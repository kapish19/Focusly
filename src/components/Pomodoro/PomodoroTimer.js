import React, { useContext } from 'react';
import { TimerContext } from '../../context/TimerContext';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import '../../styles.css';

const PomodoroTimer = () => {
  const { mode, switchMode } = useContext(TimerContext);

  return (
    <div className="pomodoro-container">
      <h2 className="pomodoro-title">What do you want to focus on?</h2>
      
      <div className="mode-selector">
        <button 
          className={`mode-button ${mode === 'focus' ? 'active' : ''}`}
          onClick={() => switchMode('focus')}
        >
          Focus
        </button>
        <button 
          className={`mode-button ${mode === 'shortBreak' ? 'active' : ''}`}
          onClick={() => switchMode('shortBreak')}
        >
          Short Break
        </button>
        <button 
          className={`mode-button ${mode === 'longBreak' ? 'active' : ''}`}
          onClick={() => switchMode('longBreak')}
        >
          Long Break
        </button>
      </div>
      
      <TimerDisplay />
      <TimerControls />
    </div>
  );
};

export default PomodoroTimer;