import axios from "axios";
import { useState } from "react";
import { useApiBaseUrl } from "../../shared/useApiBaseUrl";

interface CrearEventoData {
  titulo: string;
  descripcion: string;
  ubicacion: string;
  fecha_inicio: string; // formato: "YYYY-MM-DD"
  fecha_fin: string;    // formato: "YYYY-MM-DD"
  precio: number;
  imagen?: string; // Puede ir vacío o ser una URL
  id_categoria: number;
}

interface EventoResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

export const useCrearEvento = () => {
  const baseUrl = useApiBaseUrl();
  const [estado, setEstado] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [mensaje, setMensaje] = useState<string>("");

  const crearEvento = async (eventoData: CrearEventoData, token: string) => {
    setEstado("loading");
    setMensaje("");

    try {
      const response = await axios.post<EventoResponse>(
        `${baseUrl}/evento/crear`,
        eventoData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setEstado("success");
        setMensaje(response.data.message);
      } else {
        setEstado("error");
        setMensaje(response.data.error || "Error al crear el evento");
      }
    } catch (error: any) {
      setEstado("error");
      setMensaje(error.response?.data?.message || "Error del servidor");
    }
  };

  return { crearEvento, estado, mensaje };
};
