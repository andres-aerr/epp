import { createContext, useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Usuario } from '../types/epp';
import Navigation from './Navigation';

// Crear el contexto del usuario
interface UserContextType {
  usuario: Usuario;
  setUsuario: (usuario: Usuario) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

// Hook personalizado para usar el contexto
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser debe ser usado dentro de un UserProvider');
  }
  return context;
};

const Layout = () => {
  // Usuario de ejemplo - En producción esto vendría de un sistema de autenticación
  const [usuario, setUsuario] = useState<Usuario>({
    id: '1',
    nombre: 'Juan Pérez',
    rubro: 'mineria',
    cargo: 'operador_maquinaria',
    rol: 'usuario'
  });

  // Para propósitos de demostración, agregamos un botón para cambiar el rol
  const toggleRol = () => {
    setUsuario(prev => ({
      ...prev,
      rol: prev.rol === 'admin' ? 'usuario' : 'admin'
    }));
  };

  return (
    <UserContext.Provider value={{ usuario, setUsuario }}>
      <div className="min-h-screen bg-gray-100">
        <Navigation usuario={usuario} />
        
        {/* Botón para cambiar rol (solo para demostración) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={toggleRol}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Cambiar a {usuario.rol === 'admin' ? 'Usuario' : 'Administrador'}
          </button>
        </div>

        <main className="py-6">
          <Outlet />
        </main>
      </div>
    </UserContext.Provider>
  );
};

export default Layout; 