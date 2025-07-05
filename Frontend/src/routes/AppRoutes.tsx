// src/AppRoutes.tsx
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import CategoriaTablaPage from '../administration/components/app-categoria/app-categoria';
import EventoTablaPage from '../administration/components/app-eventos/app-eventos';
import PagosTablaPage from '../administration/components/app-pagos/app-pagos';
import RegistrosTablaPage from '../administration/components/app-registros/app-registros';
import UserTablePage from '../administration/components/app-usuario/appUser';
import HomeAdmin from '../administration/components/home/home';
import AdminLayout from '../administration/layouts/AdminLayout';
import { useAuth } from '../hooks/useAuth';

import CompraUser from '../user/components/app-compra/AppCompraContainer';
import Entradas from '../user/components/app-entradas/app-entradas';
import Pago from '../user/components/app-pagos/app-pagos';
import RegistroUser from '../user/components/app-registro/app-resgitro';
import AppUser from '../user/components/app-user/app-user';
import UserLayout from '../user/layouts/UserLayout';
import Login from '../user/pages/LoginForm';

import PagoExito from "../user/components/app-pagos/PagoExito";
import Home from "../user/components/home/home";
import CategoriaEventosPage from '../user/search/CategoriaEventosPage';
import EventosPorFechaPage from '../user/search/EventosPorFechaPage';
import SearchResultsPage from '../user/search/SearchResultsPage';
import UbicacionEventosPage from '../user/search/UbicacionEventosPage';

import LandingPage from "../layout/inicio/LandingPage";
import PasswordRecoveryForm from "../user/components/recuperacion-contraseña/PasswordRecoveryForm";

const AppRoutes: React.FC = () => {
  const { role } = useAuth();

  if (!role) return <div>Cargando...</div>;

  return (
    <Routes>
    <Route path="/" element={<LandingPage />} />


      {/* Rutas usuario */}
      <Route path="/user" element={<UserLayout />}>
        <Route index element={<Home />} /> {/* Usa Home aquí */}
        <Route path="userInfo" element={<AppUser />} />
        <Route path="compra">
          <Route path=":eventId" element={<CompraUser />} />
          <Route path=":eventId/pago" element={<Pago />} />
          <Route path=":eventId/exito" element={<PagoExito />} />
        </Route>
        <Route path="entradas" element={<Entradas />} />
        <Route path="login" element={<Login />} />
        <Route path="recuperar" element={<PasswordRecoveryForm />} />
        <Route path="registro" element={<RegistroUser />} />
        <Route path="search" element={<SearchResultsPage />} /> {/* Resultados de búsqueda */}
        <Route path="categoria/:id" element={<CategoriaEventosPage />} />
        <Route path="ubicacion/:ubicacion" element={<UbicacionEventosPage />} />
        <Route path="fecha/:desde/:hasta" element={<EventosPorFechaPage />} />
      </Route>

      {/* Rutas admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<HomeAdmin />} />
        <Route path="usuarios" element={<UserTablePage />} />
        <Route path="categorias" element={<CategoriaTablaPage />} />
        <Route path="eventos" element={<EventoTablaPage />} />
        <Route path="pagos" element={<PagosTablaPage />} />
        <Route path="registros" element={<RegistrosTablaPage />} />
      </Route>

      <Route path="*" element={<div>404 Página no encontrada</div>} />
    </Routes>
  );
};

export default AppRoutes;