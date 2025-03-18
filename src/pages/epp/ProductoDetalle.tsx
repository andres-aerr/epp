import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { StarIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';
import { catalogoEPP } from '../../data/catalogoEPP';
import { EPPItem, TallasUsuario } from '../../types/epp';

// Tipos
interface CarritoItem {
  id: string;
  cantidad: number;
  talla: string;
}

// Clave para el localStorage
const CART_STORAGE_KEY = 'epp_carrito';

// Perfiles de tallas del usuario (esto vendría desde el contexto o API en producción)
const tallasUsuario: TallasUsuario = {
  ropa: "M",         // Camisa, overol, etc.
  calzado: "42",     // Zapatos, botas
  casco: "7 1/4",    // Cascos de seguridad
  guantes: "L",      // Guantes de todo tipo
  respirador: "M"    // Mascarillas, respiradores
};

// Mapeo de categorías a tipo de talla del usuario
const mapeoCategoriaTalla: Record<string, keyof TallasUsuario> = {
  proteccion_cabeza: "casco",
  proteccion_visual: "ropa", // Generalmente talla única, usamos ropa como default
  proteccion_auditiva: "ropa", // Generalmente talla única
  proteccion_respiratoria: "respirador",
  proteccion_manos: "guantes",
  proteccion_pies: "calzado",
  proteccion_corporal: "ropa",
  ropa_trabajo: "ropa",
  proteccion_altura: "ropa",
  proteccion_contra_caidas: "ropa",
  proteccion_piel: "ropa" // Generalmente talla única
};

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
  const navigate = useNavigate();
  const [imagenSeleccionada, setImagenSeleccionada] = useState(0);
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState(1);
  const [productoAgregado, setProductoAgregado] = useState(false);
  
  // Estados para el carrito
  const [carrito, setCarrito] = useState<CarritoItem[]>([]);
  const [carritoInicializado, setCarritoInicializado] = useState(false);

  // Encontrar el producto por ID
  const producto = catalogoEPP.find(p => p.id === id);

  // Obtener la talla automáticamente basada en la categoría del producto
  const obtenerTallaAutomatica = (producto: EPPItem | undefined): string => {
    if (!producto) return "Universal";
    
    // Obtener el tipo de talla correspondiente a la categoría
    const tipoTalla = mapeoCategoriaTalla[producto.categoria] || "ropa";
    
    // Obtener la talla del perfil del usuario
    const tallaUsuario = tallasUsuario[tipoTalla];
    
    // Verificar si la talla del usuario está disponible para este producto
    if (producto.tallas.includes(tallaUsuario)) {
      return tallaUsuario;
    }
    
    // Si la talla del usuario no está disponible, usar la primera talla disponible
    return producto.tallas[0];
  };

  // Obtener talla automática cuando cambia el producto
  const [tallaAutomatica, setTallaAutomatica] = useState('');
  
  // Cargar el carrito desde localStorage al iniciar
  useEffect(() => {
    const carritoGuardado = localStorage.getItem(CART_STORAGE_KEY);
    console.log('ProductoDetalle - carga inicial del carrito:', carritoGuardado);
    
    if (carritoGuardado) {
      try {
        const carritoParseado = JSON.parse(carritoGuardado);
        
        // Verificar que sea un array
        if (!Array.isArray(carritoParseado)) {
          console.error('El carrito guardado no es un array válido');
          setCarrito([]);
          setCarritoInicializado(true);
          return;
        }
        
        setCarrito(carritoParseado);
        
        // Verificar si el producto actual ya está en el carrito
        if (producto) {
          const talla = obtenerTallaAutomatica(producto);
          const productoEnCarrito = carritoParseado.some((item: CarritoItem) => 
            item.id === producto.id && item.talla === talla
          );
          
          console.log('ProductoDetalle - Producto en carrito:', productoEnCarrito, 'con talla:', talla);
          setProductoAgregado(productoEnCarrito);
        }
      } catch (error) {
        console.error('Error al cargar el carrito desde localStorage:', error);
        setCarrito([]);
      }
    }
    
    // Marcar que la carga inicial del carrito se ha completado
    setCarritoInicializado(true);
  }, [id]); // Importante: dependencia en id para que se recargue cuando cambia el producto

  // Establecer la talla automática cuando cambia el producto
  useEffect(() => {
    if (producto) {
      const talla = obtenerTallaAutomatica(producto);
      console.log('ProductoDetalle - Estableciendo talla automática:', talla);
      setTallaAutomatica(talla);
      
      // Verificar si el producto ya está en el carrito
      const estaEnCarrito = carrito.some(item => item.id === producto.id && item.talla === talla);
      console.log('ProductoDetalle - Verificando si producto está en carrito:', estaEnCarrito);
      setProductoAgregado(estaEnCarrito);
    }
  }, [producto, id]);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    // Solo guardar en localStorage si ya se ha completado la carga inicial
    // para evitar sobrescribir con un array vacío al montar el componente
    if (carritoInicializado) {
      console.log('ProductoDetalle - guardando carrito en localStorage:', carrito);
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(carrito));
    }
  }, [carrito, carritoInicializado]);

  // Actualizar estado de "producto agregado" cuando cambia el producto o el carrito
  useEffect(() => {
    if (producto && carritoInicializado) {
      const talla = obtenerTallaAutomatica(producto);
      
      // Obtener el carrito más reciente de localStorage para asegurar sincronización
      const carritoGuardado = localStorage.getItem(CART_STORAGE_KEY);
      if (carritoGuardado) {
        try {
          const carritoActual = JSON.parse(carritoGuardado);
          if (Array.isArray(carritoActual)) {
            // Verificar si el producto actual está en el carrito
            const estaEnCarrito = carritoActual.some(item => 
              item.id === producto.id && item.talla === talla
            );
            
            console.log('ProductoDetalle - Verificando si producto está en carrito (actualizado):', 
              estaEnCarrito, 'con talla:', talla);
            
            setProductoAgregado(estaEnCarrito);
            
            // Solo actualizar el estado si hay una diferencia significativa
            // como un número diferente de elementos
            if (carritoActual.length !== carrito.length) {
              console.log('ProductoDetalle - Actualizando estado del carrito desde localStorage (diferente tamaño)');
              setCarrito(carritoActual);
            }
          }
        } catch (error) {
          console.error('Error al verificar carrito desde localStorage:', error);
        }
      }
    }
  }, [producto, carritoInicializado]);

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
    producto.imagen,
    producto.imagen,
    producto.imagen
  ];

  // Funciones del carrito
  const handleAgregarAlCarrito = () => {
    if (!producto) return;
    
    // Primero leer el estado actual del carrito desde localStorage para asegurar sincronización
    let carritoActual: CarritoItem[] = [];
    const carritoGuardado = localStorage.getItem(CART_STORAGE_KEY);
    console.log('ProductoDetalle - handleAgregarAlCarrito - localStorage actual:', carritoGuardado);
    
    if (carritoGuardado) {
      try {
        carritoActual = JSON.parse(carritoGuardado);
        // Verificar que carritoActual sea un array
        if (!Array.isArray(carritoActual)) {
          console.error('El carrito guardado no es un array, inicializando como vacío');
          carritoActual = [];
        }
      } catch (error) {
        console.error('Error al leer el carrito:', error);
        carritoActual = [];
      }
    }
    
    // Buscar si el producto ya existe en el carrito
    const itemExistente = carritoActual.find(
      item => item.id === producto.id && item.talla === tallaAutomatica
    );
    
    let nuevoCarrito: CarritoItem[];
    
    if (itemExistente) {
      // Actualizar cantidad si ya existe
      nuevoCarrito = carritoActual.map(item =>
        (item.id === producto.id && item.talla === tallaAutomatica)
          ? { ...item, cantidad: item.cantidad + cantidadSeleccionada }
          : item
      );
    } else {
      // Agregar nuevo item si no existe
      nuevoCarrito = [
        ...carritoActual, 
        { 
          id: producto.id, 
          cantidad: cantidadSeleccionada, 
          talla: tallaAutomatica
        }
      ];
    }
    
    // Guardar en localStorage
    console.log('ProductoDetalle - handleAgregarAlCarrito - guardando nuevo carrito:', nuevoCarrito);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(nuevoCarrito));
    
    // Actualizar el estado
    setCarrito(prevCarrito => {
      // Usar la versión más actualizada del estado
      const productosActualesEnEstado = [...prevCarrito];
      
      if (itemExistente) {
        // Actualizar cantidad si ya existe en el estado
        return productosActualesEnEstado.map(item =>
          (item.id === producto.id && item.talla === tallaAutomatica)
            ? { ...item, cantidad: item.cantidad + cantidadSeleccionada }
            : item
        );
      } else {
        // Agregar nuevo item si no existe en el estado
        return [
          ...productosActualesEnEstado,
          { 
            id: producto.id, 
            cantidad: cantidadSeleccionada, 
            talla: tallaAutomatica
          }
        ];
      }
    });

    // Mostrar mensaje de confirmación
    setProductoAgregado(true);
  };

  const handleEliminarDelCarrito = (productoId: string, talla: string) => {
    // Primero leer el estado actual del carrito desde localStorage para asegurar sincronización
    let carritoActual: CarritoItem[] = [];
    const carritoGuardado = localStorage.getItem(CART_STORAGE_KEY);
    console.log('ProductoDetalle - handleEliminarDelCarrito - localStorage actual:', carritoGuardado);
    
    if (carritoGuardado) {
      try {
        carritoActual = JSON.parse(carritoGuardado);
        // Verificar que carritoActual sea un array
        if (!Array.isArray(carritoActual)) {
          console.error('El carrito guardado no es un array, inicializando como vacío');
          carritoActual = [];
        }
      } catch (error) {
        console.error('Error al leer el carrito:', error);
        carritoActual = [];
      }
    }
    
    // Filtrar el carrito para eliminar el producto
    const nuevoCarrito = carritoActual.filter(item => !(item.id === productoId && item.talla === talla));
    
    // Guardar en localStorage
    console.log('ProductoDetalle - handleEliminarDelCarrito - guardando nuevo carrito:', nuevoCarrito);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(nuevoCarrito));
    
    // Actualizar el estado usando la función de actualización para asegurar el estado más reciente
    setCarrito(prevCarrito => prevCarrito.filter(item => !(item.id === productoId && item.talla === talla)));
    
    if (producto && producto.id === productoId && tallaAutomatica === talla) {
      setProductoAgregado(false);
    }
  };

  const handleIrACheckout = () => {
    // Asegurarse de que el carrito está correctamente guardado antes de redirigir
    const carritoActual = localStorage.getItem(CART_STORAGE_KEY);
    console.log('ProductoDetalle - handleIrACheckout - carrito antes de redirigir:', carritoActual);
    
    // Siempre guardar el estado actual del carrito en localStorage
    // antes de navegar para asegurar que tenemos los datos más recientes
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(carrito));
    console.log('ProductoDetalle - handleIrACheckout - guardando estado actual:', carrito);
    
    // Redirigir al usuario a la página de resumen del carrito
    console.log('ProductoDetalle - redirigiendo a /epp/carrito');
    
    // Usar React Router para evitar la recarga completa
    navigate('/epp/carrito');
  };

  // Total de items
  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Resumen del Carrito */}
      <div className="bg-white shadow rounded-lg p-4 mb-8">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Carrito de Solicitud</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-900">
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </span>
            {totalItems > 0 && (
              <button
                onClick={handleIrACheckout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                <ShoppingCartIcon className="h-5 w-5 mr-2" />
                Ir a Checkout
              </button>
            )}
          </div>
        </div>
        {totalItems === 0 && (
          <div className="mt-3 text-sm text-gray-500">
            Tu carrito está vacío. Agrega elementos para continuar.
          </div>
        )}
      </div>

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
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <div className="block text-sm font-medium text-gray-700 mb-1">
                  Talla asignada
                </div>
                <div className="p-2 bg-gray-100 rounded-md border border-gray-300">
                  <span className="text-gray-900 font-medium">{tallaAutomatica}</span>
                  <p className="text-xs text-gray-500 mt-1">Asignada según tu perfil</p>
                </div>
              </div>
              
              <div>
                <label htmlFor="cantidad" className="block text-sm font-medium text-gray-700 mb-1">
                  Cantidad
                </label>
                <select
                  id="cantidad"
                  value={cantidadSeleccionada}
                  onChange={(e) => setCantidadSeleccionada(Number(e.target.value))}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  {[...Array(Math.min(5, producto.stock))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAgregarAlCarrito}
              className="mt-8 w-full bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ShoppingCartIcon className="h-5 w-5 mr-2" />
              Agregar al Carrito
            </button>
            
            {/* Mensaje de confirmación y botón de checkout */}
            {productoAgregado && (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckIcon className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">
                      Producto añadido al carrito
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleEliminarDelCarrito(producto.id, tallaAutomatica)}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <XMarkIcon className="h-4 w-4 mr-1" />
                    Quitar
                  </button>
                  <button
                    type="button"
                    onClick={handleIrACheckout}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Ir a Checkout
                  </button>
                </div>
              </div>
            )}
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