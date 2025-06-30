import axios from 'axios';
import { useState } from "react";
import { useApiBaseUrl } from "../../shared/useApiBaseUrl";

interface User {
  id: string;
  name: string;
  role: string;
  email: string;
  active: boolean;
  photo: string;
  dateCreate: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export const useAdmin = () => {
  const apiBaseUrl = useApiBaseUrl(); // Debe ser: http://localhost:3000/api/v1/events
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loginWithEmail = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const res = await axios.post<{
        success: boolean;
        message: string;
        data: LoginResponse;
      }>(`${apiBaseUrl}/user/login`, { email, password }); // ✅ Sin doble /user

      setMessage(res.data.message);
      handleSuccess(res.data.data);
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Error al iniciar sesión";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = (data: LoginResponse) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.user.role);
    setUser(data.user);

    if (data.user.role === "ADMIN") {
      localStorage.setItem("validado", "true");
    } else {
      localStorage.removeItem("validado"); // Asegura que solo ADMIN lo tenga
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("validado");
    setUser(null);
  };

  const getToken = () => localStorage.getItem("token");
  const getRole = () => localStorage.getItem("role");

  return {
    user,
    loading,
    error,
    message,
    loginWithEmail,
    logout,
    getToken,
    getRole,
  };
};
