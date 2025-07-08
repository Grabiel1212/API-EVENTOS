import axios from "axios";
import { useState } from "react";
import { useApiBaseUrl } from "../../shared/useApiBaseUrl";

interface DeleteResponse {
  success: boolean;
  message: string;
  error?: string;
}

export const useEliminarUsuario = () => {
  const [estado, setEstado] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [mensaje, setMensaje] = useState<string | null>(null);
  const baseUrl = useApiBaseUrl();

  const eliminarUsuario = async (id: number) => {
    setEstado("loading");
    try {
      const response = await axios.delete<DeleteResponse>(`${baseUrl}/user/${id}`);
      const data = response.data;

      if (data.success) {
        setMensaje(data.message); // Usuario eliminado correctamente
        setEstado("success");
      } else {
        setMensaje(data.error || data.message); // Usuario ya está inactivo u otro error
        setEstado("error");
      }

      return data; // <-- ahora retorna el resultado
    } catch (error: any) {
      const fallback = {
        success: false,
        message: "Ocurrió un error en la conexión",
        error: error.message,
      };

      setMensaje(fallback.message);
      setEstado("error");

      return fallback; // <-- también retorna un objeto en caso de error
    }
  };

  return {
    eliminarUsuario,
    estado,
    mensaje,
  };
};
