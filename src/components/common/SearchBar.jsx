import React, { useState, useEffect } from 'react';

/**
 * Componente de barra de búsqueda
 * @param {function} onSearch - Función que se ejecuta cuando cambia la búsqueda
 * @param {string} placeholder - Texto placeholder para el input
 * @param {number} debounceMs - Tiempo de espera antes de ejecutar la búsqueda (ms)
 */
const SearchBar = ({ onSearch, placeholder = 'Buscar productos...', debounceMs = 300 }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch, debounceMs]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <div className="search-bar mb-4">
      <div 
        className="input-group shadow-sm"
        style={{
          borderRadius: '15px',
          overflow: 'hidden'
        }}
      >
        <span 
          className="input-group-text border-0"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            fontWeight: 'bold'
          }}
        >
          🔍
        </span>
        <input
          type="text"
          className="form-control form-control-lg border-0"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleChange}
          aria-label="Buscar productos"
          style={{
            background: '#f8f9fa',
            transition: 'background 0.3s'
          }}
          onFocus={(e) => e.target.style.background = '#ffffff'}
          onBlur={(e) => e.target.style.background = '#f8f9fa'}
        />
        {searchTerm && (
          <button
            className="btn border-0"
            type="button"
            onClick={handleClear}
            aria-label="Limpiar búsqueda"
            title="Limpiar búsqueda"
            style={{
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white'
            }}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

