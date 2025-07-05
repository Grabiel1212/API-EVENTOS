// src/hooks/useEventosPorCategoria.ts
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

export const useEventosPorCategoria = (idCategoria: number) => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const baseUrl = useApiBaseUrl();

  const fetchEventos = useCallback(async (signal?: AbortSignal) => {

     if (idCategoria <= 0) {
      setError("ID de categoría inválido");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get<ResponseData>(
        `${baseUrl}/evento/categoria/${idCategoria}`,
        { signal }
      );
      
      // Verificar si hay datos
      if (response.data.success && response.data.data) {
        setEventos(response.data.data);
        setError(null);
      } else {
        setError(response.data.message || "No se encontraron eventos");
      }
    } catch (err: any) {
      if (axios.isCancel(err)) {
        console.log("Petición cancelada");
      } else {
        setError("Error al obtener eventos por categoría");
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  }, [baseUrl, idCategoria]);

  useEffect(() => {
    const controller = new AbortController();
    fetchEventos(controller.signal);
    return () => controller.abort();
  }, [fetchEventos]);

  return {
    eventos,
    loading,
    error,
    refetch: () => fetchEventos(), // para recargar manualmente si quieres
  };
};
