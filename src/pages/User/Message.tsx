import React, { useState } from 'react';
import Chat from '../../components/organisms/Chat';
import { useAppSelector } from '../../redux/hooks';

function Message() {
  const { email, username } = useAppSelector((state: any) => {
    return state.auth;
  });

  const [currentUser, setCurrentUser] = useState(null);
  return (
    <Chat
      currentUser={email}
      username={username}
      onLogout={() => setCurrentUser(null)}
    />
  );
}

export default Message;
