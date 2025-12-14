import React, { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  useMemo, 
  useCallback 
} from 'react';

const ProductosContext = createContext();

const API_URL = 'https://68f5187cb16eb6f468365add.mockapi.io/DestinationsList/destinations';

export const useProductos = () => {
  const context = useContext(ProductosContext);
  if (!context) {
    throw new Error('useProductos debe ser usado dentro de un ProductosProvider');
  }
  return context;
};

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar productos desde MockAPI
  const cargarProductos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Error al cargar productos: ${response.status} ${response.statusText}. ${errorText}`
        );
      }
      
      const data = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error('La respuesta de la API no es un array válido');
      }
      
      setProductos(data.map(d => ({ ...d, id: d.id.toString() })));
    } catch (err) {
      const errorMsg = err.message || 'Error al cargar los productos. Por favor, intenta nuevamente.';
      setError(errorMsg);
      console.error('Error al cargar productos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar productos al montar el componente
  useEffect(() => {
    cargarProductos();
  }, [cargarProductos]);

  // Crear un nuevo producto
  const crearProducto = useCallback(async (producto) => {
    setError(null);
    try {
      // Validación adicional antes de enviar
      if (!producto.nombre || !producto.precio || !producto.descripcion) {
        throw new Error('Todos los campos obligatorios deben estar completos');
      }

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: producto.nombre.trim(),
          price: parseFloat(producto.precio),
          description: producto.descripcion.trim(),
          imageUrl: producto.imageUrl?.trim() || '',
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Error al crear el producto: ${response.status} ${response.statusText}. ${errorText}`
        );
      }

      const nuevoProducto = await response.json();
      
      if (!nuevoProducto || !nuevoProducto.id) {
        throw new Error('La respuesta de la API no contiene un producto válido');
      }
      
      setProductos(prev => [...prev, { ...nuevoProducto, id: nuevoProducto.id.toString() }]);
      return { success: true, producto: nuevoProducto };
    } catch (err) {
      const errorMsg = err.message || 'Error al crear el producto. Por favor, verifica los datos e intenta nuevamente.';
      setError(errorMsg);
      console.error('Error al crear producto:', err);
      return { success: false, error: errorMsg };
    }
  }, []);

  // Actualizar un producto existente
  const actualizarProducto = useCallback(async (id, producto) => {
    setError(null);
    try {
      if (!id) {
        throw new Error('ID del producto no válido');
      }

      // Validación adicional antes de enviar
      if (!producto.nombre || !producto.precio || !producto.descripcion) {
        throw new Error('Todos los campos obligatorios deben estar completos');
      }

      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: producto.nombre.trim(),
          price: parseFloat(producto.precio),
          description: producto.descripcion.trim(),
          imageUrl: producto.imageUrl?.trim() || '',
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Error al actualizar el producto: ${response.status} ${response.statusText}. ${errorText}`
        );
      }

      const productoActualizado = await response.json();
      
      if (!productoActualizado || !productoActualizado.id) {
        throw new Error('La respuesta de la API no contiene un producto válido');
      }
      
      setProductos(prev =>
        prev.map(p => (p.id === id ? { ...productoActualizado, id: productoActualizado.id.toString() } : p))
      );
      return { success: true, producto: productoActualizado };
    } catch (err) {
      const errorMsg = err.message || 'Error al actualizar el producto. Por favor, verifica los datos e intenta nuevamente.';
      setError(errorMsg);
      console.error('Error al actualizar producto:', err);
      return { success: false, error: errorMsg };
    }
  }, []);

  // Eliminar un producto
  const eliminarProducto = useCallback(async (id) => {
    setError(null);
    try {
      if (!id) {
        throw new Error('ID del producto no válido');
      }

      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Error al eliminar el producto: ${response.status} ${response.statusText}. ${errorText}`
        );
      }

      setProductos(prev => prev.filter(p => p.id !== id));
      return { success: true };
    } catch (err) {
      const errorMsg = err.message || 'Error al eliminar el producto. Por favor, intenta nuevamente.';
      setError(errorMsg);
      console.error('Error al eliminar producto:', err);
      return { success: false, error: errorMsg };
    }
  }, []);

  const value = useMemo(() => ({
    productos,
    loading,
    error,
    cargarProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
  }), [
    productos,
    loading,
    error,
    cargarProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
  ]);

  return (
    <ProductosContext.Provider value={value}>
      {children}
    </ProductosContext.Provider>
  );
};

