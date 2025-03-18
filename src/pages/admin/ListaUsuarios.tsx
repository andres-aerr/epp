import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  UserIcon, 
  PencilIcon,
  EyeIcon,
  XMarkIcon,
  PhoneIcon,
  EnvelopeIcon,
  IdentificationIcon,
  MapPinIcon,
  CalendarIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  dni: string;
  departamento: string;
  area: string;
  cargo: string;
  supervisor: string;
  fechaIngreso: string;
  estado: 'activo' | 'inactivo';
  telefono: string;
  direccion: string;
  fechaNacimiento: string;
  contactoEmergencia: {
    nombre: string;
    apellido: string;
    parentesco: string;
    telefono: string;
  };
  tallas: {
    ropa: string;
    calzado: string;
    casco: string;
    guantes: string;
    respirador: string;
  };
}

// Datos de ejemplo
const usuariosEjemplo: Usuario[] = [
  {
    id: '1',
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'juan.perez@empresa.com',
    dni: '12345678',
    departamento: 'Operaciones',
    area: 'Construcción',
    cargo: 'Operador de Maquinaria',
    supervisor: 'Carlos Rodríguez',
    fechaIngreso: '2023-01-15',
    estado: 'activo',
    telefono: '+51 987654321',
    direccion: 'Av. Principal 123, Lima',
    fechaNacimiento: '1990-05-15',
    contactoEmergencia: {
      nombre: 'María',
      apellido: 'Pérez',
      parentesco: 'Esposa',
      telefono: '+51 987654322'
    },
    tallas: {
      ropa: 'M',
      calzado: '42',
      casco: 'M',
      guantes: '9',
      respirador: 'M'
    }
  },
  {
    id: '2',
    nombre: 'María',
    apellido: 'García',
    email: 'maria.garcia@empresa.com',
    dni: '87654321',
    departamento: 'Seguridad',
    area: 'Supervisión',
    cargo: 'Supervisora de Seguridad',
    supervisor: 'Ana Martínez',
    fechaIngreso: '2023-02-01',
    estado: 'activo'
  },
  {
    id: '3',
    nombre: 'Pedro',
    apellido: 'López',
    email: 'pedro.lopez@empresa.com',
    dni: '23456789',
    departamento: 'Mantenimiento',
    area: 'Mecánica',
    cargo: 'Técnico Mecánico',
    supervisor: 'Luis Torres',
    fechaIngreso: '2023-03-15',
    estado: 'activo'
  },
  {
    id: '4',
    nombre: 'Ana',
    apellido: 'Martínez',
    email: 'ana.martinez@empresa.com',
    dni: '34567890',
    departamento: 'Seguridad',
    area: 'Gestión',
    cargo: 'Jefa de Seguridad',
    supervisor: 'Roberto Sánchez',
    fechaIngreso: '2022-11-01',
    estado: 'activo'
  },
  {
    id: '5',
    nombre: 'Carlos',
    apellido: 'Rodríguez',
    email: 'carlos.rodriguez@empresa.com',
    dni: '45678901',
    departamento: 'Operaciones',
    area: 'Supervisión',
    cargo: 'Supervisor de Obra',
    supervisor: 'Roberto Sánchez',
    fechaIngreso: '2022-09-15',
    estado: 'activo'
  },
  {
    id: '6',
    nombre: 'Laura',
    apellido: 'Sánchez',
    email: 'laura.sanchez@empresa.com',
    dni: '56789012',
    departamento: 'Almacén',
    area: 'Logística',
    cargo: 'Coordinadora de Almacén',
    supervisor: 'Miguel Torres',
    fechaIngreso: '2023-04-01',
    estado: 'inactivo'
  },
  {
    id: '7',
    nombre: 'Miguel',
    apellido: 'Torres',
    email: 'miguel.torres@empresa.com',
    dni: '67890123',
    departamento: 'Logística',
    area: 'Gestión',
    cargo: 'Jefe de Logística',
    supervisor: 'Roberto Sánchez',
    fechaIngreso: '2022-08-01',
    estado: 'activo'
  },
  {
    id: '8',
    nombre: 'Carmen',
    apellido: 'Díaz',
    email: 'carmen.diaz@empresa.com',
    dni: '78901234',
    departamento: 'Operaciones',
    area: 'Construcción',
    cargo: 'Operadora de Grúa',
    supervisor: 'Carlos Rodríguez',
    fechaIngreso: '2023-05-15',
    estado: 'activo'
  },
  {
    id: '9',
    nombre: 'Roberto',
    apellido: 'Sánchez',
    email: 'roberto.sanchez@empresa.com',
    dni: '89012345',
    departamento: 'Dirección',
    area: 'Gerencia',
    cargo: 'Gerente de Operaciones',
    supervisor: '',
    fechaIngreso: '2022-01-01',
    estado: 'activo'
  },
  {
    id: '10',
    nombre: 'Patricia',
    apellido: 'Flores',
    email: 'patricia.flores@empresa.com',
    dni: '90123456',
    departamento: 'Mantenimiento',
    area: 'Eléctrica',
    cargo: 'Técnica Electricista',
    supervisor: 'Luis Torres',
    fechaIngreso: '2023-06-01',
    estado: 'activo'
  }
];

const ListaUsuarios: React.FC = () => {
  const [usuarios] = useState<Usuario[]>(usuariosEjemplo);
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<'todos' | 'activo' | 'inactivo'>('todos');
  const [modalUsuario, setModalUsuario] = useState<Usuario | null>(null);

  // Filtrar usuarios
  const usuariosFiltrados = usuarios.filter(usuario => {
    const coincideBusqueda = 
      usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      usuario.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
      usuario.email.toLowerCase().includes(busqueda.toLowerCase()) ||
      usuario.dni.includes(busqueda) ||
      usuario.departamento.toLowerCase().includes(busqueda.toLowerCase());
    
    const coincedeEstado = filtroEstado === 'todos' || usuario.estado === filtroEstado;

    return coincideBusqueda && coincedeEstado;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Usuarios</h1>
          <p className="mt-2 text-sm text-gray-700">
            Lista de todos los usuarios registrados en el sistema
          </p>
        </div>
      </div>

      {/* Filtros */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="busqueda" className="sr-only">
            Buscar usuarios
          </label>
          <input
            type="text"
            name="busqueda"
            id="busqueda"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Buscar por nombre, email, DNI..."
          />
        </div>
        <div>
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value as 'todos' | 'activo' | 'inactivo')}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="todos">Todos los estados</option>
            <option value="activo">Activos</option>
            <option value="inactivo">Inactivos</option>
          </select>
        </div>
      </div>

      {/* Tabla de Usuarios */}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Usuario
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Departamento
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Cargo
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Estado
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {usuariosFiltrados.map((usuario) => (
                    <tr key={usuario.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <UserIcon className="h-10 w-10 text-gray-300" />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">
                              {usuario.nombre} {usuario.apellido}
                            </div>
                            <div className="text-gray-500">{usuario.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="text-gray-900">{usuario.departamento}</div>
                        <div className="text-gray-500">{usuario.area}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {usuario.cargo}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          usuario.estado === 'activo'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {usuario.estado.charAt(0).toUpperCase() + usuario.estado.slice(1)}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex space-x-4">
                          <button
                            onClick={() => setModalUsuario(usuario)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <EyeIcon className="h-5 w-5" />
                          </button>
                          <Link
                            to={`/admin/users/${usuario.id}/edit`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Visualización */}
      {modalUsuario && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500"
                  onClick={() => setModalUsuario(null)}
                >
                  <span className="sr-only">Cerrar</span>
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Información del Usuario
                  </h3>

                  {/* Información Personal */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Información Personal</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">
                          {modalUsuario.nombre} {modalUsuario.apellido}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <IdentificationIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{modalUsuario.dni}</span>
                      </div>
                      <div className="flex items-center">
                        <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{modalUsuario.email}</span>
                      </div>
                      <div className="flex items-center">
                        <PhoneIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{modalUsuario.telefono}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{modalUsuario.direccion}</span>
                      </div>
                      <div className="flex items-center">
                        <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{modalUsuario.fechaNacimiento}</span>
                      </div>
                    </div>
                  </div>

                  {/* Información Laboral */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Información Laboral</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <BuildingOfficeIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">
                          {modalUsuario.departamento} - {modalUsuario.area}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <BriefcaseIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{modalUsuario.cargo}</span>
                      </div>
                      <div className="flex items-center">
                        <UserGroupIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{modalUsuario.supervisor}</span>
                      </div>
                      <div className="flex items-center">
                        <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{modalUsuario.fechaIngreso}</span>
                      </div>
                    </div>
                  </div>

                  {/* Contacto de Emergencia */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Contacto de Emergencia</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">
                          {modalUsuario.contactoEmergencia.nombre} {modalUsuario.contactoEmergencia.apellido}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <UserGroupIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">
                          {modalUsuario.contactoEmergencia.parentesco}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <PhoneIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">
                          {modalUsuario.contactoEmergencia.telefono}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tallas */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Tallas</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                      <div className="text-center">
                        <span className="text-xs text-gray-500 block">Ropa</span>
                        <span className="text-sm font-medium text-gray-900">{modalUsuario.tallas.ropa}</span>
                      </div>
                      <div className="text-center">
                        <span className="text-xs text-gray-500 block">Calzado</span>
                        <span className="text-sm font-medium text-gray-900">{modalUsuario.tallas.calzado}</span>
                      </div>
                      <div className="text-center">
                        <span className="text-xs text-gray-500 block">Casco</span>
                        <span className="text-sm font-medium text-gray-900">{modalUsuario.tallas.casco}</span>
                      </div>
                      <div className="text-center">
                        <span className="text-xs text-gray-500 block">Guantes</span>
                        <span className="text-sm font-medium text-gray-900">{modalUsuario.tallas.guantes}</span>
                      </div>
                      <div className="text-center">
                        <span className="text-xs text-gray-500 block">Respirador</span>
                        <span className="text-sm font-medium text-gray-900">{modalUsuario.tallas.respirador}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <Link
                  to={`/admin/users/${modalUsuario.id}/edit`}
                  className="inline-flex justify-center w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3"
                >
                  Editar Información Laboral
                </Link>
                <button
                  type="button"
                  className="mt-3 sm:mt-0 inline-flex justify-center w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => setModalUsuario(null)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaUsuarios; 