import * as React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

export default function GuestRoute({ children }: any) {
  const { token } = useAppSelector((state: any) => {
    return state.auth;
  });

  if (token) return <Navigate to="/dashboard" replace />;

  return children || <Outlet />;
}
