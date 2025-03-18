import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCartIcon, XMarkIcon, MinusIcon, PlusIcon, CheckIcon } from '@heroicons/react/24/outline';
import { catalogoEPP } from '../../data/catalogoEPP';
import { EPPItem } from '../../types/epp';
import { CART_STORAGE_KEY } from '../../constants/storage';

interface CarritoItem {
  id: string;
  cantidad: number;
  talla?: string; // Opcional para mantener compatibilidad
}

const CarritoEPP: React.FC = () => {
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState<CarritoItem[]>([]);
  const [productosCarrito, setProductosCarrito] = useState<(CarritoItem & { producto: EPPItem })[]>([]);
  const [enviandoSolicitud, setEnviandoSolicitud] = useState(false);
  const [solicitudEnviada, setSolicitudEnviada] = useState(false);
  const [observaciones, setObservaciones] = useState('');
  const [carritoInicializado, setCarritoInicializado] = useState(false);
  const [cargando, setCargando] = useState(true);

  // Cargar carrito desde localStorage
  useEffect(() => {
    const cargarCarrito = () => {
      try {
        console.log('CarritoEPP - Intentando cargar carrito desde localStorage');
        const carritoGuardado = localStorage.getItem(CART_STORAGE_KEY);
        
        if (carritoGuardado) {
          console.log('CarritoEPP - Carrito encontrado en localStorage:', carritoGuardado);
          const carritoParseado = JSON.parse(carritoGuardado);
          
          // Verificar que los datos sean un array válido
          if (!Array.isArray(carritoParseado)) {
            console.error('CarritoEPP - El carrito guardado no es un array válido');
            // No inicializamos como vacío para no sobrescribir datos existentes
          } else {
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
          }
        } else {
          console.log('CarritoEPP - No se encontró carrito en localStorage');
          // No inicializamos como vacío para no sobrescribir datos existentes
        }
      } catch (error) {
        console.error('CarritoEPP - Error al cargar el carrito:', error);
        // No inicializamos como vacío para no sobrescribir datos existentes
      } finally {
        // Marcar que la carga inicial se ha completado
        setCarritoInicializado(true);
        setCargando(false);
      }
    };

    cargarCarrito();

    // Configurar un listener para detectar cambios en localStorage de otras pestañas/componentes
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === CART_STORAGE_KEY) {
        console.log('CarritoEPP - Detectado cambio en localStorage:', event.newValue);
        cargarCarrito();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Actualizar los productos del carrito cuando cambia el carrito
  useEffect(() => {
    // Solo actualizar si ya se ha completado la carga inicial
    if (carritoInicializado && carrito.length > 0) {
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
      
      // Disparar un evento custom para notificar a otros componentes
      const event = new CustomEvent('carritoUpdated', {
        detail: { carrito: carrito }
      });
      window.dispatchEvent(event);
    }
  }, [carrito, carritoInicializado]);

  // Total de items
  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);

  const handleActualizarCantidad = (id: string, nuevaCantidad: number, talla?: string) => {
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

    setCarrito(prevCarrito => {
      return prevCarrito.map(item => {
        // Si tiene talla, verificamos ambos campos
        if (talla) {
          return (item.id === id && item.talla === talla)
            ? { ...item, cantidad: nuevaCantidad }
            : item;
        } else {
          // Si no tiene talla, solo verificamos el id
          return item.id === id
            ? { ...item, cantidad: nuevaCantidad }
            : item;
        }
      });
    });
  };

  const handleEliminarProducto = (id: string, talla?: string) => {
    setCarrito(prevCarrito => {
      // Si tiene talla, filtramos por ambos campos
      if (talla) {
        return prevCarrito.filter(item => !(item.id === id && item.talla === talla));
      } else {
        // Si no tiene talla, solo filtramos por id
        return prevCarrito.filter(item => item.id !== id);
      }
    });
  };

  const handleLimpiarCarrito = () => {
    console.log('CarritoEPP - handleLimpiarCarrito - limpiando carrito');
    
    // Limpiar el localStorage
    localStorage.removeItem(CART_STORAGE_KEY);
    
    // Actualizar el estado
    setCarrito([]);
    setProductosCarrito([]);
    
    // Disparar un evento custom para notificar a otros componentes
    const event = new CustomEvent('carritoUpdated', {
      detail: { carrito: [] }
    });
    window.dispatchEvent(event);
    
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

  // Si está cargando, mostrar spinner
  if (cargando) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Si no hay productos, mostrar mensaje
  if ((carrito.length === 0 || productosCarrito.length === 0) && carritoInicializado && !solicitudEnviada) {
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

  // Si la solicitud fue enviada, mostrar mensaje de éxito
  if (solicitudEnviada) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-16 px-4 sm:px-6 lg:px-8">
          <CheckIcon className="mx-auto h-12 w-12 text-green-500" />
          <h2 className="mt-2 text-lg font-medium text-gray-900">¡Solicitud enviada con éxito!</h2>
          <p className="mt-1 text-sm text-gray-500">Serás redirigido al dashboard en unos segundos.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Tu Carrito</h1>
        <p className="mt-1 text-sm text-gray-600">
          Revisa los productos seleccionados antes de enviar tu solicitud
        </p>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">
            Productos seleccionados ({totalItems})
          </h2>
          <button
            onClick={handleLimpiarCarrito}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Vaciar carrito
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Producto
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Talla
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cantidad
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productosCarrito.map((item) => (
                <tr key={`${item.id}-${item.talla || 'default'}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 object-cover rounded-full"
                          src={item.producto.imagen}
                          alt={item.producto.nombre}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/images/epp/placeholder.jpg';
                          }}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {item.producto.nombre}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {item.talla || 'Única'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <button
                        onClick={() => handleActualizarCantidad(item.id, item.cantidad - 1, item.talla)}
                        className="p-1 rounded-l-md text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <span className="px-2 text-sm font-medium text-gray-700">{item.cantidad}</span>
                      <button
                        onClick={() => handleActualizarCantidad(item.id, item.cantidad + 1, item.talla)}
                        className="p-1 rounded-r-md text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEliminarProducto(item.id, item.talla)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200">
          <div className="mt-4">
            <label
              htmlFor="observaciones"
              className="block text-sm font-medium text-gray-700"
            >
              Observaciones
            </label>
            <div className="mt-1">
              <textarea
                id="observaciones"
                name="observaciones"
                rows={3}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Incluye cualquier detalle adicional sobre tu solicitud..."
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
          <Link
            to="/catalogo"
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            Continuar comprando
          </Link>
          <button
            onClick={handleEnviarSolicitud}
            disabled={enviandoSolicitud}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
              enviandoSolicitud
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
          >
            {enviandoSolicitud ? 'Enviando...' : 'Enviar solicitud'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarritoEPP; 