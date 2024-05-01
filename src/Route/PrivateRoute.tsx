import * as React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

export default function PrivateRoute({ children }: any) {
  const { token, role } = useAppSelector((state: any) => {
    return state.auth;
  });
  console.log('role', role);

  if (!token && role !== 'admin') return <Navigate to="/login" replace />;
  if (role !== 'admin') return <Navigate to="/user" replace />;

  return children || <Outlet />;
}
