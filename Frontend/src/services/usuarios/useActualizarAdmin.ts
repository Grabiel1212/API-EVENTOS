import axios from "axios";
import { useApiBaseUrl } from "../../shared/useApiBaseUrl";

interface ActualizarUsuarioData {
  id: number;
  name: string;
  lastname: string;
  password?: string;
  rol?: string;
  photo?: File | null;
  google_id?: string | null;
}

interface UsuarioResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const useActualizarAdmin = () => {
  const baseUrl = useApiBaseUrl();

  const actualizarUsuario = async (datos: ActualizarUsuarioData): Promise<UsuarioResponse> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No se encontró token de autenticación');

      const formData = new FormData();
      
      // Solo campos permitidos según los errores previos
      formData.append('name', datos.name);
      formData.append('lastname', datos.lastname);

      // Campos condicionales para usuarios no-Google
      if (!datos.google_id) {
        if (datos.password) formData.append('password', datos.password);
        if (datos.rol) formData.append('rol', datos.rol.toUpperCase());
      }

      if (datos.photo) formData.append('photo', datos.photo);

      // Debug: Ver datos que se enviarán
      console.log('Datos a enviar al servidor:', {
        name: datos.name,
        lastname: datos.lastname,
        rol: datos.rol,
        hasPassword: !!datos.password,
        hasPhoto: !!datos.photo
      });

      const response = await axios.patch(
        `${baseUrl}/user/actualizar/${datos.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          },
          transformRequest: (data) => data, // Evita transformación automática de axios
        }
      );

      return {
        success: true,
        message: 'Usuario actualizado correctamente',
        data: response.data
      };
    } catch (error: any) {
      console.error('Error completo:', {
        request: {
          url: error.config?.url,
          method: error.config?.method,
          data: error.config?.data,
          headers: error.config?.headers
        },
        response: {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers
        }
      });
      
      return {
        success: false,
        message: error.response?.data?.message || 'Error al actualizar usuario',
        data: error.response?.data
      };
    }
  };

  return { actualizarUsuario };
};