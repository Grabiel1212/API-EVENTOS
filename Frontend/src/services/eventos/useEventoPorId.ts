// src/hooks/useEventoPorId.ts
import axios from "axios";
import { useEffect, useState } from "react";
import { useApiBaseUrl } from "../../shared/useApiBaseUrl"; // Ajusta si usas tu propia forma de baseUrl

export interface Evento {
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

export const useEventoPorId = (id: number) => {
  const baseUrl = useApiBaseUrl(); // tu hook o constante para baseUrl
  const [evento, setEvento] = useState<Evento | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const response = await axios.get(`${baseUrl}/evento/${id}`);
        setEvento(response.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Error al obtener el evento");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEvento();
  }, [id, baseUrl]);

  return { evento, loading, error };
};
