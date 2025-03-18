import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { StarIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import { catalogoEPP } from '../../data/catalogoEPP';

// Datos de ejemplo para reseñas
const reseñasEjemplo = [
  {
    id: 1,
    usuario: 'Carlos Rodríguez',
    rating: 5,
    fecha: '2024-02-15',
    comentario: 'Excelente calidad y muy cómodo para uso prolongado.',
    cargo: 'Supervisor de Obra'
  },
  {
    id: 2,
    usuario: 'Ana Martínez',
    rating: 4,
    fecha: '2024-02-10',
    comentario: 'Buen producto, cumple con todas las certificaciones necesarias.',
    cargo: 'Ingeniera de Seguridad'
  },
  {
    id: 3,
    usuario: 'Miguel Torres',
    rating: 5,
    fecha: '2024-02-05',
    comentario: 'Muy resistente y duradero, lo recomiendo completamente.',
    cargo: 'Operador de Maquinaria'
  }
];

const ProductoDetalle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [imagenSeleccionada, setImagenSeleccionada] = useState(0);
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState(1);

  // Encontrar el producto por ID
  const producto = catalogoEPP.find(p => p.id === id);

  if (!producto) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Producto no encontrado</p>
      </div>
    );
  }

  // Productos relacionados (misma categoría)
  const productosRelacionados = catalogoEPP
    .filter(p => p.categoria === producto.categoria && p.id !== producto.id)
    .slice(0, 4);

  // Calcular rating promedio
  const ratingPromedio = reseñasEjemplo.reduce((acc, curr) => acc + curr.rating, 0) / reseñasEjemplo.length;

  // Imágenes de ejemplo (en producción vendrían del backend)
  const imagenes = [
    producto.imagen,
    '/images/epp/product-detail-1.jpg',
    '/images/epp/product-detail-2.jpg',
    '/images/epp/product-detail-3.jpg'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Navegación */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li><Link to="/dashboard" className="hover:text-blue-600">Inicio</Link></li>
          <li>/</li>
          <li><Link to="/dashboard" className="hover:text-blue-600">Catálogo</Link></li>
          <li>/</li>
          <li className="text-gray-900">{producto.nombre}</li>
        </ol>
      </nav>

      {/* Producto Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Galería de Imágenes */}
        <div className="space-y-4">
          <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-gray-100">
            <img
              src={imagenes[imagenSeleccionada]}
              alt={producto.nombre}
              className="w-full h-full object-center object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/epp/placeholder.jpg';
              }}
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {imagenes.map((imagen, index) => (
              <button
                key={index}
                onClick={() => setImagenSeleccionada(index)}
                className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-gray-100 ${
                  imagenSeleccionada === index ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <img
                  src={imagen}
                  alt={`Vista ${index + 1} de ${producto.nombre}`}
                  className="w-full h-full object-center object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/epp/placeholder.jpg';
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Información del Producto */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{producto.nombre}</h1>
          
          <div className="mt-4 flex items-center">
            <div className="flex items-center">
              {[0, 1, 2, 3, 4].map((rating) => (
                <StarIcon
                  key={rating}
                  className={`${
                    rating < Math.floor(ratingPromedio)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  } h-5 w-5 flex-shrink-0`}
                />
              ))}
            </div>
            <p className="ml-3 text-sm text-gray-500">
              {reseñasEjemplo.length} reseñas
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">Descripción</h2>
            <p className="mt-4 text-gray-600">{producto.descripcion}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">Características</h2>
            <ul className="mt-4 space-y-2">
              {producto.caracteristicas.map((caracteristica, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
                  {caracteristica}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">Certificaciones</h2>
            <div className="mt-4 grid grid-cols-1 gap-4">
              {producto.certificaciones.map((certificacion, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-medium text-gray-900">{certificacion.nombre}</h3>
                  <p className="text-sm text-gray-500">Número: {certificacion.numero}</p>
                  <p className="text-sm text-gray-500">
                    Válido hasta: {new Date(certificacion.fechaVencimiento).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Stock Disponible</h2>
              <span className="text-lg font-medium text-gray-900">{producto.stock} unidades</span>
            </div>
            
            <div className="mt-4">
              <label htmlFor="cantidad" className="block text-sm font-medium text-gray-700">
                Cantidad
              </label>
              <select
                id="cantidad"
                value={cantidadSeleccionada}
                onChange={(e) => setCantidadSeleccionada(Number(e.target.value))}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {[...Array(Math.min(5, producto.stock))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              className="mt-8 w-full bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ShoppingCartIcon className="h-5 w-5 mr-2" />
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>

      {/* Reseñas */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Reseñas de Usuarios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reseñasEjemplo.map((reseña) => (
            <div key={reseña.id} className="border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{reseña.usuario}</h3>
                  <p className="text-sm text-gray-500">{reseña.cargo}</p>
                </div>
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={`${
                        rating < reseña.rating ? 'text-yellow-400' : 'text-gray-300'
                      } h-5 w-5 flex-shrink-0`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600">{reseña.comentario}</p>
              <p className="mt-2 text-sm text-gray-500">
                {new Date(reseña.fecha).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Productos Relacionados */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Productos Relacionados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productosRelacionados.map((producto) => (
            <Link
              key={producto.id}
              to={`/epp/producto/${producto.id}`}
              className="group"
            >
              <div className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-w-1 aspect-h-1">
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
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                    {producto.nombre}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">Stock: {producto.stock}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalle; 