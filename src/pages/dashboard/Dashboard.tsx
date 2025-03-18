import React from 'react';
import UserProfile from '../../components/UserProfile';

const Dashboard: React.FC = () => {
  // En producción, estos datos vendrían de un contexto o estado global
  const userInfo = {
    nombre: 'Juan Pérez',
    email: 'usuario@epp.com',
    rol: 'Usuario',
    departamento: 'Operaciones',
    rubro: 'construccion'
  };

  // Simulación de productos asignados al usuario
  const productosAsignados = [
    {
      id: '1',
      nombre: 'Casco MSA V-Gard',
      fechaAsignacion: '2024-01-15',
      fechaVencimiento: '2024-07-15',
      estado: 'activo'
    },
    {
      id: '2',
      nombre: 'Zapatos de Seguridad',
      fechaAsignacion: '2024-02-01',
      fechaVencimiento: '2024-08-01',
      estado: 'activo'
    },
    {
      id: '3',
      nombre: 'Guantes de Nitrilo',
      fechaAsignacion: '2024-03-01',
      fechaVencimiento: '2024-04-01',
      estado: 'por_vencer'
    }
  ];

  // Simulación de historial de solicitudes
  const historialSolicitudes = [
    {
      id: 'SOL-001',
      fecha: '2024-03-15',
      estado: 'entregada',
      items: ['Casco MSA V-Gard', 'Guantes de Nitrilo']
    },
    {
      id: 'SOL-002',
      fecha: '2024-03-10',
      estado: 'pendiente',
      items: ['Zapatos de Seguridad']
    },
    {
      id: 'SOL-003',
      fecha: '2024-03-01',
      estado: 'rechazada',
      items: ['Arnés de Seguridad']
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Mi Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Bienvenido a tu panel de control
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <UserProfile {...userInfo} />
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900">Resumen de EPP</h2>
          <div className="mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">EPP Activos</span>
              <span className="text-sm font-medium text-gray-900">
                {productosAsignados.filter(p => p.estado === 'activo').length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Por Vencer</span>
              <span className="text-sm font-medium text-gray-900">
                {productosAsignados.filter(p => p.estado === 'por_vencer').length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* EPP Asignado */}
      <div className="mt-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Mi EPP Asignado</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {productosAsignados.map((producto) => (
              <div key={producto.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{producto.nombre}</p>
                    <p className="text-sm text-gray-500">
                      Asignado: {producto.fechaAsignacion}
                    </p>
                    <p className="text-xs text-gray-400">
                      Vence: {producto.fechaVencimiento}
                    </p>
                  </div>
                  <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      producto.estado === 'activo' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {producto.estado === 'activo' ? 'Activo' : 'Por Vencer'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Historial de Solicitudes */}
      <div className="mt-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Historial de Solicitudes</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {historialSolicitudes.map((solicitud) => (
              <div key={solicitud.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Solicitud {solicitud.id}
                    </p>
                    <p className="text-sm text-gray-500">
                      Items: {solicitud.items.join(', ')}
                    </p>
                    <p className="text-xs text-gray-400">
                      Fecha: {solicitud.fecha}
                    </p>
                  </div>
                  <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      solicitud.estado === 'entregada' 
                        ? 'bg-green-100 text-green-800'
                        : solicitud.estado === 'pendiente'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {solicitud.estado.charAt(0).toUpperCase() + solicitud.estado.slice(1)}
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

export default Dashboard;