// src/hooks/useCategorias.ts
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useApiBaseUrl } from "../../shared/useApiBaseUrl";

export interface Categoria {
  id_categoria: number;
  nombre: string;
  descripcion: string;
  creado_categoria: string;
}

interface ResponseData {
  success: boolean;
  message: string;
  data: Categoria[];
}

export const useCategorias = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const baseUrl = useApiBaseUrl();

  const fetchCategorias = useCallback(async (signal?: AbortSignal) => {
    try {
      setLoading(true);
      const response = await axios.get<ResponseData>(`${baseUrl}/categoria/`, {
        signal,
      });
      setCategorias(response.data.data);
      setError(null);
    } catch (err: any) {
      if (axios.isCancel(err)) {
        console.log("Petición cancelada");
      } else {
        setError("Error al obtener las categorías");
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  useEffect(() => {
    const controller = new AbortController();
    fetchCategorias(controller.signal);
    return () => controller.abort();
  }, [fetchCategorias]);

  return {
    categorias,
    loading,
    error,
    refetch: () => fetchCategorias(), // recarga manual si lo necesitas
  };
};
