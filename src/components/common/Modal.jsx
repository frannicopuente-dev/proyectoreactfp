import React, { useEffect } from 'react';

/**
 * Componente reutilizable para modales
 * @param {boolean} show - Controla si el modal está visible
 * @param {string|node} title - Título del modal
 * @param {node} children - Contenido del modal
 * @param {function} onClose - Función para cerrar el modal
 * @param {node} footer - Contenido del footer (opcional)
 * @param {string} size - Tamaño del modal: 'sm', 'lg', 'xl' o undefined para normal
 */
const Modal = ({ show, title, children, onClose, footer, size }) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
      tabIndex="-1"
      role="dialog"
      onClick={onClose}
    >
      <div 
        className={`modal-dialog modal-dialog-centered modal-dialog-scrollable ${size ? `modal-${size}` : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '15px', overflow: 'hidden' }}>
          <div 
            className="modal-header border-0"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white'
            }}
          >
            <h5 className="modal-title fw-bold mb-0">{title}</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              aria-label="Cerrar"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>
          <div className="modal-body p-4">
            {children}
          </div>
          {footer && (
            <div 
              className="modal-footer border-0"
              style={{
                background: '#f8f9fa'
              }}
            >
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;

