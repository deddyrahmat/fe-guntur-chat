import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import ContactUser from '../../../components/organisms/ContactUser';
import ApiUser from '../../../config/Endpoints/users';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { SET_CHILDPAGE } from '../../../redux/userSlice';

function Contact() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { email } = useAppSelector((state: any) => {
    return state.auth;
  });

  const dataUserStore = useAppSelector((state: any) => {
    return state.userStore.data;
  });

  const [listContact, setListContact] = useState<any>([]);
  useEffect(() => {
    console.log('listContact', listContact);
    dispatch(
      SET_CHILDPAGE({
        childPage: 'contact',
        childPageKey: 'contact',
        data: {
          ...listContact,
        },
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
  useEffect(() => {
    if (dataUserStore?.contact && dataUserStore?.contact.length > 0) {
      setListContact(dataUserStore?.contact);
    } else {
      fetchContact();
    }
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
