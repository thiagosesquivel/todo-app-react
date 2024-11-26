// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../features/auth/state/authState';

const ProtectedRoute: React.FC = () => {
  const authenticated = useAuthStore((state) => state.authenticated);

  return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
