import React, { useState } from 'react';
import {
  UserCircleIcon,
  KeyIcon,
  BriefcaseIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon,
  ClockIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const PerfilAdmin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'perfil' | 'estadisticas' | 'permisos'>('perfil');

  // Datos de ejemplo del administrador
  const adminData = {
    nombre: 'Juan Pérez',
    email: 'juan.perez@empresa.com',
    telefono: '+56 9 1234 5678',
    cargo: 'Administrador General',
    departamento: 'Seguridad y Salud Ocupacional',
    fechaIngreso: '2022-01-15',
    permisos: {
      gestionUsuarios: [
        'Crear nuevos usuarios',
        'Editar información de usuarios',
        'Desactivar usuarios',
        'Asignar roles y permisos',
        'Ver historial de actividades',
        'Gestionar departamentos y áreas'
      ],
      gestionCatalogo: [
        'Crear nuevos productos EPP',
        'Editar información de productos',
        'Eliminar productos',
        'Gestionar categorías',
        'Administrar certificaciones',
        'Gestionar imágenes de productos',
        'Ver y moderar comentarios'
      ],
      gestionSolicitudes: [
        'Aprobar/Rechazar solicitudes',
        'Priorizar solicitudes',
        'Asignar solicitudes a bodega',
        'Ver historial de solicitudes',
        'Generar reportes de solicitudes',
        'Gestionar estados de entrega'
      ],
      gestionInventario: [
        'Gestionar stock',
        'Establecer niveles mínimos',
        'Registrar entradas/salidas',
        'Realizar ajustes de inventario',
        'Generar órdenes de compra',
        'Ver historial de movimientos'
      ],
      reportesEstadisticas: [
        'Generar reportes generales',
        'Exportar datos del sistema',
        'Ver estadísticas en tiempo real',
        'Analizar tendencias de uso',
        'Generar reportes de costos',
        'Monitorear indicadores clave'
      ],
      configuracionSistema: [
        'Configurar parámetros generales',
        'Gestionar roles y permisos',
        'Configurar notificaciones',
        'Gestionar integraciones',
        'Realizar respaldos del sistema',
        'Configurar flujos de trabajo'
      ]
    },
    estadisticas: {
      usuariosActivos: 150,
      solicitudesPendientes: 25,
      productosGestionados: 85,
      solicitudesAprobadas: 120,
      stockBajo: 15,
      usuariosNuevos: 12,
      solicitudesHoy: 8,
      productosActivos: 230
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Panel de Administrador</h1>
        <p className="mt-1 text-sm text-gray-600">
          Gestión completa del sistema y monitoreo de actividades
        </p>
      </div>

      {/* Tabs de navegación */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('perfil')}
            className={`${
              activeTab === 'perfil'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <UserCircleIcon className="h-5 w-5 mr-2" />
            Información Personal
          </button>
          <button
            onClick={() => setActiveTab('permisos')}
            className={`${
              activeTab === 'permisos'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <KeyIcon className="h-5 w-5 mr-2" />
            Permisos y Accesos
          </button>
          <button
            onClick={() => setActiveTab('estadisticas')}
            className={`${
              activeTab === 'estadisticas'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <ChartBarIcon className="h-5 w-5 mr-2" />
            Estadísticas del Sistema
          </button>
        </nav>
      </div>

      {/* Contenido del tab activo */}
      {activeTab === 'perfil' && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Información Personal */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Información Personal</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <UserCircleIcon className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Nombre Completo</p>
                  <p className="text-sm text-gray-900">{adminData.nombre}</p>
                </div>
              </div>
              <div className="flex items-center">
                <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-sm text-gray-900">{adminData.email}</p>
                </div>
              </div>
              <div className="flex items-center">
                <PhoneIcon className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Teléfono</p>
                  <p className="text-sm text-gray-900">{adminData.telefono}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Información Laboral */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Información Laboral</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <BriefcaseIcon className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Cargo</p>
                  <p className="text-sm text-gray-900">{adminData.cargo}</p>
                </div>
              </div>
              <div className="flex items-center">
                <BuildingOfficeIcon className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Departamento</p>
                  <p className="text-sm text-gray-900">{adminData.departamento}</p>
                </div>
              </div>
              <div className="flex items-center">
                <CalendarIcon className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Fecha de Ingreso</p>
                  <p className="text-sm text-gray-900">
                    {new Date(adminData.fechaIngreso).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'permisos' && (
        <div className="space-y-6">
          {Object.entries(adminData.permisos).map(([categoria, permisos]) => (
            <div key={categoria} className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {categoria.split(/(?=[A-Z])/).join(' ')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {permisos.map((permiso, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 bg-blue-50 rounded-lg"
                  >
                    <KeyIcon className="h-5 w-5 text-blue-500 mr-3" />
                    <span className="text-sm text-blue-700">{permiso}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'estadisticas' && (
        <div className="space-y-8">
          {/* Métricas principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center">
                <UserGroupIcon className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Usuarios Activos</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {adminData.estadisticas.usuariosActivos}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center">
                <ClockIcon className="h-8 w-8 text-yellow-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Solicitudes Pendientes</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {adminData.estadisticas.solicitudesPendientes}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center">
                <BriefcaseIcon className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Productos Activos</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {adminData.estadisticas.productosActivos}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center">
                <ChartBarIcon className="h-8 w-8 text-purple-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Solicitudes Hoy</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {adminData.estadisticas.solicitudesHoy}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Métricas secundarias */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center">
                <UserGroupIcon className="h-8 w-8 text-indigo-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Usuarios Nuevos</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {adminData.estadisticas.usuariosNuevos}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center">
                <ClockIcon className="h-8 w-8 text-red-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Stock Bajo</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {adminData.estadisticas.stockBajo}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center">
                <BriefcaseIcon className="h-8 w-8 text-teal-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Productos Gestionados</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {adminData.estadisticas.productosGestionados}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center">
                <ChartBarIcon className="h-8 w-8 text-orange-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Solicitudes Aprobadas</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {adminData.estadisticas.solicitudesAprobadas}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerfilAdmin; 