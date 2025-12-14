import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CarritoProvider, useCarrito } from './contexts/CarritoContext';
import { ProductosProvider, useProductos } from './contexts/ProductosContext';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import LoadingSpinner from './components/common/LoadingSpinner';
import AlertMessage from './components/common/AlertMessage';
import CartModal from './components/CartModal';

const AppContent = () => {
  const { usuario, logout, estaAutenticado } = useAuth();
  const { obtenerCantidad } = useCarrito();
  const { productos, loading, error } = useProductos();
  const [showCartModal, setShowCartModal] = useState(false);

  if (loading && productos.length === 0) {
    return (
      <Layout>
        <LoadingSpinner message="Cargando aplicación..." />
      </Layout>
    );
  }

  if (error && productos.length === 0) {
    return (
      <Layout>
        <div className="container py-4">
          <AlertMessage
            type="danger"
            message={`Error al cargar la aplicación: ${error}`}
          />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Navegación */}
      <nav 
        className="navbar navbar-expand-lg rounded-4 mb-3 mb-md-4 shadow-lg"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          border: '1px solid #e9ecef'
        }}
      >
        <div className="container-fluid">
          <div className="navbar-nav flex-row flex-wrap gap-2 gap-md-3">
            <Link 
              to="/" 
              className="nav-link fw-semibold"
              style={{ color: '#667eea' }}
            >
              🏠 Inicio
            </Link>
            {estaAutenticado() && (
              <>
                <button
                  className="nav-link btn btn-link text-decoration-none p-0 fw-semibold"
                  onClick={() => setShowCartModal(true)}
                  style={{ 
                    border: 'none', 
                    background: 'none',
                    color: '#667eea'
                  }}
                  aria-label="Abrir carrito"
                >
                  🛒 Carrito 
                  {obtenerCantidad() > 0 && (
                    <span 
                      className="badge ms-1"
                      style={{
                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        color: 'white'
                      }}
                    >
                      {obtenerCantidad()}
                    </span>
                  )}
                </button>
                <Link 
                  to="/admin" 
                  className="nav-link fw-semibold"
                  style={{ color: '#667eea' }}
                >
                  ⚙️ Administración
                </Link>
              </>
            )}
          </div>
          <div className="d-flex align-items-center gap-2 gap-md-3 flex-wrap">
            {estaAutenticado() ? (
              <>
                <span 
                  className="small d-none d-md-inline px-3 py-2 rounded"
                  style={{
                    background: 'linear-gradient(135deg, #e7f3ff 0%, #d0e7ff 100%)',
                    color: '#667eea',
                    fontWeight: 'bold'
                  }}
                >
                  👋 Hola, <strong>{usuario?.nombre || usuario?.email}</strong>
                </span>
                <button 
                  className="btn btn-sm fw-semibold" 
                  onClick={logout}
                  aria-label="Cerrar sesión"
                  style={{
                    background: 'linear-gradient(135deg, #f5576c 0%, #c92a2a 100%)',
                    color: 'white',
                    border: 'none'
                  }}
                >
                  <span className="d-none d-md-inline">🚪 Cerrar Sesión</span>
                  <span className="d-md-none">Salir</span>
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="btn btn-sm fw-semibold"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)'
                }}
              >
                <span className="d-none d-md-inline">🔐 Iniciar Sesión</span>
                <span className="d-md-none">Login</span>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Rutas */}
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/login"
          element={
            estaAutenticado() ? (
              <Navigate to="/" replace />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Navigate to="/" replace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Modal del Carrito */}
      {estaAutenticado() && (
        <CartModal
          show={showCartModal}
          onClose={() => setShowCartModal(false)}
        />
      )}
    </Layout>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ProductosProvider>
          <CarritoProvider>
            <AppContent />
          </CarritoProvider>
        </ProductosProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;