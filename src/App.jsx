import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Cart from './pages/Cart.jsx';
import Layout from './components/Layout.jsx';

const App = () => {
  const [destinations, setDestinations] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://68f5187cb16eb6f468365add.mockapi.io/DestinationsList/destinations')
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar destinos');
        return res.json();
      })
      .then(data => {
        setDestinations(data.map(d => ({ ...d, id: d.id.toString() })));
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleAddDestination = (id) => setSelectedIds([...selectedIds, id]);
  const handleRemoveDestination = (id) => {
    const index = selectedIds.indexOf(id);
    if (index !== -1) {
      const newSelected = [...selectedIds];
      newSelected.splice(index, 1);
      setSelectedIds(newSelected);
    }
  };

  if (loading) return <div className="alert alert-info">Cargando destinos...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <Router>
      <Layout>
        {/* Navegación */}
        <nav className="mb-4">
          <Link to="/" className="me-3">Home</Link>
          <Link to="/cart">Carrito ({selectedIds.length})</Link>
        </nav>

        {/* Rutas */}
        <Routes>
          <Route
            path="/"
            element={
              <Home
                destinations={destinations}
                onAdd={handleAddDestination}
                selectedIds={selectedIds}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                destinations={destinations}
                selectedIds={selectedIds}
                onRemove={handleRemoveDestination}
              />
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;