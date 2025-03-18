import React, { useState } from 'react';
import {
  CheckCircleIcon,
  XCircleIcon,
  UserIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';

interface Despachador {
  id: string;
  nombre: string;
  disponible: boolean;
}

interface SolicitudBodega {
  id: string;
  usuario: string;
  departamento: string;
  fecha: string;
  estado: 'pendiente' | 'aprobada' | 'rechazada' | 'en_despacho';
  items: {
    id: string;
    nombre: string;
    cantidad: number;
    disponible: boolean;
  }[];
  comentarios?: string;
  despachadorAsignado?: string;
}

// Datos de ejemplo
const despachadores: Despachador[] = [
  { id: 'D1', nombre: 'Juan Despacho', disponible: true },
  { id: 'D2', nombre: 'María Entrega', disponible: true },
  { id: 'D3', nombre: 'Pedro Reparto', disponible: false },
];

const solicitudesEjemplo: SolicitudBodega[] = [
  {
    id: 'SOL-001',
    usuario: 'Carlos Pérez',
    departamento: 'Operaciones',
    fecha: '2024-03-17',
    estado: 'pendiente',
    items: [
      { id: 'EPP-001', nombre: 'Casco de Seguridad', cantidad: 1, disponible: true },
      { id: 'EPP-002', nombre: 'Guantes de Nitrilo', cantidad: 2, disponible: true },
    ],
  },
  {
    id: 'SOL-002',
    usuario: 'Ana Martínez',
    departamento: 'Mantenimiento',
    fecha: '2024-03-17',
    estado: 'pendiente',
    items: [
      { id: 'EPP-003', nombre: 'Lentes de Seguridad', cantidad: 1, disponible: true },
    ],
  },
];

const GestionBodega: React.FC = () => {
  const [solicitudes, setSolicitudes] = useState<SolicitudBodega[]>(solicitudesEjemplo);
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState<SolicitudBodega | null>(null);
  const [comentarioRechazo, setComentarioRechazo] = useState('');
  const [despachadorSeleccionado, setDespachadorSeleccionado] = useState('');
  const [mostrarModalRechazo, setMostrarModalRechazo] = useState(false);

  const handleSeleccionarSolicitud = (solicitud: SolicitudBodega) => {
    setSolicitudSeleccionada(solicitud);
    setDespachadorSeleccionado('');
    setComentarioRechazo('');
  };

  const handleAprobarSolicitud = () => {
    if (!solicitudSeleccionada || !despachadorSeleccionado) return;

    setSolicitudes(solicitudes.map(sol => 
      sol.id === solicitudSeleccionada.id
        ? {
            ...sol,
            estado: 'aprobada',
            despachadorAsignado: despachadorSeleccionado
          }
        : sol
    ));

    setSolicitudSeleccionada(null);
  };

  const handleRechazarSolicitud = () => {
    if (!solicitudSeleccionada || !comentarioRechazo) return;

    setSolicitudes(solicitudes.map(sol =>
      sol.id === solicitudSeleccionada.id
        ? {
            ...sol,
            estado: 'rechazada',
            comentarios: comentarioRechazo
          }
        : sol
    ));

    setMostrarModalRechazo(false);
    setSolicitudSeleccionada(null);
    setComentarioRechazo('');
  };

  return (
    <div className="flex h-full">
      {/* Lista de solicitudes */}
      <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">Solicitudes Pendientes</h2>
          <p className="mt-1 text-sm text-gray-500">
            Gestión de solicitudes de EPP pendientes
          </p>
        </div>
        <ul role="list" className="divide-y divide-gray-200">
          {solicitudes.filter(s => s.estado === 'pendiente').map((solicitud) => (
            <li
              key={solicitud.id}
              className={`px-4 py-4 hover:bg-gray-50 cursor-pointer ${
                solicitudSeleccionada?.id === solicitud.id ? 'bg-blue-50' : ''
              }`}
              onClick={() => handleSeleccionarSolicitud(solicitud)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <UserIcon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{solicitud.usuario}</p>
                    <p className="text-sm text-gray-500">{solicitud.departamento}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">{solicitud.fecha}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Detalle de solicitud */}
      <div className="flex-1 p-8">
        {solicitudSeleccionada ? (
          <div>
            <div className="pb-5 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Detalle de Solicitud {solicitudSeleccionada.id}
              </h3>
            </div>

            <div className="mt-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Solicitante</dt>
                  <dd className="mt-1 text-sm text-gray-900">{solicitudSeleccionada.usuario}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Departamento</dt>
                  <dd className="mt-1 text-sm text-gray-900">{solicitudSeleccionada.departamento}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Items Solicitados</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <ul role="list" className="border border-gray-200 rounded-md divide-y divide-gray-200">
                      {solicitudSeleccionada.items.map((item) => (
                        <li
                          key={item.id}
                          className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                        >
                          <div className="w-0 flex-1 flex items-center">
                            <span className="ml-2 flex-1">
                              {item.nombre} (x{item.cantidad})
                            </span>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              item.disponible
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {item.disponible ? 'Disponible' : 'No disponible'}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>

                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Asignar Despachador</dt>
                  <dd className="mt-1">
                    <select
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      value={despachadorSeleccionado}
                      onChange={(e) => setDespachadorSeleccionado(e.target.value)}
                    >
                      <option value="">Seleccionar despachador...</option>
                      {despachadores
                        .filter(d => d.disponible)
                        .map(despachador => (
                          <option key={despachador.id} value={despachador.id}>
                            {despachador.nombre}
                          </option>
                        ))}
                    </select>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-6 flex space-x-3">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                onClick={handleAprobarSolicitud}
                disabled={!despachadorSeleccionado}
              >
                <CheckCircleIcon className="-ml-1 mr-2 h-5 w-5" />
                Aprobar y Asignar
              </button>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={() => setMostrarModalRechazo(true)}
              >
                <XCircleIcon className="-ml-1 mr-2 h-5 w-5" />
                Rechazar
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <TruckIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No hay solicitud seleccionada</h3>
            <p className="mt-1 text-sm text-gray-500">
              Selecciona una solicitud de la lista para ver sus detalles
            </p>
          </div>
        )}
      </div>

      {/* Modal de Rechazo */}
      {mostrarModalRechazo && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Motivo del Rechazo
                  </h3>
                  <div className="mt-2">
                    <textarea
                      rows={4}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Ingrese el motivo del rechazo..."
                      value={comentarioRechazo}
                      onChange={(e) => setComentarioRechazo(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm"
                  onClick={handleRechazarSolicitud}
                >
                  Confirmar Rechazo
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setMostrarModalRechazo(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionBodega; 