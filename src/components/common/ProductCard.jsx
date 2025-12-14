import React from 'react';

/**
 * Componente reutilizable para mostrar una tarjeta de producto
 * @param {object} product - Objeto del producto
 * @param {function} onAddToCart - Función para agregar al carrito (opcional)
 * @param {function} onEdit - Función para editar (opcional)
 * @param {function} onDelete - Función para eliminar (opcional)
 * @param {number} count - Cantidad de veces seleccionado (opcional)
 */
const ProductCard = ({ 
  product, 
  onAddToCart, 
  onEdit, 
  onDelete, 
  count = 0 
}) => {
  const { id, name, price, description, imageUrl } = product;

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div 
        className="card h-100 border-0 shadow-sm"
        style={{
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px)';
          e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        }}
      >
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="card-img-top"
              style={{ 
                height: '200px', 
                objectFit: 'cover',
                transition: 'transform 0.3s ease'
              }}
              loading="lazy"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />
          ) : (
            <div
              className="d-flex justify-content-center align-items-center text-white"
              style={{ 
                height: '200px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              }}
            >
              <span style={{ fontSize: '3rem' }}>🌍</span>
            </div>
          )}
          {count > 0 && (
            <div 
              className="position-absolute top-0 end-0 m-2"
              style={{
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: 'bold',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
              }}
            >
              {count}x
            </div>
          )}
        </div>
        <div className="card-body d-flex flex-column p-3">
          <h5 className="card-title fw-bold mb-2" style={{ 
            color: '#2c3e50',
            minHeight: '48px'
          }}>
            {name}
          </h5>
          <div className="mb-2">
            <span 
              className="badge px-3 py-2 fs-6"
              style={{
                background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                color: 'white'
              }}
            >
              ${price}
            </span>
          </div>
          <p className="card-text flex-grow-1 text-muted small mb-3" style={{ 
            minHeight: '60px',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {description}
          </p>
          
          {count > 0 && (
            <div className="mb-2 p-2 rounded" style={{ background: '#e7f3ff' }}>
              <p className="text-primary mb-0 small fw-semibold">
                ✓ Seleccionado: {count} {count === 1 ? 'vez' : 'veces'}
              </p>
            </div>
          )}

          <div className="d-flex gap-2 mt-auto flex-wrap">
            {onAddToCart && (
              <button
                className="btn btn-primary flex-grow-1 fw-semibold"
                onClick={() => onAddToCart(id)}
                aria-label={`Agregar ${name} al carrito`}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
                }}
              >
                <span className="d-none d-sm-inline">🛒 Agregar</span>
                <span className="d-sm-none">+</span>
              </button>
            )}
            {onEdit && (
              <button
                className="btn btn-warning btn-sm flex-grow-1 fw-semibold"
                onClick={() => onEdit(product)}
                aria-label={`Editar ${name}`}
                style={{
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  border: 'none',
                  color: 'white'
                }}
              >
                ✏️ Editar
              </button>
            )}
            {onDelete && (
              <button
                className="btn btn-danger btn-sm flex-grow-1 fw-semibold"
                onClick={() => onDelete(product)}
                aria-label={`Eliminar ${name}`}
              >
                🗑️ Eliminar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

