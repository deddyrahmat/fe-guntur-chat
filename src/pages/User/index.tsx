/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
import React, { Suspense, memo, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';

import SidebarUser from '../../components/organisms/SidebarUser';
import ApiUser from '../../config/Endpoints/users';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { SET_CHILDPAGE, SET_PARENTPAGE } from '../../redux/userSlice';
import Loading from '../../components/atoms/Loading';
import Welcome from './UserComponents/Welcome';

const Contact = React.lazy(() => import('./UserComponents/Contact'));
const Message = React.lazy(() => import('./UserComponents/Message'));

type TypeMessage = {
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

  const dataUserStore = useAppSelector((state: any) => {
    return state.userStore.data;
  });

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
            return [...previousDataMessages, newMessage];
          });
        }
      });
    }
  }, [socket]);

  useEffect(() => {
    // daftarkan data chat ke localstorage setiap ada data message baru yang dibuat oleh user
    if (dataMessages.length > 0) {
      localStorage.setItem('chat-history', JSON.stringify(dataMessages));
    }

    // filter data yang ada di localstorage untuk ditampilkan di sidebar
    // buat array baru agar setiap data unik menampilkan pesan terakhir
    const dataLocalStorage = localStorage.getItem('chat-history');
    // Memecah pesan-pesan menjadi grup berdasarkan pasangan pengirim-penerima
    const messageGroups: { [key: string]: TypeMessage[] } = {};
    if (dataLocalStorage) {
      const chatLocalStorage = JSON.parse(dataLocalStorage);
      console.log('chatLocalStorage', chatLocalStorage);
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

        // Menggabungkan pesan terbaru dari setiap grup menjadi satu array
        const uniqueMessages: TypeMessage[] = Object.values(
          messageGroups
        ).flatMap((group) => group);
        setDataSidebarChat(uniqueMessages);
      }
    }
  }, [dataMessages]);

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
    console.log('listContact', listContact);
    dispatch(
      SET_CHILDPAGE({
        childPage: 'contact',
        childPageKey: 'contact',
        data: [listContact],
      })
    );
  }, [listContact]);

  const fetchContact = async () => {
    try {
      const config = {
        headers: {
          'content-type': 'application/json',
        },
      };
      const res = await ApiUser.findUserRoleByEmail(config, email);
      if (res?.data) {
        console.log('res.data', res.data);
        setListContact(res.data);
      }
      console.log('res', res);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          'Terjadi kegagalan server. Silahkan coba kembali beberapa saat lagi'
      );
    }
  };

  useEffect(() => {
    if (dataUserStore?.contact && dataUserStore?.contact.length > 0) {
      setListContact(dataUserStore?.contact);
    } else {
      fetchContact();
    }
  }, []);

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
