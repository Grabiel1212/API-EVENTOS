import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface AdminAuthHandlerProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  setIsEnabled: (value: boolean) => void;
  setIsPlayable: (value: boolean) => void;
}

export function useAdminAuthHandler({
  isAuthenticated,
  setIsAuthenticated,
  setIsEnabled,
  setIsPlayable,
}: AdminAuthHandlerProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Verificar autenticación al cargar y en cambios de ruta
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const user = localStorage.getItem("user");

    const isLoginPage = location.pathname === "/login";
    const isAdmin = role === "ADMIN";

    if (token && isAdmin && user) {
      setIsAuthenticated(true);
      setIsEnabled(true);
      setIsPlayable(true);
      
      // Si está en login y ya autenticado, redirigir a admin
      if (isLoginPage) {
        navigate("/admin/home");
      }
    } else {
      setIsAuthenticated(false);
      setIsEnabled(false);
      setIsPlayable(false);
      
      // Redirigir a login si no está autenticado y no está en login
      if (!isLoginPage) {
        navigate("/login");
      }
    }
  }, [location.pathname, navigate, setIsAuthenticated, setIsEnabled, setIsPlayable]);

  // Redirigir al panel de admin después de autenticarse
  useEffect(() => {
    if (isAuthenticated) {
      setIsEnabled(true);
      setIsPlayable(true);
      navigate("/admin/home");
    }
  }, [isAuthenticated, navigate, setIsEnabled, setIsPlayable]);

  return { setIsAuthenticated };
}