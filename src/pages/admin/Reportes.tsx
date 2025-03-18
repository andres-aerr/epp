import React from 'react';
import {
  DocumentChartBarIcon,
  ClipboardDocumentListIcon,
  ShoppingCartIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

const reportes = [
  {
    id: 1,
    nombre: 'Consumo de EPP por Departamento',
    descripcion: 'Análisis detallado del consumo de EPP por departamento y período',
    icon: DocumentChartBarIcon,
    tipo: 'Estadístico',
  },
  {
    id: 2,
    nombre: 'Historial de Solicitudes',
    descripcion: 'Registro histórico de todas las solicitudes de EPP',
    icon: ClipboardDocumentListIcon,
    tipo: 'Histórico',
  },
  {
    id: 3,
    nombre: 'Rotación de Inventario',
    descripcion: 'Análisis de la rotación de inventario y proyecciones',
    icon: ShoppingCartIcon,
    tipo: 'Inventario',
  },
  {
    id: 4,
    nombre: 'Cumplimiento por Usuario',
    descripcion: 'Nivel de cumplimiento en el uso de EPP por usuario',
    icon: UserGroupIcon,
    tipo: 'Cumplimiento',
  },
];

const Reportes: React.FC = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Reportes</h1>
          <p className="mt-2 text-sm text-gray-700">
            Generación de reportes y análisis del sistema EPP
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {reportes.map((reporte) => (
          <div
            key={reporte.id}
            className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400 hover:ring-1 hover:ring-gray-400"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <reporte.icon className="h-8 w-8 text-gray-600" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                  <p className="text-sm font-medium text-gray-900">{reporte.nombre}</p>
                  <p className="truncate text-sm text-gray-500">{reporte.descripcion}</p>
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 mt-2">
                    {reporte.tipo}
                  </span>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Generar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sección de Filtros */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">Filtros de Reporte</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label htmlFor="fecha-inicio" className="block text-sm font-medium text-gray-700">
              Fecha Inicio
            </label>
            <input
              type="date"
              name="fecha-inicio"
              id="fecha-inicio"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="fecha-fin" className="block text-sm font-medium text-gray-700">
              Fecha Fin
            </label>
            <input
              type="date"
              name="fecha-fin"
              id="fecha-fin"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="departamento" className="block text-sm font-medium text-gray-700">
              Departamento
            </label>
            <select
              id="departamento"
              name="departamento"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">Todos</option>
              <option value="operaciones">Operaciones</option>
              <option value="mantenimiento">Mantenimiento</option>
              <option value="produccion">Producción</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sección de Formatos de Exportación */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">Formato de Exportación</h2>
        <div className="mt-4 space-x-4">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            PDF
          </button>
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Excel
          </button>
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reportes; 