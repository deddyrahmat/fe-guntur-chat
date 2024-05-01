import React, { Suspense, memo, useEffect, useState } from 'react';
import SidebarUser from '../../components/organisms/SidebarUser';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { SET_CHILDPAGE, SET_PARENTPAGE } from '../../redux/userSlice';
import Loading from '../../components/atoms/Loading';
import Welcome from './UserComponents/Welcome';
import { io } from 'socket.io-client';

const Contact = React.lazy(() => import('./UserComponents/Contact'));
const Message = React.lazy(() => import('./UserComponents/Message'));

function User() {
  const dispatch = useAppDispatch();
  const { childPage } = useAppSelector((state: any) => {
    return state.userStore;
  });
  const { email } = useAppSelector((state: any) => {
    return state.auth;
  });

  const [socket, setSocket] = useState<any>(null);
  const [dataOnlineUsers, setDataOnlineUsers] = useState<string[]>([]); // Menentukan tipe string[] untuk dataOnlineUsers

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
        data: { socket, dataOnlineUsers },
      })
    );
  }, [dispatch, socket, dataOnlineUsers]);

  return (
    <SidebarUser>
      <main>
        <Suspense fallback={<Loading type="xl" />}>
          {childPage === 'index' && <Welcome />}
          {childPage === 'contact' && <Contact />}
          {childPage === 'message' && <Message />}
        </Suspense>
      </main>
    </SidebarUser>
  );
}

export default memo(User);
