import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthHandlerProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  setIsEnabled: (value: boolean) => void;
  setIsPlayable: (value: boolean) => void;
}

export function useAuthHandler({
  isAuthenticated,
  setIsAuthenticated,
  setIsEnabled,
  setIsPlayable,
}: AuthHandlerProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const authState = localStorage.getItem("isAuthenticated") === "true";
    if (authState) {
      setIsAuthenticated(true);
      setIsEnabled(true);
      setIsPlayable(true);
    }
  }, [setIsAuthenticated, setIsEnabled, setIsPlayable]);

  useEffect(() => {
    if (isAuthenticated) {
      setIsEnabled(true);
      setIsPlayable(true);
      localStorage.setItem("isAuthenticated", "true");
      navigate("/user");
    } else {
      localStorage.removeItem("isAuthenticated");
    }
  }, [isAuthenticated, setIsEnabled, setIsPlayable, navigate]);

  return { setIsAuthenticated };
}
