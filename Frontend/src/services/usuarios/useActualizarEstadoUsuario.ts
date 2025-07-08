import axios from "axios";
import { useState } from "react";
import { useApiBaseUrl } from "../../shared/useApiBaseUrl";

interface EstadoResponse {
  success: boolean;
  message: string;
  error?: string;
}

export const useActualizarEstadoUsuario = () => {
  const [estado, setEstado] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [mensaje, setMensaje] = useState<string | null>(null);
  const baseUrl = useApiBaseUrl();

  const actualizarEstado = async (id: number, activo: boolean) => {
    setEstado("loading");
    try {
      const response = await axios.put<EstadoResponse>(`${baseUrl}/user/${id}/estado`, {
        activo,
      });

      const data = response.data;

      if (data.success) {
        setMensaje(data.message);
        setEstado("success");
      } else {
        setMensaje(data.error || data.message);
        setEstado("error");
      }

      // Retornar el resultado
      return data;
    } catch (error: any) {
      setMensaje("Error al actualizar el estado del usuario");
      setEstado("error");
      return { success: false, message: "Error al actualizar", error: error.message };
    }
  };

  return {
    actualizarEstado,
    estado,
    mensaje,
  };
};
