/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/jsx-key */
import React, { useState, useEffect, Fragment, useRef } from 'react';
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
      // console.log('getAfterSeverDay', getAfterSeverDay);

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

  const [contentPosition, setContentPosition] = useState('-3.5rem');
  const [contentHeight, setContentHeight] = useState('auto');
  const [text, setText] = useState('');

  const textRef = useRef<any>(null);
  const contentRef = useRef<any>(null);
  const [styleContent, setStyleContent] = useState({});

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { scrollHeight, clientHeight } = textRef.current;
    const height = Math.max(scrollHeight, clientHeight);
    console.log('scrollHeight', scrollHeight);
    setText(event.target.value);
    if (textRef.current.value === '' || textRef.current.value === null) {
      console.log('1');

      setContentHeight('auto'); // Atur kembali tinggi ke "auto" ketika teks dihapus
      setContentPosition('-3.5rem');
      contentRef.current.style.height = `68vh`;
    } else {
      console.log('2');
      setContentHeight(`10vh`);
      setContentPosition('-5.5rem');
      contentRef.current.style.height = `60vh`;
    }
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

  let prevDate = ''; // Variable untuk menyimpan tanggal pesan sebelumnya
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
        ref={contentRef}
        className="max-h-[68vh] p-10 mb-2 overflow-y-auto scroll-smooth custom-scrollbar bg-chat rounded-lg md:rounded-xl relative"
      >
        {Datamessages?.length > 0 &&
          Datamessages.map((dataMessage: any, idx: number) => {
            if (
              receiverUser === dataMessage.receiver ||
              receiverUser === dataMessage.sender
            ) {
              const messageDate = dayjs(dataMessage.createdAt).format(
                'YYYY-MM-DD'
              );
              let displayDate = null; // Inisialisasi variabel untuk menampilkan tanggal

              // Periksa apakah tanggal pesan saat ini berbeda dari tanggal pesan sebelumnya
              if (messageDate !== prevDate) {
                displayDate = (
                  <span
                    key={`date_${idx}`}
                    className={`${
                      idx !== 0 ? 'my-8' : 'mb-8'
                    } py-1 px-2 rounded-lg text-sm text-gray-500 bg-white`}
                  >
                    {dayjs(messageDate).format('YYYY-MM-DD') ===
                    dayjs().format('YYYY-MM-DD')
                      ? 'Today'
                      : dayjs(messageDate).format('YYYY-MM-DD')}
                  </span>
                );
                prevDate = messageDate; // Simpan tanggal pesan saat ini untuk perbandingan di pesan berikutnya
              }

              return (
                <Fragment key={idx}>
                  {/* info tanggal */}
                  <div className="flex justify-center">{displayDate}</div>

                  {/* pengirim */}
                  {currentUser === dataMessage.sender && (
                    <div dir="rtl">
                      <div id="sender" className="w-full mb-3">
                        <div className="relative  w-6/12 bg-white p-3 rounded-lg md:rounded-xl gap-3 mb-3">
                          <div>
                            {/* content */}
                            <div dir="ltr">
                              <p className="text-md text-black break-words">
                                {dataMessage.message}
                              </p>
                            </div>
                            <div dir="rtl">
                              <p className="text-xs text-gray-500 dark:text-black">
                                {dayjs(dataMessage.createdAt).format(
                                  'YYYY-MM-DD'
                                ) === dayjs().format('YYYY-MM-DD')
                                  ? dayjs(dataMessage.createdAt).format('HH:mm')
                                  : dayjs(dataMessage.createdAt).format(
                                      'DD-MM-YYYY'
                                    )}
                              </p>
                            </div>
                          </div>
                          <div
                            className="absolute -bottom-2 right-0"
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
                    </div>
                  )}
                  {/* penerima */}

                  {currentUser === dataMessage.receiver && (
                    <div dir="ltr">
                      <div id="receiver" className="w-full mb-3">
                        <div className="relative w-6/12 bg-white p-3 rounded-lg md:rounded-xl gap-3 mb-3">
                          <div>
                            {/* content */}
                            <div dir="ltr">
                              <p className="text-md text-black break-words">
                                {dataMessage.message}
                              </p>
                            </div>
                            <div dir="rtl">
                              <p className="text-xs text-gray-500 dark:text-black">
                                {dayjs(dataMessage.createdAt).format(
                                  'YYYY-MM-DD'
                                ) === dayjs().format('YYYY-MM-DD')
                                  ? dayjs(dataMessage.createdAt).format('HH:mm')
                                  : dayjs(dataMessage.createdAt).format(
                                      'DD-MM-YYYY'
                                    )}
                              </p>
                            </div>
                          </div>
                          <div
                            className="absolute -bottom-2 left-0 "
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
                    </div>
                  )}
                </Fragment>
              );
            }
            return null;
          })}
      </section>
      <section
        id="form"
        // -bottom-14
        style={{ bottom: contentPosition }}
        className="w-full flex items-start gap-3 absolute  right-0"
      >
        <div className="relative w-full">
          <textarea
            ref={textRef}
            style={{ height: contentHeight }}
            value={text}
            onChange={handleChange}
            rows={1}
            className="resize-none overflow-hidden overflow-y-auto custom-scrollbar border border-gray-300 py-2 px-4 w-[99%] p-2 rounded-lg md:rounded-xl focus:outline-none focus:border-primary-800 focus:ring-2 focus:ring-primary-800 focus:ring-opacity-50 ring-primary ring-1 z-10 transition-colors duration-300 ease-in-out focus:shadow-outline "
          />
          {/* <input
            className="w-[99%] p-2 rounded-lg md:rounded-xl focus:outline-none focus:border-primary-800 focus:ring-2 focus:ring-primary-800 focus:ring-opacity-50 ring-primary ring-1 z-10 transition-colors duration-300 ease-in-out focus:shadow-outline "
            placeholder="Type message here"
            value={inputValue}
            onChange={(e) => {
              return setInputValue(e.target.value);
            }}
          /> */}
          {/* <div
            className="absolute -bottom-2 right-[1%] z-[-1]"
            style={{
              width: 0,
              height: 0,
              borderTop: '20px solid transparent',
              borderRight: '20px solid white',
              borderBottom: '20px solid transparent',
              transform: 'rotate(90deg)',
            }}
          /> */}
        </div>
        <button
          type="button"
          onClick={handleSendMessage}
          className="bg-primary py-2 px-4 text-white dark:text-black rounded-lg md:rounded-xl hover:bg-primary-500 hover:text-primary-900 "
        >
          Send
        </button>
      </section>
    </main>
  );
}

export default React.memo(Chat);
