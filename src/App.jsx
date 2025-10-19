import React, { useState } from 'react';
import Layout from './components/Layout.jsx';
import DestinationsList from './components/DestinationsList.jsx';
import SelectedDestinations from './components/SelectedDestinations.jsx';

const App = () => {
  const [selected, setSelected] = useState([]);

  const handleAddDestination = (destination) => {
    // Solo agrega si no está ya seleccionado
    if (!selected.some(item => item.id === destination.id)) {
      setSelected([...selected, destination]);
    }
  };

  return (
    <Layout>
      <h1 className="mb-4">Explorá el mundo con Theo Tour 🌍</h1>
      <DestinationsList onAdd={handleAddDestination} selected={selected} />
      <SelectedDestinations selectedItems={selected} />
    </Layout>
  );
};

export default App;