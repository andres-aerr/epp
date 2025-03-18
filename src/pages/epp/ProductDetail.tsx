import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { EPPItem } from '../../types/epp';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { useUser } from '../../components/Layout';
import { catalogoEPP, getProductosRelacionados } from '../../data/catalogoEPP';

interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  fecha: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const { user } = useUser();
  const [product, setProduct] = useState<EPPItem | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userReview, setUserReview] = useState<Review | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<EPPItem[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Simulación de imágenes múltiples
  const productImages = [
    '/images/epp/product-photo.svg',
    '/images/epp/product-photo.svg',
    '/images/epp/product-photo.svg',
    '/images/epp/product-photo.svg'
  ];

  useEffect(() => {
    // Cargar datos del producto
    const foundProduct = catalogoEPP.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImage(foundProduct.imagen);
      // Cargar productos relacionados
      const related = getProductosRelacionados(foundProduct.id, foundProduct.categoria);
      setRelatedProducts(related);
    }
    setLoading(false);
  }, [id]);

  const handleAddToCart = () => {
    // Aquí iría la lógica para agregar al carrito
    console.log('Agregando al carrito:', { productId: id, quantity });
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar la reseña
  };

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
    setSelectedImage(productImages[index]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Producto no encontrado</h2>
          <p className="mt-2 text-gray-600">El producto que buscas no existe o no está disponible.</p>
          <Link
            to="/epp/request"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Galería de imágenes */}
        <div className="space-y-4">
          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100">
            <img
              src={selectedImage || productImages[currentImageIndex]}
              alt={product.nombre}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {productImages.map((img, index) => (
              <button
                key={index}
                onClick={() => handleImageChange(index)}
                className={`aspect-w-1 aspect-h-1 overflow-hidden rounded-lg ${
                  currentImageIndex === index ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <img
                  src={img}
                  alt={`Vista ${index + 1}`}
                  className="h-full w-full object-cover object-center"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Información del producto */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.nombre}</h1>
            <div className="mt-4 flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={`h-5 w-5 ${
                      rating < (product.rating || 0)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-3 text-sm text-gray-500">
                {reviews.length} reseñas
              </span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-lg font-medium text-gray-900">Descripción</h2>
            <p className="mt-2 text-gray-600">{product.descripcion}</p>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-lg font-medium text-gray-900">Características</h2>
            <ul className="mt-2 space-y-2">
              {product.caracteristicas.map((caracteristica, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  {caracteristica}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-lg font-medium text-gray-900">Certificaciones</h2>
            <div className="mt-2 grid grid-cols-1 gap-4">
              {product.certificaciones.map((cert, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900">{cert.nombre}</h3>
                  <p className="text-sm text-gray-600">Número: {cert.numero}</p>
                  <p className="text-sm text-gray-600">
                    Válido hasta: {new Date(cert.fechaVencimiento).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-900">Stock Disponible</h2>
                <p className={`mt-1 text-sm ${
                  product.stock > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {product.stock > 0 ? `${product.stock} unidades disponibles` : 'Sin stock'}
                </p>
              </div>
              <div>
                <label htmlFor="quantity" className="sr-only">
                  Cantidad
                </label>
                <select
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="rounded-md border border-gray-300 text-base font-medium text-gray-700 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                  disabled={product.stock === 0}
                >
                  {[...Array(Math.min(product.stock, 5))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`mt-4 w-full rounded-md px-4 py-3 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                product.stock > 0
                  ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {product.stock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
            </button>
          </div>
        </div>
      </div>

      {/* Reseñas */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">Reseñas de Usuarios</h2>
        <div className="mt-6 space-y-8">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6">
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={`h-5 w-5 ${
                          rating < review.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="ml-2 text-sm text-gray-600">{review.userName}</p>
                  <span className="mx-2 text-gray-300">•</span>
                  <p className="text-sm text-gray-600">
                    {new Date(review.fecha).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No hay reseñas todavía.</p>
          )}
        </div>

        {!userReview && (
          <button
            onClick={() => setShowReviewForm(true)}
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Escribir una reseña
          </button>
        )}

        {showReviewForm && (
          <form onSubmit={handleSubmitReview} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Calificación
              </label>
              <div className="mt-1 flex items-center">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    className="p-1"
                    onClick={() => setUserReview(prev => ({
                      ...prev!,
                      rating
                    }))}
                  >
                    <StarIcon
                      className={`h-6 w-6 ${
                        rating <= (userReview?.rating || 0)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label
                htmlFor="comment"
                className="block text-sm font-medium text-gray-700"
              >
                Comentario
              </label>
              <textarea
                id="comment"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Comparte tu experiencia con este producto..."
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Publicar reseña
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Productos relacionados */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">Productos Relacionados</h2>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((relatedProduct) => (
            <Link
              key={relatedProduct.id}
              to={`/epp/product/${relatedProduct.id}`}
              className="group"
            >
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={relatedProduct.imagen}
                  alt={relatedProduct.nombre}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{relatedProduct.nombre}</h3>
              <div className="mt-1 flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={`h-4 w-4 ${
                      rating < (relatedProduct.rating || 0)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 