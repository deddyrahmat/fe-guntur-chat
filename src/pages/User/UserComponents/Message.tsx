import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import Chat from '../../../components/organisms/Chat';
import { useAppSelector } from '../../../redux/hooks';

function Message() {
  const dataUserStore = useAppSelector((state: any) => {
    return state.userStore.data;
  });
  const { email } = useAppSelector((state: any) => {
    return state.auth;
  });

  const [inputValue, setInputValue] = useState('');
  const [dataMessages, setDataMessages] = useState([]);

  useEffect(() => {
    // memeriksa chat terakhir dan jika ada tampilkan
    const storageHistoryChat: any = localStorage.getItem('chat-history');
    if (storageHistoryChat !== null && storageHistoryChat !== undefined) {
      const firstDate = JSON.parse(storageHistoryChat);
      setDataMessages(firstDate);
      const getAfterSeverDay: any = dayjs(firstDate[0].createdAt).add(7, 'day');

      // Memeriksa apakah tanggal hari ini sama atau lewat 7 hari dari tanggal pertama di history chat
      const isAfterOrSame =
        dayjs().isSame(getAfterSeverDay, 'day') ||
        dayjs().isAfter(getAfterSeverDay, 'day');
      if (isAfterOrSame) {
        // simpan history chat ke database dan hapus localstorage
        // kirim hanyak sender === email
      }
    }
  }, []);

  useEffect(() => {
    if (dataUserStore?.index && dataUserStore?.index?.socket) {
      dataUserStore?.index?.socket.on('message', (newMessage: any) => {
        if (email === newMessage.receiver || email === newMessage.sender) {
          console.log('New message added', newMessage);
          // simpan chat terbaru yang dikirim dari server agar ditampilkan ke user
          setDataMessages((previousDataMessages: any): any => {
            return [...previousDataMessages, newMessage];
          });
        }
      });
    }
  }, [dataUserStore?.index?.socket]);

  useEffect(() => {
    if (dataMessages.length > 0) {
      localStorage.setItem('chat-history', JSON.stringify(dataMessages));
    }
  }, [dataMessages]);

  const handleSendMessage = () => {
    if (!dataUserStore?.index?.socket || inputValue.trim().length === 0) return;
    dataUserStore?.index?.socket.emit('message', {
      sender: email,
      receiver: dataUserStore?.message?.email,
      message: inputValue.trim(),
      createdAt: dayjs(),
    });
    setInputValue('');
  };

  // cek status user, online or offline
  const isUserOnline = (sessionUser: string): boolean => {
    return dataUserStore?.index?.dataOnlineUsers.includes(sessionUser);
  };

  return (
    <Chat
      handleSendMessage={handleSendMessage}
      statusActive={
        isUserOnline(dataUserStore?.message?.email) ? 'Online' : 'Offline'
      }
      dataMessages={dataMessages}
      setInputValue={setInputValue}
      inputValue={inputValue}
    />
  );
}

export default Message;
