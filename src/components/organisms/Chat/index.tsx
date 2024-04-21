import React, { useState, useEffect, Fragment } from 'react';
import { io } from 'socket.io-client';
import dayjs from 'dayjs';

import capitalizeFirstLetters from '../../../utils/manageString';

// const SystemMessage = {
//   id: 1,
//   body: 'Online',
//   sender: currentUser,
// };
function Chat({ currentUser, username, receiverUser }: any) {
  const [inputValue, setInputValue] = useState('');
  const [Datamessages, setDataMessages] = useState([]);
  const [socket, setSocket] = useState<any>(null);
  // const [dataOnlineUsers, setDataOnlineUsers] = useState([]);
  const [dataOnlineUsers, setDataOnlineUsers] = useState<string[]>([]); // Menentukan tipe string[] untuk dataOnlineUsers

  useEffect(() => {
    const newSocket: any = io(import.meta.env.VITE_URL_SERVER, {
      autoConnect: false,
      auth: {
        userId: currentUser,
      },
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
        if (
          currentUser === newMessage.receiver ||
          currentUser === newMessage.sender
        ) {
          console.log('New message added', newMessage);
          setDataMessages((previousDataMessages: any): any => {
            return [...previousDataMessages, newMessage];
          });
        }
      });

      // Mendapatkan daftar pengguna yang online dari server WebSocket saat komponen dipasang
      socket.on('onlineUsers', (onlineUsers: any) => {
        setDataOnlineUsers(onlineUsers);
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
    socket.emit('message', {
      sender: currentUser,
      receiver: receiverUser,
      message: inputValue.trim(),
      createdAt: dayjs(),
    });
    setInputValue('');
  };

  // const handleLogout = () => {
  //   if (socket) {
  //     socket.disconnect();
  //   }
  //   // onLogout =function for remove data user login
  //   onLogout();
  // };

  // fungsi mencari data yang sama
  const isUserOnline = (sessionId: string): boolean => {
    return dataOnlineUsers.includes(sessionId);
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
          <h5 className="text-md md:text-xl text-black dark:text-black">
            {capitalizeFirstLetters(username)}
          </h5>
          <p className="text-sm text-black dark:text-black">
            {capitalizeFirstLetters(
              isUserOnline(receiverUser) ? 'Online' : 'Offline'
            )}
          </p>
        </div>
      </section>
      <section
        id="message"
        className="bg-white p-3 mb-3 overflow-y-auto h-[68vh] scroll-smooth custom-scrollbar"
      >
        {Datamessages.map((dataMessage: any, idx: number) => {
          return (
            <Fragment key={idx}>
              {/* pengirim */}
              {currentUser === dataMessage.sender && (
                <div id="sender" className="w-full flex flex-row-reverse mb-3">
                  <div className="flex justify-between items-end w-8/12  bg-emerald-500 dark:bg-emerald-200   p-3 rounded-tr-xl rounded-b-xl gap-3 mb-3">
                    <p className="text-md text-white dark:text-black">
                      {dataMessage.message}
                    </p>
                    <p className="text-xs text-gray-100 dark:text-black">
                      {dayjs(dataMessage.createdAt).format('YYYY-MM-DD') ===
                      dayjs().format('YYYY-MM-DD')
                        ? dayjs(dataMessage.createdAt).format('HH:mm')
                        : dayjs(dataMessage.createdAt).format('YYYY-MM-DD')}
                    </p>
                  </div>
                </div>
              )}
              {/* penerima */}

              {currentUser === dataMessage.receiver && (
                <div
                  id="receiver"
                  className="flex justify-between items-end w-8/12 bg-slate-900 p-3 rounded-tl-xl rounded-b-xl gap-3 mb-3"
                >
                  <p className="text-md text-white ">{dataMessage.message}</p>
                  <p className="text-xs text-gray-300 ">
                    {dayjs(dataMessage.createdAt).format('YYYY-MM-DD') ===
                    dayjs().format('YYYY-MM-DD')
                      ? dayjs(dataMessage.createdAt).format('HH:mm')
                      : dayjs(dataMessage.createdAt).format('YYYY-MM-DD')}
                  </p>
                </div>
              )}
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
          className="bg-white p-2 text-black dark:text-black"
        >
          Send
        </button>
      </section>
    </main>
  );
}

export default React.memo(Chat);
