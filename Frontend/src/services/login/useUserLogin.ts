// src/hooks/useAuth.ts
import axios from "axios";
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

interface LoginResponse {
  token: string;
  user: User;
}

export const useLogin = () => {
  const apiBaseUrl = useApiBaseUrl(); // Correcto: llamado una vez
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const loginWithEmail = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const res = await axios.post<{
        success: boolean;
        message: string;
        data: LoginResponse;
      }>(apiBaseUrl + "/user/login/", { email, password });

      setMessage(res.data.message);
      handleSuccess(res.data.data);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async (googleID: string) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const res = await axios.post<{
        success: boolean;
        message: string;
        data: LoginResponse;
      }>(apiBaseUrl + "/user/login/", { googleID });

      setMessage(res.data.message);
      handleSuccess(res.data.data);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Error con Google Login");
       if (err.response?.status === 404) {
      throw new Error("USER_NOT_FOUND");
    }
    
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = (data: LoginResponse) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.user.role);
  localStorage.setItem("user", JSON.stringify(data.user));
  
  // Añadir estas líneas para consistencia con MenuBar
  localStorage.setItem("isAuthenticated", "true");
  localStorage.setItem("userData", JSON.stringify(data.user));
  
  setUser(data.user); // Disparar evento para actualizar otros componentes
  window.dispatchEvent(new Event('authStateChanged'));




  };

  const getUser = (): User | null => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) as User : null;
};


  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
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
    loginWithGoogle,
    logout,
    getToken,
    getRole,
    getUser
  };
};
