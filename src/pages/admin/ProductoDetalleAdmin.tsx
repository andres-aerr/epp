import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  StarIcon, 
  PencilIcon,
  PhotoIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ChatBubbleLeftIcon,
  ShieldCheckIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { catalogoEPP } from '../../data/catalogoEPP';

// Datos de ejemplo para reseñas (igual que en ProductoDetalle)
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

const ProductoDetalleAdmin: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'descripcion' | 'certificaciones' | 'comentarios'>('descripcion');
  const [imagenPrincipal, setImagenPrincipal] = useState<string>('');
  
  const producto = catalogoEPP.find(p => p.id === id);
  
  if (!producto) {
    return <div>Producto no encontrado</div>;
  }

  // Calcular rating promedio
  const ratingPromedio = reseñasEjemplo.reduce((acc, curr) => acc + curr.rating, 0) / reseñasEjemplo.length;

  // Imágenes de ejemplo (igual que en ProductoDetalle)
  const imagenes = [
    producto.imagen,
    '/images/epp/product-detail-1.jpg',
    '/images/epp/product-detail-2.jpg',
    '/images/epp/product-detail-3.jpg'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Barra de navegación y acciones */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/admin/catalogo" className="text-gray-500 hover:text-gray-700">
                  Catálogo
                </Link>
              </li>
              <li>
                <span className="text-gray-500">/</span>
              </li>
              <li>
                <span className="text-gray-900">{producto.nombre}</span>
              </li>
            </ol>
          </nav>
          <Link
            to={`/admin/catalogo/${id}/edit`}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <PencilIcon className="h-5 w-5 mr-2" />
            Editar Producto
          </Link>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Galería de imágenes */}
        <div className="mb-8 lg:mb-0">
          <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={imagenPrincipal || producto.imagen}
              alt={producto.nombre}
              className="w-full h-full object-center object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/epp/placeholder.jpg';
              }}
            />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-4">
            {imagenes.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setImagenPrincipal(img)}
                className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden ${
                  imagenPrincipal === img ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                {img ? (
                  <img
                    src={img}
                    alt={`Vista ${idx + 1}`}
                    className="w-full h-full object-center object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/epp/placeholder.jpg';
                    }}
                  />
                ) : (
                  <PhotoIcon className="h-6 w-6 text-gray-400" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Información del producto */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{producto.nombre}</h1>
          
          {/* Calificaciones y estadísticas */}
          <div className="mt-4">
            <div className="flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarSolidIcon
                    key={rating}
                    className={`h-5 w-5 ${
                      rating < Math.floor(ratingPromedio)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                ({ratingPromedio.toFixed(1)}/5) · {reseñasEjemplo.length} evaluaciones
              </span>
            </div>
          </div>

          {/* Estado del stock */}
          <div className="mt-4">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              producto.stock > 10 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              <span className="mr-2">
                {producto.stock > 10 ? 'En Stock' : 'Stock Bajo'}
              </span>
              <span>{producto.stock} unidades</span>
            </div>
          </div>

          {/* Tabs de navegación */}
          <div className="mt-8 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('descripcion')}
                className={`${
                  activeTab === 'descripcion'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <DocumentTextIcon className="h-5 w-5 mr-2" />
                Descripción
              </button>
              <button
                onClick={() => setActiveTab('certificaciones')}
                className={`${
                  activeTab === 'certificaciones'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <ShieldCheckIcon className="h-5 w-5 mr-2" />
                Certificaciones
              </button>
              <button
                onClick={() => setActiveTab('comentarios')}
                className={`${
                  activeTab === 'comentarios'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <ChatBubbleLeftIcon className="h-5 w-5 mr-2" />
                Evaluaciones
              </button>
            </nav>
          </div>

          {/* Contenido del tab activo */}
          <div className="mt-8">
            {activeTab === 'descripcion' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Descripción</h3>
                  <p className="mt-2 text-gray-600">{producto.descripcion}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900">Características</h3>
                  <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="bg-gray-50 px-4 py-3 rounded-lg">
                      <dt className="text-sm font-medium text-gray-500">Material</dt>
                      <dd className="mt-1 text-sm text-gray-900">{producto.material}</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 rounded-lg">
                      <dt className="text-sm font-medium text-gray-500">Tallas Disponibles</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {producto.tallas?.join(', ') || 'Talla única'}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 rounded-lg">
                      <dt className="text-sm font-medium text-gray-500">Vida Útil Recomendada</dt>
                      <dd className="mt-1 text-sm text-gray-900">{producto.vidaUtil}</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 rounded-lg">
                      <dt className="text-sm font-medium text-gray-500">Categoría</dt>
                      <dd className="mt-1 text-sm text-gray-900">{producto.categoria}</dd>
                    </div>
                  </dl>
                </div>

                {/* Recomendaciones de uso */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Recomendaciones de Uso</h3>
                  <ul className="mt-4 space-y-3">
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mt-1 mr-2" />
                      <span className="text-gray-600">Inspeccionar antes de cada uso</span>
                    </li>
                    <li className="flex items-start">
                      <ClockIcon className="h-5 w-5 text-blue-500 mt-1 mr-2" />
                      <span className="text-gray-600">Reemplazar según la vida útil recomendada</span>
                    </li>
                    <li className="flex items-start">
                      <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 mt-1 mr-2" />
                      <span className="text-gray-600">No modificar o alterar el equipo</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'certificaciones' && (
              <div className="space-y-6">
                {producto.certificaciones?.map((cert, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start">
                      <ShieldCheckIcon className="h-6 w-6 text-green-500 mr-3" />
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">{cert.nombre}</h4>
                        <p className="mt-1 text-gray-600">{cert.descripcion}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'comentarios' && (
              <div className="space-y-6">
                {reseñasEjemplo.map((reseña) => (
                  <div key={reseña.id} className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{reseña.usuario}</h3>
                        <p className="text-sm text-gray-500">{reseña.cargo}</p>
                      </div>
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarSolidIcon
                            key={rating}
                            className={`h-5 w-5 ${
                              rating < reseña.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
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
            )}
          </div>

          {/* Productos relacionados */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">Productos Relacionados</h2>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {catalogoEPP
                .filter(p => p.categoria === producto.categoria && p.id !== producto.id)
                .slice(0, 2)
                .map(prod => (
                  <Link
                    key={prod.id}
                    to={`/admin/catalogo/${prod.id}`}
                    className="group"
                  >
                    <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={prod.imagen}
                        alt={prod.nombre}
                        className="w-full h-full object-center object-cover group-hover:opacity-75"
                      />
                    </div>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">{prod.nombre}</h3>
                    <div className="mt-1 flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarSolidIcon
                          key={rating}
                          className={`h-4 w-4 ${
                            rating < (prod.calificacion || 0)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-500">
                        ({prod.calificacion || 0})
                      </span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalleAdmin; 