import React from 'react';

/**
 * Componente reutilizable para mostrar mensajes de alerta
 * @param {string} type - Tipo de alerta: 'success', 'danger', 'warning', 'info'
 * @param {string} message - Mensaje a mostrar
 * @param {boolean} dismissible - Si es true, muestra botón para cerrar
 * @param {function} onDismiss - Función a ejecutar al cerrar
 */
const AlertMessage = ({ 
  type = 'info', 
  message, 
  dismissible = false, 
  onDismiss 
}) => {
  if (!message) return null;

  const getIcon = () => {
    switch (type) {
      case 'success': return '✅';
      case 'danger': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return 'ℹ️';
    }
  };

  const getGradient = () => {
    switch (type) {
      case 'success': return 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)';
      case 'danger': return 'linear-gradient(135deg, #f5576c 0%, #c92a2a 100%)';
      case 'warning': return 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
      case 'info': return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      default: return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
  };

  return (
    <div 
      className={`alert alert-${type} ${dismissible ? 'alert-dismissible fade show' : ''} border-0 shadow-sm`}
      role="alert"
      style={{
        background: getGradient(),
        color: 'white',
        borderRadius: '10px',
        border: 'none'
      }}
    >
      <div className="d-flex align-items-center gap-2">
        <span style={{ fontSize: '1.2rem' }}>{getIcon()}</span>
        <span className="fw-semibold">{message}</span>
      </div>
      {dismissible && onDismiss && (
        <button
          type="button"
          className="btn-close btn-close-white"
          onClick={onDismiss}
          aria-label="Cerrar"
          style={{ filter: 'brightness(0) invert(1)' }}
        />
      )}
    </div>
  );
};

export default AlertMessage;

