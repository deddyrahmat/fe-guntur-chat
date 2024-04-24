/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { SET_PAGE } from '../../../redux/userMessageSlice';
import capitalizeFirstLetters from '../../../utils/manageString';

function SidebarUser({ children }: any) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { username, email } = useAppSelector((state: any) => {
    return state.auth;
  });

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
    navigate('/user/contact');
    // dispatch(SET_PAGE({ currentPage: 'contact', data: {} }));
  };

  return (
    <>
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 md:w-[400px] h-screen transition-transform -translate-x-full ${
          showSidebar ? 'md:translate-x-0' : ''
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-white">
          <div className="  mb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between ps-2.5 mb-5 ">
              <div>
                <a href="https://google.com/" className="flex items-center  ">
                  <img
                    src="/assets/images/logo.svg"
                    className="h-6 me-3 sm:h-7"
                    alt="Guntur Logo"
                  />
                  <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                    Guntur
                  </span>
                </a>
              </div>
              <div>
                <button type="button" onClick={handleContent}>
                  M
                </button>
              </div>
            </div>
            <div className="flex items-center  ps-2.5 mb-5 gap-3">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search by name"
                className="w-11/12"
              />
              <div>x</div>
            </div>
          </div>
          {/* sidebar menu */}
          <div className="overflow-y-auto h-5/6 scroll-smooth custom-scrollbar">
            <ul className="space-y-2 font-medium ">
              <li>
                <button
                  type="button"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="w-10 h-10 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  {/* atur lebar list message */}
                  <div className="ms-3 overflow-hidden w-72 text-left">
                    <p className="text-sm">message</p>
                    <p className="text-sm font-normal truncate ">
                      message Lorem ipsum dolor sit amet, consectetur
                      adipisicing elit. Repellat hic itaque nesciunt dolorem
                      ipsa voluptas enim, facilis at quasi fugiat modi labore
                      doloribus, neque quibusdam. Perspiciatis quis inventore
                      ullam numquam?
                    </p>
                  </div>
                </button>
              </li>
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
          {/* avatar */}
          <div className="flex items-center">
            <div className="flex items-center ms-3">
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
                    className="w-8 h-8 rounded-full"
                    src="/assets/images/logo.svg"
                    alt="profile photo"
                  />
                </button>
              </div>
              <div
                className={`${
                  showAvatar ? '' : 'hidden'
                } z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`}
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
                      Dashboard
                    </a>
                  </li>
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
                    <a
                      href="http://google.com"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                    >
                      Earnings
                    </a>
                  </li>
                  <li>
                    <a
                      href="http://google.com"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                    >
                      Sign out
                    </a>
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
