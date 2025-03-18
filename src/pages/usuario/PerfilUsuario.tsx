import React, { useState } from 'react';
import { PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface DatosPersonales {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  dni: string;
  fechaNacimiento: string;
  direccion: string;
}

interface ContactoEmergencia {
  nombre: string;
  relacion: string;
  telefono: string;
}

interface TallasEPP {
  camisa: string;
  pantalon: string;
  calzado: string;
  casco: string;
  guantes: string;
}

interface DatosTrabajo {
  area: string;
  departamento: string;
  cargo: string;
  supervisor: string;
  telefonoSupervisor: string;
  fechaIngreso: string;
}

const PerfilUsuario: React.FC = () => {
  // Estados para modo edición
  const [editandoDatosPersonales, setEditandoDatosPersonales] = useState(false);
  const [editandoContactoEmergencia, setEditandoContactoEmergencia] = useState(false);
  const [editandoTallas, setEditandoTallas] = useState(false);

  // Estados para los datos
  const [datosPersonales, setDatosPersonales] = useState<DatosPersonales>({
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'juan.perez@empresa.com',
    telefono: '+51 987654321',
    dni: '12345678',
    fechaNacimiento: '1990-05-15',
    direccion: 'Av. Principal 123, Lima'
  });

  const [contactoEmergencia, setContactoEmergencia] = useState<ContactoEmergencia>({
    nombre: 'María Pérez',
    relacion: 'Esposa',
    telefono: '+51 987654322'
  });

  const [tallasEPP, setTallasEPP] = useState<TallasEPP>({
    camisa: 'M',
    pantalon: '32',
    calzado: '42',
    casco: '7 1/4',
    guantes: 'L'
  });

  const datosTrabajo: DatosTrabajo = {
    area: 'Operaciones',
    departamento: 'Construcción',
    cargo: 'Operador de Maquinaria',
    supervisor: 'Carlos Rodríguez',
    telefonoSupervisor: '+51 987654323',
    fechaIngreso: '2023-01-15'
  };

  // Opciones para tallas
  const opcionesTallas = {
    camisa: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    pantalon: ['28', '30', '32', '34', '36', '38', '40'],
    calzado: ['38', '39', '40', '41', '42', '43', '44'],
    casco: ['6 7/8', '7', '7 1/8', '7 1/4', '7 3/8', '7 1/2'],
    guantes: ['XS', 'S', 'M', 'L', 'XL']
  };

  const handleGuardarDatosPersonales = () => {
    // Aquí iría la lógica para guardar en el backend
    setEditandoDatosPersonales(false);
  };

  const handleGuardarContactoEmergencia = () => {
    // Aquí iría la lógica para guardar en el backend
    setEditandoContactoEmergencia(false);
  };

  const handleGuardarTallas = () => {
    // Aquí iría la lógica para guardar en el backend
    setEditandoTallas(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Mi Perfil</h1>

      {/* Datos Personales */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Datos Personales</h2>
          {!editandoDatosPersonales ? (
            <button
              onClick={() => setEditandoDatosPersonales(true)}
              className="text-blue-600 hover:text-blue-800"
            >
              <PencilIcon className="h-5 w-5" />
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleGuardarDatosPersonales}
                className="text-green-600 hover:text-green-800"
              >
                <CheckIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setEditandoDatosPersonales(false)}
                className="text-red-600 hover:text-red-800"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(datosPersonales).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              {editandoDatosPersonales ? (
                <input
                  type={key === 'email' ? 'email' : key === 'fechaNacimiento' ? 'date' : 'text'}
                  value={value}
                  onChange={(e) => setDatosPersonales({
                    ...datosPersonales,
                    [key]: e.target.value
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              ) : (
                <p className="mt-1 text-sm text-gray-900">{value}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contacto de Emergencia */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Contacto de Emergencia</h2>
          {!editandoContactoEmergencia ? (
            <button
              onClick={() => setEditandoContactoEmergencia(true)}
              className="text-blue-600 hover:text-blue-800"
            >
              <PencilIcon className="h-5 w-5" />
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleGuardarContactoEmergencia}
                className="text-green-600 hover:text-green-800"
              >
                <CheckIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setEditandoContactoEmergencia(false)}
                className="text-red-600 hover:text-red-800"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(contactoEmergencia).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              {editandoContactoEmergencia ? (
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setContactoEmergencia({
                    ...contactoEmergencia,
                    [key]: e.target.value
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              ) : (
                <p className="mt-1 text-sm text-gray-900">{value}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tallas EPP */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Tallas EPP</h2>
          {!editandoTallas ? (
            <button
              onClick={() => setEditandoTallas(true)}
              className="text-blue-600 hover:text-blue-800"
            >
              <PencilIcon className="h-5 w-5" />
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleGuardarTallas}
                className="text-green-600 hover:text-green-800"
              >
                <CheckIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setEditandoTallas(false)}
                className="text-red-600 hover:text-red-800"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(tallasEPP).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {key}
              </label>
              {editandoTallas ? (
                <select
                  value={value}
                  onChange={(e) => setTallasEPP({
                    ...tallasEPP,
                    [key]: e.target.value
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  {opcionesTallas[key as keyof typeof opcionesTallas].map((talla) => (
                    <option key={talla} value={talla}>
                      {talla}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="mt-1 text-sm text-gray-900">{value}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Datos de Trabajo */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Información Laboral</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(datosTrabajo).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <p className="mt-1 text-sm text-gray-900">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerfilUsuario; 