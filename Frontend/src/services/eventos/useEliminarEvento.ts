import axios from "axios";
import { useState } from "react";
import { useApiBaseUrl } from "../../shared/useApiBaseUrl";

interface EliminarEventoResponse {
  success: boolean;
  message: string;
  error?: string;
}

export const useEliminarEvento = () => {
  const baseUrl = useApiBaseUrl();
  const [estado, setEstado] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [mensaje, setMensaje] = useState<string>("");

  const eliminarEvento = async (id: number, token: string) => {
    setEstado("loading");
    setMensaje("");

    try {
      const response = await axios.delete<EliminarEventoResponse>(
        `${baseUrl}/evento/eliminar/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setEstado("success");
        setMensaje(response.data.message);
      } else {
        setEstado("error");
        setMensaje(response.data.error || "Error al eliminar el evento");
      }
    } catch (error: any) {
      setEstado("error");
      setMensaje(error.response?.data?.message || "Error del servidor");
    }
  };

  return { eliminarEvento, estado, mensaje };
};
