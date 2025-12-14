import React from 'react';

/**
 * Componente reutilizable para mostrar un spinner de carga
 * @param {string} message - Mensaje opcional a mostrar junto al spinner
 * @param {string} size - Tamaño del spinner ('sm' para pequeño, por defecto normal)
 */
const LoadingSpinner = ({ message = 'Cargando...', size = '' }) => {
  const sizeClass = size === 'sm' ? 'spinner-border-sm' : '';
  
  return (
    <div className="text-center py-5">
      <div 
        className={`spinner-border ${sizeClass}`}
        role="status"
        style={{
          width: size === 'sm' ? '2rem' : '3rem',
          height: size === 'sm' ? '2rem' : '3rem',
          borderWidth: '4px',
          borderTopColor: '#667eea',
          borderRightColor: '#764ba2',
          borderBottomColor: '#f093fb',
          borderLeftColor: '#f5576c',
          animation: 'spin 1s linear infinite'
        }}
      >
        <span className="visually-hidden">{message}</span>
      </div>
      {message && (
        <div className="mt-4">
          <p 
            className="fw-semibold mb-0"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontSize: '1.1rem'
            }}
          >
            {message}
          </p>
        </div>
      )}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;

