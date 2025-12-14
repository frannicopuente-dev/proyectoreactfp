import React, { useMemo } from 'react';
import { useCarrito } from '../contexts/CarritoContext';
import ProductCard from './common/ProductCard';
import AlertMessage from './common/AlertMessage';

/**
 * Componente que muestra los destinos seleccionados en el carrito
 */
const SelectedDestinations = ({ destinations = [] }) => {
  const { 
    obtenerItemsUnicos, 
    eliminarDelCarrito, 
    vaciarCarrito, 
    obtenerTotal 
  } = useCarrito();

  const uniqueDestinations = useMemo(
    () => obtenerItemsUnicos(destinations),
    [destinations, obtenerItemsUnicos]
  );

  const totalPrice = useMemo(
    () => obtenerTotal(destinations),
    [destinations, obtenerTotal]
  );

  if (uniqueDestinations.length === 0) {
    return (
      <AlertMessage
        type="info"
        message="No has seleccionado ningún destino aún."
      />
    );
  }

  return (
    <div className="mt-4">
      <div 
        className="d-flex justify-content-between align-items-center mb-4 p-3 rounded-4"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}
      >
        <div>
          <h2 className="mb-1 fw-bold">🛒 Destinos Seleccionados</h2>
          <p className="mb-0 small opacity-90">
            Revisá tus productos antes de finalizar
          </p>
        </div>
        <button
          className="btn btn-light btn-lg fw-bold"
          onClick={vaciarCarrito}
          aria-label="Vaciar carrito"
          style={{
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
          }}
        >
          🗑️ Vaciar Carrito
        </button>
      </div>
      
      <div className="row">
        {uniqueDestinations.map(dest => (
          <div key={dest.id} className="col-md-4 mb-3">
            <div 
              className="card h-100 border-0 shadow-sm"
              style={{
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                background: 'linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }}
            >
              {dest.imageUrl ? (
                <img
                  src={dest.imageUrl}
                  alt={dest.name}
                  className="card-img-top"
                  style={{ 
                    height: '180px', 
                    objectFit: 'cover',
                    transition: 'transform 0.3s'
                  }}
                  loading="lazy"
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
              ) : (
                <div
                  className="d-flex justify-content-center align-items-center text-white"
                  style={{ 
                    height: '180px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  }}
                >
                  <span style={{ fontSize: '3rem' }}>🌍</span>
                </div>
              )}
              <div className="card-body d-flex flex-column p-3">
                <h5 className="card-title fw-bold text-primary">{dest.name}</h5>
                <div className="mb-2">
                  <span className="text-muted small">Precio unitario: </span>
                  <span 
                    className="badge px-2 py-1"
                    style={{
                      background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                      color: 'white'
                    }}
                  >
                    ${dest.price}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="text-muted small">Cantidad: </span>
                  <span className="badge bg-primary">{dest.count}</span>
                </div>
                <div 
                  className="p-2 rounded mb-3"
                  style={{ background: '#e7f3ff' }}
                >
                  <p className="card-text fw-bold text-primary mb-0">
                    💰 Subtotal: ${(dest.price * dest.count).toFixed(2)}
                  </p>
                </div>
                <button
                  className="btn btn-danger mt-auto fw-semibold"
                  onClick={() => eliminarDelCarrito(dest.id)}
                  aria-label={`Eliminar ${dest.name} del carrito`}
                  style={{
                    background: 'linear-gradient(135deg, #f5576c 0%, #c92a2a 100%)',
                    border: 'none'
                  }}
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div 
        className="mt-4 p-4 rounded-4 shadow-lg"
        style={{
          background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
          color: 'white'
        }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0 text-white fw-bold">💰 Total a pagar:</h4>
          <h3 className="mb-0 text-white fw-bold">
            ${totalPrice.toFixed(2)}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default SelectedDestinations;