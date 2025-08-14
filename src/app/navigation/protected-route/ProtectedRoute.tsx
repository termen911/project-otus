import React from 'react';
import { useSessionStore } from '@/entities/session';
import { useLocation, Navigate } from 'react-router';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated);
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
