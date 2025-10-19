import React from 'react';

const SelectedDestinations = ({ selectedItems }) => {
  return (
    <div className="mt-5">
      <h2 className="mb-3">Destinos Seleccionados</h2>
      {selectedItems.length === 0 ? (
        <p className="text-muted">No has seleccionado ningún destino todavía.</p>
      ) : (
        <ul className="list-group">
          {selectedItems.map((item, index) => (
            <li key={index} className="list-group-item">
              {item.name} - <strong>${item.price}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectedDestinations;