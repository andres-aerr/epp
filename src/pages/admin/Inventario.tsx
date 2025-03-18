import React, { useState } from 'react';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';

// Tipos para el inventario
interface ItemInventario {
  id: string;
  codigo: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  stock: number;
  stockMinimo: number;
  stockCritico: number;
  ubicacion: string;
  ultimaActualizacion: string;
}

// Datos de ejemplo
const datosInventario: ItemInventario[] = [
  {
    id: '1',
    codigo: 'EPP-001',
    nombre: 'Casco de Seguridad',
    descripcion: 'Casco de seguridad industrial clase A',
    categoria: 'Protección de Cabeza',
    stock: 50,
    stockMinimo: 20,
    stockCritico: 10,
    ubicacion: 'Estante A-1',
    ultimaActualizacion: '2024-03-15',
  },
  {
    id: '2',
    codigo: 'EPP-002',
    nombre: 'Guantes de Nitrilo',
    descripcion: 'Guantes de nitrilo resistentes a químicos',
    categoria: 'Protección de Manos',
    stock: 150,
    stockMinimo: 100,
    stockCritico: 50,
    ubicacion: 'Estante B-2',
    ultimaActualizacion: '2024-03-16',
  },
  {
    id: '3',
    codigo: 'EPP-003',
    nombre: 'Lentes de Seguridad',
    descripcion: 'Lentes de seguridad con protección UV',
    categoria: 'Protección Visual',
    stock: 75,
    stockMinimo: 30,
    stockCritico: 15,
    ubicacion: 'Estante C-1',
    ultimaActualizacion: '2024-03-14',
  },
];

const Inventario: React.FC = () => {
  const [inventario] = useState<ItemInventario[]>(datosInventario);
  const [busqueda, setBusqueda] = useState('');

  // Filtrar inventario basado en la búsqueda
  const inventarioFiltrado = inventario.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(busqueda.toLowerCase())
    )
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Inventario EPP</h1>
          <p className="mt-2 text-sm text-gray-700">
            Gestión del inventario de Equipos de Protección Personal
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
            Agregar Item
          </button>
        </div>
      </div>

      <div className="mt-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <div className="relative rounded-md shadow-sm">
              <input
                type="text"
                className="block w-full rounded-md border-gray-300 pr-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Buscar en inventario..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
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

        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Código
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Nombre
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Categoría
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Stock
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Ubicación
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Última Actualización
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Acciones</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {inventarioFiltrado.map((item) => (
                      <tr key={item.id}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.codigo}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                          <div>{item.nombre}</div>
                          <div className="text-gray-500">{item.descripcion}</div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.categoria}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <div className={`font-medium ${
                            item.stock <= item.stockCritico
                              ? 'text-red-600'
                              : item.stock <= item.stockMinimo
                              ? 'text-yellow-600'
                              : 'text-green-600'
                          }`}>
                            {item.stock}
                          </div>
                          <div className="text-gray-500">Min: {item.stockMinimo}</div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.ubicacion}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.ultimaActualizacion}</td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            type="button"
                            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          >
                            <PencilIcon className="h-4 w-4 text-gray-500" />
                          </button>
                          <button
                            type="button"
                            className="ml-2 inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          >
                            <TrashIcon className="h-4 w-4 text-red-500" />
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
    </div>
  );
};

export default Inventario; 