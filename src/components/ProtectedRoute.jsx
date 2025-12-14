import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './common/LoadingSpinner';

/**
 * Componente que protege rutas requiriendo autenticación
 * Redirige al login si el usuario no está autenticado
 */
const ProtectedRoute = ({ children }) => {
  const { estaAutenticado, cargando } = useAuth();
  const location = useLocation();

  if (cargando) {
    return (
      <div className="container py-5">
        <LoadingSpinner message="Verificando autenticación..." />
      </div>
    );
  }

  if (!estaAutenticado()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;

