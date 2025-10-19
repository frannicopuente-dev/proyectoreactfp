import React, { useState, useEffect } from 'react';
import Layout from './components/Layout.jsx';
import DestinationsList from './components/DestinationsList.jsx';
import SelectedDestinations from './components/SelectedDestinations.jsx';

const App = () => {
  const [destinations, setDestinations] = useState([]); // lista completa de destinos
  const [selectedIds, setSelectedIds] = useState([]);   // IDs como strings
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar destinos desde la API
  useEffect(() => {
    fetch('https://68f5187cb16eb6f468365add.mockapi.io/DestinationsList/destinations')
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar destinos');
        return res.json();
      })
      .then(data => {
        // Normalizamos todos los IDs como strings
        const normalizedData = data.map(d => ({ ...d, id: d.id.toString() }));
        setDestinations(normalizedData);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Agregar destino por ID
  const handleAddDestination = (id) => {
    setSelectedIds([...selectedIds, id.toString()]);
  };

  // Eliminar una instancia de un destino por ID
  const handleRemoveDestination = (id) => {
    const index = selectedIds.indexOf(id.toString());
    if (index !== -1) {
      const newSelected = [...selectedIds];
      newSelected.splice(index, 1);
      setSelectedIds(newSelected);
    }
  };

  if (loading) return <div className="alert alert-info">Cargando destinos...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <Layout>
      <h1 className="mb-4">Explorá el mundo con Theo Tour 🌍</h1>
      <DestinationsList
        destinations={destinations}
        onAdd={handleAddDestination}
        selectedIds={selectedIds}
      />
      <SelectedDestinations
        destinations={destinations}
        selectedIds={selectedIds}
        onRemove={handleRemoveDestination}
      />
    </Layout>
  );
};

export default App;