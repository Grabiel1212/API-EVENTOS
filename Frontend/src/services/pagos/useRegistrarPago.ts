import axios from "axios";
import { useState } from "react";
import { useApiBaseUrl } from "../../shared/useApiBaseUrl"; // Asegúrate que esta función te da {{baseUrl}}

interface PagoRequest {
  pago: {
    id_usuario: number;
  };
  registro: {
    id_evento: number;
    cantidad: number;
  };
}

interface PagoResponse {
  success: boolean;
  message: string;
  data?: any; // Puedes tipar esto mejor según la respuesta de tu API
  error?: any;
}

export const useRegistrarPago = () => {
  const baseUrl = useApiBaseUrl();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<PagoResponse | null>(null);

  const registrarPago = async (pagoData: PagoRequest) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post<PagoResponse>(`${baseUrl}/pagos/registrar`, pagoData, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`, // Si necesitas token
        },
      });

      setResponse(res.data);
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al registrar pago");
      return {
        success: false,
        message: "Error en la solicitud",
        error: err,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    registrarPago,
    loading,
    error,
    response,
  };
};
