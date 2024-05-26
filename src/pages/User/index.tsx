/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
import React, { Suspense, memo, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import SidebarUser from '../../components/organisms/SidebarUser';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { SET_CHILDPAGE, SET_PARENTPAGE } from '../../redux/userSlice';
import Loading from '../../components/atoms/Loading';
import ApiMessage from '../../config/Endpoints/message';
import ProgressBar from '../../components/atoms/Progress';

const Welcome = React.lazy(() => import('./UserComponents/Welcome'));
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

  const dataLocalStorage = localStorage.getItem('chat-history');

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

    newSocket.on('connect', () => {
      console.log('Socket connected');
    });

    newSocket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    // Mendapatkan daftar pengguna yang online dari server WebSocket saat komponen dipasang
    newSocket.on('onlineUsers', (onlineUsers: any) => {
      console.log('onlineUsers', onlineUsers);
      setDataOnlineUsers(onlineUsers);
    });

    setSocket(newSocket);
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [email]);

  // const handleOnlineUsers = (onlineUsers: any) => {
  //   // Check if the new data is different from the current data
  //   if (JSON.stringify(dataOnlineUsers) !== JSON.stringify(onlineUsers)) {
  //     setDataOnlineUsers(onlineUsers);
  //   }
  // };

  // hooks untuk monitoring koneksi websocket
  // useEffect(() => {
  //   if (socket) {
  //     socket.on('connect', () => {
  //       console.log('Socket connected');
  //     });

  //     socket.on('disconnect', () => {
  //       console.log('Socket disconnected');
  //     });

  //     // Mendapatkan daftar pengguna yang online dari server WebSocket saat komponen dipasang
  //     socket.on('onlineUsers', (onlineUsers: any) => {
  //       setDataOnlineUsers(onlineUsers);
  //     });
  //   }

  //   return () => {
  //     if (socket) {
  //       socket.off('onlineUsers', (onlineUsers: any) => {
  //         setDataOnlineUsers(onlineUsers);
  //       });
  //       socket.disconnect();
  //     }
  //   };
  // }, [socket]);

  const [dataMessages, setDataMessages] = useState<any>([]);
  useEffect(() => {
    if (socket && socket.on) {
      socket.on('message', (newMessage: any) => {
        if (email === newMessage.receiver || email === newMessage.sender) {
          // periksa story chat
          // jika chat dengan user baru, maka ambil story dan gabung data
          // jika tidak maka langsung gabung data
          console.log('dataLocalStorage', dataLocalStorage);
          if (dataLocalStorage) {
            const chatLocalStorage: any = JSON.parse(dataLocalStorage);
            console.log('chatLocalStorage', chatLocalStorage);
            if (
              Array.isArray(chatLocalStorage) &&
              chatLocalStorage.length > 0
            ) {
              setDataMessages([...chatLocalStorage, newMessage]);
              // setDataMessages([...chatLocalStorage, newMessage]);
            }
          } else {
            // simpan chat terbaru yang dikirim dari server agar ditampilkan ke user
            setDataMessages((previousDataMessages: any): any => {
              // bukan di sini
              return [...previousDataMessages, newMessage];
            });
          }
          console.log('dataMessages', dataMessages);
        }
      });
    }
  }, [socket, dataLocalStorage]);

  const [progress, setProgress] = useState(0);
  const handleListMessage = async () => {
    try {
      const config = {
        headers: {
          'content-type': 'application/json',
        },
        onDownloadProgress: (progressEvent: any) => {
          const total = parseFloat(progressEvent.total);
          const current = parseFloat(progressEvent.loaded);
          const percentCompleted = Math.floor((current / total) * 100);
          setProgress(percentCompleted);
        },
      };
      const result = await ApiMessage.listMessage(config);
      localStorage.setItem('chat-history', JSON.stringify(result.data));
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('chat-history')) {
      setProgress(100);
    }
  }, [progress]);

  const handleStoryChat = () => {
    if (dataLocalStorage) {
      const chatLocalStorage = JSON.parse(dataLocalStorage);
      if (Array.isArray(chatLocalStorage) && chatLocalStorage.length > 0) {
        const messageGroups: { [key: string]: TypeMessage } = {};

        chatLocalStorage.forEach((message: TypeMessage) => {
          const isSender = message.sender === email;
          const isReceiver = message.receiver === email;

          if (isSender || isReceiver) {
            const chatPartner = isSender ? message.receiver : message.sender;
            const key = chatPartner;

            if (
              !messageGroups[key] ||
              new Date(message.createdAt) >
                new Date(messageGroups[key].createdAt)
            ) {
              // membuat object berdasarkan partner
              messageGroups[key] = message;
            }
          }
        });

        // Mengubah messageGroups menjadi array untuk digunakan di sidebar
        const uniqueMessages: TypeMessage[] = Object.values(messageGroups);

        setDataSidebarChat(uniqueMessages);
      } else {
        handleListMessage();
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
      console.log('dataMessages setLocal', dataMessages);
      localStorage.setItem('chat-history', JSON.stringify(dataMessages));
    }

    handleStoryChat();
  }, [dataMessages, dataLocalStorage]);

  useEffect(() => {
    dispatch(
      SET_PARENTPAGE({
        parentPage: 'user',
        parentPageKey: 'user',
        data: {},
      })
    );
    // dispatch(
    //   SET_CHILDPAGE({
    //     childPage: 'index',
    //     childPageKey: 'index',
    //     data: { dataOnlineUsers },
    //   })
    // );
  }, [dispatch]);

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

  if (progress < 100) {
    return <ProgressBar type="xl" value={progress} />;
  }
  return (
    <SidebarUser dataSidebarChat={dataSidebarChat}>
      <main>
        <Suspense fallback={<Loading type="xl" />}>
          {childPage === 'index' && <Welcome />}
          {childPage === 'contact' && <Contact />}
          {childPage === 'message' && (
            <Message
              dataOnlineUsers={dataOnlineUsers}
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
