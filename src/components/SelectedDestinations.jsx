import React from 'react';

const SelectedDestinations = ({ destinations, selectedIds, onRemove }) => {
  // Contador de cada destino
  const counts = selectedIds.reduce((acc, id) => {
    if (acc[id]) {
      acc[id].count += 1;
    } else {
      const dest = destinations.find(d => d.id === id);
      if (dest) acc[id] = { ...dest, count: 1 };
    }
    return acc;
  }, {});

  const uniqueDestinations = Object.values(counts);

  // Calcular precio total
  const totalPrice = uniqueDestinations.reduce(
    (sum, dest) => sum + dest.price * dest.count,
    0
  );

  if (selectedIds.length === 0) {
    return <div className="alert alert-info">No has seleccionado ningún destino aún.</div>;
  }

  return (
    <div className="mt-4">
      <h2>Destinos Seleccionados</h2>
      <div className="row">
        {uniqueDestinations.map(dest => (
          <div key={dest.id} className="col-md-4 mb-3">
            <div className="card h-100 shadow-sm">
              {dest.imageUrl ? (
                <img
                  src={dest.imageUrl}
                  alt={dest.name}
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
              <div className="card-body">
                <h5 className="card-title">{dest.name}</h5>
                <p className="card-text">
                  Precio: ${dest.price} × {dest.count} = ${dest.price * dest.count}
                </p>
                <button
                  className="btn btn-danger"
                  onClick={() => onRemove(dest.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Precio total */}
      <div className="alert alert-success mt-3">
        <h4>Total: ${totalPrice}</h4>
      </div>
    </div>
  );
};

export default SelectedDestinations;