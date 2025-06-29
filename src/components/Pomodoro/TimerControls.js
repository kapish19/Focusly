import React, { useContext, useState } from 'react';
import { TimerContext } from '../../context/TimerContext';
import { FiPlay, FiPause, FiRefreshCw, FiSettings } from 'react-icons/fi';
import '../../styles.css';

const TimerControls = () => {
  const { 
    isActive, 
    startTimer, 
    pauseTimer, 
    resetTimer,
    customTime,
    setFocusTime
  } = useContext(TimerContext);
  
  const [showSettings, setShowSettings] = useState(false);
  const [tempCustomTime, setTempCustomTime] = useState(customTime);

  const handleSaveSettings = () => {
    setFocusTime(tempCustomTime);
    setShowSettings(false);
  };

  return (
    <div className="timer-controls">
      {!isActive ? (
        <button className="control-button start" onClick={startTimer}>
          <FiPlay /> Start
        </button>
      ) : (
        <button className="control-button pause" onClick={pauseTimer}>
          <FiPause /> Pause
        </button>
      )}
      
      <button className="control-button reset" onClick={resetTimer}>
        <FiRefreshCw /> Reset
      </button>
      
      <button 
        className="control-button settings" 
        onClick={() => setShowSettings(!showSettings)}
      >
        <FiSettings /> Settings
      </button>
      
      {showSettings && (
        <div className="settings-panel">
          <h4>Custom Focus Time (minutes)</h4>
          <input
            type="number"
            min="1"
            max="60"
            value={tempCustomTime}
            onChange={(e) => setTempCustomTime(parseInt(e.target.value) || 25)}
          />
          <button onClick={handleSaveSettings}>Save</button>
        </div>
      )}
    </div>
  );
};

export default TimerControls;