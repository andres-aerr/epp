import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '../../components/Layout';
import { Usuario, TallasUsuario } from '../../types/epp';
import { UserIcon } from '@heroicons/react/24/outline';

// Usuario de ejemplo
const usuarioEjemplo: Usuario = {
  id: '1',
  nombre: 'Carlos',
  apellido: 'Rodríguez Mendoza',
  email: 'carlos.rodriguez@empresa.com',
  rol: 'usuario',
  rubro: 'Minería',
  cargo: 'Operador de Maquinaria Pesada',
  fechaCreacion: '2024-01-15',
  ultimoAcceso: '2024-03-17',
  estado: 'activo',
  tallas: {
    ropa: 'L',
    calzado: '42',
    casco: 'M',
    guantes: 'L',
    respirador: 'M'
  },
  departamento: 'Operaciones',
  dni: '45678912',
  telefono: '987654321',
  fechaNacimiento: '1990-05-15',
  direccion: 'Av. Los Mineros 123, La Victoria',
  contactoEmergencia: {
    nombre: 'María Mendoza',
    telefono: '987123456',
    relacion: 'Esposa'
  },
  imagen: '/images/profile/carlos.jpg',
  sede: 'Mina Cerro Verde',
  area: 'Tajo Abierto',
  supervisor: {
    nombre: 'Juan Pérez Silva',
    cargo: 'Supervisor de Operaciones',
    email: 'juan.perez@empresa.com',
    telefono: '987456123'
  },
  fechaIngreso: '2022-03-01',
  turno: 'mañana'
};

const UserProfile: React.FC = () => {
  const { user } = useUser();
  const [formData, setFormData] = useState<Partial<Usuario>>(usuarioEjemplo);
  const [tallas, setTallas] = useState<TallasUsuario>(usuarioEjemplo.tallas);
  const [previewImage, setPreviewImage] = useState<string | null>(usuarioEjemplo.imagen || null);
  const [contactoEmergencia, setContactoEmergencia] = useState(usuarioEjemplo.contactoEmergencia || {
    nombre: '',
    telefono: '',
    relacion: ''
  });
  const [supervisor, setSupervisor] = useState(usuarioEjemplo.supervisor);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleContactoEmergenciaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactoEmergencia(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSupervisorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSupervisor(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setPreviewImage(imageUrl);
        setFormData(prev => ({
          ...prev,
          imagen: imageUrl
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTallaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTallas(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para actualizar el perfil
    console.log('Datos actualizados:', { ...formData, tallas });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Perfil de Usuario</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-6 mb-6">
            <div 
              className="relative cursor-pointer group"
              onClick={handleImageClick}
            >
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Foto de perfil"
                  className="h-24 w-24 rounded-full object-cover border-2 border-gray-200"
                />
              ) : (
                <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-300">
                  <UserIcon className="h-12 w-12 text-gray-400" />
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-sm">Cambiar foto</span>
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
            <div>
              <h2 className="text-xl font-semibold">{formData.nombre} {formData.apellido}</h2>
              <p className="text-gray-500">{formData.cargo}</p>
              <p className="text-gray-500">{formData.sede}</p>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4">Datos Personales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Apellido</label>
              <input
                type="text"
                name="apellido"
                value={formData.apellido || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">DNI</label>
              <input
                type="text"
                name="dni"
                value={formData.dni || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
              <input
                type="date"
                name="fechaNacimiento"
                value={formData.fechaNacimiento || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Teléfono</label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Dirección</label>
              <input
                type="text"
                name="direccion"
                value={formData.direccion || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Información Laboral</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Sede</label>
              <input
                type="text"
                name="sede"
                value={formData.sede || ''}
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 cursor-not-allowed"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Área</label>
              <input
                type="text"
                name="area"
                value={formData.area || ''}
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 cursor-not-allowed"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Cargo</label>
              <input
                type="text"
                name="cargo"
                value={formData.cargo || ''}
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 cursor-not-allowed"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Fecha de Ingreso</label>
              <input
                type="date"
                name="fechaIngreso"
                value={formData.fechaIngreso || ''}
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 cursor-not-allowed"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Turno</label>
              <input
                type="text"
                name="turno"
                value={formData.turno || ''}
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 cursor-not-allowed"
                disabled
              />
            </div>
          </div>

          <h3 className="text-lg font-semibold mt-6 mb-4">Información del Supervisor</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre del Supervisor</label>
              <input
                type="text"
                name="supervisor.nombre"
                value={supervisor.nombre}
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 cursor-not-allowed"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Cargo del Supervisor</label>
              <input
                type="text"
                name="supervisor.cargo"
                value={supervisor.cargo}
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 cursor-not-allowed"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email del Supervisor</label>
              <input
                type="email"
                name="supervisor.email"
                value={supervisor.email}
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 cursor-not-allowed"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Teléfono del Supervisor</label>
              <input
                type="tel"
                name="supervisor.telefono"
                value={supervisor.telefono}
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 cursor-not-allowed"
                disabled
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Contacto de Emergencia</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={contactoEmergencia.nombre}
                onChange={handleContactoEmergenciaChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Teléfono</label>
              <input
                type="tel"
                name="telefono"
                value={contactoEmergencia.telefono}
                onChange={handleContactoEmergenciaChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Relación</label>
              <input
                type="text"
                name="relacion"
                value={contactoEmergencia.relacion}
                onChange={handleContactoEmergenciaChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Tallas de EPP</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Talla de Ropa</label>
              <select
                name="ropa"
                value={tallas.ropa}
                onChange={handleTallaChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Seleccionar talla</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Talla de Calzado</label>
              <select
                name="calzado"
                value={tallas.calzado}
                onChange={handleTallaChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Seleccionar talla</option>
                {Array.from({ length: 8 }, (_, i) => i + 38).map(num => (
                  <option key={num} value={num.toString()}>{num}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Talla de Casco</label>
              <select
                name="casco"
                value={tallas.casco}
                onChange={handleTallaChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Seleccionar talla</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Talla de Guantes</label>
              <select
                name="guantes"
                value={tallas.guantes}
                onChange={handleTallaChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Seleccionar talla</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Talla de Respirador</label>
              <select
                name="respirador"
                value={tallas.respirador}
                onChange={handleTallaChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Seleccionar talla</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile; 