/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import capitalizeFirstLetters from '../../../utils/manageString';
import { SET_CHILDPAGE } from '../../../redux/userSlice';
import { USER_LOGOUT } from '../../../redux/authSlice';

function SidebarUser({ children, dataSidebarChat }: any) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { username, email } = useAppSelector((state: any) => {
    return state.auth;
  });
  // const dataUserStore = useAppSelector((state: any) => {
  //   return state.userStore.data;
  // });

  const [showSidebar, setShowSidebar] = useState(true);
  const [showAvatar, setShowAvatar] = useState(false);
  const handleShowSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const handleShowAvatar = () => {
    setShowAvatar(!showAvatar);
  };

  const handleContent = () => {
    // fitur mengganti page/content
    // ganti ke contact
    // navigate('/user/contact');
    dispatch(
      SET_CHILDPAGE({
        childPage: 'contact',
        childPageKey: 'contact',
        data: {},
      })
    );
    // dispatch(SET_PAGE({ currentPage: 'contact', data: {} }));
  };

  const [resultChat, setResultChat] = useState([]);
  const [resultSearch, setResultSearch] = useState<any>([]);
  const [keyword, setKeyword] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (event: any) => {
    setKeyword(event.target.value);
    const dataLocalStorage = localStorage.getItem('chat-history');
    let dataFromLocal: any = [];
    if (dataLocalStorage) {
      const chatLocalStorage = JSON.parse(dataLocalStorage);
      dataFromLocal = chatLocalStorage.filter((item: any) =>
        item.message.toLowerCase().includes(event.target.value.toLowerCase())
      );
    }
    console.log('search dataFromLocal', dataFromLocal);
    // console.log('search contactUser', contactUser);
    // setResultSearch([...dataFromLocal, ...contactUser]);
    setResultSearch([...dataFromLocal]);
  };

  useEffect(() => {
    if (keyword !== '' && resultSearch && resultSearch.length > 0) {
      setResultChat(resultSearch);
    } else if (keyword !== '' && resultSearch && resultSearch.length === 0) {
      setResultChat([]);
    } else {
      setResultChat(dataSidebarChat);
    }
  }, [resultSearch, dataSidebarChat]);

  const handleSignOut = () => {
    dispatch(USER_LOGOUT());
    navigate('/login', { replace: true });
  };

  return (
    <>
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-full md:w-[400px] h-screen transition-transform  ${
          showSidebar ? 'md:translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-primary-900">
          <div className="  mb-4 border-b border-gray-200 dark:border-gray-700 ">
            <div className="flex items-center justify-between ps-2.5 mb-5 ">
              <div>
                <Link to="/user/contact" className="flex items-center  ">
                  <img
                    src="/assets/images/logo.svg"
                    className="h-6 me-3 sm:h-7 rounded-full bg-white p-1"
                    alt="Guntur Logo"
                  />
                  <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
                    Guntur
                  </span>
                </Link>
              </div>
              <div className="flex items-start gap-3 ">
                <div className="md:hidden">
                  <button
                    data-drawer-target="logo-sidebar"
                    data-drawer-toggle="logo-sidebar"
                    aria-controls="logo-sidebar"
                    type="button"
                    className="inline-flex items-center text-sm  focus:outline-none  "
                    onClick={handleShowSidebar}
                  >
                    <span className="sr-only">Open sidebar</span>
                    <svg
                      className="w-5 h-5 bg-white rounded p-1"
                      //   aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div
              className={`flex items-center ps-2.5 p-2 mb-5 gap-3 bg-white rounded-lg md:rounded-xl ${
                isFocused
                  ? 'border-primary-100 ring-2 ring-primary-100 ring-opacity-50 z-10 transition-colors duration-300 ease-in-out shadow-outline '
                  : ''
              }`}
            >
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search message..."
                className="w-11/12 focus:outline-none"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={handleChange}
              />

              <button type="button">
                <img
                  src="/assets/icons/icon-close.svg"
                  alt="icon-close"
                  className="h-5 w-5"
                />
              </button>
            </div>
          </div>
          {/* sidebar menu */}
          <div className="overflow-y-auto h-4/5 scroll-smooth custom-scrollbar">
            <ul className="space-y-2 font-medium ">
              {/* perbaiki contact, masih menampilkan password dan name muncul ketika masuk page contact */}
              {Array.isArray(resultChat) && resultChat.length > 0 ? (
                resultChat.map((data: any, index: number) => {
                  return (
                    <li key={`chat-user-${index}`}>
                      <button
                        type="button"
                        className="flex items-center p-2 w-full bg-primary text-white rounded-lg dark:text-white hover:bg-primary-500 hover:text-primary-900 dark:hover:bg-gray-700 group"
                        onClick={() => {
                          return dispatch(
                            SET_CHILDPAGE({
                              childPage: 'message',
                              childPageKey: 'message',
                              data:
                                data.sender === email
                                  ? {
                                      // jika sender adalah user yang login maka ambil receiver dan kirim ke redux
                                      // agar data yang muncul adalah data user target bukan kita sebagai yang login
                                      email: data?.receiver,
                                      username: data?.receiverName,
                                      status: true,
                                    }
                                  : {
                                      // sender berisi email dari pengirim sebelumnya yang di simpan di sidebar dan digunakan sebagai penerima ketika ingin akses message dari sidebar
                                      email: data?.sender,
                                      username: data?.senderName,
                                      status: true,
                                    },
                            })
                          );
                        }}
                      >
                        <img
                          src="/assets/icons/icon-user-1.svg"
                          alt="icon user"
                          className="bg-white rounded-full w-8 h-8 md:w-10 md:h-10 "
                        />
                        {/* atur lebar list message */}
                        <div className="ms-3 overflow-hidden w-72 text-left">
                          <p className="text-sm">
                            {capitalizeFirstLetters(data?.senderName)}
                          </p>
                          <p className="text-sm font-normal truncate ">
                            {data.message}
                          </p>
                        </div>
                      </button>
                    </li>
                  );
                })
              ) : (
                <li>
                  <p className="text-sm md:text-xl font-normal truncate text-white text-center">
                    - Data Not Found -
                  </p>
                </li>
              )}
            </ul>
          </div>
        </div>
      </aside>

      <div className={showSidebar ? 'md:ml-[400px]' : ''}>
        {/* navbar profile */}
        <div className="flex p-3 justify-between bg-white">
          {/* hamburgermenu */}
          <div>
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center text-sm  focus:outline-none  "
              onClick={handleShowSidebar}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                //   aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                />
              </svg>
            </button>
          </div>
          {/* right icon */}
          <div className=" flex items-center">
            {/* icon contact user */}
            <div className="relative">
              <button type="button" onClick={handleContent}>
                <img
                  src="/assets/icons/icon-contact.svg"
                  alt="icon-contact"
                  className="w-6 h-6 md:w-8 md:h-8 rounded-full"
                />
              </button>
            </div>
            {/* dropdown profile */}
            <div className="relative flex items-center ms-3">
              <div>
                <button
                  type="button"
                  className="flex text-sm bg-white rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  aria-expanded="false"
                  data-dropdown-toggle="dropdown-user"
                  onClick={handleShowAvatar}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-6 h-6 md:w-8 md:h-8 rounded-full"
                    src="/assets/images/logo.svg"
                    alt="profile photo"
                  />
                </button>
              </div>
              <div
                className={`${
                  showAvatar ? '' : 'hidden'
                } absolute top-0 right-10 z-50 my-4 text-base list-none bg-white divide-y divide-gray-200 rounded shadow dark:bg-gray-700 dark:divide-gray-600`}
                id="dropdown-user"
              >
                <div className="px-4 py-3" role="none">
                  <p
                    className="text-sm text-gray-900 dark:text-white"
                    role="none"
                  >
                    {capitalizeFirstLetters(username)}
                  </p>
                  <p
                    className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                    role="none"
                  >
                    {email}
                  </p>
                </div>
                <ul className="py-1" role="none">
                  <li>
                    <a
                      href="http://google.com"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="text-red-800 block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                      onClick={() => handleSignOut()}
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* content */}
        <div className="p-4 min-h-[100vh-56px]">{children}</div>
      </div>
    </>
  );
}

export default SidebarUser;
