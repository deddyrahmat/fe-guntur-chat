import React, { useState } from 'react';
import Chat from '../../../components/organisms/Chat';
import { useAppSelector } from '../../../redux/hooks';

function Message() {
  const dataUserStore = useAppSelector((state: any) => {
    return state.userStore.data;
  });
  const { email } = useAppSelector((state: any) => {
    return state.auth;
  });

  return (
    <Chat
      currentUser={email}
      receiverUser={dataUserStore?.message?.email}
      username={dataUserStore?.message?.username}
    />
  );
}

export default Message;
