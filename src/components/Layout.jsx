import React from 'react';

/**
 * Layout principal de la aplicación
 * Proporciona estructura común para todas las páginas
 */
const Layout = ({ children }) => {
  return (
    <div className="container my-3 my-md-4">
      <header 
        className="text-white p-3 p-md-4 mb-3 mb-md-4 rounded-4 shadow-lg"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div 
          className="position-absolute top-0 end-0"
          style={{
            width: '200px',
            height: '200px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%',
            transform: 'translate(30%, -30%)'
          }}
        />
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 position-relative">
          <div>
            <h2 className="mb-1 fw-bold fs-4 fs-md-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
              🌍 Theo Tour - Agencia de Turismo
            </h2>
            <p className="mb-0 small opacity-90 d-none d-md-block">
              Tu próximo destino te espera
            </p>
          </div>
          <span 
            className="badge px-3 py-2 fs-6"
            style={{
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.3)'
            }}
          >
            ✈️ Viajes
          </span>
        </div>
      </header>
      <main>{children}</main>
      <footer 
        className="mt-4 mt-md-5 pt-3 pt-md-4 text-center"
        style={{
          background: 'linear-gradient(to right, #f8f9fa 0%, #e9ecef 100%)',
          borderRadius: '10px',
          padding: '20px'
        }}
      >
        <p className="mb-0 small text-muted">
          &copy; {new Date().getFullYear()} - Theo Tour. Todos los derechos reservados. 🌍
        </p>
      </footer>
    </div>
  );
};

export default Layout;