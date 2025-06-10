// src/AppRoutes.tsx
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserTablePage from '../administration/components/app-usuario/appUser';
import HomeAdmin from '../administration/components/home/home';
import AdminLayout from '../administration/layouts/AdminLayout';
import { useAuth } from '../hooks/useAuth';

import Entradas from '../user/components/app-entradas/app-entradas';
import Pago from '../user/components/app-pagos/app-pagos';
import AppUser from '../user/components/app-user/app-user';
import Home from '../user/components/home/home';
import UserLayout from '../user/layouts/UserLayout'; // ✅ ESTE SÍ SE USA AHORA COMO Layout visual
const AppRoutes: React.FC = () => {
  const { role } = useAuth();

  if (!role) return <div>Cargando...</div>;

  return (
    <Routes>
      <Route path="/" element={<Navigate to={role === "admin" ? "/admin/home" : "/user"} replace />} />

      {/* Rutas usuario */}
      <Route path="/user" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="userInfo" element={<AppUser />} />
        <Route path="pago" element={<Pago />} />
        <Route path="entradas" element={<Entradas />} />
      </Route>

      {/* Rutas admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<HomeAdmin />} />
        <Route path="usuarios" element={<UserTablePage />} />
      </Route>

      <Route path="*" element={<div>404 Página no encontrada</div>} />
    </Routes>
  );
};

export default AppRoutes;