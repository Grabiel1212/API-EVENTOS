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

  // Verifica si ya hay token y validado en localStorage al cargar la app
  useEffect(() => {
    const token = localStorage.getItem("token");
    const validado = localStorage.getItem("validado") === "true";

    const isLoginPage = location.pathname === "/login";

    if (token && validado) {
      setIsAuthenticated(true);
      setIsEnabled(true);
      setIsPlayable(true);
    } else {
      setIsAuthenticated(false);
      setIsEnabled(false);
      setIsPlayable(false);
      if (!isLoginPage) {
        navigate("/login");
      }
    }
  }, [location.pathname, navigate, setIsAuthenticated, setIsEnabled, setIsPlayable]);

  // Redirigir al panel de admin si se autentica
  useEffect(() => {
    if (isAuthenticated) {
      setIsEnabled(true);
      setIsPlayable(true);
      // Aquí ya no se vuelve a guardar "validado"
      navigate("/admin");
    }
  }, [isAuthenticated, navigate, setIsEnabled, setIsPlayable]);

  return { setIsAuthenticated };
}
