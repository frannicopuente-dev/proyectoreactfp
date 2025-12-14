import React, { useState, useEffect, useRef } from 'react';

/**
 * Componente de paginación mejorado
 * @param {number} currentPage - Página actual
 * @param {number} totalPages - Total de páginas
 * @param {function} onPageChange - Función que se ejecuta al cambiar de página
 * @param {number} maxVisiblePages - Número máximo de páginas visibles
 * @param {boolean} showJumpToPage - Mostrar opción de saltar a página específica
 */
const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  maxVisiblePages = 5,
  showJumpToPage = true
}) => {
  const [jumpToPage, setJumpToPage] = useState('');
  const [showJumpInput, setShowJumpInput] = useState(false);
  const jumpInputRef = useRef(null);

  useEffect(() => {
    if (showJumpInput && jumpInputRef.current) {
      jumpInputRef.current.focus();
    }
  }, [showJumpInput]);

  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages = [];
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start < maxVisiblePages - 1) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
      // Scroll suave hacia arriba
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleJumpToPage = (e) => {
    e.preventDefault();
    const page = parseInt(jumpToPage);
    if (page >= 1 && page <= totalPages) {
      handlePageChange(page);
      setJumpToPage('');
      setShowJumpInput(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleJumpToPage(e);
    } else if (e.key === 'Escape') {
      setShowJumpInput(false);
      setJumpToPage('');
    }
  };

  return (
    <div className="pagination-wrapper">
      <nav aria-label="Navegación de páginas">
        <ul className="pagination justify-content-center mb-3">
          {/* Botón Primera Página */}
          {currentPage > 2 && (
            <li className="page-item">
              <button
                className="page-link border-0"
                onClick={() => handlePageChange(1)}
                aria-label="Ir a la primera página"
                title="Primera página"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  margin: '0 2px',
                  borderRadius: '8px'
                }}
              >
                <span aria-hidden="true">««</span>
              </button>
            </li>
          )}

          {/* Botón Anterior */}
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link border-0"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Página anterior"
              title="Página anterior"
              style={{
                background: currentPage === 1 ? '#e9ecef' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: currentPage === 1 ? '#6c757d' : 'white',
                margin: '0 2px',
                borderRadius: '8px'
              }}
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>

        {/* Primera página si no está visible */}
        {visiblePages[0] > 1 && (
          <>
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => handlePageChange(1)}
                aria-label="Ir a página 1"
              >
                1
              </button>
            </li>
            {visiblePages[0] > 2 && (
              <li className="page-item disabled">
                <span className="page-link" aria-hidden="true">...</span>
              </li>
            )}
          </>
        )}

        {/* Páginas visibles */}
        {visiblePages.map((page) => (
          <li
            key={page}
            className={`page-item ${page === currentPage ? 'active' : ''}`}
          >
            <button
              className="page-link border-0"
              onClick={() => handlePageChange(page)}
              aria-label={`Ir a página ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
              style={{
                background: page === currentPage 
                  ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                  : 'transparent',
                color: page === currentPage ? 'white' : '#667eea',
                margin: '0 2px',
                borderRadius: '8px',
                fontWeight: page === currentPage ? 'bold' : 'normal',
                boxShadow: page === currentPage ? '0 2px 8px rgba(240, 147, 251, 0.4)' : 'none'
              }}
            >
              {page}
            </button>
          </li>
        ))}

        {/* Última página si no está visible */}
        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <li className="page-item disabled">
                <span className="page-link" aria-hidden="true">...</span>
              </li>
            )}
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => handlePageChange(totalPages)}
                aria-label={`Ir a página ${totalPages}`}
              >
                {totalPages}
              </button>
            </li>
          </>
        )}

          {/* Botón Siguiente */}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button
              className="page-link border-0"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Página siguiente"
              title="Página siguiente"
              style={{
                background: currentPage === totalPages ? '#e9ecef' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: currentPage === totalPages ? '#6c757d' : 'white',
                margin: '0 2px',
                borderRadius: '8px'
              }}
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>

          {/* Botón Última Página */}
          {currentPage < totalPages - 1 && (
            <li className="page-item">
              <button
                className="page-link border-0"
                onClick={() => handlePageChange(totalPages)}
                aria-label="Ir a la última página"
                title="Última página"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  margin: '0 2px',
                  borderRadius: '8px'
                }}
              >
                <span aria-hidden="true">»»</span>
              </button>
            </li>
          )}
        </ul>
        
        {/* Información de paginación y controles adicionales */}
        <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap">
          <div className="text-muted small">
            Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
          </div>
          
          {/* Opción de saltar a página específica */}
          {showJumpToPage && totalPages > 5 && (
            <div className="d-flex align-items-center gap-2">
              {!showJumpInput ? (
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => setShowJumpInput(true)}
                  type="button"
                >
                  Ir a página...
                </button>
              ) : (
                <form 
                  onSubmit={handleJumpToPage}
                  className="d-flex align-items-center gap-2"
                >
                  <label htmlFor="jump-to-page" className="small text-muted mb-0">
                    Ir a:
                  </label>
                  <input
                    ref={jumpInputRef}
                    type="number"
                    id="jump-to-page"
                    className="form-control form-control-sm"
                    style={{ width: '70px' }}
                    min="1"
                    max={totalPages}
                    value={jumpToPage}
                    onChange={(e) => setJumpToPage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={() => {
                      if (!jumpToPage) {
                        setShowJumpInput(false);
                      }
                    }}
                    placeholder={currentPage.toString()}
                    aria-label="Número de página"
                  />
                  <button
                    className="btn btn-sm btn-primary fw-bold"
                    type="submit"
                    disabled={!jumpToPage || jumpToPage < 1 || jumpToPage > totalPages}
                    style={{
                      background: (!jumpToPage || jumpToPage < 1 || jumpToPage > totalPages)
                        ? '#6c757d'
                        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none'
                    }}
                  >
                    ➡️ Ir
                  </button>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    type="button"
                    onClick={() => {
                      setShowJumpInput(false);
                      setJumpToPage('');
                    }}
                    aria-label="Cancelar"
                  >
                    ✕
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Pagination;

