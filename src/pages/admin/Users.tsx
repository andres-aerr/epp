import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../components/Layout';
import type { Usuario } from '../../types/epp';

// Datos de ejemplo - En producción vendrían de una API
const usuariosEjemplo: Usuario[] = [
  {
    id: '1',
    nombre: 'Juan Pérez',
    rubro: 'construccion',
    cargo: 'supervisor',
    rol: 'usuario',
    email: 'juan@ejemplo.com',
    fechaCreacion: '2024-01-15T08:00:00Z',
    ultimoAcceso: '2024-03-16T14:30:00Z',
    estado: 'activo'
  },
  {
    id: '2',
    nombre: 'María González',
    rubro: 'mineria',
    cargo: 'operador_maquinaria',
    rol: 'usuario',
    email: 'maria@ejemplo.com',
    fechaCreacion: '2024-02-01T10:00:00Z',
    ultimoAcceso: '2024-03-15T16:45:00Z',
    estado: 'activo'
  },
  {
    id: '3',
    nombre: 'Carlos Rodríguez',
    rubro: 'quimica',
    cargo: 'tecnico_laboratorio',
    rol: 'usuario',
    email: 'carlos@ejemplo.com',
    fechaCreacion: '2024-01-20T09:00:00Z',
    ultimoAcceso: '2024-03-16T11:20:00Z',
    estado: 'activo'
  },
  {
    id: '4',
    nombre: 'Ana Martínez',
    rubro: 'construccion',
    cargo: 'ingeniero_obra',
    rol: 'usuario',
    email: 'ana@ejemplo.com',
    fechaCreacion: '2024-02-15T11:00:00Z',
    ultimoAcceso: '2024-03-14T15:30:00Z',
    estado: 'activo'
  },
  {
    id: '5',
    nombre: 'Pedro Sánchez',
    rubro: 'mineria',
    cargo: 'supervisor',
    rol: 'usuario',
    email: 'pedro@ejemplo.com',
    fechaCreacion: '2024-01-10T08:30:00Z',
    ultimoAcceso: '2024-03-16T09:15:00Z',
    estado: 'activo'
  },
  {
    id: '6',
    nombre: 'Laura Torres',
    rubro: 'quimica',
    cargo: 'analista_laboratorio',
    rol: 'usuario',
    email: 'laura@ejemplo.com',
    fechaCreacion: '2024-02-20T14:00:00Z',
    ultimoAcceso: '2024-03-15T13:40:00Z',
    estado: 'inactivo'
  },
  {
    id: '7',
    nombre: 'Roberto Díaz',
    rubro: 'construccion',
    cargo: 'operario',
    rol: 'usuario',
    email: 'roberto@ejemplo.com',
    fechaCreacion: '2024-01-25T10:30:00Z',
    ultimoAcceso: '2024-03-14T16:20:00Z',
    estado: 'activo'
  },
  {
    id: '8',
    nombre: 'Carmen López',
    rubro: 'mineria',
    cargo: 'geologo',
    rol: 'usuario',
    email: 'carmen@ejemplo.com',
    fechaCreacion: '2024-02-05T09:15:00Z',
    ultimoAcceso: '2024-03-16T08:50:00Z',
    estado: 'activo'
  },
  {
    id: '9',
    nombre: 'Miguel Ángel',
    rubro: 'quimica',
    cargo: 'supervisor_laboratorio',
    rol: 'usuario',
    email: 'miguel@ejemplo.com',
    fechaCreacion: '2024-01-18T11:45:00Z',
    ultimoAcceso: '2024-03-15T10:30:00Z',
    estado: 'activo'
  },
  {
    id: '10',
    nombre: 'Isabel Ruiz',
    rubro: 'construccion',
    cargo: 'arquitecto',
    rol: 'usuario',
    email: 'isabel@ejemplo.com',
    fechaCreacion: '2024-02-10T13:20:00Z',
    ultimoAcceso: '2024-03-13T14:45:00Z',
    estado: 'inactivo'
  }
];

const Users = () => {
  const { usuario } = useUser();
  const [usuarios] = useState<Usuario[]>(usuariosEjemplo);
  const [busqueda, setBusqueda] = useState('');
  const [filtroRubro, setFiltroRubro] = useState<string>('todos');

  // Redireccionar si no es admin
  if (usuario.rol !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  const usuariosFiltrados = usuarios.filter(user => {
    const coincideBusqueda = user.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                            user.email?.toLowerCase().includes(busqueda.toLowerCase()) ||
                            user.cargo.toLowerCase().includes(busqueda.toLowerCase());
    const coincideRubro = filtroRubro === 'todos' || user.rubro === filtroRubro;
    return coincideBusqueda && coincideRubro;
  });

  const rubrosUnicos = Array.from(new Set(usuarios.map(user => user.rubro)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Gestión de Usuarios
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Agregar Usuario
          </button>
        </div>
      </div>

      <div className="mt-4">
        <div className="sm:flex sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <label htmlFor="search" className="sr-only">Buscar</label>
            <input
              type="search"
              name="search"
              id="search"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Buscar por nombre, email o cargo..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          <div className="sm:w-48">
            <label htmlFor="rubro" className="sr-only">Filtrar por rubro</label>
            <select
              id="rubro"
              name="rubro"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={filtroRubro}
              onChange={(e) => setFiltroRubro(e.target.value)}
            >
              <option value="todos">Todos los rubros</option>
              {rubrosUnicos.map(rubro => (
                <option key={rubro} value={rubro}>
                  {rubro.charAt(0).toUpperCase() + rubro.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Usuario
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rubro / Cargo
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Último Acceso
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Acciones</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {usuariosFiltrados.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-xl text-gray-500">
                                {user.nombre.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.nombre}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {user.rubro.charAt(0).toUpperCase() + user.rubro.slice(1)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.cargo.charAt(0).toUpperCase() + user.cargo.slice(1)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(user.ultimoAcceso || '').toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(user.ultimoAcceso || '').toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.estado === 'activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.estado.charAt(0).toUpperCase() + user.estado.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-4">
                          Editar
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          {user.estado === 'activo' ? 'Desactivar' : 'Activar'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users; 