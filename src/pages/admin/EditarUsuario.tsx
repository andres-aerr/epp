import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  BuildingOfficeIcon,
  BriefcaseIcon,
  UserGroupIcon,
  CalendarIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import { Usuario, cargosDemo, condicionesDemoTrabajo } from '../../types/epp';
import { usuarios } from '../../data/usuarios';

interface InformacionLaboral {
  departamento: string;
  area: string;
  cargo: string;
  cargoId: string;
  supervisor: string;
  fechaIngreso: string;
  estado: 'activo' | 'inactivo';
  condicionesTrabajo: string[];
}

const EditarUsuario: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [informacionLaboral, setInformacionLaboral] = useState<InformacionLaboral>({
    departamento: '',
    area: '',
    cargo: '',
    cargoId: '',
    supervisor: '',
    fechaIngreso: '',
    estado: 'activo',
    condicionesTrabajo: []
  });

  const departamentos = [
    'Operaciones',
    'Seguridad',
    'Mantenimiento',
    'Almacén',
    'Logística',
    'Dirección'
  ];

  const areas = {
    Operaciones: ['Construcción', 'Supervisión'],
    Seguridad: ['Supervisión', 'Gestión'],
    Mantenimiento: ['Mecánica', 'Eléctrica'],
    Almacén: ['Logística', 'Inventario'],
    Logística: ['Gestión', 'Distribución'],
    Dirección: ['Gerencia', 'Administración']
  };

  const supervisores = [
    'Carlos Rodríguez',
    'Ana Martínez',
    'Luis Torres',
    'Roberto Sánchez',
    'Miguel Torres'
  ];

  // Cargar datos del usuario
  useEffect(() => {
    const user = usuarios.find(u => u.id === userId);
    if (user) {
      setUsuario(user);
      setInformacionLaboral({
        departamento: user.departamento,
        area: user.area,
        cargo: user.cargo,
        cargoId: user.cargoId || '',
        supervisor: user.supervisor.nombre,
        fechaIngreso: user.fechaIngreso,
        estado: user.estado,
        condicionesTrabajo: user.condicionesTrabajo || []
      });
    }
  }, [userId]);

  // Manejar cambio de cargo desde el catálogo
  const handleCargoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cargoId = e.target.value;
    if (cargoId) {
      const cargoSeleccionado = cargosDemo.find(c => c.id === cargoId);
      if (cargoSeleccionado) {
        setInformacionLaboral({
          ...informacionLaboral,
          cargoId,
          cargo: cargoSeleccionado.nombre
        });
      }
    } else {
      setInformacionLaboral({
        ...informacionLaboral,
        cargoId: '',
      });
    }
  };

  // Manejar cambio en condiciones de trabajo
  const handleCondicionChange = (condicionId: string) => {
    setInformacionLaboral(prevState => {
      const condicionesActualizadas = prevState.condicionesTrabajo.includes(condicionId)
        ? prevState.condicionesTrabajo.filter(id => id !== condicionId)
        : [...prevState.condicionesTrabajo, condicionId];
      
      return {
        ...prevState,
        condicionesTrabajo: condicionesActualizadas
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí normalmente enviarías los datos a la API
    console.log('Información laboral actualizada:', informacionLaboral);
    navigate('/admin/users');
  };

  if (!usuario) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Editar Información Laboral
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          {usuario.nombre} {usuario.apellido}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Departamento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center">
                  <BuildingOfficeIcon className="h-5 w-5 text-gray-400 mr-2" />
                  Departamento
                </div>
              </label>
              <select
                value={informacionLaboral.departamento}
                onChange={(e) => {
                  const newDepartamento = e.target.value;
                  setInformacionLaboral({
                    ...informacionLaboral,
                    departamento: newDepartamento,
                    area: areas[newDepartamento as keyof typeof areas][0],
                  });
                }}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {departamentos.map((dep) => (
                  <option key={dep} value={dep}>{dep}</option>
                ))}
              </select>
            </div>

            {/* Área */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center">
                  <BuildingOfficeIcon className="h-5 w-5 text-gray-400 mr-2" />
                  Área
                </div>
              </label>
              <select
                value={informacionLaboral.area}
                onChange={(e) => {
                  const newArea = e.target.value;
                  setInformacionLaboral({
                    ...informacionLaboral,
                    area: newArea,
                  });
                }}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {areas[informacionLaboral.departamento as keyof typeof areas]?.map((area) => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>

            {/* Cargo desde catálogo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center">
                  <BriefcaseIcon className="h-5 w-5 text-gray-400 mr-2" />
                  Cargo
                </div>
              </label>
              <select
                value={informacionLaboral.cargoId}
                onChange={handleCargoChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">Seleccione un cargo</option>
                {cargosDemo.filter(cargo => cargo.area.toLowerCase().includes(informacionLaboral.area.toLowerCase()) || 
                                         cargo.area.toLowerCase().includes(informacionLaboral.departamento.toLowerCase()))
                           .map((cargo) => (
                  <option key={cargo.id} value={cargo.id}>{cargo.nombre} - {cargo.area}</option>
                ))}
                {/* Mostrar todos los cargos que no coinciden con el filtro al final */}
                {cargosDemo.filter(cargo => !cargo.area.toLowerCase().includes(informacionLaboral.area.toLowerCase()) && 
                                        !cargo.area.toLowerCase().includes(informacionLaboral.departamento.toLowerCase()))
                           .map((cargo) => (
                  <option key={cargo.id} value={cargo.id}>{cargo.nombre} - {cargo.area}</option>
                ))}
              </select>
            </div>

            {/* Supervisor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center">
                  <UserGroupIcon className="h-5 w-5 text-gray-400 mr-2" />
                  Supervisor
                </div>
              </label>
              <select
                value={informacionLaboral.supervisor}
                onChange={(e) => setInformacionLaboral({ ...informacionLaboral, supervisor: e.target.value })}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {supervisores.map((sup) => (
                  <option key={sup} value={sup}>{sup}</option>
                ))}
              </select>
            </div>

            {/* Fecha de Ingreso */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                  Fecha de Ingreso
                </div>
              </label>
              <input
                type="date"
                value={informacionLaboral.fechaIngreso}
                onChange={(e) => setInformacionLaboral({ ...informacionLaboral, fechaIngreso: e.target.value })}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              />
            </div>

            {/* Estado */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <select
                value={informacionLaboral.estado}
                onChange={(e) => setInformacionLaboral({ 
                  ...informacionLaboral, 
                  estado: e.target.value as 'activo' | 'inactivo' 
                })}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>
          </div>
          
          {/* Condiciones de trabajo */}
          <div className="mt-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              <div className="flex items-center">
                <ShieldCheckIcon className="h-5 w-5 text-gray-400 mr-2" />
                Condiciones de Trabajo
              </div>
            </label>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {condicionesDemoTrabajo.map((condicion) => (
                <div key={condicion.id} className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id={`condicion-${condicion.id}`}
                      name={`condicion-${condicion.id}`}
                      type="checkbox"
                      checked={informacionLaboral.condicionesTrabajo.includes(condicion.id)}
                      onChange={() => handleCondicionChange(condicion.id)}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor={`condicion-${condicion.id}`} className="font-medium text-gray-700">
                      {condicion.nombre}
                    </label>
                    <p className="text-gray-500">{condicion.descripcion}</p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mt-1">
                      {condicion.tipo}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/admin/users')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarUsuario; 