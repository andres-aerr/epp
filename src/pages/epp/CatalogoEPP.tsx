import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, ShoppingCartIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import { catalogoEPP } from '../../data/catalogoEPP';
import { CART_STORAGE_KEY } from '../../constants/storage';

interface CarritoItem {
  id: string;
  cantidad: number;
}

// Definimos tipos para los eventos personalizados
interface CarritoUpdatedEvent extends CustomEvent {
  detail: { carrito: CarritoItem[] };
}

const CatalogoEPP: React.FC = () => {
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todos');
  const [carrito, setCarrito] = useState<CarritoItem[]>([]);
  const [carritoInicializado, setCarritoInicializado] = useState(false);
  const navigate = useNavigate();

  // En producción, estos datos vendrían de un contexto o estado global
  const userInfo = {
    rubro: 'construccion'
  };

  // Cargar carrito desde localStorage al montar el componente
  useEffect(() => {
    const cargarCarrito = () => {
      try {
        console.log('CatalogoEPP - Intentando cargar carrito desde localStorage');
        const carritoGuardado = localStorage.getItem(CART_STORAGE_KEY);
        
        if (carritoGuardado) {
          console.log('CatalogoEPP - Carrito encontrado en localStorage:', carritoGuardado);
          const datos = JSON.parse(carritoGuardado);
          
          if (Array.isArray(datos)) {
            console.log('CatalogoEPP - Carrito válido cargado:', datos);
            setCarrito(datos);
          } else {
            console.warn('CatalogoEPP - El carrito en localStorage no es un array válido');
            // No inicializamos el carrito como vacío para no sobrescribir datos existentes
          }
        } else {
          console.log('CatalogoEPP - No se encontró carrito en localStorage');
          // No inicializamos el carrito como vacío para no sobrescribir datos existentes
        }
      } catch (error) {
        console.error('CatalogoEPP - Error al cargar el carrito desde localStorage:', error);
        // No inicializamos el carrito como vacío para no sobrescribir datos existentes
      } finally {
        setCarritoInicializado(true);
      }
    };

    cargarCarrito();

    // Configurar un listener para detectar cambios en localStorage de otras pestañas/componentes
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === CART_STORAGE_KEY) {
        console.log('CatalogoEPP - Detectado cambio en localStorage:', event.newValue);
        cargarCarrito();
      }
    };

    // Configurar un listener para el evento personalizado de actualización del carrito
    const handleCarritoUpdated = (event: Event) => {
      const carritoEvent = event as CarritoUpdatedEvent;
      console.log('CatalogoEPP - Evento carritoUpdated recibido:', carritoEvent.detail.carrito);
      if (carritoEvent.detail && Array.isArray(carritoEvent.detail.carrito)) {
        setCarrito(carritoEvent.detail.carrito);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('carritoUpdated', handleCarritoUpdated);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('carritoUpdated', handleCarritoUpdated);
    };
  }, []);

  // Guardar carrito en localStorage solo cuando cambie y se haya inicializado
  useEffect(() => {
    if (carritoInicializado) {
      try {
        console.log('CatalogoEPP - Guardando carrito en localStorage:', carrito);
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(carrito));
        
        // Disparar un evento custom para notificar a otros componentes
        const event = new CustomEvent('carritoUpdated', {
          detail: { carrito: carrito }
        });
        window.dispatchEvent(event);
      } catch (error) {
        console.error('CatalogoEPP - Error al guardar el carrito en localStorage:', error);
      }
    }
  }, [carrito, carritoInicializado]);

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
      // Verificar si rubrosPermitidos existe y contiene el rubro del usuario
      (producto.rubrosPermitidos ? producto.rubrosPermitidos.includes(userInfo.rubro) : true) &&
      (categoriaSeleccionada === 'todos' || producto.categoria === categoriaSeleccionada) &&
      (producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
       producto.descripcion.toLowerCase().includes(busqueda.toLowerCase()))
    );

  const getCantidadEnCarrito = (productoId: string) => {
    const itemEnCarrito = carrito.find(item => item.id === productoId);
    return itemEnCarrito ? itemEnCarrito.cantidad : 0;
  };

  const handleIrADetalle = (productoId: string) => {
    navigate(`/epp/producto/${productoId}`);
  };

  const handleAgregarAlCarrito = (productoId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Evitar que el clic propague al Link padre
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

  const handleDisminuirCantidad = (productoId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Evitar que el clic propague al Link padre
    setCarrito(prevCarrito => {
      const itemExistente = prevCarrito.find(item => item.id === productoId);
      if (itemExistente && itemExistente.cantidad > 1) {
        return prevCarrito.map(item =>
          item.id === productoId
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        );
      } else if (itemExistente && itemExistente.cantidad === 1) {
        return prevCarrito.filter(item => item.id !== productoId);
      }
      return prevCarrito;
    });
  };

  const contadorItemsCarrito = carrito.reduce((total, item) => total + item.cantidad, 0);

  // Si el carrito no se ha inicializado aún, mostramos un spinner
  if (!carritoInicializado) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-900 mr-4">
              {contadorItemsCarrito} {contadorItemsCarrito === 1 ? 'item' : 'items'}
            </span>
            {contadorItemsCarrito > 0 && (
              <Link 
                to="/epp/carrito" 
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <ShoppingCartIcon className="h-4 w-4 mr-1" />
                Ver Carrito
              </Link>
            )}
          </div>
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
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((producto) => (
              <div
                key={producto.id}
                className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleIrADetalle(producto.id)}
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
                    <div className="flex items-center">
                      {getCantidadEnCarrito(producto.id) > 0 ? (
                        <div className="flex items-center bg-gray-100 rounded-md">
                          <button
                            onClick={(e) => handleDisminuirCantidad(producto.id, e)}
                            className="p-1 rounded-l-md text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                          >
                            <MinusIcon className="h-4 w-4" />
                          </button>
                          <span className="px-2 py-1 text-sm font-medium">
                            {getCantidadEnCarrito(producto.id)}
                          </span>
                          <button
                            onClick={(e) => handleAgregarAlCarrito(producto.id, e)}
                            className="p-1 rounded-r-md text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                          >
                            <PlusIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => handleAgregarAlCarrito(producto.id, e)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <ShoppingCartIcon className="h-4 w-4 mr-1" />
                          Agregar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-gray-500">No se encontraron productos que coincidan con los criterios de búsqueda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogoEPP; 