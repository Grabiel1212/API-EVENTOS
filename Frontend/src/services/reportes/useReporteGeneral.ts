import axios from "axios";
import { useEffect, useState } from "react";
import { useApiBaseUrl } from "../../shared/useApiBaseUrl"; // Asegúrate que esto retorne {{baseUrl}}

export interface ReporteItem {
  id_usuario: number;
  nombre: string;
  apellidos: string;
  correo: string;
  id_evento: number;
  nombre_evento: string;
  categoria: string;
  cantidad: number;
  monto: string;
  metodo_pago: string;
  estado_pago: string;
  fecha_registro: string | null;
}

interface ReporteResponse {
  success: boolean;
  message: string;
  data: ReporteItem[];
}

export const useReporteGeneral = () => {
  const baseUrl = useApiBaseUrl();
  const [reporte, setReporte] = useState<ReporteItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReporte = async () => {
    try {
      setLoading(true);
      const response = await axios.get<ReporteResponse>(`${baseUrl}/registros/reportes/general`);
      if (response.data.success) {
        setReporte(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (err: any) {
      setError(err.message || "Error al obtener el reporte");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReporte();
  }, []);

  return {
    reporte,
    loading,
    error,
    refetch: fetchReporte,
  };
};
