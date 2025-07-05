// src/hooks/useEntradasPorUsuario.ts
import axios from "axios";
import { useEffect, useState } from "react";
import { useApiBaseUrl } from "../../shared/useApiBaseUrl";

export interface Entrada {
  id_registro: number;
  id_evento: number;
  nombre_evento: string;
  fecha_inicio: string;
  fecha_fin: string;
  precio: number;
  descripcion_evento: string;
  imagen_evento: string;
  cantidad: number;
  fecha_registro: string;
  monto_total: number;
  metodo_pago: string;
  estado_pago: string;
  fecha_pago: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: Entrada[];
}

export const useEntradasPorUsuario = (idUsuario: number) => {
  const baseUrl = useApiBaseUrl();
  const [entradas, setEntradas] = useState<Entrada[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const obtenerEntradas = async () => {
      try {
        setLoading(true);
        const response = await axios.get<ApiResponse>(`${baseUrl}/registros/usuarios/${idUsuario}/entradas`);
        if (response.data.success) {
          setEntradas(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err: any) {
        setError(err.message || "Error al obtener entradas");
      } finally {
        setLoading(false);
      }
    };

    if (idUsuario) {
      obtenerEntradas();
    }
  }, [idUsuario, baseUrl]);

  return { entradas, loading, error };
};
