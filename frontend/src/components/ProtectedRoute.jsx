import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ role }) {
  const { session } = useAuth();
  const location = useLocation();
  if (!session) return <Navigate to="/login" state={{ from: location }} replace />;
  if (session.role !== role) return <Navigate to={session.role === 'EDITOR' ? '/editor/posts' : '/author/posts'} replace />;
  return <Outlet />;
}
