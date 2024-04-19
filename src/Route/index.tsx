import React, { Suspense } from 'react';
import { Navigate, createBrowserRouter, useLocation } from 'react-router-dom';
import Loading from '../components/atoms/Loading';
import GuestRoute from './GuestRoute';
import PrivateRoute from './PrivateRoute';
import Sidebar from '../components/organisms/Sidebar';
import ListUser from '../pages/Admin/ListUser';
import UserRoute from './UserRoute ';
import Message from '../pages/User/Message';
import SidebarUser from '../components/organisms/SidebarUser';

const Home = React.lazy(() => import('../pages/Admin/Home'));
const Login = React.lazy(() => import('../pages/Login'));
const Notfound = React.lazy(() => import('../pages/Notfound'));

export function LocationDisplay() {
  const location = useLocation();

  return <div data-testid="location-display">{location.pathname}</div>;
}

export const router = createBrowserRouter([
  {
    path: '/admin/',
    element: (
      <Suspense fallback={<Loading type="xl" />}>
        <PrivateRoute />
      </Suspense>
    ),
    children: [
      {
        path: 'dashboard/*',
        element: (
          <Suspense fallback={<Loading type="xl" />}>
            <Sidebar>
              <Home />
            </Sidebar>
          </Suspense>
        ),
      },
      {
        path: 'contact/*',
        element: (
          <Suspense fallback={<Loading type="xl" />}>
            <Sidebar>
              <ListUser />
            </Sidebar>
          </Suspense>
        ),
      },
      {
        path: '',
        element: <Navigate to="/dashboard" replace />,
      },
    ],
  },
  {
    path: '/user/',
    element: (
      <Suspense fallback={<Loading type="xl" />}>
        <UserRoute />
      </Suspense>
    ),
    children: [
      {
        path: 'Message/*',
        element: (
          <Suspense fallback={<Loading type="xl" />}>
            <SidebarUser>
              <Message />
            </SidebarUser>
          </Suspense>
        ),
      },
      {
        path: '',
        element: <Navigate to="/Message" replace />,
      },
    ],
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<Loading type="xl" />}>
        <GuestRoute>
          <Login />
        </GuestRoute>
      </Suspense>
    ),
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<Loading type="xl" />}>
        <Notfound />
      </Suspense>
    ),
  },
]);
