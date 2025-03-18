import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Limpiar cualquier sesión previa para evitar problemas
  React.useEffect(() => {
    sessionStorage.clear();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Lógica de autenticación simplificada que no cause bucles
    try {
      if (email === 'admin@epp.com' && password === '123456') {
        console.log('Iniciando sesión como administrador');
        sessionStorage.setItem('userType', 'admin');
        navigate('/admin');
        return;
      } 
      
      if (email === 'bodega@epp.com' && password === '123456') {
        console.log('Iniciando sesión como bodega');
        sessionStorage.setItem('userType', 'bodega');
        navigate('/bodega');
        return;
      } 
      
      if (email === 'despacho@epp.com' && password === '123456') {
        console.log('Iniciando sesión como despacho');
        sessionStorage.setItem('userType', 'despacho');
        navigate('/despacho');
        return;
      } 
      
      if (email === 'usuario@epp.com' && password === '123456') {
        console.log('Iniciando sesión como usuario regular');
        sessionStorage.setItem('userType', 'user');
        navigate('/dashboard');
        return;
      }
      
      // Credenciales inválidas
      setError('Credenciales inválidas. Por favor intente nuevamente.');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Ocurrió un error al iniciar sesión.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            EPP Manager
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Inicie sesión para continuar
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Iniciar Sesión
            </button>
          </div>
          
          <div className="text-sm text-center">
            <p className="text-gray-500">Credenciales de prueba:</p>
            <ul className="mt-2 space-y-1">
              <li>Admin: admin@epp.com / 123456</li>
              <li>Usuario: usuario@epp.com / 123456</li>
              <li>Bodega: bodega@epp.com / 123456</li>
              <li>Despacho: despacho@epp.com / 123456</li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login; 