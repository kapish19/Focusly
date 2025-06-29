import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import './App.css';
import './styles.css';
console.log('OpenAI Key:', process.env.REACT_APP_OPENAI_API_KEY);

function App() {
  const [bgImage, setBgImage] = useState('');
  
  return (
    <Router>
      <AuthProvider>
        <div className="app" style={{ 
          backgroundImage: bgImage ? `url(${bgImage})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}>
          <Routes>
            <Route path="/" element={<Home setBgImage={setBgImage} />} />
            <Route path="/dashboard" element={<Dashboard setBgImage={setBgImage} />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;