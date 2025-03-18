import React from 'react';
import { UserIcon } from '@heroicons/react/24/outline';

interface UserProfileProps {
  nombre: string;
  email: string;
  rol: string;
  departamento?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ nombre, email, rol, departamento }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center">
        <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center">
          <UserIcon className="h-10 w-10 text-gray-500" />
        </div>
        <div className="ml-4">
          <h2 className="text-xl font-semibold text-gray-900">{nombre}</h2>
          <p className="text-sm text-gray-500">{email}</p>
        </div>
      </div>
      <div className="mt-4 border-t border-gray-200 pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Rol</p>
            <p className="mt-1 text-sm text-gray-900">{rol}</p>
          </div>
          {departamento && (
            <div>
              <p className="text-sm font-medium text-gray-500">Departamento</p>
              <p className="mt-1 text-sm text-gray-900">{departamento}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 