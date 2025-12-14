import React, { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  useMemo, 
  useCallback 
} from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      try {
        setUsuario(JSON.parse(usuarioGuardado));
      } catch (error) {
        console.error('Error al cargar el usuario:', error);
        localStorage.removeItem('usuario');
      }
    }
    setCargando(false);
  }, []);

  const login = useCallback((email, password) => {
    // Login simulado - en producción esto sería una llamada a una API
    // Por ahora, aceptamos cualquier email y password
    const nuevoUsuario = {
      email,
      nombre: email.split('@')[0], // Extraer nombre del email
      fechaLogin: new Date().toISOString()
    };
    
    setUsuario(nuevoUsuario);
    localStorage.setItem('usuario', JSON.stringify(nuevoUsuario));
    return Promise.resolve(nuevoUsuario);
  }, []);

  const logout = useCallback(() => {
    setUsuario(null);
    localStorage.removeItem('usuario');
  }, []);

  const estaAutenticado = useCallback(() => {
    return usuario !== null;
  }, [usuario]);

  const value = useMemo(() => ({
    usuario,
    login,
    logout,
    estaAutenticado,
    cargando
  }), [usuario, login, logout, estaAutenticado, cargando]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

