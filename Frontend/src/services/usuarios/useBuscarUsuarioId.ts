// src/hooks/useUsuarioPorId.ts
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useApiBaseUrl } from '../../shared/useApiBaseUrl'; // tu función para obtener {{baseUrl}}

interface Usuario {
  id: number;
  name: string;
  lastname: string;
  email: string;
  photo: string | null;
  password: string | null;
  googleID: string | null;
  active: boolean;
  rol: string;
  dateCreate: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: Usuario;
}

export const useUsuarioPorId = (id: number | string) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const baseUrl = useApiBaseUrl();

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await axios.get<ApiResponse>(`${baseUrl}/user/${id}`);
        if (response.data.success) {
          setUsuario(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err: any) {
        setError(err.message || 'Error al obtener usuario');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUsuario();
  }, [id, baseUrl]);

  return { usuario, loading, error };
};
