import axios from "axios";
import { useEffect, useState } from "react";
import { useApiBaseUrl } from "../../shared/useApiBaseUrl";

export interface ReporteUsuarioItem {
  id_usuario: number;
  nombre_completo: string;
  correo: string;
  evento: string;
  categoria: string;
  cantidad: number;
  monto: string;
  metodo_pago: string;
  estado_pago: string;
  fecha_registro: string | null; // Asumimos que puede llegar a ser string más adelante
}

interface ReporteUsuarioResponse {
  success: boolean;
  message: string;
  data: ReporteUsuarioItem[];
}

export const useReporteUsuario = (idUsuario: number) => {
  const baseUrl = useApiBaseUrl();
  const [reporte, setReporte] = useState<ReporteUsuarioItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReporte = async () => {
    try {
      setLoading(true);
      const response = await axios.get<ReporteUsuarioResponse>(`${baseUrl}/registros/reportes/usuario/${idUsuario}`);
      if (response.data.success) {
        setReporte(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (err: any) {
      setError(err.message || "Error al obtener el reporte del usuario");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReporte();
  }, [idUsuario]);

  return {
    reporte,
    loading,
    error,
    refetch: fetchReporte,
  };
};
