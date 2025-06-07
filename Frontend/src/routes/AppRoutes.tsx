// src/AppRoutes.tsx
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminHome from '../administration/components/home/home';
import { useAuth } from '../hooks/useAuth';

import Entradas from '../user/components/app-entradas/app-entradas';
import Pago from '../user/components/app-pagos/app-pagos';
import AppUser from '../user/components/app-user/app-user';
import Home from '../user/components/home/home';
import UserLayout from '../user/layouts/UserLayout'; // ✅ ESTE SÍ SE USA AHORA COMO Layout visual

const AdminLayout: React.FC = () => (
  <Routes>
    <Route path="home" element={<AdminHome />} />
  </Routes>
);

const AppRoutes: React.FC = () => {
  const { role } = useAuth();

  if (!role) return <div>Cargando...</div>;

  return (
    <Routes>
      <Route path="/" element={<Navigate to={role === "admin" ? "/admin/home" : "/user/home"} replace />} />

      {/* ✅ Aquí UserLayout envuelve las páginas del usuario */}
      <Route path="/user" element={<UserLayout />}>
        <Route index element={<Home />} />
        
        <Route path="userInfo" element={<AppUser />} />
        <Route path="pago" element={<Pago />} />
         <Route path="entradas" element={<Entradas />} />
      </Route>

      {/* Admin */}
      <Route path="/admin/*" element={<AdminLayout />} />

      {/* Página no encontrada */}
      <Route path="*" element={<div>404 Página no encontrada</div>} />
    </Routes>
  );
};

export default AppRoutes;
