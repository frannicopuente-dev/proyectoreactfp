import React from 'react';
import SelectedDestinations from '../components/SelectedDestinations.jsx';

const Cart = ({ destinations, selectedIds, onRemove }) => {
  return (
    <div>
      <h1>Tu Carrito</h1>
      <SelectedDestinations
        destinations={destinations}
        selectedIds={selectedIds}
        onRemove={onRemove}
      />
    </div>
  );
};

export default Cart;