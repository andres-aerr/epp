import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { catalogoEPP } from '../../data/catalogoEPP';

const CatalogoEPP: React.FC = () => {
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todos');
  const [carrito, setCarrito] = useState<{id: string, cantidad: number}[]>([]);

  // En producción, estos datos vendrían de un contexto o estado global
  const userInfo = {
    rubro: 'construccion'
  };

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

  // Filtrar productos por búsqueda, categoría y rubro del usuario
  const productosFiltrados = catalogoEPP
    .filter(producto => 
      producto.rubrosPermitidos.includes(userInfo.rubro) &&
      (categoriaSeleccionada === 'todos' || producto.categoria === categoriaSeleccionada) &&
      (producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
       producto.descripcion.toLowerCase().includes(busqueda.toLowerCase()))
    );

  const handleAgregarAlCarrito = (productoId: string) => {
    setCarrito(prevCarrito => {
      const itemExistente = prevCarrito.find(item => item.id === productoId);
      if (itemExistente) {
        return prevCarrito.map(item =>
          item.id === productoId
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prevCarrito, { id: productoId, cantidad: 1 }];
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Catálogo de EPP</h1>
        <p className="mt-1 text-sm text-gray-600">
          Explora nuestro catálogo de Equipos de Protección Personal
        </p>
      </div>

      {/* Resumen del Carrito */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Carrito de Solicitud</h2>
          <span className="text-sm font-medium text-gray-900">
            {carrito.reduce((total, item) => total + item.cantidad, 0)} items
          </span>
        </div>
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
            <Link
              key={producto.id}
              to={`/epp/producto/${producto.id}`}
              className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
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
                  <span className="text-sm font-medium text-gray-900">
                    Stock: {producto.stock}
                  </span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleAgregarAlCarrito(producto.id);
                    }}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <ShoppingCartIcon className="h-4 w-4 mr-1" />
                    Agregar
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatalogoEPP; 