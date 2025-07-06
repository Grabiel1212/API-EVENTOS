// src/hooks/useUsuariosPorRol.ts
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useApiBaseUrl } from '../../shared/useApiBaseUrl'; // asegúrate que esta función retorna tu baseUrl

interface Usuario {
  id: number;
  name: string;
  lastname: string;
  email: string;
  photo: string | null;
  password: string;
  googleID: string | null;
  active: boolean;
  rol: string;
  dateCreate: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: Usuario[];
}

export const useUsuariosAdministradores= () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const baseUrl = useApiBaseUrl();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get<ApiResponse>(`${baseUrl}/user/rol/admin`);
        if (response.data.success) {
          setUsuarios(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err: any) {
        setError(err.message || 'Error al obtener alos administradores');
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, [baseUrl]);

  return { usuarios, loading, error };
};
