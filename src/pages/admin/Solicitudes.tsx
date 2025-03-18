import React, { useState } from 'react';
import {
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';

// Tipos para las solicitudes
interface Solicitud {
  id: string;
  usuario: string;
  departamento: string;
  fecha: string;
  estado: string;
  items: {
    nombre: string;
    cantidad: number;
  }[];
  prioridad: 'Alta' | 'Media' | 'Baja';
}

// Datos de ejemplo
const solicitudesEjemplo: Solicitud[] = [
  {
    id: 'SOL-001',
    usuario: 'Juan Pérez',
    departamento: 'Operaciones',
    fecha: '2024-03-15',
    estado: 'Pendiente',
    items: [
      { nombre: 'Casco de Seguridad', cantidad: 1 },
      { nombre: 'Guantes de Nitrilo', cantidad: 2 },
    ],
    prioridad: 'Alta',
  },
  {
    id: 'SOL-002',
    usuario: 'María García',
    departamento: 'Mantenimiento',
    fecha: '2024-03-16',
    estado: 'Aprobada',
    items: [
      { nombre: 'Lentes de Seguridad', cantidad: 1 },
    ],
    prioridad: 'Media',
  },
  {
    id: 'SOL-003',
    usuario: 'Carlos López',
    departamento: 'Producción',
    fecha: '2024-03-14',
    estado: 'En Proceso',
    items: [
      { nombre: 'Botas de Seguridad', cantidad: 1 },
      { nombre: 'Chaleco Reflectante', cantidad: 1 },
    ],
    prioridad: 'Baja',
  },
];

const Solicitudes: React.FC = () => {
  const [solicitudes] = useState<Solicitud[]>(solicitudesEjemplo);
  const [busqueda, setBusqueda] = useState('');

  // Filtrar solicitudes basado en la búsqueda
  const solicitudesFiltradas = solicitudes.filter((solicitud) =>
    Object.values(solicitud).some((value) =>
      value.toString().toLowerCase().includes(busqueda.toLowerCase())
    )
  );

  // Función para obtener el color de la prioridad
  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad) {
      case 'Alta':
        return 'text-red-600 bg-red-100';
      case 'Media':
        return 'text-yellow-600 bg-yellow-100';
      case 'Baja':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  // Función para obtener el color del estado
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Pendiente':
        return 'text-yellow-600 bg-yellow-100';
      case 'Aprobada':
        return 'text-green-600 bg-green-100';
      case 'En Proceso':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Solicitudes de EPP</h1>
          <p className="mt-2 text-sm text-gray-700">
            Lista de todas las solicitudes de Equipos de Protección Personal
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
          >
            <ArrowDownTrayIcon className="-ml-1 mr-2 h-5 w-5" />
            Exportar
          </button>
        </div>
      </div>

      <div className="mt-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                className="block w-full rounded-md border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Buscar solicitudes..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        ID
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Usuario
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Departamento
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Fecha
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Estado
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Prioridad
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Items
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {solicitudesFiltradas.map((solicitud) => (
                      <tr key={solicitud.id}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {solicitud.id}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                          {solicitud.usuario}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {solicitud.departamento}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {solicitud.fecha}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getEstadoColor(solicitud.estado)}`}>
                            {solicitud.estado}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getPrioridadColor(solicitud.prioridad)}`}>
                            {solicitud.prioridad}
                          </span>
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500">
                          <ul className="list-disc list-inside">
                            {solicitud.items.map((item, index) => (
                              <li key={index}>
                                {item.nombre} (x{item.cantidad})
                              </li>
                            ))}
                          </ul>
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
    </div>
  );
};

export default Solicitudes; 