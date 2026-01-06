import React, { useState, useCallback } from 'react';
import { useProductos } from '../contexts/ProductosContext';
import ProductoForm from '../components/ProductoForm';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import AlertMessage from '../components/common/AlertMessage';
import ProductCard from '../components/common/ProductCard';
import SearchBar from '../components/common/SearchBar';
import Pagination from '../components/common/Pagination';
import { useProductosFiltrados } from '../hooks/useProductosFiltrados';

const Admin = () => {
  const { productos, loading, error, crearProducto, actualizarProducto, eliminarProducto } = useProductos();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [productoEliminando, setProductoEliminando] = useState(null);
  const [loadingOperacion, setLoadingOperacion] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');
  const [errorOperacion, setErrorOperacion] = useState('');

  // Búsqueda y paginación para productos
  const {
    productosPaginados,
    currentPage,
    totalPages,
    totalItems,
    handleSearch,
    handlePageChange,
  } = useProductosFiltrados(productos, 8);

  const limpiarMensajes = useCallback(() => {
    setMensajeExito('');
    setErrorOperacion('');
  }, []);

  const handleCrear = () => {
    setProductoEditando(null);
    setMostrarFormulario(true);
    limpiarMensajes();
  };

  const handleEditar = (producto) => {
    setProductoEditando(producto);
    setMostrarFormulario(true);
    limpiarMensajes();
  };

  const handleEliminar = (producto) => {
    setProductoEliminando(producto);
    limpiarMensajes();
  };

  const handleSubmitForm = async (formData) => {
    setLoadingOperacion(true);
    limpiarMensajes();

    try {
      let resultado;
      if (productoEditando) {
        resultado = await actualizarProducto(productoEditando.id, formData);
      } else {
        resultado = await crearProducto(formData);
      }

      if (resultado.success) {
        setMensajeExito(
          productoEditando
            ? 'Producto actualizado exitosamente'
            : 'Producto creado exitosamente'
        );
        setMostrarFormulario(false);
        setProductoEditando(null);
      } else {
        setErrorOperacion(resultado.error || 'Error al guardar el producto');
      }
    } catch (err) {
      setErrorOperacion('Error inesperado al guardar el producto');
    } finally {
      setLoadingOperacion(false);
    }
  };

  const handleConfirmarEliminacion = async () => {
    if (!productoEliminando) return;

    setLoadingOperacion(true);
    limpiarMensajes();

    try {
      const resultado = await eliminarProducto(productoEliminando.id);
      if (resultado.success) {
        setMensajeExito('Producto eliminado exitosamente');
        setProductoEliminando(null);
      } else {
        setErrorOperacion(resultado.error || 'Error al eliminar el producto');
      }
    } catch (err) {
      setErrorOperacion('Error inesperado al eliminar el producto');
    } finally {
      setLoadingOperacion(false);
    }
  };

  const handleCancelarForm = () => {
    setMostrarFormulario(false);
    setProductoEditando(null);
    limpiarMensajes();
  };

  const handleCancelarEliminacion = () => {
    setProductoEliminando(null);
    limpiarMensajes();
  };

  if (loading && productos.length === 0) {
    return (
      <div className="container py-5">
        <LoadingSpinner message="Cargando productos..." />
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Header con gradiente */}
      <div 
        className="d-flex justify-content-between align-items-center mb-4 p-4 rounded-4 shadow-lg"
        style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          color: 'white'
        }}
      >
        <div>
          <h1 className="mb-1 fw-bold" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
            ⚙️ Administración de Productos
          </h1>
          <p className="mb-0 small opacity-90">
            Gestioná tu catálogo de destinos turísticos
          </p>
        </div>
        {!mostrarFormulario && (
          <button 
            className="btn btn-light btn-lg px-4 fw-bold"
            onClick={handleCrear}
            style={{
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}
          >
            ➕ Agregar Producto
          </button>
        )}
      </div>

      {/* Mensajes de éxito y error */}
      <AlertMessage
        type="success"
        message={mensajeExito}
        dismissible
        onDismiss={() => setMensajeExito('')}
      />
      <AlertMessage
        type="danger"
        message={error || errorOperacion}
        dismissible
        onDismiss={() => setErrorOperacion('')}
      />

      {/* Formulario de crear/editar */}
      {mostrarFormulario && (
        <div className="mb-4">
          <ProductoForm
            producto={productoEditando}
            onSubmit={handleSubmitForm}
            onCancel={handleCancelarForm}
            loading={loadingOperacion}
          />
        </div>
      )}

      {/* Lista de productos con búsqueda y paginación */}
      {!mostrarFormulario && (
        <>
          {/* Barra de búsqueda */}
          {productos.length > 0 && (
            <SearchBar
              onSearch={handleSearch}
              placeholder="Buscar productos por nombre, descripción o categoría..."
            />
          )}

          {/* Información de resultados */}
          {totalItems > 0 && (
            <div className="mb-3">
              <p className="text-muted small mb-0">
                Mostrando {productosPaginados.length} de {totalItems} producto{totalItems !== 1 ? 's' : ''}
                {totalItems !== productos.length && (
                  <span className="ms-2">
                    (filtrado de {productos.length} total)
                  </span>
                )}
              </p>
            </div>
          )}

          {productos.length === 0 ? (
            <AlertMessage
              type="info"
              message="No hay productos disponibles. Agrega tu primer producto."
            />
          ) : totalItems === 0 ? (
            <AlertMessage
              type="info"
              message="No se encontraron productos que coincidan con tu búsqueda. Intenta con otros términos."
            />
          ) : (
            <>
              <div className="row">
                {productosPaginados.map((producto) => (
                  <ProductCard
                    key={producto.id}
                    product={producto}
                    onEdit={handleEditar}
                    onDelete={handleEliminar}
                  />
                ))}
              </div>

              {/* Paginación */}
              {totalPages > 1 && (
                <div className="mt-4">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* Modal de confirmación de eliminación */}
      <ConfirmDeleteModal
        show={productoEliminando !== null}
        producto={productoEliminando}
        onConfirm={handleConfirmarEliminacion}
        onCancel={handleCancelarEliminacion}
        loading={loadingOperacion}
      />
    </div>
  );
};

export default Admin;

