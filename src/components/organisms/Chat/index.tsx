/* eslint-disable react/jsx-key */
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

    // memeriksa chat terakhir dan jika ada tampilkan
    const storageHistoryChat: any = localStorage.getItem('chat-history');
    if (storageHistoryChat !== null && storageHistoryChat !== undefined) {
      const firstDate = JSON.parse(storageHistoryChat);
      setDataMessages(firstDate);
      const getAfterSeverDay: any = dayjs(firstDate[0].createdAt).add(7, 'day');
      console.log('getAfterSeverDay', getAfterSeverDay);

      // Memeriksa apakah tanggal hari ini sama atau lewat 7 hari dari tanggal pertama di history chat
      const isAfterOrSame =
        dayjs().isSame(getAfterSeverDay, 'day') ||
        dayjs().isAfter(getAfterSeverDay, 'day');
      if (isAfterOrSame) {
        // simpan history chat ke database dan hapus localstorage
        // kirim hanyak sender === currentUser
      }
      console.log('isAfterOrSame', isAfterOrSame);
    }
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
          // simpan chat terbaru yang dikirim dari server agar ditampilkan ke user
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

  useEffect(() => {
    if (Datamessages.length > 0) {
      localStorage.setItem('chat-history', JSON.stringify(Datamessages));
    }
  }, [Datamessages]);

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

  // cek status user, online or offline
  const isUserOnline = (sessionId: string): boolean => {
    return dataOnlineUsers.includes(sessionId);
  };
  return (
    <main className="relative">
      <section
        id="header"
        className="bg-white p-3 mb-3 flex items-center gap-3 rounded-lg md:rounded-xl "
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
        className=" p-3 mb-3 overflow-y-auto h-[68vh] scroll-smooth custom-scrollbar"
      >
        {Datamessages?.length > 0 &&
          Datamessages.map((dataMessage: any, idx: number) => {
            if (
              receiverUser === dataMessage.receiver ||
              receiverUser === dataMessage.sender
            ) {
              return (
                <Fragment key={idx}>
                  {/* pengirim */}
                  {currentUser === dataMessage.sender && (
                    <div
                      id="sender"
                      className="w-full flex flex-row-reverse mb-3"
                    >
                      <div className="relative flex justify-between items-end w-6/12 bg-white p-3 rounded-lg md:rounded-xl gap-3 mb-3">
                        <p className="text-md text-black">
                          {dataMessage.message}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-black">
                          {dayjs(dataMessage.createdAt).format('YYYY-MM-DD') ===
                          dayjs().format('YYYY-MM-DD')
                            ? dayjs(dataMessage.createdAt).format('HH:mm')
                            : dayjs(dataMessage.createdAt).format('YYYY-MM-DD')}
                        </p>
                        <div
                          className="absolute top-[39%] right-0 "
                          style={{
                            width: 0,
                            height: 0,
                            borderTop: '20px solid transparent',
                            borderRight: '20px solid white',
                            borderBottom: '20px solid transparent',
                            transform: 'rotate(90deg)',
                          }}
                        />
                      </div>
                    </div>
                  )}
                  {/* penerima */}

                  {currentUser === dataMessage.receiver && (
                    <div
                      id="receiver"
                      className="relative flex justify-between items-end w-6/12 bg-white p-3 rounded-lg md:rounded-xl gap-3 mb-3"
                    >
                      <p className="text-md text-black ">
                        {dataMessage.message}
                      </p>
                      <p className="text-xs text-gray-500 ">
                        {dayjs(dataMessage.createdAt).format('YYYY-MM-DD') ===
                        dayjs().format('YYYY-MM-DD')
                          ? dayjs(dataMessage.createdAt).format('HH:mm')
                          : dayjs(dataMessage.createdAt).format('YYYY-MM-DD')}
                      </p>
                      <div
                        className="absolute top-[39%] left-0 "
                        style={{
                          width: 0,
                          height: 0,
                          borderTop: '20px solid transparent',
                          borderRight: '20px solid white',
                          borderBottom: '20px solid transparent',
                          transform: 'rotate(90deg)',
                        }}
                      />
                    </div>
                  )}
                </Fragment>
              );
            }
            return null;
          })}
      </section>
      <section id="form" className="w-full flex items-center gap-3">
        <div className="relative w-full">
          <input
            className="w-[99%] p-2 rounded-lg md:rounded-xl"
            placeholder="Type message here"
            value={inputValue}
            onChange={(e) => {
              return setInputValue(e.target.value);
            }}
          />
          <div
            className="absolute top-[28%] right-[1%] "
            style={{
              width: 0,
              height: 0,
              borderTop: '20px solid transparent',
              borderRight: '20px solid white',
              borderBottom: '20px solid transparent',
              transform: 'rotate(90deg)',
            }}
          />
        </div>
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
