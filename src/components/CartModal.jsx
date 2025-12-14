import React, { useMemo } from 'react';
import { useProductos } from '../contexts/ProductosContext';
import { useCarrito } from '../contexts/CarritoContext';
import Modal from './common/Modal';
import AlertMessage from './common/AlertMessage';

/**
 * Modal del carrito de compras
 */
const CartModal = ({ show, onClose }) => {
  const { productos } = useProductos();
  const { 
    obtenerItemsUnicos, 
    eliminarDelCarrito, 
    vaciarCarrito, 
    obtenerTotal 
  } = useCarrito();

  const uniqueDestinations = useMemo(
    () => obtenerItemsUnicos(productos),
    [productos, obtenerItemsUnicos]
  );

  const totalPrice = useMemo(
    () => obtenerTotal(productos),
    [productos, obtenerTotal]
  );

  const handleVaciarCarrito = () => {
    if (window.confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
      vaciarCarrito();
    }
  };

  const footer = (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={onClose}
      >
        Cerrar
      </button>
      {uniqueDestinations.length > 0 && (
        <>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={handleVaciarCarrito}
          >
            🗑️ Vaciar Carrito
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              alert('Funcionalidad de compra próximamente disponible');
            }}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none'
            }}
          >
            ✅ Finalizar Compra
          </button>
        </>
      )}
    </>
  );

  return (
    <Modal
      show={show}
      size="lg"
      title={
        <div className="d-flex align-items-center justify-content-between w-100">
          <div className="d-flex align-items-center gap-2">
            <span className="fs-4">🛒</span>
            <span className="fw-bold">Tu Carrito de Compras</span>
          </div>
          {uniqueDestinations.length > 0 && (
            <span className="badge bg-primary fs-6 px-3 py-2">
              {uniqueDestinations.length} {uniqueDestinations.length === 1 ? 'item' : 'items'}
            </span>
          )}
        </div>
      }
      onClose={onClose}
      footer={footer}
    >
      {uniqueDestinations.length === 0 ? (
        <div className="text-center py-5">
          <div className="mb-4" style={{ fontSize: '4rem' }}>🛒</div>
          <AlertMessage
            type="info"
            message="No has seleccionado ningún destino aún."
          />
          <button
            className="btn btn-primary btn-lg mt-4 px-4"
            onClick={onClose}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none'
            }}
          >
            ✈️ Explorar Destinos
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-3 p-3 rounded" style={{ background: '#f8f9fa' }}>
            <p className="text-muted small mb-0">
              <strong>{uniqueDestinations.length}</strong> {uniqueDestinations.length === 1 ? 'producto' : 'productos'} en tu carrito
            </p>
          </div>
          
          <div className="cart-items" style={{ maxHeight: '450px', overflowY: 'auto', paddingRight: '10px' }}>
            {uniqueDestinations.map(dest => (
              <div 
                key={dest.id} 
                className="card mb-3 shadow-sm border-0"
                style={{
                  background: 'linear-gradient(to right, #ffffff 0%, #f8f9fa 100%)',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                }}
              >
                <div className="card-body p-3">
                  <div className="row align-items-center g-3">
                    <div className="col-3 col-md-2">
                      {dest.imageUrl ? (
                        <img
                          src={dest.imageUrl}
                          alt={dest.name}
                          className="img-fluid rounded shadow-sm"
                          style={{ height: '80px', width: '100%', objectFit: 'cover' }}
                          loading="lazy"
                        />
                      ) : (
                        <div
                          className="bg-gradient d-flex justify-content-center align-items-center text-white rounded shadow-sm"
                          style={{ 
                            height: '80px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                          }}
                        >
                          <span className="small">📷</span>
                        </div>
                      )}
                    </div>
                    <div className="col-9 col-md-6">
                      <h6 className="card-title mb-2 fw-bold text-primary">{dest.name}</h6>
                      <div className="small text-muted mb-1">
                        <span>Precio unitario: </span>
                        <span className="fw-semibold text-success">${dest.price}</span>
                      </div>
                      <div className="small text-muted">
                        <span>Cantidad: </span>
                        <span className="badge bg-primary">{dest.count}</span>
                      </div>
                    </div>
                    <div className="col-12 col-md-4 text-md-end">
                      <div className="mb-2 p-2 rounded" style={{ background: '#e7f3ff' }}>
                        <span className="text-muted small d-block">Subtotal:</span>
                        <span className="fw-bold text-primary fs-5">
                          ${(dest.price * dest.count).toFixed(2)}
                        </span>
                      </div>
                      <button
                        className="btn btn-sm btn-outline-danger w-100 w-md-auto"
                        onClick={() => eliminarDelCarrito(dest.id)}
                        aria-label={`Eliminar ${dest.name} del carrito`}
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div 
            className="border-top pt-4 mt-4 p-3 rounded"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white'
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0 text-white">Total a pagar:</h5>
              <h4 className="mb-0 text-white fw-bold">
                ${totalPrice.toFixed(2)}
              </h4>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default CartModal;

