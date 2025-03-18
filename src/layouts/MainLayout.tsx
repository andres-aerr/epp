import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  TruckIcon,
  InboxIcon,
  ShoppingBagIcon,
  UserIcon
} from '@heroicons/react/24/outline';

// Navegación para usuarios normales
const userNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Catálogo EPP', href: '/catalogo', icon: ShoppingBagIcon },
  { name: 'Seguimiento', href: '/solicitudes/seguimiento', icon: ClipboardDocumentListIcon },
  { name: 'Confirmar Recepción', href: '/solicitudes/confirmar', icon: CheckCircleIcon },
  { name: 'Mi Perfil', href: '/perfil', icon: UserIcon },
];

// Navegación para bodega
const bodegaNavigation = [
  { name: 'Dashboard', href: '/bodega', icon: HomeIcon },
  { name: 'Gestión Solicitudes', href: '/bodega/solicitudes', icon: InboxIcon },
];

// Navegación para despacho
const despachoNavigation = [
  { name: 'Dashboard', href: '/despacho', icon: HomeIcon },
  { name: 'Gestión Entregas', href: '/despacho/entregas', icon: TruckIcon },
];

const MainLayout: React.FC = () => {
  const location = useLocation();
  
  // Determinar qué navegación mostrar basado solo en la ruta actual
  // para evitar problemas de renderizado
  let navigation = userNavigation; // Por defecto
  
  if (location.pathname.startsWith('/bodega')) {
    navigation = bodegaNavigation;
  } else if (location.pathname.startsWith('/despacho')) {
    navigation = despachoNavigation;
  }

  // Función simple para cerrar sesión
  const handleLogout = () => {
    sessionStorage.clear();
    // No vamos a hacer la redirección programáticamente
    // para evitar ciclos de renderizado
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col">
          <div className="flex flex-col flex-grow pt-5 bg-white overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-xl font-semibold text-gray-900">EPP Manager</h1>
            </div>
            <div className="mt-5 flex-grow flex flex-col">
              <nav className="flex-1 px-2 pb-4 space-y-1">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        isActive
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <item.icon
                        className={`mr-3 flex-shrink-0 h-6 w-6 ${
                          isActive
                            ? 'text-gray-500'
                            : 'text-gray-400 group-hover:text-gray-500'
                        }`}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1">
          {/* Top bar */}
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
            <div className="flex-1 px-4 flex justify-between">
              <div className="flex-1 flex items-center">
                <h1 className="text-2xl font-semibold text-gray-900">
                  {navigation.find((item) => item.href === location.pathname)?.name || 'EPP Manager'}
                </h1>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900"
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </Link>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout; 