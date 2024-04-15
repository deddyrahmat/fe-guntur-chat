import React, { Suspense } from 'react';
import { createBrowserRouter, useLocation } from 'react-router-dom';
import Loading from '../pages/Loading';

const Home = React.lazy(() => import('../pages/Home'));
const Notfound = React.lazy(() => import('../pages/Notfound'));

export function LocationDisplay() {
  const location = useLocation();

  return <div data-testid="location-display">{location.pathname}</div>;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<Loading />}>
        <Notfound />
      </Suspense>
    ),
  },
]);
