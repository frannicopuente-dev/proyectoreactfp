import React from 'react';
import DestinationsList from '../components/DestinationsList.jsx';

const Home = ({ destinations, onAdd, selectedIds }) => {
  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center text-primary fw-bold">
        Explorá el mundo con Theo Tour 🌍
      </h1>
      <DestinationsList
        destinations={destinations}
        onAdd={onAdd}
        selectedIds={selectedIds}
      />
    </div>
  );
};

export default Home;