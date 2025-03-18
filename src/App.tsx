import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import Login from './pages/Login';
import Dashboard from './pages/dashboard/Dashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import BodegaDashboard from './pages/bodega/BodegaDashboard';
import DespachoDashboard from './pages/despacho/DespachoDashboard';
import ListaUsuarios from './pages/admin/ListaUsuarios';
import EditarUsuario from './pages/admin/EditarUsuario';
import GestionBodega from './pages/bodega/GestionBodega';
import GestionDespacho from './pages/despacho/GestionDespacho';
import ConfirmarRecepcion from './pages/usuario/ConfirmarRecepcion';
import SeguimientoSolicitud from './pages/SeguimientoSolicitud';
import Inventario from './pages/admin/Inventario';
import Solicitudes from './pages/admin/Solicitudes';
import Reportes from './pages/admin/Reportes';
import ProductoDetalle from './pages/epp/ProductoDetalle';
import CarritoEPP from './pages/epp/CarritoEPP';
import PerfilUsuario from './pages/usuario/PerfilUsuario';
import PerfilAdmin from './pages/admin/PerfilAdmin';
import CatalogoEPP from './pages/epp/CatalogoEPP';
import CatalogoAdmin from './pages/admin/CatalogoAdmin';
import ProductoDetalleAdmin from './pages/admin/ProductoDetalleAdmin';
import EditarProducto from './pages/admin/EditarProducto';
import EPPsPorRol from './pages/admin/EPPsPorRol';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      {/* Rutas protegidas para usuarios normales */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="perfil" element={<PerfilUsuario />} />
        <Route path="catalogo" element={<CatalogoEPP />} />
        <Route path="epp/producto/:id" element={<ProductoDetalle />} />
        <Route path="epp/carrito" element={<CarritoEPP />} />
        <Route path="carrito" element={<Navigate to="/epp/carrito" replace />} />
        <Route path="solicitudes/seguimiento" element={<SeguimientoSolicitud />} />
        <Route path="solicitudes/confirmar" element={<ConfirmarRecepcion />} />
      </Route>

      {/* Rutas protegidas para administradores */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="perfil" element={<PerfilAdmin />} />
        <Route path="users" element={<ListaUsuarios />} />
        <Route path="users/:userId/edit" element={<EditarUsuario />} />
        <Route path="catalogo" element={<CatalogoAdmin />} />
        <Route path="catalogo/:id" element={<ProductoDetalleAdmin />} />
        <Route path="catalogo/:id/edit" element={<EditarProducto />} />
        <Route path="inventory" element={<Inventario />} />
        <Route path="requests" element={<Solicitudes />} />
        <Route path="reports" element={<Reportes />} />
        <Route path="epps-por-rol" element={<EPPsPorRol />} />
      </Route>

      {/* Rutas protegidas para bodega */}
      <Route path="/bodega" element={<MainLayout />}>
        <Route index element={<Navigate to="/bodega/dashboard" replace />} />
        <Route path="dashboard" element={<BodegaDashboard />} />
        <Route path="solicitudes" element={<GestionBodega />} />
      </Route>

      {/* Rutas protegidas para despachadores */}
      <Route path="/despacho" element={<MainLayout />}>
        <Route index element={<Navigate to="/despacho/dashboard" replace />} />
        <Route path="dashboard" element={<DespachoDashboard />} />
        <Route path="entregas" element={<GestionDespacho />} />
      </Route>

      {/* Ruta por defecto */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
