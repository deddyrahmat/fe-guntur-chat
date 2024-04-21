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

  // const [currentUser, setCurrentUser] = useState(null);
  if (currentPage === 'message') {
    return (
      <Chat
        currentUser={email}
        receiverUser={data.email}
        username={data.username}
        status={data.status}
        // onLogout={() => setCurrentUser(null)}
      />
    );
  }

  return (
    <div>
      <p>Welcome</p>
    </div>
  );
}

export default Message;
