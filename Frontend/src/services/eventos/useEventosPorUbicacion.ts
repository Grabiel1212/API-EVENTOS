import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useApiBaseUrl } from "../../shared/useApiBaseUrl";

interface Evento {
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

export const useEventosPorUbicacion = (distrito: string | null) => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const baseUrl = useApiBaseUrl();

  const fetchEventos = useCallback(async (signal?: AbortSignal) => {
    if (!distrito) return;

    try {
      setLoading(true);
      const response = await axios.get<ResponseData>(
        `${baseUrl}/evento/ubicacion/${encodeURIComponent(distrito)}`,
        { signal }
      );

      if (response.data.success) {
        setEventos(response.data.data);
        setError(null);
      } else {
        setError(response.data.message || "Error al obtener eventos por ubicación");
      }
    } catch (err: any) {
      if (axios.isCancel(err)) {
        console.log("Petición cancelada");
      } else {
        const errorMsg = err.response?.data?.message ||
                         err.message ||
                         "Error al obtener eventos";
        setError(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  }, [baseUrl, distrito]);

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
