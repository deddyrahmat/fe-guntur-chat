import * as React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

export default function GuestRoute({ children }: any) {
  const { token, role } = useAppSelector((state: any) => {
    return state.auth;
  });

  if (!token && !role) return <Navigate to="/login" replace />;
  if (token && role === 'user') return <Navigate to="/user/message" replace />;
  if (token && role === 'admin')
    return <Navigate to="/admin/dashboard" replace />;

  return children || <Outlet />;
}
