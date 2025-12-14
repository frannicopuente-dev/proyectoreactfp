import React, { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  useMemo, 
  useCallback 
} from 'react';

const CarritoContext = createContext();

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe ser usado dentro de un CarritoProvider');
  }
  return context;
};

export const CarritoProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      try {
        setItems(JSON.parse(carritoGuardado));
      } catch (error) {
        console.error('Error al cargar el carrito:', error);
      }
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(items));
  }, [items]);

  const agregarAlCarrito = useCallback((destinoId) => {
    setItems(prevItems => [...prevItems, destinoId]);
  }, []);

  const eliminarDelCarrito = useCallback((destinoId) => {
    setItems(prevItems => {
      const index = prevItems.indexOf(destinoId);
      if (index !== -1) {
        const nuevosItems = [...prevItems];
        nuevosItems.splice(index, 1);
        return nuevosItems;
      }
      return prevItems;
    });
  }, []);

  const vaciarCarrito = useCallback(() => {
    setItems([]);
    localStorage.removeItem('carrito');
  }, []);

  const cantidad = useMemo(() => items.length, [items.length]);
  
  const obtenerCantidad = useCallback(() => {
    return cantidad;
  }, [cantidad]);

  const obtenerItemsUnicos = useCallback((destinations) => {
    if (!destinations || destinations.length === 0) return [];
    
    const counts = items.reduce((acc, id) => {
      if (acc[id]) {
        acc[id].count += 1;
      } else {
        const dest = destinations.find(d => d.id === id);
        if (dest) acc[id] = { ...dest, count: 1 };
      }
      return acc;
    }, {});
    return Object.values(counts);
  }, [items]);

  const obtenerTotal = useCallback((destinations) => {
    const itemsUnicos = obtenerItemsUnicos(destinations);
    return itemsUnicos.reduce(
      (sum, dest) => sum + (parseFloat(dest.price) || 0) * dest.count,
      0
    );
  }, [obtenerItemsUnicos]);

  const value = useMemo(() => ({
    items,
    agregarAlCarrito,
    eliminarDelCarrito,
    vaciarCarrito,
    obtenerCantidad,
    obtenerItemsUnicos,
    obtenerTotal
  }), [
    items,
    agregarAlCarrito,
    eliminarDelCarrito,
    vaciarCarrito,
    obtenerCantidad,
    obtenerItemsUnicos,
    obtenerTotal
  ]);

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  );
};

