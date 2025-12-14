import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import AlertMessage from './common/AlertMessage';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Ruta a la que redirigir después del login (o home por defecto)
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, completa todos los campos');
      return;
    }

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError('Error al iniciar sesión. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div 
            className="card border-0 shadow-lg"
            style={{
              background: 'linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)'
            }}
          >
            <div 
              className="card-header border-0 text-center py-4"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white'
              }}
            >
              <h2 className="mb-0 fw-bold">🔐 Iniciar Sesión</h2>
              <p className="mb-0 small mt-2 opacity-90">
                Accedé a tu cuenta de Theo Tour
              </p>
            </div>
            <div className="card-body p-4">
              <AlertMessage type="danger" message={error} />
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold">
                    📧 Email
                  </label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required
                    style={{
                      border: '2px solid #e9ecef',
                      transition: 'border-color 0.3s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label fw-semibold">
                    🔒 Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingresa tu contraseña"
                    required
                    style={{
                      border: '2px solid #e9ecef',
                      transition: 'border-color 0.3s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary w-100 btn-lg fw-bold"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                  }}
                >
                  🚀 Iniciar Sesión
                </button>
              </form>
              <div 
                className="mt-4 p-3 rounded"
                style={{ background: '#f8f9fa' }}
              >
                <p className="text-muted text-center mb-0 small">
                  💡 <strong>Nota:</strong> Este es un login simulado. Puedes usar cualquier email y contraseña.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

