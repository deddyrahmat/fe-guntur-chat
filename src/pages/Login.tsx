import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import Buttons from '../components/atoms/Buttons';
import Inputs from '../components/atoms/Inputs';

import { useAppDispatch } from '../redux/hooks';
import { USER_LOGIN } from '../redux/authSlice';
import { handleLogin } from '../service/auth';

function Login() {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('check format email')
        .required('Please input the field'),
      password: Yup.string()
        .min(6, 'Minimum 6 characters')
        .required('Please input the field'),
    }),
    onSubmit: async (values: any) => {
      const process = await handleLogin(values);
      if (!process.status) {
        toast.error(process.message);
      }
      dispatch(USER_LOGIN(process.data));
      toast.success(process.message);
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
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={formik.handleSubmit}
            >
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

              <div className="flex items-center justify-between">
                <a
                  href="http://google.com"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <Buttons
                className="w-full font-medium"
                type="submit"
                statusButton="primary"
              >
                Sign In
              </Buttons>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{' '}
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
