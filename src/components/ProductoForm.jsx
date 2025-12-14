import React, { useState, useEffect } from 'react';

const ProductoForm = ({ producto, onSubmit, onCancel, loading = false }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    imageUrl: '',
  });
  const [errores, setErrores] = useState({});

  // Si hay un producto, cargar sus datos (modo edición)
  useEffect(() => {
    if (producto) {
      setFormData({
        nombre: producto.name || '',
        precio: producto.price || '',
        descripcion: producto.description || '',
        imageUrl: producto.imageUrl || '',
      });
    }
  }, [producto]);

  const validar = () => {
    const nuevosErrores = {};

    // Validar nombre (obligatorio)
    const nombreTrimmed = formData.nombre.trim();
    if (!nombreTrimmed) {
      nuevosErrores.nombre = 'El nombre es obligatorio';
    } else if (nombreTrimmed.length < 3) {
      nuevosErrores.nombre = 'El nombre debe tener al menos 3 caracteres';
    } else if (nombreTrimmed.length > 100) {
      nuevosErrores.nombre = 'El nombre no puede exceder 100 caracteres';
    }

    // Validar precio (mayor a 0)
    const precio = parseFloat(formData.precio);
    if (!formData.precio || formData.precio.trim() === '') {
      nuevosErrores.precio = 'El precio es obligatorio';
    } else if (isNaN(precio)) {
      nuevosErrores.precio = 'El precio debe ser un número válido';
    } else if (precio <= 0) {
      nuevosErrores.precio = 'El precio debe ser mayor a 0';
    } else if (precio > 999999.99) {
      nuevosErrores.precio = 'El precio no puede exceder 999,999.99';
    }

    // Validar descripción (mínimo 10 caracteres)
    const descripcionTrimmed = formData.descripcion.trim();
    if (!descripcionTrimmed) {
      nuevosErrores.descripcion = 'La descripción es obligatoria';
    } else if (descripcionTrimmed.length < 10) {
      nuevosErrores.descripcion = 'La descripción debe tener al menos 10 caracteres';
    } else if (descripcionTrimmed.length > 500) {
      nuevosErrores.descripcion = 'La descripción no puede exceder 500 caracteres';
    }

    // Validar URL de imagen (si se proporciona)
    if (formData.imageUrl && formData.imageUrl.trim()) {
      try {
        new URL(formData.imageUrl.trim());
      } catch {
        nuevosErrores.imageUrl = 'La URL de la imagen no es válida';
      }
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errores[name]) {
      setErrores(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validar()) {
      onSubmit(formData);
    }
  };

  return (
    <div 
      className="card border-0 shadow-lg"
      style={{
        background: 'linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)'
      }}
    >
      <div 
        className="card-header border-0 py-3"
        style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          color: 'white'
        }}
      >
        <h3 className="card-title mb-0 fw-bold">
          {producto ? '✏️ Editar Producto' : '➕ Agregar Nuevo Producto'}
        </h3>
      </div>
      <div className="card-body p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Nombre del destino"
            />
            {errores.nombre && (
              <div className="invalid-feedback">{errores.nombre}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="precio" className="form-label">
              Precio <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              className={`form-control ${errores.precio ? 'is-invalid' : ''}`}
              id="precio"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              placeholder="0.00"
            />
            {errores.precio && (
              <div className="invalid-feedback">{errores.precio}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">
              Descripción <span className="text-danger">*</span>
            </label>
            <textarea
              className={`form-control ${errores.descripcion ? 'is-invalid' : ''}`}
              id="descripcion"
              name="descripcion"
              rows="4"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Descripción del destino (mínimo 10 caracteres)"
            />
            {errores.descripcion && (
              <div className="invalid-feedback">{errores.descripcion}</div>
            )}
            <div className="form-text">
              {formData.descripcion.length}/10 caracteres mínimos 
              {formData.descripcion.length >= 10 && formData.descripcion.length <= 500 && (
                <span className="text-success"> ✓</span>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="imageUrl" className="form-label">
              URL de Imagen
            </label>
            <input
              type="url"
              className="form-control"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
            <div className="form-text">Opcional: URL de la imagen del destino</div>
          </div>

          <div className="d-flex gap-2 justify-content-end mt-4">
            {onCancel && (
              <button
                type="button"
                className="btn btn-secondary btn-lg"
                onClick={onCancel}
                disabled={loading}
              >
                ❌ Cancelar
              </button>
            )}
            <button
              type="submit"
              className="btn btn-primary btn-lg fw-bold"
              disabled={loading}
              style={{
                background: loading ? '#6c757d' : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                border: 'none',
                boxShadow: loading ? 'none' : '0 4px 15px rgba(240, 147, 251, 0.4)',
                transition: 'all 0.3s'
              }}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Guardando...
                </>
              ) : (
                producto ? '✅ Actualizar' : '✨ Crear'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductoForm;

