import React from 'react';
import {
  estadisticasGenerales,
  solicitudesRecientes,
  eppPorVencer,
  stockCritico,
  actividadReciente,
  kpisAdmin
} from '../../data/dashboardData';
import {
  ChartBarIcon,
  ClockIcon,
  DocumentCheckIcon,
  ExclamationTriangleIcon,
  UserGroupIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';
import UserProfile from '../../components/UserProfile';
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
  const stockCritico = catalogoEPP
    .filter(producto => producto.stock < 10)
    .slice(0, 5);

  // Simulación de productos más solicitados
  const productosMasSolicitados = catalogoEPP
    .sort(() => Math.random() - 0.5) // En producción, esto sería basado en datos reales
    .slice(0, 5);

  return (
    <div className="p-6">
      {/* Título del Dashboard */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Panel de Administración</h1>
        <p className="mt-1 text-sm text-gray-600">
          Gestión general del sistema EPP
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <UserProfile {...adminInfo} />
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900">Resumen del Sistema</h2>
          <div className="mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Usuarios Activos</span>
              <span className="text-sm font-medium text-gray-900">150</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Solicitudes Pendientes</span>
              <span className="text-sm font-medium text-gray-900">25</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Entregas en Proceso</span>
              <span className="text-sm font-medium text-gray-900">10</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DocumentCheckIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Tasa de Aprobación
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {kpisAdmin.tasaAprobacion}%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ClockIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Tiempo Promedio de Aprobación
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {kpisAdmin.tiempoPromedioAprobacion} días
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BanknotesIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Cumplimiento del Presupuesto
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {kpisAdmin.cumplimientoPresupuesto}%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estadísticas Generales */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UserGroupIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Usuarios Activos
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {estadisticasGenerales.usuariosActivos}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ChartBarIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    EPP Entregado
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {estadisticasGenerales.eppEntregado}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ExclamationTriangleIcon className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    EPP por Vencer
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {estadisticasGenerales.eppPorVencer}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DocumentCheckIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Solicitudes Pendientes
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {estadisticasGenerales.solicitudesPendientes}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Solicitudes Recientes */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Solicitudes Recientes</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {solicitudesRecientes.map((solicitud) => (
              <div key={solicitud.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{solicitud.usuario}</p>
                    <p className="text-sm text-gray-500">{solicitud.departamento}</p>
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
                <div className="mt-2">
                  {solicitud.items.map((item, index) => (
                    <p key={index} className="text-sm text-gray-500">
                      • {item.nombre} (x{item.cantidad})
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Productos más solicitados y Stock Crítico */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Productos Más Solicitados</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {productosMasSolicitados.map((producto) => (
              <div key={producto.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{producto.nombre}</p>
                    <p className="text-sm text-gray-500">Stock: {producto.stock} unidades</p>
                  </div>
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Alta demanda
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stock Crítico */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Stock Crítico</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {stockCritico.map((producto) => (
            <div key={producto.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{producto.nombre}</p>
                  <p className="text-sm text-gray-500">
                    Stock actual: {producto.stock} unidades
                  </p>
                </div>
                <div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Crítico
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EPP por Vencer */}
      <div className="mt-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">EPP por Vencer</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {eppPorVencer.map((epp) => (
              <div key={epp.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{epp.tipo}</p>
                    <p className="text-sm text-gray-500">Usuario: {epp.usuario}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      Vence en: <span className="font-medium text-yellow-600">{epp.diasRestantes} días</span>
                    </p>
                    <p className="text-xs text-gray-400">{epp.fechaVencimiento}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actividad Reciente */}
      <div className="mt-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Actividad Reciente</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {actividadReciente.map((actividad) => (
              <div key={actividad.id} className="px-6 py-4">
                <div className="flex items-center">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">{actividad.descripcion}</p>
                    <p className="text-sm text-gray-500">
                      Por: {actividad.usuario}
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <p className="text-sm text-gray-400">
                      {new Date(actividad.fecha).toLocaleString()}
                    </p>
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

export default AdminDashboard; 