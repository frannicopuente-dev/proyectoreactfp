import React from 'react';
import { useProductos } from '../contexts/ProductosContext';
import SelectedDestinations from '../components/SelectedDestinations';

/**
 * Página del carrito de compras
 */
const Cart = () => {
  const { productos } = useProductos();

  return (
    <div className="container py-4">
      <div className="mb-4">
        <h1 className="text-primary fw-bold">Tu Carrito de Compras</h1>
        <p className="text-muted">
          Revisá tus destinos seleccionados antes de finalizar tu compra
        </p>
      </div>
      <SelectedDestinations destinations={productos} />
    </div>
  );
};

export default Cart;