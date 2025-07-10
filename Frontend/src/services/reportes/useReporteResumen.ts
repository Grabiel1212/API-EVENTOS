import axios from "axios";
import { useEffect, useState } from "react";
import { useApiBaseUrl } from "../../shared/useApiBaseUrl"; // Asegúrate de que este hook retorne tu baseUrl

export interface ResumenUsuario {
  id_usuario: number;
  nombre_completo: string;
  total_compras: number;
  total_pagado: string;
}

interface ResumenResponse {
  success: boolean;
  message: string;
  data: ResumenUsuario[];
}

export const useReporteResumen= () => {
  const baseUrl = useApiBaseUrl();
  const [resumen, setResumen] = useState<ResumenUsuario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchResumen = async () => {
    try {
      setLoading(true);
      const response = await axios.get<ResumenResponse>(`${baseUrl}/registros/reportes/usuarios`);
      if (response.data.success) {
        setResumen(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (err: any) {
      setError(err.message || "Error al obtener el resumen");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumen();
  }, []);

  return {
    resumen,
    loading,
    error,
    refetch: fetchResumen,
  };
};
