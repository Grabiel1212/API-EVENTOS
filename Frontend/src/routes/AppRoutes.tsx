import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminHome from '../administration/components/home/home';
import { useAuth } from '../hooks/useAuth'; // <-- importas tu hook
import UserHome from '../user/components/home/home';

const UserLayout: React.FC = () => (
  <Routes>
    <Route path="home" element={<UserHome />} />
  </Routes>
);

const AdminLayout: React.FC = () => (
  <Routes>
    <Route path="home" element={<AdminHome />} />
  </Routes>
);

const AppRoutes: React.FC = () => {
  const { role } = useAuth();

  if (!role) return <div>Cargando...</div>; // o loader mientras esperas rol

  return (
    <Routes>
      <Route path="/" element={<Navigate to={role === "admin" ? "/admin/home" : "/user/home"} replace />} />
      <Route path="/user/*" element={<UserLayout />} />
      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="*" element={<div>404 Página no encontrada</div>} />
    </Routes>
  );
};

export default AppRoutes;
