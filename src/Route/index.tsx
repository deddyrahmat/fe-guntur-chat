import React, { Suspense } from 'react';
import { Navigate, createBrowserRouter, useLocation } from 'react-router-dom';
import Loading from '../components/atoms/Loading';
import GuestRoute from './GuestRoute';
import PrivateRoute from './PrivateRoute';
import Sidebar from '../components/organisms/Sidebar';

const Home = React.lazy(() => import('../pages/Home'));
const Login = React.lazy(() => import('../pages/Login'));
const Notfound = React.lazy(() => import('../pages/Notfound'));

export function LocationDisplay() {
  const location = useLocation();

  return <div data-testid="location-display">{location.pathname}</div>;
}

export const router = createBrowserRouter([
  {
    path: '/',
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
        path: '',
        element: <Navigate to="/dashboard" replace />,
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
