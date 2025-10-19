import React from 'react';

const DestinationsList = ({ destinations, onAdd, selectedIds }) => {
  return (
    <div>
      <h2 className="mb-3">Destinos Disponibles</h2>
      <div className="row">
        {destinations.map(destination => {
          // Contador de cuántas veces está seleccionado
          const count = selectedIds.filter(id => id === destination.id).length;

          return (
            <div key={destination.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                {destination.imageUrl ? (
                  <img
                    src={destination.imageUrl}
                    alt={destination.name}
                    className="card-img-top"
                    style={{ height: '180px', objectFit: 'cover' }}
                  />
                ) : (
                  <div
                    className="bg-secondary d-flex justify-content-center align-items-center text-white"
                    style={{ height: '180px' }}
                  >
                    Sin imagen
                  </div>
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{destination.name} - ${destination.price}</h5>
                  <p className="card-text flex-grow-1">{destination.description}</p>

                  {/* Contador en tiempo real */}
                  {count > 0 && (
                    <p className="text-muted mb-1">Seleccionado: {count} veces</p>
                  )}

                  <button
                    className="btn btn-primary"
                    onClick={() => onAdd(destination.id)}
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DestinationsList;