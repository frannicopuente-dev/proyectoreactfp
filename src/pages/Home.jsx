import React from 'react';
import { useProductos } from '../contexts/ProductosContext';
import DestinationsList from '../components/DestinationsList';
import LoadingSpinner from '../components/common/LoadingSpinner';
import AlertMessage from '../components/common/AlertMessage';
import SearchBar from '../components/common/SearchBar';
import Pagination from '../components/common/Pagination';
import { useProductosFiltrados } from '../hooks/useProductosFiltrados';

/**
 * Página principal que muestra todos los destinos disponibles
 * Incluye búsqueda y paginación
 */
const Home = () => {
  const { productos, loading, error } = useProductos();
  const {
    productosPaginados,
    currentPage,
    totalPages,
    totalItems,
    handleSearch,
    handlePageChange,
  } = useProductosFiltrados(productos, 6);

  if (loading && productos.length === 0) {
    return (
      <div className="container py-5">
        <LoadingSpinner message="Cargando destinos..." />
      </div>
    );
  }

  if (error && productos.length === 0) {
    return (
      <div className="container py-4">
        <AlertMessage
          type="danger"
          message={`Error al cargar los destinos: ${error}`}
        />
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Header con gradiente */}
      <div 
        className="text-center mb-5 p-5 rounded-4 shadow-lg"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}
      >
        <h1 className="fw-bold mb-3 display-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
          🌍 Explorá el mundo con Theo Tour
        </h1>
        <p className="lead mb-0" style={{ fontSize: '1.25rem', opacity: 0.95 }}>
          Descubrí los mejores destinos turísticos para tus próximas vacaciones
        </p>
      </div>

      {/* Barra de búsqueda con estilo mejorado */}
      <div className="mb-4">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Buscar por nombre, descripción o categoría..."
        />
      </div>

      {/* Información de resultados con badge */}
      {totalItems > 0 && (
        <div className="mb-4">
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <span className="badge bg-primary fs-6 px-3 py-2">
              {productosPaginados.length} de {totalItems} destino{totalItems !== 1 ? 's' : ''}
            </span>
            {totalItems !== productos.length && (
              <span className="badge bg-secondary fs-6 px-3 py-2">
                Filtrado de {productos.length} total
              </span>
            )}
          </div>
        </div>
      )}

      {/* Lista de destinos */}
      <DestinationsList destinations={productosPaginados} />

      {/* Mensaje cuando no hay resultados */}
      {totalItems === 0 && productos.length > 0 && (
        <AlertMessage
          type="info"
          message="No se encontraron destinos que coincidan con tu búsqueda. Intenta con otros términos."
        />
      )}

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="mt-5">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Home;