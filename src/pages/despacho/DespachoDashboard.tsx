import React from 'react';
import UserProfile from '../../components/UserProfile';
import { ClockIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface Entrega {
  id: string;
  solicitudId: string;
  usuario: string;
  departamento: string;
  items: {
    nombre: string;
    cantidad: number;
  }[];
  estado: 'pendiente' | 'cancelado' | 'entregado';
  fechaAsignacion: string;
  fechaEntrega?: string;
  ubicacion?: string;
  motivoCancelacion?: string;
}

// Datos de ejemplo para el historial
const historialEntregas: Entrega[] = [
  {
    id: 'ENT-001',
    solicitudId: 'SOL-001',
    usuario: 'Carlos Pérez',
    departamento: 'Operaciones',
    items: [
      { nombre: 'Casco de Seguridad', cantidad: 1 },
      { nombre: 'Guantes de Nitrilo', cantidad: 2 },
    ],
    estado: 'pendiente',
    fechaAsignacion: '2024-03-17',
  },
  {
    id: 'ENT-002',
    solicitudId: 'SOL-002',
    usuario: 'Ana Martínez',
    departamento: 'Mantenimiento',
    items: [
      { nombre: 'Lentes de Seguridad', cantidad: 1 },
    ],
    estado: 'entregado',
    fechaAsignacion: '2024-03-15',
    fechaEntrega: '2024-03-16',
    ubicacion: 'Planta Principal - Sector A',
  },
  {
    id: 'ENT-003',
    solicitudId: 'SOL-003',
    usuario: 'Juan Pérez',
    departamento: 'Producción',
    items: [
      { nombre: 'Zapatos de Seguridad', cantidad: 1 },
    ],
    estado: 'cancelado',
    fechaAsignacion: '2024-03-14',
    motivoCancelacion: 'Usuario no disponible para la entrega',
  },
];

const DespachoDashboard: React.FC = () => {
  // En producción, estos datos vendrían de un contexto o estado global
  const despachoInfo = {
    nombre: 'María Despacho',
    email: 'despacho@epp.com',
    rol: 'Despachador',
    departamento: 'Logística'
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'entregado':
        return 'bg-green-100 text-green-800';
      case 'cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'entregado':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'cancelado':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Panel de Despacho</h1>
        <p className="mt-1 text-sm text-gray-600">
          Gestión de entregas de EPP
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <UserProfile {...despachoInfo} />
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900">Estado de Entregas</h2>
          <div className="mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Entregas Pendientes</span>
              <span className="text-sm font-medium text-gray-900">
                {historialEntregas.filter(e => e.estado === 'pendiente').length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Entregas Completadas</span>
              <span className="text-sm font-medium text-gray-900">
                {historialEntregas.filter(e => e.estado === 'entregado').length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Entregas Canceladas</span>
              <span className="text-sm font-medium text-gray-900">
                {historialEntregas.filter(e => e.estado === 'cancelado').length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Historial de Entregas */}
      <div className="mt-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Historial de Entregas</h3>
            <p className="mt-1 text-sm text-gray-500">
              Registro completo de todas las entregas
            </p>
          </div>
          <ul role="list" className="divide-y divide-gray-200">
            {historialEntregas.map((entrega) => (
              <li key={entrega.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-4">
                      {getEstadoIcon(entrega.estado)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {entrega.usuario} - {entrega.departamento}
                      </p>
                      <div className="mt-1">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstadoColor(entrega.estado)}`}>
                          {entrega.estado.charAt(0).toUpperCase() + entrega.estado.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">ID: {entrega.id}</p>
                    <p className="text-xs text-gray-500 mt-1">Asignado: {entrega.fechaAsignacion}</p>
                    {entrega.fechaEntrega && (
                      <p className="text-xs text-gray-500">Entregado: {entrega.fechaEntrega}</p>
                    )}
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">Items:</p>
                  <ul className="mt-1 space-y-1">
                    {entrega.items.map((item, index) => (
                      <li key={index} className="text-sm text-gray-500">
                        • {item.nombre} (x{item.cantidad})
                      </li>
                    ))}
                  </ul>
                </div>
                {entrega.motivoCancelacion && (
                  <p className="mt-2 text-sm text-red-600">
                    Motivo de cancelación: {entrega.motivoCancelacion}
                  </p>
                )}
                {entrega.ubicacion && (
                  <p className="mt-2 text-sm text-gray-500">
                    Ubicación: {entrega.ubicacion}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DespachoDashboard; 