import React, { useState } from 'react';
import { SolicitudEPP, EstadoSolicitud } from '../../types/epp';
import {
  CheckCircleIcon,
  XCircleIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';

// Datos de ejemplo - En producción vendrían de una API
const solicitudesEjemplo: SolicitudEPP[] = [
  {
    id: 'SOL-001',
    usuarioId: 'USER-001',
    departamento: 'Operaciones',
    fecha: '2024-03-15',
    estado: 'entregada',
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
        estado: 'entregada',
        fecha: '2024-03-15T10:30:00',
        responsable: {
          id: 'DESP-001',
          nombre: 'Pedro Despachador',
          rol: 'despachador',
        },
      },
    ],
  },
];

const ConfirmarRecepcion: React.FC = () => {
  const [solicitudes, setSolicitudes] = useState<SolicitudEPP[]>(solicitudesEjemplo);
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState<SolicitudEPP | null>(null);
  const [comentarios, setComentarios] = useState<string>('');

  const handleConfirmar = (solicitud: SolicitudEPP) => {
    const nuevasSolicitudes = solicitudes.map(s => {
      if (s.id === solicitud.id) {
        return {
          ...s,
          estado: 'recibida' as EstadoSolicitud,
          seguimiento: [
            ...s.seguimiento,
            {
              id: `SEG-${Date.now()}`,
              solicitudId: s.id,
              estado: 'recibida',
              fecha: new Date().toISOString(),
              responsable: {
                id: 'USER-001', // ID del usuario actual
                nombre: 'Carlos Rodríguez', // Nombre del usuario actual
                rol: 'usuario',
              },
              comentarios,
            },
          ],
        };
      }
      return s;
    });

    setSolicitudes(nuevasSolicitudes);
    setComentarios('');
    setSolicitudSeleccionada(null);
  };

  const handleRechazar = (solicitud: SolicitudEPP) => {
    if (!comentarios) {
      alert('Por favor, indique el motivo del rechazo en los comentarios');
      return;
    }

    const nuevasSolicitudes = solicitudes.map(s => {
      if (s.id === solicitud.id) {
        return {
          ...s,
          estado: 'rechazada' as EstadoSolicitud,
          seguimiento: [
            ...s.seguimiento,
            {
              id: `SEG-${Date.now()}`,
              solicitudId: s.id,
              estado: 'rechazada',
              fecha: new Date().toISOString(),
              responsable: {
                id: 'USER-001',
                nombre: 'Carlos Rodríguez',
                rol: 'usuario',
              },
              comentarios,
            },
          ],
        };
      }
      return s;
    });

    setSolicitudes(nuevasSolicitudes);
    setComentarios('');
    setSolicitudSeleccionada(null);
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Confirmar Recepción de EPP</h1>
        <p className="mt-1 text-sm text-gray-500">
          Confirme la recepción de sus equipos de protección personal
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de Entregas Pendientes de Confirmación */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Entregas Pendientes de Confirmación
              </h3>
            </div>
            <ul className="divide-y divide-gray-200">
              {solicitudes
                .filter(s => s.estado === 'entregada')
                .map((solicitud) => (
                  <li
                    key={solicitud.id}
                    className="px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSolicitudSeleccionada(solicitud)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-blue-600 truncate">
                            {solicitud.id}
                          </p>
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Pendiente de Confirmación
                          </span>
                        </div>
                        <div className="mt-1 text-sm text-gray-500">
                          Fecha de entrega: {new Date(solicitud.fecha).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* Panel de Confirmación */}
        {solicitudSeleccionada && (
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Detalles de la Entrega
                </h3>
              </div>
              <div className="px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6">
                  <div className="col-span-1">
                    <dt className="text-sm font-medium text-gray-500">ID Solicitud</dt>
                    <dd className="mt-1 text-sm text-gray-900">{solicitudSeleccionada.id}</dd>
                  </div>

                  <div className="col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Items Recibidos</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                        {solicitudSeleccionada.items.map((item, index) => (
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
                    </dd>
                  </div>

                  <div className="col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Foto de la Entrega</dt>
                    <dd className="mt-1">
                      <div className="flex items-center justify-center">
                        <PhotoIcon className="h-24 w-24 text-gray-400" />
                      </div>
                    </dd>
                  </div>

                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Comentarios
                    </label>
                    <div className="mt-1">
                      <textarea
                        rows={3}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Agregue comentarios o indique si hay algún problema..."
                        value={comentarios}
                        onChange={(e) => setComentarios(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-span-1">
                    <div className="flex flex-col space-y-3">
                      <button
                        type="button"
                        onClick={() => handleConfirmar(solicitudSeleccionada)}
                        className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <CheckCircleIcon className="mr-2 h-5 w-5" />
                        Confirmar Recepción
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRechazar(solicitudSeleccionada)}
                        className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <XCircleIcon className="mr-2 h-5 w-5" />
                        Reportar Problema
                      </button>
                    </div>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmarRecepcion; 