import { useMemo, useState, useCallback } from 'react';

/**
 * Hook personalizado para filtrar y paginar productos
 * @param {array} productos - Lista completa de productos
 * @param {number} itemsPerPage - Número de items por página
 */
export const useProductosFiltrados = (productos = [], itemsPerPage = 8) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrar productos según el término de búsqueda
  const productosFiltrados = useMemo(() => {
    if (!searchTerm.trim()) {
      return productos;
    }

    const termino = searchTerm.toLowerCase().trim();
    
    return productos.filter(producto => {
      const nombre = (producto.name || '').toLowerCase();
      const descripcion = (producto.description || '').toLowerCase();
      // Buscar categoría en diferentes campos posibles
      const categoria = (
        producto.category || 
        producto.categoria || 
        producto.type ||
        ''
      ).toLowerCase();
      
      // También buscar en el precio como string
      const precio = String(producto.price || '').toLowerCase();
      
      return (
        nombre.includes(termino) ||
        descripcion.includes(termino) ||
        categoria.includes(termino) ||
        precio.includes(termino)
      );
    });
  }, [productos, searchTerm]);

  // Calcular paginación
  const totalPages = Math.ceil(productosFiltrados.length / itemsPerPage);
  
  const productosPaginados = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return productosFiltrados.slice(startIndex, endIndex);
  }, [productosFiltrados, currentPage, itemsPerPage]);

  // Resetear a página 1 cuando cambia el término de búsqueda
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  }, []);

  // Cambiar de página
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  return {
    productosFiltrados,
    productosPaginados,
    searchTerm,
    currentPage,
    totalPages,
    totalItems: productosFiltrados.length,
    handleSearch,
    handlePageChange,
  };
};

