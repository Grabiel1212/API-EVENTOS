import axios from "axios";
import { useState } from "react";
import { useApiBaseUrl } from "../../shared/useApiBaseUrl";

export interface CategoriaUpdate {
  id: number;
  nombre: string;
  descripcion: string;
}

interface CategoriaResponse {
  success: boolean;
  message: string;
  data?: CategoriaUpdate;
  error?: string;
}

/**
 * Hook para actualizar una categoría existente.
 */
export const useActualizarCategoria = () => {
  const baseUrl = useApiBaseUrl();
  const [estado, setEstado] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [mensaje, setMensaje] = useState<string>("");

  const actualizarCategoria = async (categoriaData: CategoriaUpdate): Promise<CategoriaUpdate | null> => {
    setEstado("loading");
    setMensaje("");

    const token = localStorage.getItem("token");
    if (!token) {
      setEstado("error");
      setMensaje("No se encontró un token. Por favor, inicia sesión.");
      return null;
    }

    try {
      // <-- Aquí cambiamos put por patch y la ruta
      const response = await axios.patch<CategoriaResponse>(
        `${baseUrl}/categoria/actualizar/${categoriaData.id}`,
        { nombre: categoriaData.nombre, descripcion: categoriaData.descripcion },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success && response.data.data) {
        setEstado("success");
        setMensaje(response.data.message);
        return response.data.data;
      } else {
        setEstado("error");
        setMensaje(response.data.error || "Error al actualizar la categoría");
        return null;
      }
    } catch (error: any) {
      setEstado("error");
      setMensaje(error.response?.data?.message || "Error del servidor");
      console.error("❌ Error al actualizar categoría:", error);
      return null;
    }
  };

  return { actualizarCategoria, estado, mensaje };
};
