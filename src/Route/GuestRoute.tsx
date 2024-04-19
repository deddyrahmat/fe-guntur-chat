import * as React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

export default function GuestRoute({ children }: any) {
  const { token, role } = useAppSelector((state: any) => {
    return state.auth;
  });

  if (token && role === 'admin')
    return <Navigate to="/admin/dashboard" replace />;
  if (token && role === 'user') return <Navigate to="/user/message" replace />;

  return children || <Outlet />;
}
