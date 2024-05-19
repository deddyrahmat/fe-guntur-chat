import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

import Buttons from '../components/atoms/Buttons';
import Inputs from '../components/atoms/Inputs';

import ApiAuth from '../config/Endpoints/auth';
import { useAppDispatch } from '../redux/hooks';

function Register() {
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Please input the field'),
      email: Yup.string()
        .email('check format email')
        .required('Please input the field'),
      password: Yup.string()
        .min(6, 'Minimum 6 characters')
        .required('Please input the field'),
    }),
    onSubmit: async (values: any) => {
      try {
        const config = {
          headers: {
            'content-type': 'application/json',
          },
        };
        const res = await ApiAuth.Register(values, config);
        if (res?.data) {
          navigate('/login', { replace: true });
        }
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            'Terjadi kegagalan server. Silahkan coba kembali beberapa saat lagi'
        );
      }
    },
  });
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <a
          href="http://google.com"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="/assets/images/logo.svg"
            alt="logo"
          />
          <span className="dark:text-white text-gray-900">Guntur</span>
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign Up to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={formik.handleSubmit}
            >
              <Inputs
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                label="Name"
                placeholder="Your Name"
                unique="name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                formikTouched={formik.touched.name}
                formikError={formik.errors.name}
              />
              <Inputs
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                label="EMail"
                placeholder="Your Mail"
                unique="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                formikTouched={formik.touched.email}
                formikError={formik.errors.email}
              />
              <Inputs
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                label="Password"
                placeholder="Your Password"
                unique="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                formikTouched={formik.touched.password}
                formikError={formik.errors.password}
              />

              <Buttons
                className="w-full font-medium"
                type="submit"
                statusButton="primary"
              >
                Sign Up
              </Buttons>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Do you have an account yet?{' '}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
