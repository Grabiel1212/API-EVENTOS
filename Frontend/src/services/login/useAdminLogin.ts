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
  const apiBaseUrl = useApiBaseUrl();
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
      }>(`${apiBaseUrl}/user/login`, { email, password });

      // Verificar si el usuario es ADMIN
      if (res.data.data.user.role !== 'ADMIN') {
        throw new Error('Acceso solo permitido a administradores');
      }

      setMessage(res.data.message);
      handleSuccess(res.data.data);
      return res.data.data; // Devolver datos para usar en el componente
    } catch (err: any) {
      const msg = err.response?.data?.message || 
                 err.message || 
                 "Error al iniciar sesión";
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = (data: LoginResponse) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.user.role);
    localStorage.setItem("user", JSON.stringify(data.user)); // Guardar todos los datos del usuario
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    setUser(null);
  };

  const getToken = () => localStorage.getItem("token");
  const getRole = () => localStorage.getItem("role");
  const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };

  return {
    user,
    loading,
    error,
    message,
    loginWithEmail,
    logout,
    getToken,
    getRole,
    getUser,
  };
};