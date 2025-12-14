import React from 'react';
import Modal from './common/Modal';

/**
 * Modal de confirmación para eliminar un producto
 */
const ConfirmDeleteModal = ({ show, producto, onConfirm, onCancel, loading = false }) => {
  const footer = (
    <>
      <button
        type="button"
        className="btn btn-secondary btn-lg"
        onClick={onCancel}
        disabled={loading}
      >
        ❌ Cancelar
      </button>
      <button
        type="button"
        className="btn btn-danger btn-lg fw-bold"
        onClick={onConfirm}
        disabled={loading}
        style={{
          background: loading ? '#6c757d' : 'linear-gradient(135deg, #f5576c 0%, #c92a2a 100%)',
          border: 'none',
          boxShadow: loading ? 'none' : '0 4px 15px rgba(245, 87, 108, 0.4)'
        }}
      >
        {loading ? (
          <>
            <span 
              className="spinner-border spinner-border-sm me-2" 
              role="status" 
              aria-hidden="true"
            />
            Eliminando...
          </>
        ) : (
          '🗑️ Eliminar'
        )}
      </button>
    </>
  );

  return (
    <Modal
      show={show}
      title={
        <div className="d-flex align-items-center gap-2">
          <span style={{ fontSize: '1.5rem' }}>⚠️</span>
          <span className="fw-bold">Confirmar Eliminación</span>
        </div>
      }
      onClose={onCancel}
      footer={footer}
    >
      <div className="p-3">
        <div 
          className="p-4 rounded mb-3 text-center"
          style={{
            background: 'linear-gradient(135deg, #fff5f5 0%, #ffe0e0 100%)',
            border: '2px solid #f5576c'
          }}
        >
          <p className="mb-2 fs-5">
            ¿Estás seguro de que deseas eliminar el producto{' '}
            <strong className="text-danger">{producto?.name}</strong>?
          </p>
        </div>
        <div 
          className="p-3 rounded"
          style={{ background: '#fff5f5' }}
        >
          <p className="text-danger mb-0 fw-semibold">
            ⚠️ Esta acción no se puede deshacer.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;

