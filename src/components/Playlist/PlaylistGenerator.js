import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMusic, FiX, FiRefreshCw } from 'react-icons/fi';
import { generatePlaylist } from '../../services/playlist';
import '../../styles.css';

const PlaylistGenerator = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [mood, setMood] = useState('focus');
  const [playlist, setPlaylist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const moods = [
    { id: 'focus', label: 'Focus', emoji: '🧠' },
    { id: 'relax', label: 'Relax', emoji: '😌' },
    { id: 'energize', label: 'Energize', emoji: '⚡' },
    { id: 'chill', label: 'Chill', emoji: '🍃' }
  ];

  const fetchPlaylist = async () => {
    setIsLoading(true);
    try {
      const songs = await generatePlaylist(mood);
      setPlaylist(songs);
    } catch (error) {
      console.error("Error generating playlist:", error);
      setPlaylist([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylist();
  }, [mood]);

  return (
    <div className={`playlist-container ${isOpen ? 'open' : ''}`}>
      {!isOpen ? (
        <button 
          className="playlist-toggle"
          onClick={() => setIsOpen(true)}
        >
          <FiMusic /> Playlist
        </button>
      ) : (
        <motion.div 
          className="playlist-window"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="playlist-header">
            <h3>AI Playlist Generator</h3>
            <div className="playlist-actions">
              <button onClick={fetchPlaylist} title="Refresh playlist" disabled={isLoading}>
                <FiRefreshCw />
              </button>
              <button onClick={() => setIsOpen(false)} title="Close playlist">
                <FiX />
              </button>
            </div>
          </div>
          
          <div className="mood-selector">
            {moods.map(m => (
              <button
                key={m.id}
                className={`mood-button ${mood === m.id ? 'active' : ''}`}
                onClick={() => setMood(m.id)}
                disabled={isLoading}
              >
                {m.emoji} {m.label}
              </button>
            ))}
          </div>
          
          <div className="playlist-songs">
            {isLoading ? (
              <div className="loading">
                <div className="spinner"></div>
                Generating playlist...
              </div>
            ) : playlist.length === 0 ? (
              <div className="empty-playlist">
                Couldn't generate playlist. Please try again.
              </div>
            ) : (
              <ul>
                {playlist.map((song, index) => (
                  <li key={index} className="song-item">
                    <div className="song-info">
                      <span className="song-title">{song.title}</span>
                      <span className="song-artist">{song.artist}</span>
                    </div>
                    <a 
                      href={song.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="song-link"
                    >
                      {song.duration} ↗
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <div className="playlist-footer">
            <button 
              className="spotify-button"
              onClick={() => {
                if (playlist.length > 0 && playlist[0].url) {
                  window.open(playlist[0].url.replace('/track/', '/playlist/'), '_blank');
                }
              }}
              disabled={playlist.length === 0}
            >
              Open in Spotify
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PlaylistGenerator;