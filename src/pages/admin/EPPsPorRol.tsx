import React, { useState, useMemo } from 'react';
import { 
  PlusIcon, PencilIcon, TrashIcon, CheckIcon, XMarkIcon 
} from '@heroicons/react/24/outline';
import { 
  cargosDemo, condicionesDemoTrabajo, asignacionesEPPDemo, 
  Cargo, CondicionTrabajo, AsignacionEPP
} from '../../types/epp';
import { catalogoEPP } from '../../data/catalogoEPP';

// Modal para edición/creación de asignaciones
interface FormularioAsignacionProps {
  asignacion: AsignacionEPP | null;
  cargos: Cargo[];
  condiciones: CondicionTrabajo[];
  onGuardar: (asignacion: AsignacionEPP) => void;
  onCancelar: () => void;
}

const FormularioAsignacion: React.FC<FormularioAsignacionProps> = ({ 
  asignacion, cargos, condiciones, onGuardar, onCancelar 
}) => {
  const [formData, setFormData] = useState<AsignacionEPP>(asignacion || {
    id: `asign_${Date.now()}`,
    cargoId: '',
    eppId: '',
    cantidadAsignada: 1,
    obligatorio: true
  } as AsignacionEPP);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checkbox.checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGuardar(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">
            {asignacion ? 'Editar Asignación' : 'Nueva Asignación'}
          </h3>
          <button
            type="button"
            onClick={onCancelar}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="cargoId" className="block text-sm font-medium text-gray-700 mb-1">
              Cargo
            </label>
            <select
              id="cargoId"
              name="cargoId"
              value={formData.cargoId}
              onChange={handleChange}
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">Seleccione un cargo</option>
              {cargos.map(cargo => (
                <option key={cargo.id} value={cargo.id}>{cargo.nombre}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="condicionTrabajoId" className="block text-sm font-medium text-gray-700 mb-1">
              Condición de Trabajo (opcional)
            </label>
            <select
              id="condicionTrabajoId"
              name="condicionTrabajoId"
              value={formData.condicionTrabajoId || ''}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">Todas las condiciones</option>
              {condiciones.map(condicion => (
                <option key={condicion.id} value={condicion.id}>{condicion.nombre}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="eppId" className="block text-sm font-medium text-gray-700 mb-1">
              EPP
            </label>
            <select
              id="eppId"
              name="eppId"
              value={formData.eppId}
              onChange={handleChange}
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">Seleccione un EPP</option>
              {catalogoEPP.map(epp => (
                <option key={epp.id} value={epp.id}>{epp.nombre}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="cantidadAsignada" className="block text-sm font-medium text-gray-700 mb-1">
              Cantidad Asignada
            </label>
            <input
              type="number"
              id="cantidadAsignada"
              name="cantidadAsignada"
              min="1"
              value={formData.cantidadAsignada}
              onChange={handleChange}
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="obligatorio"
              name="obligatorio"
              checked={formData.obligatorio}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="obligatorio" className="ml-2 block text-sm text-gray-900">
              Obligatorio
            </label>
          </div>
          
          <div>
            <label htmlFor="periodoRenovacion" className="block text-sm font-medium text-gray-700 mb-1">
              Período de Renovación (días)
            </label>
            <input
              type="number"
              id="periodoRenovacion"
              name="periodoRenovacion"
              min="0"
              value={formData.periodoRenovacion || ''}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Opcional"
            />
          </div>
          
          <div>
            <label htmlFor="observaciones" className="block text-sm font-medium text-gray-700 mb-1">
              Observaciones
            </label>
            <input
              type="text"
              id="observaciones"
              name="observaciones"
              value={formData.observaciones || ''}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Opcional"
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancelar}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const EPPsPorRol: React.FC = () => {
  // Estados
  const [cargos] = useState<Cargo[]>(cargosDemo);
  const [condiciones] = useState<CondicionTrabajo[]>(condicionesDemoTrabajo);
  const [asignaciones, setAsignaciones] = useState<AsignacionEPP[]>(asignacionesEPPDemo);
  const [cargoSeleccionado, setCargoSeleccionado] = useState<string>('');
  const [condicionSeleccionada, setCondicionSeleccionada] = useState<string>('');
  const [mostrarFormulario, setMostrarFormulario] = useState<boolean>(false);
  const [asignacionEnEdicion, setAsignacionEnEdicion] = useState<AsignacionEPP | null>(null);

  // Datos filtrados
  const asignacionesFiltradas = useMemo(() => {
    let filtradas = [...asignaciones];
    
    if (cargoSeleccionado) {
      filtradas = filtradas.filter(a => a.cargoId === cargoSeleccionado);
    }
    
    if (condicionSeleccionada) {
      filtradas = filtradas.filter(a => a.condicionTrabajoId === condicionSeleccionada);
    }
    
    return filtradas;
  }, [asignaciones, cargoSeleccionado, condicionSeleccionada]);

  // Obtener nombre de EPP por ID
  const getNombreEPP = (eppId: string) => {
    const epp = catalogoEPP.find(e => e.id === eppId);
    return epp ? epp.nombre : 'EPP no encontrado';
  };

  // Obtener nombre de cargo por ID
  const getNombreCargo = (cargoId: string) => {
    const cargo = cargos.find(c => c.id === cargoId);
    return cargo ? cargo.nombre : 'Cargo no encontrado';
  };

  // Obtener nombre de condición por ID
  const getNombreCondicion = (condicionId?: string) => {
    if (!condicionId) return 'Todas las condiciones';
    const condicion = condiciones.find(c => c.id === condicionId);
    return condicion ? condicion.nombre : 'Condición no encontrada';
  };

  // Función para agregar nueva asignación
  const handleAgregarAsignacion = () => {
    setAsignacionEnEdicion(null);
    setMostrarFormulario(true);
  };

  // Función para editar asignación
  const handleEditarAsignacion = (asignacion: AsignacionEPP) => {
    setAsignacionEnEdicion(asignacion);
    setMostrarFormulario(true);
  };

  // Función para eliminar asignación
  const handleEliminarAsignacion = (asignacionId: string) => {
    if (window.confirm('¿Está seguro que desea eliminar esta asignación?')) {
      setAsignaciones(prev => prev.filter(a => a.id !== asignacionId));
    }
  };

  // Función para guardar asignación (nueva o editada)
  const handleGuardarAsignacion = (asignacion: AsignacionEPP) => {
    if (asignacionEnEdicion) {
      // Actualizar existente
      setAsignaciones(prev => 
        prev.map(a => a.id === asignacion.id ? asignacion : a)
      );
    } else {
      // Crear nueva
      setAsignaciones(prev => [...prev, asignacion]);
    }
    setMostrarFormulario(false);
    setAsignacionEnEdicion(null);
  };

  // Agrupamos asignaciones por cargo para visualización
  const asignacionesPorCargo = useMemo(() => {
    const agrupadas: Record<string, AsignacionEPP[]> = {};
    
    asignacionesFiltradas.forEach(asignacion => {
      const clave = asignacion.cargoId;
      if (!agrupadas[clave]) {
        agrupadas[clave] = [];
      }
      agrupadas[clave].push(asignacion);
    });
    
    return agrupadas;
  }, [asignacionesFiltradas]);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Asignación de EPPs por Rol</h1>
        <p className="mt-1 text-sm text-gray-600">
          Gestione qué EPPs corresponden a cada cargo según condiciones de trabajo
        </p>
      </div>

      {/* Filtros */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cargo" className="block text-sm font-medium text-gray-700 mb-1">
            Filtrar por Cargo
          </label>
          <select
            id="cargo"
            value={cargoSeleccionado}
            onChange={(e) => setCargoSeleccionado(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="">Todos los cargos</option>
            {cargos.map(cargo => (
              <option key={cargo.id} value={cargo.id}>{cargo.nombre}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="condicion" className="block text-sm font-medium text-gray-700 mb-1">
            Filtrar por Condición de Trabajo
          </label>
          <select
            id="condicion"
            value={condicionSeleccionada}
            onChange={(e) => setCondicionSeleccionada(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="">Todas las condiciones</option>
            {condiciones.map(condicion => (
              <option key={condicion.id} value={condicion.id}>{condicion.nombre}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Acciones */}
      <div className="mb-6 flex justify-end">
        <button
          type="button"
          onClick={handleAgregarAsignacion}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Agregar Asignación
        </button>
      </div>

      {/* Lista de Asignaciones por Cargo */}
      <div className="space-y-8">
        {Object.keys(asignacionesPorCargo).length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <p className="text-gray-500">No hay asignaciones con los filtros seleccionados.</p>
          </div>
        ) : (
          Object.entries(asignacionesPorCargo).map(([cargoId, asignacionesCargo]) => (
            <div key={cargoId} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">{getNombreCargo(cargoId)}</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        EPP
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Condición Trabajo
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cantidad
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Obligatorio
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Renovación (días)
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {asignacionesCargo.map((asignacion) => (
                      <tr key={asignacion.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {getNombreEPP(asignacion.eppId)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {getNombreCondicion(asignacion.condicionTrabajoId)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {asignacion.cantidadAsignada}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {asignacion.obligatorio ? (
                            <CheckIcon className="h-5 w-5 text-green-600" />
                          ) : (
                            <XMarkIcon className="h-5 w-5 text-red-600" />
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {asignacion.periodoRenovacion || 'No aplica'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEditarAsignacion(asignacion)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleEliminarAsignacion(asignacion.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal de formulario */}
      {mostrarFormulario && (
        <FormularioAsignacion
          asignacion={asignacionEnEdicion}
          cargos={cargos}
          condiciones={condiciones}
          onGuardar={handleGuardarAsignacion}
          onCancelar={() => {
            setMostrarFormulario(false);
            setAsignacionEnEdicion(null);
          }}
        />
      )}
    </div>
  );
};

export default EPPsPorRol; 