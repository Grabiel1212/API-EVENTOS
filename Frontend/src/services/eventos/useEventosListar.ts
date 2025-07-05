import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useApiBaseUrl } from "../../shared/useApiBaseUrl";

export interface Evento {
  id: number;
  titulo: string;
  descripcion: string;
  ubicacion: string;
  fecha_inicio: string;
  fecha_fin: string;
  precio: number;
  imagen: string;
  id_categoria: number;
  creado_evento: string;
  actualizado_evento: string;
}

interface ResponseData {
  success: boolean;
  message: string;
  data: Evento[];
}

export const useEventosAleatorios = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const baseUrl = useApiBaseUrl();

  const fetchEventos = useCallback(async (signal?: AbortSignal) => {
    try {
      setLoading(true);
      const response = await axios.get<ResponseData>(
        `${baseUrl}/evento`, // Asumo que esta sería la nueva ruta sin paginación
        { signal }
      );

      if (response.data.success) {
        setEventos(response.data.data);
        setError(null);
      } else {
        setError(response.data.message || "Error en la respuesta del servidor");
      }
    } catch (err: any) {
      if (axios.isCancel(err)) {
        console.log("Petición cancelada");
      } else {
        const errorMsg = err.response?.data?.message || 
                        err.message || 
                        "Error al obtener los eventos aleatorios";
        setError(errorMsg);
        console.error("Error detallado:", err);
      }
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  useEffect(() => {
    const controller = new AbortController();
    fetchEventos(controller.signal);
    return () => controller.abort();
  }, [fetchEventos]);

  return {
    eventos,
    loading,
    error,
    refetch: () => fetchEventos(),
  };
};
