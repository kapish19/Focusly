import React from 'react';
import Navbar from '../components/Navbar';
import PomodoroTimer from '../components/Pomodoro/PomodoroTimer';
import TodoList from '../components/Todo/TodoList';
import Chatbot from '../components/Chatbot/Chatbot';
import PlaylistGenerator from '../components/Playlist/PlaylistGenerator';
import DietRecommender from '../components/Diet/DietRecommender';
import { TimerProvider } from '../context/TimerContext';
import '../styles.css';

const Dashboard = ({ setBgImage }) => {
  return (
    <TimerProvider>
      <div className="dashboard">
        <Navbar setBgImage={setBgImage} />
        <div className="main-content">
          <div className="left-panel">
            <PlaylistGenerator />
            <TodoList />
          </div>
          <div className="center-panel">
            <PomodoroTimer />
          </div>
          <div className="right-panel">
            <DietRecommender />
            <Chatbot />
          </div>
        </div>
      </div>
    </TimerProvider>
  );
};

export default Dashboard;