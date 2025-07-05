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

export const useEventosPorRangoFechas = (desde: string | null, hasta: string | null) => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [key, setKey] = useState(0); // Mover fuera de useCallback
  const baseUrl = useApiBaseUrl();

  const fetchEventos = useCallback(async (signal?: AbortSignal) => {
    if (!desde || !hasta) return;

    try {
      setLoading(true);
      const response = await axios.request<ResponseData>({
        method: "POST",
        url: `${baseUrl}/evento/fecha/rango`,
        data: { desde, hasta },
        signal,
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.data.success) {
        setEventos(response.data.data);
        setError(null);
      } else {
        setError(response.data.message || "Error al obtener eventos por fecha");
      }
    } catch (err: any) {
      if (axios.isCancel(err)) {
        console.log("Petición cancelada");
      } else {
        const errorMsg = err.response?.data?.message ||
                         err.message ||
                         "Error al obtener eventos";
        setError(errorMsg);
        console.error("Error detallado:", err);
      }
    } finally {
      setLoading(false);
    }
  }, [baseUrl, desde, hasta]);

  const refetch = useCallback(() => {
    setKey(prev => prev + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    if (desde && hasta) {
      fetchEventos(controller.signal);
    }
    return () => controller.abort();
  }, [fetchEventos, desde, hasta, key]); // Añadir key como dependencia

  return {
    eventos,
    loading,
    error,
    refetch
  };
};