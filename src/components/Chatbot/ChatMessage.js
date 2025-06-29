import React from 'react';
import '../../styles.css';

const ChatMessage = ({ text, sender }) => {
  return (
    <div className={`chat-message ${sender}`}>
      <div className="message-bubble">
        {text}
      </div>
    </div>
  );
};

export default ChatMessage;