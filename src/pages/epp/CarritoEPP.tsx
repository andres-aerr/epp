import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCartIcon, XMarkIcon, MinusIcon, PlusIcon, CheckIcon } from '@heroicons/react/24/outline';
import { catalogoEPP } from '../../data/catalogoEPP';
import { EPPItem, CarritoItem } from '../../types/epp';

// Clave para el localStorage
const CART_STORAGE_KEY = 'epp_carrito';

const CarritoEPP: React.FC = () => {
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState<CarritoItem[]>([]);
  const [productosCarrito, setProductosCarrito] = useState<(CarritoItem & { producto: EPPItem })[]>([]);
  const [enviandoSolicitud, setEnviandoSolicitud] = useState(false);
  const [solicitudEnviada, setSolicitudEnviada] = useState(false);
  const [observaciones, setObservaciones] = useState('');
  const [carritoInicializado, setCarritoInicializado] = useState(false);

  // Cargar carrito desde localStorage
  useEffect(() => {
    const carritoGuardado = localStorage.getItem(CART_STORAGE_KEY);
    console.log('CarritoEPP - localStorage cargado:', carritoGuardado);
    
    if (carritoGuardado) {
      try {
        const carritoParseado = JSON.parse(carritoGuardado);
        console.log('CarritoEPP - datos parseados:', carritoParseado);
        
        // Verificar que los datos sean un array válido
        if (!Array.isArray(carritoParseado)) {
          console.error('CarritoEPP - El carrito guardado no es un array válido');
          setCarrito([]);
          setProductosCarrito([]);
          setCarritoInicializado(true);
          return;
        }
        
        // Verificar si hay datos
        if (carritoParseado.length === 0) {
          console.log('CarritoEPP - Carrito vacío');
          setCarrito([]);
          setProductosCarrito([]);
          setCarritoInicializado(true);
          return;
        }
        
        // Establecer el carrito
        setCarrito(carritoParseado);
        
        // Cargar los productos inmediatamente
        const items = carritoParseado.map((item: CarritoItem) => {
          const producto = catalogoEPP.find(p => p.id === item.id);
          if (!producto) {
            console.log('CarritoEPP - Producto no encontrado:', item.id);
            return null;
          }
          return {
            ...item,
            producto
          };
        }).filter((item: CarritoItem | null) => item !== null) as (CarritoItem & { producto: EPPItem })[];
        
        console.log('CarritoEPP - productos cargados:', items);
        setProductosCarrito(items);
      } catch (error) {
        console.error('Error al cargar el carrito:', error);
        setCarrito([]);
        setProductosCarrito([]);
      }
    }
    
    // Marcar que la carga inicial se ha completado
    setCarritoInicializado(true);
  }, []);

  // Actualizar los productos del carrito cuando cambia el carrito
  useEffect(() => {
    // Solo actualizar si ya se ha completado la carga inicial
    if (carrito.length > 0 && carritoInicializado) {
      console.log('CarritoEPP - actualizando productos por cambio en carrito:', carrito);
      
      const items = carrito.map(item => {
        const producto = catalogoEPP.find(p => p.id === item.id);
        if (!producto) {
          console.log('CarritoEPP - Producto no encontrado en cambio:', item.id);
          return null;
        }
        return {
          ...item,
          producto
        };
      }).filter((item: CarritoItem | null) => item !== null) as (CarritoItem & { producto: EPPItem })[];
      
      console.log('CarritoEPP - productos actualizados:', items);
      setProductosCarrito(items);
      
      // Guardar en localStorage
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(carrito));
    }
  }, [carrito, carritoInicializado]);

  // Total de items
  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);

  const handleActualizarCantidad = (id: string, talla: string, nuevaCantidad: number) => {
    if (nuevaCantidad <= 0) {
      handleEliminarProducto(id, talla);
      return;
    }

    // Verificar stock
    const producto = catalogoEPP.find(p => p.id === id);
    if (producto && nuevaCantidad > producto.stock) {
      alert(`Lo sentimos, solo hay ${producto.stock} unidades disponibles.`);
      nuevaCantidad = producto.stock;
    }

    // Leer el carrito actual del localStorage para asegurar sincronización
    let carritoActual: CarritoItem[] = [];
    const carritoGuardado = localStorage.getItem(CART_STORAGE_KEY);
    console.log('CarritoEPP - handleActualizarCantidad - localStorage actual:', carritoGuardado);
    
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

    // Actualizar la cantidad del producto
    const nuevoCarrito = carritoActual.map(item => 
      (item.id === id && item.talla === talla) 
        ? { ...item, cantidad: nuevaCantidad } 
        : item
    );
    
    // Guardar en localStorage
    console.log('CarritoEPP - handleActualizarCantidad - guardando nuevo carrito:', nuevoCarrito);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(nuevoCarrito));
    
    // Actualizar el estado usando la función de actualización para asegurar el estado más reciente
    setCarrito(prevCarrito => 
      prevCarrito.map(item => 
        (item.id === id && item.talla === talla) 
          ? { ...item, cantidad: nuevaCantidad } 
          : item
      )
    );
  };

  const handleEliminarProducto = (id: string, talla: string) => {
    // Leer el carrito actual del localStorage para asegurar sincronización
    let carritoActual: CarritoItem[] = [];
    const carritoGuardado = localStorage.getItem(CART_STORAGE_KEY);
    console.log('CarritoEPP - handleEliminarProducto - localStorage actual:', carritoGuardado);
    
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
    const nuevoCarrito = carritoActual.filter(item => !(item.id === id && item.talla === talla));
    
    // Guardar en localStorage
    console.log('CarritoEPP - handleEliminarProducto - guardando nuevo carrito:', nuevoCarrito);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(nuevoCarrito));
    
    // Actualizar el estado usando la función de actualización para asegurar el estado más reciente
    setCarrito(prevCarrito => prevCarrito.filter(item => !(item.id === id && item.talla === talla)));
  };

  const handleLimpiarCarrito = () => {
    console.log('CarritoEPP - handleLimpiarCarrito - limpiando carrito');
    
    // Limpiar el localStorage
    localStorage.removeItem(CART_STORAGE_KEY);
    
    // Actualizar el estado
    setCarrito([]);
    setProductosCarrito([]);
    
    console.log('CarritoEPP - handleLimpiarCarrito - carrito limpiado');
  };

  const handleEnviarSolicitud = () => {
    setEnviandoSolicitud(true);
    
    // Simulamos el envío de la solicitud
    setTimeout(() => {
      // En un entorno real, aquí se enviaría la solicitud al servidor
      console.log('Solicitud enviada:', {
        items: productosCarrito,
        observaciones,
        fechaSolicitud: new Date().toISOString(),
        usuario: {
          nombre: 'Juan Pérez',
          departamento: 'Operaciones',
          cargo: 'Supervisor',
        }
      });
      
      setEnviandoSolicitud(false);
      setSolicitudEnviada(true);
      
      // Limpiar carrito después de 3 segundos y redireccionar
      setTimeout(() => {
        handleLimpiarCarrito();
        navigate('/dashboard');
      }, 3000);
    }, 1500);
  };

  // Si no hay productos, mostrar mensaje
  if (carrito.length === 0 && !solicitudEnviada) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-16 px-4 sm:px-6 lg:px-8">
          <ShoppingCartIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-2 text-lg font-medium text-gray-900">Tu carrito está vacío</h2>
          <p className="mt-1 text-sm text-gray-500">No has añadido ningún producto a tu carrito.</p>
          <div className="mt-6">
            <Link
              to="/catalogo"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Ver catálogo
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Si la solicitud fue enviada, mostrar mensaje de confirmación
  if (solicitudEnviada) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow rounded-lg py-8 px-4 sm:px-10">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <CheckIcon className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">¡Solicitud Enviada con Éxito!</h2>
            <p className="mt-2 text-lg text-gray-600">
              Tu solicitud ha sido enviada a bodega para su procesamiento.
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Serás redirigido al dashboard en unos segundos...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Carrito de Solicitud</h1>
        <p className="mt-2 text-sm text-gray-500">
          Revisa tu solicitud antes de enviarla.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de productos */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {productosCarrito.map((item) => (
                <li key={`${item.id}-${item.talla}`} className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row">
                    <div className="flex-shrink-0 sm:mr-6">
                      <img
                        src={item.producto.imagen}
                        alt={item.producto.nombre}
                        className="w-full sm:w-24 h-24 object-cover rounded-md"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/epp/placeholder.jpg';
                        }}
                      />
                    </div>
                    <div className="flex-1 mt-3 sm:mt-0">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            <Link to={`/epp/producto/${item.id}`} className="hover:text-blue-600">
                              {item.producto.nombre}
                            </Link>
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Talla: {item.talla}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            Categoría: {item.producto.categoria.replace(/_/g, ' ')}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleEliminarProducto(item.id, item.talla)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center border rounded-md">
                          <button
                            type="button"
                            onClick={() => handleActualizarCantidad(item.id, item.talla, item.cantidad - 1)}
                            className="p-2 text-gray-500 hover:text-gray-700"
                          >
                            <MinusIcon className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-2 text-gray-700">{item.cantidad}</span>
                          <button
                            type="button"
                            onClick={() => handleActualizarCantidad(item.id, item.talla, item.cantidad + 1)}
                            className="p-2 text-gray-500 hover:text-gray-700"
                          >
                            <PlusIcon className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-500">Stock disponible: {item.producto.stock}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="p-4 sm:p-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleLimpiarCarrito}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <XMarkIcon className="h-4 w-4 mr-1" />
                Vaciar carrito
              </button>
            </div>
          </div>
        </div>

        {/* Resumen y acciones */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-4 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900">Resumen de la Solicitud</h2>
              
              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Total de productos</dt>
                  <dd className="text-sm font-medium text-gray-900">{totalItems}</dd>
                </div>
                
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium text-gray-900">Total de elementos</dt>
                  <dd className="text-base font-medium text-gray-900">{totalItems}</dd>
                </div>
              </dl>

              <div className="mt-6">
                <label htmlFor="observaciones" className="block text-sm font-medium text-gray-700">
                  Observaciones
                </label>
                <div className="mt-1">
                  <textarea
                    id="observaciones"
                    name="observaciones"
                    rows={3}
                    className="shadow-sm block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Instrucciones especiales para esta solicitud..."
                    value={observaciones}
                    onChange={(e) => setObservaciones(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleEnviarSolicitud}
                  disabled={enviandoSolicitud}
                  className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
                >
                  {enviandoSolicitud ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando solicitud...
                    </>
                  ) : (
                    'Enviar Solicitud'
                  )}
                </button>
                
                <div className="mt-4">
                  <Link
                    to="/catalogo"
                    className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Continuar Eligiendo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarritoEPP; 