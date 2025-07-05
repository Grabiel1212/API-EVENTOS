import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useApiBaseUrl } from "../../shared/useApiBaseUrl";

export const useUbicacionesUnicas = () => {
  const [ubicaciones, setUbicaciones] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const baseUrl = useApiBaseUrl();

  const fetchUbicaciones = useCallback(async (signal?: AbortSignal) => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/evento`, { signal });

      if (response.data.success) {
        const eventos = response.data.data;

        // Extraer solo la parte ENTRE la primera y segunda coma
        const ubicacionesSet = new Set<string>();

        eventos.forEach((evento: any) => {
          if (evento.ubicacion) {
            const partes = evento.ubicacion.split(",").map((p: string) => p.trim());

            if (partes.length >= 2) {
              ubicacionesSet.add(partes[1]); // Segunda parte
            }
          }
        });

        setUbicaciones(Array.from(ubicacionesSet));
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
                         "Error al obtener ubicaciones";
        setError(errorMsg);
        console.error("Error detallado:", err);
      }
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  useEffect(() => {
    const controller = new AbortController();
    fetchUbicaciones(controller.signal);
    return () => controller.abort();
  }, [fetchUbicaciones]);

  return {
    ubicaciones, // Ej: ["Surco", "Miraflores", ...]
    loading,
    error,
    refetch: () => fetchUbicaciones(),
  };
};

export default useUbicacionesUnicas;
