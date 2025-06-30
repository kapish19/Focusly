import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FiImage, FiUpload } from 'react-icons/fi';
import '../styles.css';

const Navbar = ({ setBgImage }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showBgOptions, setShowBgOptions] = useState(false);
  const [customBgUrl, setCustomBgUrl] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleBgChange = (type) => {
    const backgrounds = {
      gradient1: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      gradient2: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      gradient3: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
      custom: customBgUrl
    };
    setBgImage(backgrounds[type]);
    setShowBgOptions(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Focusly</h1>
    
      </div>
      
      <div className="navbar-actions">
        <div className="bg-selector">
          <button 
            onClick={() => setShowBgOptions(!showBgOptions)}
            className="bg-toggle"
          >
            <FiImage /> Background
          </button>
          {showBgOptions && (
            <div className="bg-options">
              <button onClick={() => handleBgChange('gradient1')}>Purple Gradient</button>
              <button onClick={() => handleBgChange('gradient2')}>Light Gradient</button>
              <button onClick={() => handleBgChange('gradient3')}>Blue Gradient</button>
              <div className="custom-bg-input">
                <input
                  type="text"
                  placeholder="Paste image URL"
                  value={customBgUrl}
                  onChange={(e) => setCustomBgUrl(e.target.value)}
                />
                <button onClick={() => handleBgChange('custom')}>
                  <FiUpload /> Apply
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="navbar-user">
          {user && (
            <>
              <span className="user-email">{user.email}</span>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;