import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ChatMessage from './ChatMessage';
import { FiMessageSquare, FiX, FiRefreshCw } from 'react-icons/fi';
import { getAIResponse } from '../../services/chatbot';
import '../../styles.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('study'); // 'study' or 'mentalHealth'
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      const response = await getAIResponse(input, mode);
      const aiMessage = { text: response, sender: 'ai' };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = { 
        text: "Sorry, I couldn't process your request. Please try again.", 
        sender: 'ai' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
      {!isOpen ? (
        <button 
          className="chatbot-toggle"
          onClick={() => setIsOpen(true)}
        >
          <FiMessageSquare /> Chat
        </button>
      ) : (
        <motion.div 
          className="chatbot-window"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="chatbot-header">
            <div className="mode-toggle">
              <button
                className={`mode-button ${mode === 'study' ? 'active' : ''}`}
                onClick={() => setMode('study')}
              >
                Study Mode
              </button>
              <button
                className={`mode-button ${mode === 'mentalHealth' ? 'active' : ''}`}
                onClick={() => setMode('mentalHealth')}
              >
                Wellness Mode
              </button>
            </div>
            <div className="chatbot-actions">
              <button onClick={clearChat} title="Clear chat">
                <FiRefreshCw />
              </button>
              <button onClick={() => setIsOpen(false)} title="Close chat">
                <FiX />
              </button>
            </div>
          </div>
          
          <div className="chatbot-messages">
            {messages.length === 0 ? (
              <div className="welcome-message">
                <p>Hi there! I'm your {mode === 'study' ? 'Study Assistant' : 'Wellness Companion'}.</p>
                <p>{mode === 'study' 
                  ? "How can I help with your studies today?" 
                  : "How are you feeling today?"}
                </p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <ChatMessage 
                  key={index} 
                  text={msg.text} 
                  sender={msg.sender} 
                />
              ))
            )}
            {isLoading && (
              <div className="chat-message ai">
                <div className="message-bubble typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Message ${mode === 'study' ? 'Study Assistant' : 'Wellness Companion'}...`}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={isLoading}
            />
            <button onClick={handleSendMessage} disabled={isLoading}>
              {isLoading ? '...' : 'Send'}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Chatbot;