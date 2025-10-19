import React, { useState, useEffect } from 'react';

const DestinationsList = ({ onAdd, selected }) => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://68f5187cb16eb6f468365add.mockapi.io/DestinationsList/destinations')
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar destinos');
        return res.json();
      })
      .then((data) => {
        setDestinations(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="alert alert-info">Cargando destinos...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div>
      <h2 className="mb-3">Destinos Disponibles</h2>
      <div className="row">
        {destinations.map((destination) => {
          const isSelected = selected.some(item => item.id === destination.id);

          return (
            <div key={destination.id} className="col-md-4 mb-4">
              <div 
                className="card h-100 shadow-sm" 
                style={{ position: 'relative', zIndex: 1 }}
              >
                {destination.imageUrl ? (
                  <img
                    src={destination.imageUrl}
                    className="card-img-top"
                    alt={destination.name}
                    style={{ 
                      height: '180px', 
                      objectFit: 'cover',
                      position: 'relative',
                      zIndex: 0 
                    }}
                  />
                ) : (
                  <div
                    className="bg-secondary d-flex justify-content-center align-items-center text-white"
                    style={{ height: '180px', position: 'relative', zIndex: 0 }}
                  >
                    Sin imagen
                  </div>
                )}
                <div className="card-body d-flex flex-column" style={{ position: 'relative', zIndex: 2 }}>
                  <h5 className="card-title">
                    {destination.name} - ${destination.price}
                  </h5>
                  <p className="card-text flex-grow-1">{destination.description}</p>
                  <button
                    className={`btn ${isSelected ? 'btn-success' : 'btn-primary'}`}
                    disabled={isSelected}
                    onClick={() => onAdd(destination)}
                  >
                    {isSelected ? 'Agregado' : 'Agregar'}
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