import React, { useMemo } from 'react';
import { useCarrito } from '../contexts/CarritoContext';
import ProductCard from './common/ProductCard';

/**
 * Componente que muestra la lista de destinos disponibles
 */
const DestinationsList = ({ destinations = [] }) => {
  const { items, agregarAlCarrito } = useCarrito();

  // Calcular conteos de manera eficiente
  const itemCounts = useMemo(() => {
    return items.reduce((acc, id) => {
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    }, {});
  }, [items]);

  if (destinations.length === 0) {
    return (
      <div className="alert alert-info">
        No hay destinos disponibles en este momento.
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex align-items-center gap-3 mb-4">
        <div className="flex-grow-1">
          <h2 className="mb-0 fw-bold" style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            ✈️ Destinos Disponibles
          </h2>
          <p className="text-muted small mb-0 mt-1">
            Seleccioná tus destinos favoritos y agregalos al carrito
          </p>
        </div>
      </div>
      <div className="row g-4">
        {destinations.map(destination => (
          <ProductCard
            key={destination.id}
            product={destination}
            onAddToCart={agregarAlCarrito}
            count={itemCounts[destination.id] || 0}
          />
        ))}
      </div>
    </div>
  );
};

export default DestinationsList;