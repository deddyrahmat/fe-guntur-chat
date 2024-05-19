/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
import React, { Suspense, memo, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import SidebarUser from '../../components/organisms/SidebarUser';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { SET_CHILDPAGE, SET_PARENTPAGE } from '../../redux/userSlice';
import Loading from '../../components/atoms/Loading';
import Welcome from './UserComponents/Welcome';
import ApiMessage from '../../config/Endpoints/message';

const Contact = React.lazy(() => import('./UserComponents/Contact'));
const Message = React.lazy(() => import('./UserComponents/Message'));

type TypeMessage = {
  senderName: string;
  receiverName: string;
  sender: string;
  receiver: string;
  message: string;
  createdAt: string;
};

function User() {
  const dispatch = useAppDispatch();
  const { childPage } = useAppSelector((state: any) => {
    return state.userStore;
  });
  const { email } = useAppSelector((state: any) => {
    return state.auth;
  });

  // const dataUserStore = useAppSelector((state: any) => {
  //   return state.userStore.data;
  // });

  const [socket, setSocket] = useState<any>(null);
  const [dataOnlineUsers, setDataOnlineUsers] = useState<string[]>([]); // Menentukan tipe string[] untuk dataOnlineUsers
  const [dataSidebarChat, setDataSidebarChat] = useState<any>([]);

  // hooks lifecycle
  // connection websocket
  useEffect(() => {
    const newSocket: any = io(import.meta.env.VITE_URL_SERVER, {
      autoConnect: false,
      auth: {
        userId: email,
      },
    });
    newSocket.connect();

    setSocket(newSocket);
  }, []);

  // hooks untuk monitoring koneksi websocket
  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        console.log('Socket connected');
      });

      socket.on('disconnect', () => {
        console.log('Socket disconnected');
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

  const [dataMessages, setDataMessages] = useState([]);
  useEffect(() => {
    if (socket && socket.on) {
      socket.on('message', (newMessage: any) => {
        if (email === newMessage.receiver || email === newMessage.sender) {
          // simpan chat terbaru yang dikirim dari server agar ditampilkan ke user
          setDataMessages((previousDataMessages: any): any => {
            // bukan di sini
            return [...previousDataMessages, newMessage];
          });
        }
      });
    }
  }, [socket]);

  const handleListMessage = async () => {
    try {
      const config = {
        headers: {
          'content-type': 'application/json',
        },
      };
      const result = await ApiMessage.listMessage(config);
      // console.log('result', result.data);
      localStorage.setItem('chat-history', JSON.stringify(result.data));
    } catch (error) {
      console.log('error', error);
    }
  };

  const dataLocalStorage = localStorage.getItem('chat-history');
  const handleStoryChat = () => {
    if (dataLocalStorage) {
      const chatLocalStorage = JSON.parse(dataLocalStorage);
      const messageGroups: { [key: string]: TypeMessage[] } = {};
      // if (dataLocalStorage) {
      // console.log('chatLocalStorage', chatLocalStorage);
      if (Array.isArray(chatLocalStorage) && chatLocalStorage.length > 0) {
        chatLocalStorage.forEach((message) => {
          if (message.receiver === email) {
            const key = `${message.sender}-${message.receiver}`;
            if (
              !messageGroups[key] ||
              new Date(message.createdAt) >
                new Date(messageGroups[key][0].createdAt)
            ) {
              messageGroups[key] = [message];
            }
          }
        });
        // console.log('messageGroups', messageGroups);
        // Menggabungkan pesan terbaru dari setiap grup menjadi satu array
        const uniqueMessages: TypeMessage[] = Object.values(
          messageGroups
        ).flatMap((group) => group);
        // console.log('uniqueMessage', uniqueMessages);
        setDataSidebarChat(uniqueMessages);
      }
    } else {
      handleListMessage();
    }
    // }
  };
  // filter data yang ada di localstorage untuk ditampilkan di sidebar
  // buat array baru agar setiap data unik menampilkan pesan terakhir
  useEffect(() => {
    // daftarkan data chat ke localstorage setiap ada data message baru yang dibuat oleh user
    if (dataMessages.length > 0) {
      localStorage.setItem('chat-history', JSON.stringify(dataMessages));
    }

    handleStoryChat();
    // Memecah pesan-pesan menjadi grup berdasarkan pasangan pengirim-penerima
  }, [dataMessages, dataLocalStorage]);

  useEffect(() => {
    dispatch(
      SET_PARENTPAGE({
        parentPage: 'user',
        parentPageKey: 'user',
        data: {},
      })
    );
    dispatch(
      SET_CHILDPAGE({
        childPage: 'index',
        childPageKey: 'index',
        data: { dataOnlineUsers },
      })
    );
  }, [dispatch, dataOnlineUsers]);

  const [listContact, setListContact] = useState<any>([]);
  useEffect(() => {
    dispatch(
      SET_CHILDPAGE({
        childPage: 'contact',
        childPageKey: 'contact',
        data: { list: listContact },
      })
    );
  }, [listContact]);

  return (
    <SidebarUser dataSidebarChat={dataSidebarChat}>
      <main>
        <Suspense fallback={<Loading type="xl" />}>
          {childPage === 'index' && <Welcome />}
          {childPage === 'contact' && <Contact />}
          {childPage === 'message' && (
            <Message
              socket={socket}
              dataMessages={dataMessages}
              setDataMessages={setDataMessages}
            />
          )}
        </Suspense>
      </main>
    </SidebarUser>
  );
}

export default memo(User);
