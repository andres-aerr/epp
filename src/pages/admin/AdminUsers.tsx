import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { usuarios } from '../../data/usuarios';
import { Usuario } from '../../types/epp';
import { PencilIcon, EyeIcon } from '@heroicons/react/24/outline';
import { useUser } from '../../components/Layout';

const AdminUsers: React.FC = () => {
  const navigate = useNavigate();
  const { usuario: currentUser } = useUser();
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Redireccionar si no es admin
  if (currentUser.rol !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  const handleView = (user: Usuario) => {
    setSelectedUser(user);
  };

  const handleEdit = (userId: string) => {
    navigate(`/admin/users/${userId}/edit`);
  };

  const filteredUsers = usuarios.filter(user =>
    user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.departamento.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.cargo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
        <div className="w-1/3">
          <input
            type="text"
            placeholder="Buscar usuarios..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de usuarios */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Departamento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cargo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {user.nombre} {user.apellido}
                          </div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.departamento}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.cargo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleView(user)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                        title="Ver detalles"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleEdit(user.id)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Editar información laboral"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Panel de detalles */}
        {selectedUser && (
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium mb-4">Detalles del Usuario</h2>

              {/* Información Personal */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Información Personal</h3>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Nombre:</span> {selectedUser.nombre} {selectedUser.apellido}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">DNI:</span> {selectedUser.dni}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Email:</span> {selectedUser.email}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Teléfono:</span> {selectedUser.telefono}
                  </p>
                </div>
              </div>

              {/* Información Laboral */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Información Laboral</h3>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Departamento:</span> {selectedUser.departamento}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Cargo:</span> {selectedUser.cargo}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Rubro:</span> {selectedUser.rubro}
                  </p>
                </div>
              </div>

              {/* Información del Supervisor */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Información del Supervisor</h3>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Supervisor:</span> {selectedUser.supervisor.nombre} {selectedUser.supervisor.apellido}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Cargo:</span> {selectedUser.supervisor.cargo}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Email:</span> {selectedUser.supervisor.email}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Teléfono:</span> {selectedUser.supervisor.telefono}
                  </p>
                </div>
              </div>

              {/* Tallas */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Tallas Registradas</h3>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Ropa:</span> {selectedUser.tallas.ropa}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Calzado:</span> {selectedUser.tallas.calzado}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Casco:</span> {selectedUser.tallas.casco}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Guantes:</span> {selectedUser.tallas.guantes}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Respirador:</span> {selectedUser.tallas.respirador}
                  </p>
                </div>
              </div>

              {/* Botón de cerrar */}
              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers; 