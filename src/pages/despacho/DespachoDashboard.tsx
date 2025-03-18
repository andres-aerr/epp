import React from 'react';
import UserProfile from '../../components/UserProfile';

const DespachoDashboard: React.FC = () => {
  // En producción, estos datos vendrían de un contexto o estado global
  const despachoInfo = {
    nombre: 'María Despacho',
    email: 'despacho@epp.com',
    rol: 'Despachador',
    departamento: 'Logística'
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
              <span className="text-sm font-medium text-gray-900">6</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">En Ruta</span>
              <span className="text-sm font-medium text-gray-900">3</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Completadas Hoy</span>
              <span className="text-sm font-medium text-gray-900">9</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DespachoDashboard; 