import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { EPPItem, CarritoItem } from '../../types/epp';
import { catalogoEPP } from '../../data/catalogoEPP';
import { useUser } from '../../components/Layout';

const RequestEPP = () => {
  const { usuario } = useUser();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('todos');

  // Lista única de categorías basada en el catálogo
  const categorias = [
    { id: 'todos', nombre: 'Todos' },
    ...Array.from(new Set(catalogoEPP.map(item => item.categoria)))
      .map(categoria => ({
        id: categoria,
        nombre: categoria.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      }))
  ];

  const productosFiltrados = catalogoEPP.filter(producto => 
    (categoriaSeleccionada === 'todos' || producto.categoria === categoriaSeleccionada) &&
    (usuario.rol === 'admin' || producto.rubrosPermitidos.includes(usuario.rubro))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Catálogo de EPP
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Equipos disponibles para {usuario.cargo} en {usuario.rubro}
          </p>
        </div>
      </div>

      {/* Filtros */}
      <div className="mt-4">
        <div className="sm:flex sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <label className="text-sm font-medium text-gray-700">Categoría:</label>
          <select
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid de productos */}
      <div className="mt-8 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
        {productosFiltrados.map((producto) => (
          <Link 
            key={producto.id} 
            to={`/epp/product/${producto.id}`} 
            className="group relative bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
          >
            <div className="aspect-w-1 aspect-h-1 rounded-t-lg overflow-hidden">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-full h-full object-center object-cover group-hover:opacity-75 transition-opacity duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/epp/placeholder.jpg';
                }}
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 text-center">
                {producto.nombre}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RequestEPP; 