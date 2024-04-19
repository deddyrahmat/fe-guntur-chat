import * as React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

export default function UserRoute({ children }: any) {
  const { token, role } = useAppSelector((state: any) => {
    return state.auth;
  });

  if (!token && role !== 'user') return <Navigate to="/login" replace />;
  if (role !== 'user') return <Navigate to="/admin/dashboard" replace />;

  return children || <Outlet />;
}
