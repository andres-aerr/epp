import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  BuildingOfficeIcon,
  BriefcaseIcon,
  UserGroupIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';
import { Usuario } from '../../types/epp';
import { usuarios } from '../../data/usuarios';

interface InformacionLaboral {
  departamento: string;
  area: string;
  cargo: string;
  supervisor: string;
  fechaIngreso: string;
  estado: 'activo' | 'inactivo';
}

const EditarUsuario: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [informacionLaboral, setInformacionLaboral] = useState<InformacionLaboral>({
    departamento: '',
    area: '',
    cargo: '',
    supervisor: '',
    fechaIngreso: '',
    estado: 'activo'
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

  const cargos = {
    Construcción: ['Operador de Maquinaria', 'Operador de Grúa'],
    Supervisión: ['Supervisor de Obra', 'Supervisor de Seguridad'],
    Gestión: ['Jefe de Seguridad', 'Jefe de Logística', 'Gerente de Operaciones'],
    Mecánica: ['Técnico Mecánico'],
    Eléctrica: ['Técnico Electricista'],
    Logística: ['Coordinador de Almacén'],
    Gerencia: ['Gerente de Operaciones']
  };

  const supervisores = [
    'Carlos Rodríguez',
    'Ana Martínez',
    'Luis Torres',
    'Roberto Sánchez',
    'Miguel Torres'
  ];

  useEffect(() => {
    const user = usuarios.find(u => u.id === userId);
    if (user) {
      setUsuario(user);
      setInformacionLaboral({
        departamento: user.departamento,
        area: user.area,
        cargo: user.cargo,
        supervisor: user.supervisor.nombre,
        fechaIngreso: user.fechaIngreso,
        estado: user.estado
      });
    }
  }, [userId]);

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
                    cargo: ''
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
                    cargo: cargos[newArea as keyof typeof cargos][0]
                  });
                }}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {areas[informacionLaboral.departamento as keyof typeof areas]?.map((area) => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>

            {/* Cargo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center">
                  <BriefcaseIcon className="h-5 w-5 text-gray-400 mr-2" />
                  Cargo
                </div>
              </label>
              <select
                value={informacionLaboral.cargo}
                onChange={(e) => setInformacionLaboral({ ...informacionLaboral, cargo: e.target.value })}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {cargos[informacionLaboral.area as keyof typeof cargos]?.map((cargo) => (
                  <option key={cargo} value={cargo}>{cargo}</option>
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