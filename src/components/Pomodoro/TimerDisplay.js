import React, { useContext } from 'react';
import { TimerContext } from '../../context/TimerContext';
import '../../styles.css';

const TimerDisplay = () => {
  const { minutes, seconds } = useContext(TimerContext);

  return (
    <div className="timer-display">
      {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
    </div>
  );
};

export default TimerDisplay;