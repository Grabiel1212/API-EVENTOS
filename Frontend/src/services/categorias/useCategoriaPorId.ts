// src/services/categorias/useCategoriaPorId.ts
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useApiBaseUrl } from "../../shared/useApiBaseUrl";
import type { Categoria } from "./useCategorias";

interface ResponseData {
  success: boolean;
  message: string;
  data: Categoria;
}

export const useCategoriaPorId = (idCategoria: number) => {
  const [categoria, setCategoria] = useState<Categoria | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const baseUrl = useApiBaseUrl();

  const fetchCategoria = useCallback(async (signal?: AbortSignal) => {
    if (idCategoria <= 0) {
      setError("ID de categoría inválido");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // CORRECCIÓN: Usa la ruta correcta para categorías
      const response = await axios.get<ResponseData>(
        `${baseUrl}/evento/categoria/${idCategoria}`,  // Cambiado a ruta correcta
        { signal }
      );
      
      if (response.data.success && response.data.data) {
        setCategoria(response.data.data);
        setError(null);
      } else {
        setError(response.data.message || "Categoría no encontrada");
      }
    } catch (err: any) {
      if (axios.isCancel(err)) {
        console.log("Petición cancelada");
      } else {
        setError("Error al obtener la categoría");
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  }, [baseUrl, idCategoria]);

  useEffect(() => {
    const controller = new AbortController();
    fetchCategoria(controller.signal);
    return () => controller.abort();
  }, [fetchCategoria]);

  return {
    categoria,
    loading,
    error,
    refetch: () => fetchCategoria(),
  };
};