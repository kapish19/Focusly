import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Login from '../components/Auth/Login';
import Signup from '../components/Auth/Signup';
import '../styles.css';

const Home = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAuth = async (email, password) => {
    const success = isLogin 
      ? await login(email, password) 
      : await signup(email, password);
    
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="app-title">Focusly</h1>
        <p className="app-subtitle">Student Wellness Pomodoro</p>
        
        {isLogin ? (
          <Login onSubmit={handleAuth} />
        ) : (
          <Signup onSubmit={handleAuth} />
        )}
        
        <button 
          className="auth-toggle" 
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Need an account? Sign up' : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default Home;