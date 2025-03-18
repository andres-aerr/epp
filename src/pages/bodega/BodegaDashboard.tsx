import React from 'react';
import UserProfile from '../../components/UserProfile';
import { catalogoEPP } from '../../data/catalogoEPP';

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

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Panel de Bodega</h1>
        <p className="mt-1 text-sm text-gray-600">
          Gestión de solicitudes y stock de EPP
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

      {/* Resumen de Inventario */}
      <div className="mt-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Resumen de Inventario</h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-500">Total de Productos</h4>
              <p className="mt-2 text-3xl font-semibold text-gray-900">{catalogoEPP.length}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-500">Productos con Stock Bajo</h4>
              <p className="mt-2 text-3xl font-semibold text-yellow-600">
                {catalogoEPP.filter(p => p.stock < 20).length}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-500">Productos por Recibir</h4>
              <p className="mt-2 text-3xl font-semibold text-blue-600">
                {productosPorRecibir.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodegaDashboard; 