import React, { useState } from 'react';
import { SolicitudEPP } from '../types/epp';
import {
  MagnifyingGlassIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  TruckIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

// Datos de ejemplo - En producción vendrían de una API
const solicitudesEjemplo: SolicitudEPP[] = [
  {
    id: 'SOL-001',
    usuarioId: 'USER-001',
    departamento: 'Operaciones',
    fecha: '2024-03-15',
    estado: 'recibida',
    items: [
      {
        productoId: 'PROD-001',
        nombre: 'Casco MSA V-Gard',
        cantidad: 1,
        talla: 'M',
      },
      {
        productoId: 'PROD-002',
        nombre: 'Guantes de Nitrilo',
        cantidad: 2,
        talla: 'L',
      },
    ],
    seguimiento: [
      {
        id: 'SEG-001',
        solicitudId: 'SOL-001',
        estado: 'pendiente',
        fecha: '2024-03-15T10:00:00',
        responsable: {
          id: 'USER-001',
          nombre: 'Carlos Rodríguez',
          rol: 'usuario',
        },
      },
      {
        id: 'SEG-002',
        solicitudId: 'SOL-001',
        estado: 'aprobada_bodega',
        fecha: '2024-03-15T10:30:00',
        responsable: {
          id: 'BODEGA-001',
          nombre: 'Juan Bodega',
          rol: 'bodega',
        },
      },
      {
        id: 'SEG-003',
        solicitudId: 'SOL-001',
        estado: 'en_despacho',
        fecha: '2024-03-15T11:00:00',
        responsable: {
          id: 'DESP-001',
          nombre: 'Pedro Despachador',
          rol: 'despachador',
        },
      },
      {
        id: 'SEG-004',
        solicitudId: 'SOL-001',
        estado: 'entregada',
        fecha: '2024-03-15T14:00:00',
        responsable: {
          id: 'DESP-001',
          nombre: 'Pedro Despachador',
          rol: 'despachador',
        },
      },
      {
        id: 'SEG-005',
        solicitudId: 'SOL-001',
        estado: 'recibida',
        fecha: '2024-03-15T14:30:00',
        responsable: {
          id: 'USER-001',
          nombre: 'Carlos Rodríguez',
          rol: 'usuario',
        },
        comentarios: 'Todo recibido correctamente',
      },
    ],
  },
];

const getEstadoIcon = (estado: string) => {
  switch (estado) {
    case 'pendiente':
      return <ClockIcon className="h-8 w-8 text-yellow-500" />;
    case 'aprobada_bodega':
      return <CheckCircleIcon className="h-8 w-8 text-green-500" />;
    case 'rechazada':
      return <XCircleIcon className="h-8 w-8 text-red-500" />;
    case 'en_despacho':
      return <TruckIcon className="h-8 w-8 text-blue-500" />;
    case 'entregada':
      return <CheckCircleIcon className="h-8 w-8 text-blue-500" />;
    case 'recibida':
      return <CheckCircleIcon className="h-8 w-8 text-green-500" />;
    default:
      return <UserIcon className="h-8 w-8 text-gray-500" />;
  }
};

const getEstadoColor = (estado: string) => {
  switch (estado) {
    case 'pendiente':
      return 'bg-yellow-100 text-yellow-800';
    case 'aprobada_bodega':
      return 'bg-green-100 text-green-800';
    case 'rechazada':
      return 'bg-red-100 text-red-800';
    case 'en_despacho':
      return 'bg-blue-100 text-blue-800';
    case 'entregada':
      return 'bg-blue-100 text-blue-800';
    case 'recibida':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const SeguimientoSolicitud: React.FC = () => {
  const [solicitudes, setSolicitudes] = useState<SolicitudEPP[]>(solicitudesEjemplo);
  const [filtro, setFiltro] = useState('');

  const solicitudesFiltradas = solicitudes.filter(s => 
    s.id.toLowerCase().includes(filtro.toLowerCase()) ||
    s.departamento.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Seguimiento de Solicitudes</h1>
        <p className="mt-1 text-sm text-gray-500">
          Consulte el estado y seguimiento de sus solicitudes de EPP
        </p>
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-6">
        <div className="max-w-xl flex rounded-md shadow-sm">
          <div className="relative flex-grow focus-within:z-10">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full rounded-md pl-10 sm:text-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Buscar por ID o departamento..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Lista de Solicitudes */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {solicitudesFiltradas.map((solicitud) => (
            <li key={solicitud.id} className="px-4 py-6">
              {/* Encabezado de la solicitud */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center">
                    <p className="text-lg font-medium text-blue-600">
                      {solicitud.id}
                    </p>
                    <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      getEstadoColor(solicitud.estado)
                    }`}>
                      {solicitud.estado.replace('_', ' ').charAt(0).toUpperCase() + 
                       solicitud.estado.slice(1).replace('_', ' ')}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Departamento: {solicitud.departamento}
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  Creada: {new Date(solicitud.fecha).toLocaleDateString()}
                </div>
              </div>

              {/* Línea de tiempo */}
              <div className="flow-root">
                <ul className="-mb-8">
                  {solicitud.seguimiento.map((evento, eventoIdx) => (
                    <li key={evento.id}>
                      <div className="relative pb-8">
                        {eventoIdx !== solicitud.seguimiento.length - 1 ? (
                          <span
                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                          />
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white">
                              {getEstadoIcon(evento.estado)}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-500">
                                {evento.estado === 'pendiente' ? 'Solicitud creada' :
                                 evento.estado === 'aprobada_bodega' ? 'Aprobada por bodega' :
                                 evento.estado === 'rechazada' ? 'Solicitud rechazada' :
                                 evento.estado === 'en_despacho' ? 'En proceso de despacho' :
                                 evento.estado === 'entregada' ? 'EPP entregado' :
                                 evento.estado === 'recibida' ? 'Recepción confirmada' :
                                 'Estado desconocido'}
                                {' por '}
                                <span className="font-medium text-gray-900">
                                  {evento.responsable.nombre}
                                </span>
                              </p>
                              {evento.comentarios && (
                                <p className="mt-1 text-sm text-gray-500">
                                  Comentarios: {evento.comentarios}
                                </p>
                              )}
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              {new Date(evento.fecha).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lista de items */}
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-900">Items Solicitados</h4>
                <ul className="mt-2 border border-gray-200 rounded-md divide-y divide-gray-200">
                  {solicitud.items.map((item, index) => (
                    <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center">
                        <span className="ml-2 flex-1 w-0 truncate">
                          {item.nombre} - Talla: {item.talla}
                        </span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <span className="font-medium">x{item.cantidad}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SeguimientoSolicitud; 