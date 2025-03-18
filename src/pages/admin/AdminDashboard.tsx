import React from 'react';
import {
  estadisticasGenerales,
  solicitudesRecientes,
  kpisAdmin
} from '../../data/dashboardData';
import {
  ChartBarIcon,
  ClockIcon,
  DocumentCheckIcon,
  ExclamationTriangleIcon,
  UserGroupIcon,
  BanknotesIcon,
  ArrowTrendingUpIcon,
  InboxIcon,
  QueueListIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import { catalogoEPP } from '../../data/catalogoEPP';

const AdminDashboard: React.FC = () => {
  // En producción, estos datos vendrían de un contexto o estado global
  const adminInfo = {
    nombre: 'Admin Principal',
    email: 'admin@epp.com',
    rol: 'Administrador',
    departamento: 'TI'
  };

  // Filtrar productos con stock crítico (menos de 10 unidades)
  const productosStockCritico = catalogoEPP
    .filter(producto => producto.stock < 10)
    .slice(0, 5);

  // Simulación de productos más solicitados
  const productosMasSolicitados = catalogoEPP
    .sort(() => Math.random() - 0.5) // En producción, esto sería basado en datos reales
    .slice(0, 5);

  return (
    <div className="p-4 md:p-6">
      {/* Header y perfil */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
          <p className="mt-1 text-sm text-gray-600">
            Gestión general del sistema EPP
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 max-w-sm w-full">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <UserGroupIcon className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">{adminInfo.nombre}</p>
              <p className="text-xs text-gray-500">{adminInfo.email}</p>
              <p className="text-xs mt-1">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                  {adminInfo.rol}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* KPIs principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow overflow-hidden">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md bg-blue-500 p-2">
                <UserGroupIcon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Usuarios Activos</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{estadisticasGenerales.usuariosActivos}</dd>
                </dl>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-blue-600">
                  +12% este mes
                </div>
                <ArrowTrendingUpIcon className="h-4 w-4 text-blue-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow overflow-hidden">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md bg-green-500 p-2">
                <DocumentCheckIcon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Tasa de Aprobación</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{kpisAdmin.tasaAprobacion}%</dd>
                </dl>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${kpisAdmin.tasaAprobacion}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg shadow overflow-hidden">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md bg-yellow-500 p-2">
                <ClockIcon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Tiempo de Aprobación</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{kpisAdmin.tiempoPromedioAprobacion} días</dd>
                </dl>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-sm text-yellow-700">
                <span className="font-medium">Meta:</span> 2 días
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg shadow overflow-hidden">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md bg-indigo-500 p-2">
                <BanknotesIcon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Presupuesto</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{kpisAdmin.cumplimientoPresupuesto}%</dd>
                </dl>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-500 h-2 rounded-full" 
                  style={{ width: `${kpisAdmin.cumplimientoPresupuesto}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Métricas secundarias */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 flex items-center">
          <div className="flex-shrink-0 rounded-md bg-blue-100 p-2 mr-4">
            <ChartBarIcon className="h-6 w-6 text-blue-700" />
          </div>
          <div>
            <p className="text-sm text-gray-500">EPP Entregado</p>
            <p className="text-xl font-semibold">{estadisticasGenerales.eppEntregado}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 flex items-center">
          <div className="flex-shrink-0 rounded-md bg-yellow-100 p-2 mr-4">
            <ExclamationTriangleIcon className="h-6 w-6 text-yellow-700" />
          </div>
          <div>
            <p className="text-sm text-gray-500">EPP por Vencer</p>
            <p className="text-xl font-semibold">{estadisticasGenerales.eppPorVencer}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 flex items-center">
          <div className="flex-shrink-0 rounded-md bg-red-100 p-2 mr-4">
            <InboxIcon className="h-6 w-6 text-red-700" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Stock Crítico</p>
            <p className="text-xl font-semibold">{productosStockCritico.length}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 flex items-center">
          <div className="flex-shrink-0 rounded-md bg-purple-100 p-2 mr-4">
            <QueueListIcon className="h-6 w-6 text-purple-700" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Solicitudes Pendientes</p>
            <p className="text-xl font-semibold">{estadisticasGenerales.solicitudesPendientes}</p>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Solicitudes recientes */}
        <div className="bg-white shadow rounded-lg overflow-hidden lg:col-span-2">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Solicitudes Recientes</h3>
            <a href="/admin/requests" className="text-sm text-blue-600 hover:text-blue-800">Ver todas</a>
          </div>
          <div className="divide-y divide-gray-200">
            {solicitudesRecientes.slice(0, 5).map((solicitud) => (
              <div key={solicitud.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-4">
                      <BuildingOfficeIcon className="h-8 w-8 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{solicitud.usuario}</p>
                      <p className="text-xs text-gray-500">{solicitud.departamento}</p>
                      <p className="text-xs text-gray-500 mt-1">{solicitud.fecha}</p>
                    </div>
                  </div>
                  <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      solicitud.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                      solicitud.estado === 'aprobado' ? 'bg-green-100 text-green-800' :
                      solicitud.estado === 'rechazado' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {solicitud.estado.charAt(0).toUpperCase() + solicitud.estado.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-3 bg-gray-50 text-center">
            <button className="text-sm text-gray-600 hover:text-gray-900">Cargar más</button>
          </div>
        </div>

        {/* EPPs críticos */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Stock Crítico</h3>
            <a href="/admin/inventory" className="text-sm text-blue-600 hover:text-blue-800">Gestionar</a>
          </div>
          <div className="divide-y divide-gray-200">
            {productosStockCritico.map((producto) => (
              <div key={producto.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">{producto.nombre}</p>
                    <p className="text-xs text-gray-500">{producto.categoria}</p>
                  </div>
                  <div className="ml-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      producto.stock < 5 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      Stock: {producto.stock}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-3 bg-gray-50 text-center">
            <button className="text-sm text-gray-600 hover:text-gray-900">Ver todo el inventario</button>
          </div>
        </div>
      </div>

      {/* Sección productos más solicitados */}
      <div className="mt-6">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Productos Más Solicitados</h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {productosMasSolicitados.map((producto) => (
                <div key={producto.id} className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="h-32 bg-gray-200 flex items-center justify-center">
                    <img 
                      src={producto.imagen} 
                      alt={producto.nombre} 
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/150?text=EPP';
                      }}
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium text-gray-900 truncate">{producto.nombre}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">Stock: {producto.stock}</span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        Alta demanda
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 