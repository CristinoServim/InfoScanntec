import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../shared/contexts/AuthContext';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { usuarioLogado } = useAuth();
  console.log(usuarioLogado)

  return usuarioLogado ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
