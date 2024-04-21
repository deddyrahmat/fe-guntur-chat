import React, { useState } from 'react';
import Chat from '../../components/organisms/Chat';
import { useAppSelector } from '../../redux/hooks';

function Message() {
  const { currentPage, data } = useAppSelector((state: any) => {
    return state.userMessage;
  });
  const { email } = useAppSelector((state: any) => {
    return state.auth;
  });

  if (currentPage === 'message') {
    return (
      <Chat
        currentUser={email}
        receiverUser={data.email}
        username={data.username}
      />
    );
  }
  console.log('first');

  return (
    <div>
      <p>Welcome</p>
    </div>
  );
}

export default Message;
