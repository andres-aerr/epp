import React, { useState } from 'react';
import UserProfile from '../../components/UserProfile';
import { catalogoEPP } from '../../data/catalogoEPP';
import { CheckCircleIcon, ClockIcon, TruckIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface EntregaHistorial {
  id: string;
  solicitudId: string;
  usuario: string;
  departamento: string;
  despachador: string;
  estado: string;
  fechaEntrega: string;
  fechaRecepcionDespacho?: string;
}

interface DespachoHistorial {
  id: string;
  solicitudId: string;
  despachador: string;
  estado: string;
  fechaAsignacion: string;
  fechaEntrega?: string;
  items: {
    nombre: string;
    cantidad: number;
  }[];
  ubicacionEntrega?: string;
  comentarios?: string;
}

const historialDespachos: DespachoHistorial[] = [
  {
    id: 'DESP-001',
    solicitudId: 'SOL-001',
    despachador: 'Juan Despacho',
    estado: 'entregado',
    fechaAsignacion: '2024-03-17',
    fechaEntrega: '2024-03-17',
    items: [
      { nombre: 'Casco de Seguridad', cantidad: 1 },
      { nombre: 'Guantes de Nitrilo', cantidad: 2 }
    ],
    ubicacionEntrega: 'Planta Principal - Sector A',
    comentarios: 'Entrega realizada con éxito'
  },
  {
    id: 'DESP-002',
    solicitudId: 'SOL-002',
    despachador: 'María Entrega',
    estado: 'en_ruta',
    fechaAsignacion: '2024-03-17',
    items: [
      { nombre: 'Lentes de Seguridad', cantidad: 1 }
    ],
    ubicacionEntrega: 'Planta Secundaria - Sector B'
  }
];

const historialEntregas: EntregaHistorial[] = [
  {
    id: 'ENT-001',
    solicitudId: 'SOL-001',
    usuario: 'Carlos Pérez',
    departamento: 'Operaciones',
    despachador: 'Juan Despacho',
    estado: 'recibido_por_despacho',
    fechaEntrega: '2024-03-17',
    fechaRecepcionDespacho: '2024-03-17'
  },
  {
    id: 'ENT-002',
    solicitudId: 'SOL-002',
    usuario: 'Ana Martínez',
    departamento: 'Mantenimiento',
    despachador: 'María Entrega',
    estado: 'entregado_a_despacho',
    fechaEntrega: '2024-03-17'
  }
];

const BodegaDashboard: React.FC = () => {
  // En producción, estos datos vendrían de un contexto o estado global
  const bodegaInfo = {
    nombre: 'Carlos Bodega',
    email: 'bodega@epp.com',
    rol: 'Encargado de Bodega',
    departamento: 'Almacén'
  };

  // Filtrar productos con stock bajo (menos de 20 unidades)
  const stockBajo = catalogoEPP
    .filter(producto => producto.stock < 20)
    .slice(0, 5);

  // Simulación de productos por recibir
  const productosPorRecibir = [
    { id: 1, nombre: 'Casco MSA V-Gard', cantidad: 50, fechaEstimada: '2024-04-01' },
    { id: 2, nombre: 'Guantes de Nitrilo', cantidad: 100, fechaEstimada: '2024-04-03' },
    { id: 3, nombre: 'Zapatos de Seguridad', cantidad: 30, fechaEstimada: '2024-04-05' },
  ];

  const [vistaActiva, setVistaActiva] = useState<'entregas' | 'despachos'>('entregas');

  const getEstadoDespachoColor = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'en_ruta':
        return 'bg-blue-100 text-blue-800';
      case 'entregado':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'entregado_a_despacho':
        return 'bg-yellow-100 text-yellow-800';
      case 'recibido_por_despacho':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'entregado_a_despacho':
        return <TruckIcon className="h-5 w-5 text-yellow-600" />;
      case 'recibido_por_despacho':
        return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Panel de Bodega</h1>
        <p className="mt-1 text-sm text-gray-600">
          Gestión de inventario y entregas de EPP
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <UserProfile {...bodegaInfo} />
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900">Estado de Solicitudes</h2>
          <div className="mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Solicitudes Nuevas</span>
              <span className="text-sm font-medium text-gray-900">8</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">En Proceso</span>
              <span className="text-sm font-medium text-gray-900">5</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Completadas Hoy</span>
              <span className="text-sm font-medium text-gray-900">12</span>
            </div>
          </div>
        </div>
      </div>

      {/* Selector de Vista */}
      <div className="mt-8">
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Seleccionar vista
          </label>
          <select
            id="tabs"
            name="tabs"
            className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            value={vistaActiva}
            onChange={(e) => setVistaActiva(e.target.value as 'entregas' | 'despachos')}
          >
            <option value="entregas">Historial de Entregas</option>
            <option value="despachos">Historial de Despachos</option>
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setVistaActiva('entregas')}
                className={`${
                  vistaActiva === 'entregas'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Historial de Entregas
              </button>
              <button
                onClick={() => setVistaActiva('despachos')}
                className={`${
                  vistaActiva === 'despachos'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Historial de Despachos
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Contenido según la vista seleccionada */}
      {vistaActiva === 'entregas' ? (
        /* Historial de Entregas */
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Historial de Entregas</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {historialEntregas.map((entrega) => (
              <div key={entrega.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {getEstadoIcon(entrega.estado)}
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        {entrega.usuario} - {entrega.departamento}
                      </p>
                      <p className="text-sm text-gray-500">
                        Despachador: {entrega.despachador}
                      </p>
                      <div className="flex items-center mt-1">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstadoColor(entrega.estado)}`}>
                          {entrega.estado === 'entregado_a_despacho' ? 'Entregado a Despacho' : 'Recibido por Despacho'}
                        </span>
                        <span className="ml-2 text-xs text-gray-500">
                          {entrega.fechaEntrega}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Historial de Despachos */
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Historial de Despachos</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {historialDespachos.map((despacho) => (
              <div key={despacho.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        Despacho {despacho.id} - {despacho.solicitudId}
                      </p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstadoDespachoColor(despacho.estado)}`}>
                        {despacho.estado === 'en_ruta' ? 'En Ruta' : 'Entregado'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Despachador: {despacho.despachador}
                    </p>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">Items:</p>
                      <ul className="mt-1 space-y-1">
                        {despacho.items.map((item, index) => (
                          <li key={index} className="text-sm text-gray-500">
                            • {item.nombre} (x{item.cantidad})
                          </li>
                        ))}
                      </ul>
                    </div>
                    {despacho.ubicacionEntrega && (
                      <p className="text-sm text-gray-500 mt-2">
                        Ubicación: {despacho.ubicacionEntrega}
                      </p>
                    )}
                    {despacho.comentarios && (
                      <p className="text-sm text-gray-500 mt-1">
                        Comentarios: {despacho.comentarios}
                      </p>
                    )}
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <ArrowPathIcon className="h-4 w-4 mr-1" />
                      Asignado: {despacho.fechaAsignacion}
                      {despacho.fechaEntrega && (
                        <>
                          <CheckCircleIcon className="h-4 w-4 ml-3 mr-1" />
                          Entregado: {despacho.fechaEntrega}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Productos en Stock Bajo y Por Recibir */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Productos en Stock Bajo */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Productos en Stock Bajo</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {stockBajo.map((producto) => (
              <div key={producto.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{producto.nombre}</p>
                    <p className="text-sm text-gray-500">Stock actual: {producto.stock} unidades</p>
                  </div>
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Stock Bajo
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Productos por Recibir */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Productos por Recibir</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {productosPorRecibir.map((producto) => (
              <div key={producto.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{producto.nombre}</p>
                    <p className="text-sm text-gray-500">
                      Cantidad: {producto.cantidad} unidades
                    </p>
                    <p className="text-xs text-gray-400">
                      Fecha estimada: {producto.fechaEstimada}
                    </p>
                  </div>
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      En Tránsito
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodegaDashboard; 