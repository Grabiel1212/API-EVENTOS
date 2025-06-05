// src/hooks/useAuth.ts
import { useEffect, useState } from "react";

export const useAuth = () => {
  // Aquí podrías obtener el rol de un API, localStorage, contexto, etc.
  // Ejemplo simple con estado fijo
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // Simulamos que obtenemos rol de login o backend
    setRole("user"); // o "user"
  }, []);

  return { role };
};
