import axios from "axios";
import { useState } from "react";
import { useApiBaseUrl } from "../../shared/useApiBaseUrl";

interface ActualizarEventoData {
  titulo?: string;
  descripcion?: string;
  ubicacion?: string;
  fecha_inicio?: string; // formato: YYYY-MM-DD
  fecha_fin?: string;    // formato: YYYY-MM-DD
  precio?: number;
  imagen?: string; // URL o cadena vacía
  id_categoria?: number;
}

interface EventoResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

export const useActualizarEvento = () => {
  const baseUrl = useApiBaseUrl();
  const [estado, setEstado] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [mensaje, setMensaje] = useState<string>("");

  const actualizarEvento = async (id: number, eventoData: FormData, token: string) => {
    setEstado("loading");
    setMensaje("");

    try {
      const response = await axios.patch<EventoResponse>(
        `${baseUrl}/evento/actualizar/${id}`,
        eventoData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setEstado("success");
        setMensaje(response.data.message);
      } else {
        setEstado("error");
        setMensaje(response.data.error || "Error al actualizar el evento");
      }
    } catch (error: any) {
      setEstado("error");
      setMensaje(error.response?.data?.message || "Error del servidor");
    }
  };

  // ✅ Este return es obligatorio
  return {
    actualizarEvento,
    estado,
    mensaje
  };
};
