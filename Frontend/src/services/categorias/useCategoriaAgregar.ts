import axios from "axios";
import { useState } from "react";
import { useApiBaseUrl } from "../../shared/useApiBaseUrl";

export interface NuevaCategoria {
  nombre: string;
  descripcion: string;
  fecha_creacion?: string; // opcional, si lo necesitas
}

interface CategoriaResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

export const useAgregarCategoria = () => {
  const baseUrl = useApiBaseUrl();
  const [estado, setEstado] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [mensaje, setMensaje] = useState<string>("");

  const agregarCategoria = async (categoriaData: NuevaCategoria, token: string) => {
    setEstado("loading");
    setMensaje("");

    try {
      const response = await axios.post<CategoriaResponse>(
        `${baseUrl}/categoria/crear`,
        categoriaData,
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
        setMensaje(response.data.error || "Error al agregar la categoría");
      }

      return response.data.data; // puedes devolver la categoría creada si lo necesitas
    } catch (error: any) {
      setEstado("error");
      setMensaje(error.response?.data?.message || "Error del servidor");
      console.error("❌ Error al agregar categoría:", error);
      return null;
    }
  };

  return { agregarCategoria, estado, mensaje };
};