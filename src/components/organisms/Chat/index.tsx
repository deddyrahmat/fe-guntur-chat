import React, { useState, useEffect, Fragment, useRef } from 'react';
import dayjs from 'dayjs';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import capitalizeFirstLetters from '../../../utils/manageString';
import { useAppSelector } from '../../../redux/hooks';
import Textareas from '../../atoms/Textareas';
import Buttons from '../../atoms/Buttons';

function Chat({
  handleSendMessage,
  statusActive,
  dataMessages,
}: // setInputValue,
// inputValue,
any) {
  const { email } = useAppSelector((state: any) => {
    return state.auth;
  });
  const dataUserStore = useAppSelector((state: any) => {
    return state.userStore.data;
  });

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    validationSchema: Yup.object({
      text: Yup.string(),
    }),
    onSubmit: async (values: any) => {
      await handleSendMessage(values.text);
      formik.resetForm(); // Reset form setelah submit
    },
  });

  const textRef = useRef<any>(null);
  const contentRef = useRef<any>(null);
  const [stylePosition, setStylePosition] = useState('14');

  useEffect(() => {
    textRef.current.style.height = '0px';
    const { scrollHeight } = textRef.current;
    contentRef.current.style.height = `68vh`; // Set tinggi ke nilai default
    if (textRef.current.scrollHeight > 40) {
      contentRef.current.style.height = `60vh`;
      setStylePosition('20');
    } else {
      contentRef.current.style.height = `68vh`;
      setStylePosition('14');
    }
    textRef.current.style.height = `${scrollHeight}px`;
  }, [formik.values.text]);

  let prevDate = ''; // Variable untuk menyimpan tanggal pesan sebelumnya

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      formik.handleSubmit();
    }
  };

  return (
    <main className="relative">
      <section
        id="header"
        className="bg-white p-3 mb-3 flex items-center gap-3 rounded-lg md:rounded-xl "
      >
        <img
          className="w-8 h-8 rounded-full"
          src="/assets/images/logo.svg"
          alt="profile photo"
        />
        <div>
          <h5 className="text-md md:text-xl text-black dark:text-black">
            {capitalizeFirstLetters(dataUserStore?.message?.username)}
          </h5>
          <p className="text-sm text-black dark:text-black">
            {capitalizeFirstLetters(statusActive)}
          </p>
        </div>
      </section>
      <section
        id="message"
        ref={contentRef}
        className="max-h-[68vh] p-10 mb-2 overflow-y-auto scroll-smooth custom-scrollbar bg-chat rounded-lg md:rounded-xl relative transition-all duration-300 ease-in-out"
      >
        {dataMessages?.length > 0 &&
          dataMessages.map((dataMessage: any, idx: number) => {
            // kondisi untuk cek target user, target sebagai penerima atau pengirim
            if (
              dataUserStore?.message?.email === dataMessage.receiver ||
              dataUserStore?.message?.email === dataMessage.sender
            ) {
              const messageDate = dayjs(dataMessage.createdAt).format(
                'YYYY-MM-DD'
              );
              let displayDate = null; // Inisialisasi variabel untuk menampilkan tanggal

              // Periksa apakah tanggal pesan saat ini berbeda dari tanggal pesan sebelumnya
              if (messageDate !== prevDate) {
                displayDate = (
                  <span
                    key={`date_${idx}`}
                    className={`${
                      idx !== 0 ? 'my-8' : 'mb-8'
                    } py-1 px-2 rounded-lg text-sm text-gray-500 bg-white`}
                  >
                    {dayjs(messageDate).format('YYYY-MM-DD') ===
                    dayjs().format('YYYY-MM-DD')
                      ? 'Today'
                      : dayjs(messageDate).format('YYYY-MM-DD')}
                  </span>
                );
                prevDate = messageDate; // Simpan tanggal pesan saat ini untuk perbandingan di pesan berikutnya
              }

              return (
                <Fragment key={idx}>
                  {/* info tanggal */}
                  {email === dataMessage.sender ||
                  email === dataMessage.receiver ? (
                    <div className="flex justify-center">{displayDate}</div>
                  ) : null}

                  {/* pengirim */}
                  {email === dataMessage.sender && (
                    <div dir="rtl">
                      <div id="sender" className="w-full mb-3">
                        <div className="relative  w-6/12 bg-white p-3 rounded-lg md:rounded-xl gap-3 mb-3">
                          <div>
                            {/* content */}
                            <div dir="ltr">
                              <p className="text-md text-black break-words">
                                {dataMessage.message}
                              </p>
                            </div>
                            <div dir="rtl">
                              <p className="text-xs text-gray-500 dark:text-black">
                                {dayjs(dataMessage.createdAt).format(
                                  'YYYY-MM-DD'
                                ) === dayjs().format('YYYY-MM-DD')
                                  ? dayjs(dataMessage.createdAt).format('HH:mm')
                                  : dayjs(dataMessage.createdAt).format(
                                      'DD-MM-YYYY'
                                    )}
                              </p>
                            </div>
                          </div>
                          <div
                            className="absolute -bottom-2 right-0"
                            style={{
                              width: 0,
                              height: 0,
                              borderTop: '20px solid transparent',
                              borderRight: '20px solid white',
                              borderBottom: '20px solid transparent',
                              transform: 'rotate(90deg)',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {/* penerima */}

                  {email === dataMessage.receiver && (
                    <div dir="ltr">
                      <div id="receiver" className="w-full mb-3">
                        <div className="relative w-6/12 bg-white p-3 rounded-lg md:rounded-xl gap-3 mb-3">
                          <div>
                            {/* content */}
                            <div dir="ltr">
                              <p className="text-md text-black break-words">
                                {dataMessage.message}
                              </p>
                            </div>
                            <div dir="rtl">
                              <p className="text-xs text-gray-500 dark:text-black">
                                {dayjs(dataMessage.createdAt).format(
                                  'YYYY-MM-DD'
                                ) === dayjs().format('YYYY-MM-DD')
                                  ? dayjs(dataMessage.createdAt).format('HH:mm')
                                  : dayjs(dataMessage.createdAt).format(
                                      'DD-MM-YYYY'
                                    )}
                              </p>
                            </div>
                          </div>
                          <div
                            className="absolute -bottom-2 left-0 "
                            style={{
                              width: 0,
                              height: 0,
                              borderTop: '20px solid transparent',
                              borderRight: '20px solid white',
                              borderBottom: '20px solid transparent',
                              transform: 'rotate(90deg)',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </Fragment>
              );
            }
            return null;
          })}
      </section>
      <section
        id="form"
        className={`w-full flex items-start gap-3 absolute -bottom-${stylePosition} right-0`}
      >
        <form
          className="space-x-2 flex items-start justify-start w-full"
          onSubmit={formik.handleSubmit}
        >
          <Textareas
            className="resize-none max-h-20 overflow-hidden overflow-y-auto custom-scrollbar border border-gray-300 py-2 px-4 w-full p-2 rounded-lg md:rounded-xl focus:outline-none focus:border-primary-800 focus:ring-2 focus:ring-primary-800 focus:ring-opacity-50 ring-primary ring-1 z-10 transition-colors duration-300 ease-in-out focus:shadow-outline "
            placeholder="Type Here..."
            myRef={textRef}
            unique="text"
            value={formik.values.text}
            onChange={formik.handleChange}
            onKeyDown={handleKeyDown}
            onBlur={formik.handleBlur}
            formikTouched={formik.touched.text}
            formikError={formik.errors.text}
          />
          {/* </div> */}
          <Buttons
            className=" bg-primary py-2 px-4 text-white dark:text-black rounded-lg md:rounded-xl  hover:text-primary-900 "
            type="submit"
            statusButton="primary"
          >
            Send
          </Buttons>
        </form>
      </section>
    </main>
  );
}

export default React.memo(Chat);
