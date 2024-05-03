import React from 'react';

import ContactUser from '../../../components/organisms/ContactUser';
import { useAppDispatch } from '../../../redux/hooks';
import { SET_CHILDPAGE } from '../../../redux/userSlice';

function Contact() {
  const dispatch = useAppDispatch();
  const handleMessageUser = (
    emailParam: string,
    usernameParam: string,
    statusParam: boolean
  ) => {
    dispatch(
      SET_CHILDPAGE({
        childPage: 'message',
        childPageKey: 'message',
        data: {
          email: emailParam,
          username: usernameParam,
          status: statusParam,
        },
      })
    );
  };

  return (
    <>
      <h2 className="mb-5 text-lg md:text-xl font-bold bg-white p-3 rounded-lg md:rounded-xl">
        Contact
      </h2>
      <ContactUser handleMessageUser={handleMessageUser} />
    </>
  );
}

export default Contact;
