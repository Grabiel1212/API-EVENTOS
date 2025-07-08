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
  creado_evento: string;
  actualizado_evento: string;
  id_categoria: number;
}

interface EventoResponse {
  success: boolean;
  message: string;
  data: Evento[];
}

export const useEventos = () => {
  const baseUrl = useApiBaseUrl();
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const obtenerEventos = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<EventoResponse>(`${baseUrl}/evento`);
      if (response.data.success) {
        setEventos(response.data.data);
      } else {
        setError("No se pudieron cargar los eventos");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al cargar eventos");
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  useEffect(() => {
    obtenerEventos();
  }, [obtenerEventos]);

  return { eventos, loading, error, refetch: obtenerEventos };
};
