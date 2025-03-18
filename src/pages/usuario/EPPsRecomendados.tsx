import React, { useState, useEffect } from 'react';
import { ShieldCheckIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { 
  cargosDemo, condicionesDemoTrabajo, asignacionesEPPDemo, 
  AsignacionEPP, Usuario 
} from '../../types/epp';
import { catalogoEPP } from '../../data/catalogoEPP';

const EPPsRecomendados: React.FC = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [eppsRecomendados, setEppsRecomendados] = useState<AsignacionEPP[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [usuarioTieneCargo, setUsuarioTieneCargo] = useState<boolean>(false);

  useEffect(() => {
    // Simulamos obtener el usuario actual
    const obtenerUsuario = () => {
      // En una implementación real, esta información vendría de una API o autenticación
      const usuarioStorage = sessionStorage.getItem('usuario');
      if (usuarioStorage) {
        try {
          const usuarioData = JSON.parse(usuarioStorage);
          setUsuario(usuarioData);
          console.log('Usuario cargado:', usuarioData);
          
          // Verificar si el usuario tiene un cargo identificable
          const cargoId = usuarioData.cargoId || buscarCargoIdPorNombre(usuarioData.cargo);
          setUsuarioTieneCargo(!!cargoId);
          
          if (cargoId) {
            filtrarEPPsRecomendados(cargoId, usuarioData.condicionesTrabajo || []);
          }
        } catch (error) {
          console.error('Error al obtener usuario:', error);
        }
      }
      setCargando(false);
    };

    obtenerUsuario();
  }, []);

  // Función para buscar el ID del cargo a partir del nombre (para compatibilidad)
  const buscarCargoIdPorNombre = (nombreCargo: string): string | null => {
    const cargo = cargosDemo.find(c => 
      c.nombre.toLowerCase() === nombreCargo.toLowerCase()
    );
    return cargo ? cargo.id : null;
  };

  // Función para filtrar EPPs recomendados según cargo y condiciones
  const filtrarEPPsRecomendados = (cargoId: string, condicionesIds: string[]) => {
    // 1. Obtener EPPs básicos para el cargo (sin condición específica)
    const eppsBasicos = asignacionesEPPDemo.filter(asignacion => 
      asignacion.cargoId === cargoId && !asignacion.condicionTrabajoId
    );
    
    // 2. Obtener EPPs específicos para las condiciones de trabajo del usuario
    const eppsEspecificos = asignacionesEPPDemo.filter(asignacion => 
      asignacion.cargoId === cargoId && 
      asignacion.condicionTrabajoId && 
      condicionesIds.includes(asignacion.condicionTrabajoId)
    );
    
    // Combinamos ambos conjuntos
    setEppsRecomendados([...eppsBasicos, ...eppsEspecificos]);
  };

  // Obtener detalles del EPP por ID
  const getEPPDetails = (eppId: string) => {
    return catalogoEPP.find(epp => epp.id === eppId);
  };

  // Obtener nombre de la condición de trabajo por ID
  const getNombreCondicion = (condicionId?: string) => {
    if (!condicionId) return 'Todas las condiciones';
    const condicion = condicionesDemoTrabajo.find(c => c.id === condicionId);
    return condicion ? condicion.nombre : 'Condición no encontrada';
  };

  if (cargando) {
    return (
      <div className="p-6 flex justify-center">
        <div className="animate-pulse text-gray-500">Cargando recomendaciones...</div>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-center text-yellow-700 mb-4">
          <ExclamationCircleIcon className="h-6 w-6 mr-2" />
          <h3 className="text-lg font-medium">No se pudo cargar su información</h3>
        </div>
        <p className="text-yellow-600">
          Por favor, inicie sesión nuevamente para ver sus EPPs recomendados.
        </p>
      </div>
    );
  }

  if (!usuarioTieneCargo) {
    return (
      <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-center text-yellow-700 mb-4">
          <ExclamationCircleIcon className="h-6 w-6 mr-2" />
          <h3 className="text-lg font-medium">Cargo no identificado</h3>
        </div>
        <p className="text-yellow-600">
          No se pudo determinar su cargo exacto en el sistema. Por favor, contacte a su administrador
          para actualizar su perfil y recibir recomendaciones específicas de EPPs.
        </p>
      </div>
    );
  }

  if (eppsRecomendados.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">EPPs Recomendados para su Cargo</h1>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center text-blue-700 mb-4">
            <ShieldCheckIcon className="h-6 w-6 mr-2" />
            <h3 className="text-lg font-medium">No hay recomendaciones específicas</h3>
          </div>
          <p className="text-blue-600">
            No se encontraron EPPs específicamente recomendados para su cargo. 
            Por favor consulte con su supervisor sobre los equipos que necesita.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">EPPs Recomendados para su Cargo</h1>
      <p className="text-gray-600 mb-8">
        Basado en su perfil como {usuario.cargo}, estos son los equipos de protección personal que debería utilizar.
      </p>

      <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
        <h2 className="text-lg font-medium text-gray-800 mb-2">Información de su cargo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Cargo actual</p>
            <p className="font-medium">{usuario.cargo}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Área</p>
            <p className="font-medium">{usuario.area}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {eppsRecomendados.map((asignacion) => {
          const epp = getEPPDetails(asignacion.eppId);
          if (!epp) return null;
          
          return (
            <div key={asignacion.id} className="bg-white rounded-lg shadow overflow-hidden border border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-200 bg-white flex-1">
                <div className="flex items-center mb-4">
                  <img 
                    src={epp.imagen} 
                    alt={epp.nombre} 
                    className="h-14 w-14 object-cover rounded-md"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/150?text=EPP';
                    }}
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{epp.nombre}</h3>
                    <p className="text-sm text-gray-500">Categoría: {epp.categoria}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600">{epp.descripcion}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <p className="text-xs text-gray-500">Cantidad asignada</p>
                    <p className="font-medium">{asignacion.cantidadAsignada} unidad(es)</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Renovación</p>
                    <p className="font-medium">
                      {asignacion.periodoRenovacion 
                        ? `Cada ${asignacion.periodoRenovacion} días` 
                        : 'No definida'}
                    </p>
                  </div>
                </div>
                
                <div className="mb-2">
                  <p className="text-xs text-gray-500">Condición de trabajo</p>
                  <p className="font-medium">{getNombreCondicion(asignacion.condicionTrabajoId)}</p>
                </div>
                
                {asignacion.obligatorio && (
                  <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Obligatorio
                  </div>
                )}
                
                {!asignacion.obligatorio && (
                  <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Recomendado
                  </div>
                )}
              </div>
              
              <div className="bg-gray-50 p-4 border-t border-gray-200">
                <a 
                  href={`/epp/producto/${epp.id}`} 
                  className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Ver detalles y solicitar
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EPPsRecomendados; 