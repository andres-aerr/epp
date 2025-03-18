import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  PencilIcon, 
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { catalogoEPP } from '../../data/catalogoEPP';

const CatalogoAdmin: React.FC = () => {
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todos');

  // Obtener categorías únicas
  const categorias = [
    { id: 'todos', nombre: 'Todos' },
    ...Array.from(new Set(catalogoEPP.map(item => item.categoria)))
      .map(categoria => ({
        id: categoria,
        nombre: categoria.split('_').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ')
      }))
  ];

  // Filtrar productos por búsqueda y categoría
  const productosFiltrados = catalogoEPP
    .filter(producto => 
      (categoriaSeleccionada === 'todos' || producto.categoria === categoriaSeleccionada) &&
      (producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
       producto.descripcion.toLowerCase().includes(busqueda.toLowerCase()))
    );

  const handleEliminarProducto = (e: React.MouseEvent, productoId: string) => {
    e.preventDefault();
    // Aquí iría la lógica para eliminar el producto
    console.log('Eliminar producto:', productoId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Catálogo de EPP</h1>
          <p className="mt-1 text-sm text-gray-600">
            Gestiona el catálogo de Equipos de Protección Personal
          </p>
        </div>
        <Link
          to="/admin/catalogo/nuevo"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Nuevo Producto
        </Link>
      </div>

      {/* Catálogo de Productos */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Buscar EPP..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
            <div className="sm:w-64">
              <select
                value={categoriaSeleccionada}
                onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productosFiltrados.map((producto) => (
            <div
              key={producto.id}
              className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
            >
              <Link to={`/admin/catalogo/${producto.id}`}>
                <div className="aspect-w-3 aspect-h-2">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/epp/placeholder.jpg';
                    }}
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-medium text-gray-900 hover:text-blue-600">{producto.nombre}</h4>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">{producto.descripcion}</p>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, index) => (
                          <svg
                            key={index}
                            className={`h-4 w-4 ${
                              index < (producto.calificacion || 0)
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 15.934l-6.18 3.246 1.18-6.874L.001 7.466l6.902-1.003L10 0l3.097 6.463 6.902 1.003-4.999 4.84 1.18 6.874z"
                            />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        ({producto.comentarios?.length || 0})
                      </span>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      producto.stock > 10 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      Stock: {producto.stock}
                    </span>
                  </div>
                </div>
              </Link>
              
              {/* Botones de acción */}
              <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link
                  to={`/admin/catalogo/${producto.id}/edit`}
                  className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50"
                >
                  <PencilIcon className="h-4 w-4 text-gray-600" />
                </Link>
                <button
                  onClick={(e) => handleEliminarProducto(e, producto.id)}
                  className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50"
                >
                  <TrashIcon className="h-4 w-4 text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatalogoAdmin; 