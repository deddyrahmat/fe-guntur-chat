import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

import ApiMessage from '../../../config/Endpoints/message';
import Chat from '../../../components/organisms/Chat';
import { useAppSelector } from '../../../redux/hooks';

function Message({
  dataOnlineUsers,
  socket,
  dataMessages,
  setDataMessages,
}: any) {
  const dataUserStore = useAppSelector((state: any) => {
    return state.userStore.data;
  });
  const { email, username } = useAppSelector((state: any) => {
    return state.auth;
  });

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // memeriksa chat terakhir dan jika ada tampilkan
    const storageHistoryChat: any = localStorage.getItem('chat-history');
    if (storageHistoryChat !== null && storageHistoryChat !== undefined) {
      const firstDate = JSON.parse(storageHistoryChat);
      setDataMessages(firstDate);
      // fitur validasi berdasarkan waktu
      // const getAfterSeverDay: any = dayjs(firstDate[0].createdAt).add(7, 'day');

      // // Memeriksa apakah tanggal hari ini sama atau lewat 7 hari dari tanggal pertama di history chat
      // const isAfterOrSame =
      //   dayjs().isSame(getAfterSeverDay, 'day') ||
      //   dayjs().isAfter(getAfterSeverDay, 'day');
      // if (isAfterOrSame) {
      //   // simpan history chat ke database dan hapus localstorage
      //   // kirim hanyak sender === email
      // }
    }
  }, []);

  const handleSendMessage = async () => {
    if (!socket || inputValue.trim().length === 0) return;
    const values = {
      senderName: username,
      sender: email,
      receiverName: dataUserStore?.message?.username,
      receiver: dataUserStore?.message?.email,
      message: inputValue.trim(),
      createdAt: dayjs(),
    };
    socket.emit('message', values);
    try {
      const config = {
        headers: {
          'content-type': 'application/json',
        },
      };
      await ApiMessage.createMessage(values, config);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          'Terjadi kegagalan server. Silahkan coba kembali beberapa saat lagi'
      );
    }
    setInputValue('');
  };

  const [online, setOnline] = useState('');
  const handleConnectedUser = () => {
    return dataOnlineUsers.includes(dataUserStore?.message?.email)
      ? setOnline('online')
      : setOnline('Offline');
  };
  useEffect(() => {
    handleConnectedUser();
  }, [dataOnlineUsers, dataUserStore?.message?.email]);

  return (
    <Chat
      handleSendMessage={handleSendMessage}
      statusActive={online}
      dataMessages={dataMessages}
      setInputValue={setInputValue}
      inputValue={inputValue}
    />
  );
}

export default Message;
