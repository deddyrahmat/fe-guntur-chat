import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

// const SystemMessage = {
//   id: 1,
//   body: 'Online',
//   author: currentUser,
// };
function Chat({ currentUser, onLogout }: any) {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const newSocket: any = io(import.meta.env.VITE_URL_SERVER, {
      autoConnect: false,
    });
    newSocket.connect();

    setSocket(newSocket);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        console.log('Socket connected');
      });

      socket.on('disconnect', () => {
        console.log('Socket disconnected');
      });

      socket.on('chat', (newMessage: any) => {
        console.log('New message added', newMessage);
        setMessages((previousMessages: any): any => {
          return [...previousMessages, newMessage];
        });
      });
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  const handleSendMessage = () => {
    if (!socket || inputValue.trim().length === 0) return;
    socket.emit('chat', { author: currentUser, body: inputValue.trim() });
    setInputValue('');
  };

  const handleLogout = () => {
    if (socket) {
      socket.disconnect();
    }
    // onLogout =function for remove data user login
    onLogout();
  };

  return (
    <div className="chat">
      <div className="chat-header">
        <span>Room Chat App</span>
        {/* <button type="button" className="button" onClick={handleLogout}>
          Logout
        </button> */}
      </div>
      <div className="chat-message-list">
        {messages.map((message: any, idx: number) => {
          return (
            <div
              key={idx}
              className={`chat-message ${
                currentUser === message.author ? 'outgoing' : ''
              }`}
            >
              <div className="chat-message-wrapper">
                <span className="chat-message-author">{message.author}</span>
                <div className="chat-message-bubble">
                  <span className="chat-message-body">{message.body}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="chat-composer">
        <input
          className="chat-composer-input"
          placeholder="Type message here"
          value={inputValue}
          onChange={(e) => {
            return setInputValue(e.target.value);
          }}
        />
        <button type="button" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default React.memo(Chat);
