import React, { useState, useRef } from 'react';
import {
  CameraIcon,
  MapPinIcon,
  CheckCircleIcon,
  BellIcon,
} from '@heroicons/react/24/outline';

interface Entrega {
  id: string;
  solicitudId: string;
  usuario: string;
  departamento: string;
  items: {
    nombre: string;
    cantidad: number;
  }[];
  estado: 'pendiente_entrega' | 'entregado' | 'confirmado';
  fechaAsignacion: string;
  foto?: string;
  ubicacion?: string;
  comentarios?: string;
}

// Datos de ejemplo
const entregasEjemplo: Entrega[] = [
  {
    id: 'ENT-001',
    solicitudId: 'SOL-001',
    usuario: 'Carlos Pérez',
    departamento: 'Operaciones',
    items: [
      { nombre: 'Casco de Seguridad', cantidad: 1 },
      { nombre: 'Guantes de Nitrilo', cantidad: 2 },
    ],
    estado: 'pendiente_entrega',
    fechaAsignacion: '2024-03-17',
  },
  {
    id: 'ENT-002',
    solicitudId: 'SOL-002',
    usuario: 'Ana Martínez',
    departamento: 'Mantenimiento',
    items: [
      { nombre: 'Lentes de Seguridad', cantidad: 1 },
    ],
    estado: 'pendiente_entrega',
    fechaAsignacion: '2024-03-17',
  },
];

const GestionDespacho: React.FC = () => {
  const [entregas, setEntregas] = useState<Entrega[]>(entregasEjemplo);
  const [entregaSeleccionada, setEntregaSeleccionada] = useState<Entrega | null>(null);
  const [mostrarModalEntrega, setMostrarModalEntrega] = useState(false);
  const [ubicacion, setUbicacion] = useState('');
  const [comentarios, setComentarios] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);

  const handleSeleccionarEntrega = (entrega: Entrega) => {
    setEntregaSeleccionada(entrega);
    setUbicacion('');
    setComentarios('');
    setFotoPreview(null);
  };

  const handleTomarFoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegistrarEntrega = () => {
    if (!entregaSeleccionada || !fotoPreview || !ubicacion) return;

    // Actualizar el estado de la entrega
    setEntregas(entregas.map(ent =>
      ent.id === entregaSeleccionada.id
        ? {
            ...ent,
            estado: 'entregado',
            foto: fotoPreview,
            ubicacion,
            comentarios,
          }
        : ent
    ));

    // Aquí se simularía el envío de la notificación al trabajador
    console.log('Notificación enviada al trabajador:', entregaSeleccionada.usuario);

    setMostrarModalEntrega(false);
    setEntregaSeleccionada(null);
    setFotoPreview(null);
    setUbicacion('');
    setComentarios('');
  };

  return (
    <div className="flex h-full">
      {/* Lista de entregas pendientes */}
      <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">Entregas Pendientes</h2>
          <p className="mt-1 text-sm text-gray-500">
            Gestión de entregas de EPP asignadas
          </p>
        </div>
        <ul role="list" className="divide-y divide-gray-200">
          {entregas.filter(e => e.estado === 'pendiente_entrega').map((entrega) => (
            <li
              key={entrega.id}
              className={`px-4 py-4 hover:bg-gray-50 cursor-pointer ${
                entregaSeleccionada?.id === entrega.id ? 'bg-blue-50' : ''
              }`}
              onClick={() => handleSeleccionarEntrega(entrega)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{entrega.usuario}</p>
                  <p className="text-sm text-gray-500">{entrega.departamento}</p>
                  <p className="text-xs text-gray-400 mt-1">Asignado: {entrega.fechaAsignacion}</p>
                </div>
                <div className="text-sm text-gray-500">
                  {entrega.items.length} items
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Detalle de entrega */}
      <div className="flex-1 p-8">
        {entregaSeleccionada ? (
          <div>
            <div className="pb-5 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Detalle de Entrega {entregaSeleccionada.id}
              </h3>
            </div>

            <div className="mt-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Destinatario</dt>
                  <dd className="mt-1 text-sm text-gray-900">{entregaSeleccionada.usuario}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Departamento</dt>
                  <dd className="mt-1 text-sm text-gray-900">{entregaSeleccionada.departamento}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Items a Entregar</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <ul role="list" className="border border-gray-200 rounded-md divide-y divide-gray-200">
                      {entregaSeleccionada.items.map((item, index) => (
                        <li
                          key={index}
                          className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                        >
                          <div className="w-0 flex-1 flex items-center">
                            <span className="ml-2 flex-1">
                              {item.nombre} (x{item.cantidad})
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-6">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => setMostrarModalEntrega(true)}
              >
                <CheckCircleIcon className="-ml-1 mr-2 h-5 w-5" />
                Registrar Entrega
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <BellIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No hay entrega seleccionada</h3>
            <p className="mt-1 text-sm text-gray-500">
              Selecciona una entrega de la lista para ver sus detalles
            </p>
          </div>
        )}
      </div>

      {/* Modal de Registro de Entrega */}
      {mostrarModalEntrega && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Registrar Entrega
                  </h3>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Foto de Entrega</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        {fotoPreview ? (
                          <img src={fotoPreview} alt="Preview" className="mx-auto h-32 w-32 object-cover" />
                        ) : (
                          <CameraIcon className="mx-auto h-12 w-12 text-gray-400" />
                        )}
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                          >
                            <span>Tomar foto</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              accept="image/*"
                              capture="environment"
                              className="sr-only"
                              ref={fileInputRef}
                              onChange={handleTomarFoto}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Ubicación</label>
                    <div className="mt-1">
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPinIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                          placeholder="Ingrese la ubicación de entrega"
                          value={ubicacion}
                          onChange={(e) => setUbicacion(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Comentarios</label>
                    <div className="mt-1">
                      <textarea
                        rows={3}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Comentarios adicionales..."
                        value={comentarios}
                        onChange={(e) => setComentarios(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                  onClick={handleRegistrarEntrega}
                  disabled={!fotoPreview || !ubicacion}
                >
                  Confirmar Entrega
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setMostrarModalEntrega(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionDespacho; 