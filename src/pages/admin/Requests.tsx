import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../components/Layout';
import type { Solicitud, EstadoSolicitud } from '../../types/epp';

// Datos de ejemplo - En producción vendrían de una API
const solicitudesEjemplo: Solicitud[] = [
  {
    id: '1',
    usuario: {
      id: '1',
      nombre: 'Juan Pérez',
      rubro: 'construccion',
      cargo: 'supervisor',
      rol: 'usuario',
      email: 'juan@ejemplo.com'
    },
    items: [
      {
        id: '1',
        cantidad: 2,
        talla: 'L',
        producto: {
          id: '1',
          nombre: 'Casco de Seguridad MSA V-GARD',
          descripcion: 'Casco de seguridad con suspensión Fas-Trac III',
          imagen: 'https://www.msasafety.com/...',
          precio: 0,
          categoria: 'proteccion_cabeza',
          tallas: ['Universal'],
          certificaciones: [],
          stock: 50,
          rubrosPermitidos: ['construccion', 'mineria'],
          caracteristicas: []
        }
      }
    ],
    fechaSolicitud: '2024-03-15T10:00:00Z',
    estado: 'aprobada',
    fechaAprobacion: '2024-03-15T11:30:00Z'
  },
  {
    id: '2',
    usuario: {
      id: '2',
      nombre: 'María González',
      rubro: 'mineria',
      cargo: 'operador_maquinaria',
      rol: 'usuario',
      email: 'maria@ejemplo.com'
    },
    items: [
      {
        id: '2',
        cantidad: 1,
        talla: 'M',
        producto: {
          id: '2',
          nombre: 'Guantes de Nitrilo Resistentes',
          descripcion: 'Guantes de protección química',
          imagen: 'https://example.com/guantes.jpg',
          precio: 0,
          categoria: 'proteccion_manos',
          tallas: ['S', 'M', 'L', 'XL'],
          certificaciones: [],
          stock: 100,
          rubrosPermitidos: ['mineria', 'quimica'],
          caracteristicas: []
        }
      }
    ],
    fechaSolicitud: '2024-03-16T10:00:00Z',
    estado: 'pendiente'
  },
  {
    id: '3',
    usuario: {
      id: '3',
      nombre: 'Carlos Rodríguez',
      rubro: 'quimica',
      cargo: 'tecnico_laboratorio',
      rol: 'usuario',
      email: 'carlos@ejemplo.com'
    },
    items: [
      {
        id: '3',
        cantidad: 3,
        talla: 'XL',
        producto: {
          id: '3',
          nombre: 'Máscara Respiratoria 3M',
          descripcion: 'Máscara de protección respiratoria',
          imagen: 'https://example.com/mascara.jpg',
          precio: 0,
          categoria: 'proteccion_respiratoria',
          tallas: ['M', 'L', 'XL'],
          certificaciones: [],
          stock: 30,
          rubrosPermitidos: ['quimica', 'mineria'],
          caracteristicas: []
        }
      }
    ],
    fechaSolicitud: '2024-03-14T15:00:00Z',
    estado: 'entregada',
    fechaAprobacion: '2024-03-14T16:00:00Z',
    fechaEntrega: '2024-03-15T09:00:00Z'
  },
  {
    id: '4',
    usuario: {
      id: '4',
      nombre: 'Ana Martínez',
      rubro: 'construccion',
      cargo: 'ingeniero_obra',
      rol: 'usuario',
      email: 'ana@ejemplo.com'
    },
    items: [
      {
        id: '4',
        cantidad: 1,
        talla: 'S',
        producto: {
          id: '4',
          nombre: 'Arnés de Seguridad',
          descripcion: 'Arnés de cuerpo completo',
          imagen: 'https://example.com/arnes.jpg',
          precio: 0,
          categoria: 'proteccion_caidas',
          tallas: ['S', 'M', 'L'],
          certificaciones: [],
          stock: 20,
          rubrosPermitidos: ['construccion'],
          caracteristicas: []
        }
      }
    ],
    fechaSolicitud: '2024-03-13T11:00:00Z',
    estado: 'rechazada',
    comentarios: 'Stock insuficiente'
  },
  {
    id: '5',
    usuario: {
      id: '5',
      nombre: 'Pedro Sánchez',
      rubro: 'mineria',
      cargo: 'supervisor',
      rol: 'usuario',
      email: 'pedro@ejemplo.com'
    },
    items: [
      {
        id: '5',
        cantidad: 2,
        talla: 'L',
        producto: {
          id: '5',
          nombre: 'Botas de Seguridad',
          descripcion: 'Botas con punta de acero',
          imagen: 'https://example.com/botas.jpg',
          precio: 0,
          categoria: 'proteccion_pies',
          tallas: ['39', '40', '41', '42', '43', '44'],
          certificaciones: [],
          stock: 40,
          rubrosPermitidos: ['mineria', 'construccion'],
          caracteristicas: []
        }
      }
    ],
    fechaSolicitud: '2024-03-16T09:00:00Z',
    estado: 'pendiente'
  },
  {
    id: '6',
    usuario: {
      id: '6',
      nombre: 'Laura Torres',
      rubro: 'quimica',
      cargo: 'analista_laboratorio',
      rol: 'usuario',
      email: 'laura@ejemplo.com'
    },
    items: [
      {
        id: '6',
        cantidad: 4,
        talla: 'M',
        producto: {
          id: '6',
          nombre: 'Gafas de Seguridad',
          descripcion: 'Gafas de protección química',
          imagen: 'https://example.com/gafas.jpg',
          precio: 0,
          categoria: 'proteccion_visual',
          tallas: ['Universal'],
          certificaciones: [],
          stock: 60,
          rubrosPermitidos: ['quimica', 'mineria'],
          caracteristicas: []
        }
      }
    ],
    fechaSolicitud: '2024-03-15T14:00:00Z',
    estado: 'aprobada',
    fechaAprobacion: '2024-03-15T16:00:00Z'
  },
  {
    id: '7',
    usuario: {
      id: '7',
      nombre: 'Roberto Díaz',
      rubro: 'construccion',
      cargo: 'operario',
      rol: 'usuario',
      email: 'roberto@ejemplo.com'
    },
    items: [
      {
        id: '7',
        cantidad: 1,
        talla: 'XL',
        producto: {
          id: '7',
          nombre: 'Chaleco Reflectante',
          descripcion: 'Chaleco de alta visibilidad',
          imagen: 'https://example.com/chaleco.jpg',
          precio: 0,
          categoria: 'proteccion_alta_visibilidad',
          tallas: ['M', 'L', 'XL'],
          certificaciones: [],
          stock: 45,
          rubrosPermitidos: ['construccion', 'mineria'],
          caracteristicas: []
        }
      }
    ],
    fechaSolicitud: '2024-03-14T13:00:00Z',
    estado: 'entregada',
    fechaAprobacion: '2024-03-14T14:30:00Z',
    fechaEntrega: '2024-03-14T16:00:00Z'
  },
  {
    id: '8',
    usuario: {
      id: '8',
      nombre: 'Carmen López',
      rubro: 'mineria',
      cargo: 'geologo',
      rol: 'usuario',
      email: 'carmen@ejemplo.com'
    },
    items: [
      {
        id: '8',
        cantidad: 2,
        talla: 'L',
        producto: {
          id: '8',
          nombre: 'Protectores Auditivos',
          descripcion: 'Orejeras de alta atenuación',
          imagen: 'https://example.com/orejeras.jpg',
          precio: 0,
          categoria: 'proteccion_auditiva',
          tallas: ['Universal'],
          certificaciones: [],
          stock: 35,
          rubrosPermitidos: ['mineria', 'construccion'],
          caracteristicas: []
        }
      }
    ],
    fechaSolicitud: '2024-03-16T08:00:00Z',
    estado: 'pendiente'
  },
  {
    id: '9',
    usuario: {
      id: '9',
      nombre: 'Miguel Ángel',
      rubro: 'quimica',
      cargo: 'supervisor_laboratorio',
      rol: 'usuario',
      email: 'miguel@ejemplo.com'
    },
    items: [
      {
        id: '9',
        cantidad: 5,
        talla: 'L',
        producto: {
          id: '9',
          nombre: 'Delantal de Laboratorio',
          descripcion: 'Delantal resistente a químicos',
          imagen: 'https://example.com/delantal.jpg',
          precio: 0,
          categoria: 'proteccion_cuerpo',
          tallas: ['S', 'M', 'L', 'XL'],
          certificaciones: [],
          stock: 25,
          rubrosPermitidos: ['quimica'],
          caracteristicas: []
        }
      }
    ],
    fechaSolicitud: '2024-03-15T11:00:00Z',
    estado: 'aprobada',
    fechaAprobacion: '2024-03-15T12:00:00Z'
  },
  {
    id: '10',
    usuario: {
      id: '10',
      nombre: 'Isabel Ruiz',
      rubro: 'construccion',
      cargo: 'arquitecto',
      rol: 'usuario',
      email: 'isabel@ejemplo.com'
    },
    items: [
      {
        id: '10',
        cantidad: 1,
        talla: 'M',
        producto: {
          id: '10',
          nombre: 'Kit de Protección Solar',
          descripcion: 'Incluye protector solar y gorra',
          imagen: 'https://example.com/proteccion-solar.jpg',
          precio: 0,
          categoria: 'proteccion_solar',
          tallas: ['Universal'],
          certificaciones: [],
          stock: 50,
          rubrosPermitidos: ['construccion', 'mineria'],
          caracteristicas: []
        }
      }
    ],
    fechaSolicitud: '2024-03-13T09:00:00Z',
    estado: 'rechazada',
    comentarios: 'Solicitud duplicada'
  }
];

const Requests = () => {
  const { usuario } = useUser();
  const [solicitudes] = useState<Solicitud[]>(solicitudesEjemplo);
  const [filtroEstado, setFiltroEstado] = useState<EstadoSolicitud | 'todos'>('todos');

  // Redireccionar si no es admin
  if (usuario.rol !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  const solicitudesFiltradas = solicitudes.filter(
    solicitud => filtroEstado === 'todos' || solicitud.estado === filtroEstado
  );

  const getEstadoColor = (estado: EstadoSolicitud) => {
    switch (estado) {
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'aprobada':
        return 'bg-green-100 text-green-800';
      case 'rechazada':
        return 'bg-red-100 text-red-800';
      case 'entregada':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Gestión de Solicitudes
          </h2>
        </div>
      </div>

      <div className="mt-4">
        <div className="sm:flex sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <label className="text-sm font-medium text-gray-700">Estado:</label>
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value as EstadoSolicitud | 'todos')}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="todos">Todos</option>
            <option value="pendiente">Pendiente</option>
            <option value="aprobada">Aprobada</option>
            <option value="rechazada">Rechazada</option>
            <option value="entregada">Entregada</option>
          </select>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Solicitante
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Acciones</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {solicitudesFiltradas.map((solicitud) => (
                    <tr key={solicitud.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {solicitud.usuario.nombre}
                            </div>
                            <div className="text-sm text-gray-500">
                              {solicitud.usuario.cargo}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(solicitud.fechaSolicitud).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(solicitud.fechaSolicitud).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {solicitud.items.length} items
                        </div>
                        <div className="text-sm text-gray-500">
                          {solicitud.items.map(item => `${item.cantidad}x ${item.producto.nombre}`).join(', ')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getEstadoColor(solicitud.estado)}`}>
                          {solicitud.estado.charAt(0).toUpperCase() + solicitud.estado.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-4">
                          Ver detalles
                        </button>
                        {solicitud.estado === 'pendiente' && (
                          <>
                            <button className="text-green-600 hover:text-green-900 mr-4">
                              Aprobar
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              Rechazar
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requests; 