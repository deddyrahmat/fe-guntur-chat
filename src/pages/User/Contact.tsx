import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import ContactUser from '../../components/organisms/ContactUser';
import ApiUser from '../../config/Endpoints/users';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { SET_PAGE } from '../../redux/userMessageSlice';

function Contact() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { email } = useAppSelector((state: any) => {
    return state.auth;
  });

  const [listContact, setListContact] = useState<any>([]);

  const fetchContact = async () => {
    try {
      const config = {
        headers: {
          'content-type': 'application/json',
        },
      };
      const res = await ApiUser.findUserRoleByEmail(config, email);
      if (res?.data) {
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

  const handleMessage = (
    emailParam: string,
    usernameParam: string,
    statusParam: boolean
  ) => {
    dispatch(
      SET_PAGE({
        currentPage: 'message',
        data: {
          email: emailParam,
          username: usernameParam,
          status: statusParam,
        },
      })
    );

    navigate('/user/message');
  };
  useEffect(() => {
    fetchContact();
  }, []);

  return (
    <>
      <h2 className="mb-5 text-lg md:text-xl font-bold bg-white p-3 rounded-lg md:rounded-xl">
        Contact
      </h2>
      <ContactUser listContact={listContact} handleMessage={handleMessage} />
    </>
  );
}

export default Contact;
