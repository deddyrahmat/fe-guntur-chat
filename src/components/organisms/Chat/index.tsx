import React, { useState, useEffect, Fragment } from 'react';
import { io } from 'socket.io-client';

// const SystemMessage = {
//   id: 1,
//   body: 'Online',
//   sender: currentUser,
// };
function Chat({ currentUser, onLogout }: any) {
  const [inputValue, setInputValue] = useState('');
  const [Datamessages, setDataMessages] = useState([]);
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

      socket.on('message', (newMessage: any) => {
        console.log('New message added', newMessage);
        setDataMessages((previousDataMessages: any): any => {
          return [...previousDataMessages, newMessage];
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
    socket.emit('message', { sender: currentUser, message: inputValue.trim() });
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
    <main className="relative">
      <section
        id="header"
        className="bg-white p-3 mb-3 flex items-center gap-3 "
      >
        <img
          className="w-8 h-8 rounded-full"
          src="/assets/images/logo.svg"
          alt="profile photo"
        />
        <div>
          <h5 className="text-md md:text-xl">Rudi</h5>
          <p className="text-sm">Online</p>
        </div>
      </section>
      <section
        id="message"
        className="bg-white p-3 mb-3 overflow-y-auto h-[68vh] scroll-smooth custom-scrollbar"
      >
        {Datamessages.map((dataMessage: any, idx: number) => {
          return (
            <Fragment key={idx}>
              <div
                id="sender"
                className="flex justify-between items-end w-8/12 bg-slate-900  dark:bg-white  p-3 rounded-tr-xl rounded-b-xl gap-3 mb-3"
              >
                <p className="text-md text-white dark:text-black">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Consequatur iusto vel ad id totam exercitationem? Aut
                  aspernatur in at ullam maxime sunt atque, quod, deleniti vitae
                  iure quo repellat neque!
                </p>
                <p className="text-md text-gray-300 dark:text-black">tes</p>
              </div>
              <div id="receiver" className="w-full flex flex-row-reverse mb-3">
                <div className="flex justify-between items-end w-8/12 bg-emerald-500 dark:bg-emerald-200  p-3 rounded-tl-xl rounded-b-xl gap-3">
                  <p className="text-md text-white dark:text-black">Text</p>
                  <p className="text-md text-gray-100 dark:text-black">tes</p>
                </div>
              </div>
            </Fragment>
          );
        })}
      </section>
      {/* className="fixed bottom-0 left-[400px]" */}
      <section id="form" className="w-full flex items-center gap-3">
        <input
          className="w-full p-2"
          placeholder="Type message here"
          value={inputValue}
          onChange={(e) => {
            return setInputValue(e.target.value);
          }}
        />
        <button
          type="button"
          onClick={handleSendMessage}
          className="bg-white p-2"
        >
          Send
        </button>
      </section>
      {/* <div className="chat">
        <div className="chat-message-list">
          {Datamessages.map((dataMessage: any, idx: number) => {
            return (
              <div
                key={idx}
                className={`chat-message ${
                  currentUser === dataMessage.sender ? 'outgoing' : ''
                }`}
              >
                <div className="chat-message-wrapper">
                  <span className="chat-message-sender">
                    {dataMessage.sender}
                  </span>
                  <div className="chat-message-bubble">
                    <span className="chat-message-message">
                      {dataMessage.message}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div> */}
    </main>
  );
}

export default React.memo(Chat);
