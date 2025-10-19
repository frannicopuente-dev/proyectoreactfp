import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="container my-4" style={{ fontFamily: 'Arial, sans-serif' }}>
      <header className="bg-primary text-white p-3 mb-4 rounded">
        <h2>Theo Tour - Agencia de Turismo</h2>
      </header>
      <main>{children}</main>
      <footer className="mt-5 pt-3 border-top text-center text-muted">
        <p>&copy; 2025 - Theo Tour. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Layout;