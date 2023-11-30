import { createBrowserRouter, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import Notfound from '../pages/Notfound';

export function LocationDisplay() {
  const location = useLocation();

  return <div data-testid="location-display">{location.pathname}</div>;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '*',
    element: <Notfound />,
  },
]);
