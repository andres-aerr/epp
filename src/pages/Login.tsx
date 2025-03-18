import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Asegurarnos de que cualquier sesión anterior está limpia
    sessionStorage.clear();

    // Lógica de autenticación simplificada
    if (email === 'admin@epp.com' && password === 'admin') {
      // Administrador
      sessionStorage.setItem('userType', 'admin');
      navigate('/admin');
    } else if (email === 'bodega@epp.com' && password === 'bodega') {
      // Bodega
      sessionStorage.setItem('userType', 'bodega');
      navigate('/bodega');
    } else if (email === 'despacho@epp.com' && password === 'despacho') {
      // Despachador
      sessionStorage.setItem('userType', 'despacho');
      navigate('/despacho');
    } else if (email === 'usuario@epp.com' && password === 'usuario' || (email && password)) {
      // Usuario normal (o cualquier otra combinación válida)
      sessionStorage.setItem('userType', 'user');
      navigate('/dashboard');
    } else {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          EPP Manager
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Inicia sesión para continuar
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Iniciar sesión
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Credenciales de prueba:
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 text-sm text-gray-500">
              <div>Admin: admin@epp.com / admin</div>
              <div>Bodega: bodega@epp.com / bodega</div>
              <div>Despacho: despacho@epp.com / despacho</div>
              <div>Usuario: usuario@epp.com / usuario</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 