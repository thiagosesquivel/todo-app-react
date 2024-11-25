// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const ProtectedRoute: React.FC = () => {
  const authenticated = useAuthStore((state) => state.authenticated);

  return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
