import axios from "axios";
import { useState } from "react";
import { useApiBaseUrl } from "../../shared/useApiBaseUrl"; // Asegúrate que esta función te devuelve {{baseUrl}}

interface ResetPasswordRequest {
  email: string;
  password: string;
}

interface ResetPasswordResponse {
  success: boolean;
  message: string;
  data?: any;
}

export function useResetPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<ResetPasswordResponse | null>(null);
  const baseUrl = useApiBaseUrl();

  const resetPassword = async ({ email, password }: ResetPasswordRequest) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post<ResetPasswordResponse>(
        `${baseUrl}/user/reset-password`,
        {
          email,
          password,
        }
      );
      setResponse(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al restablecer contraseña");
    } finally {
      setLoading(false);
    }
  };

  return {
    resetPassword,
    loading,
    error,
    response,
  };
}
