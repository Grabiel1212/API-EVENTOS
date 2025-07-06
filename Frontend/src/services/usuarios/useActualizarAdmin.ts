import axios from "axios";
import { useApiBaseUrl } from "../../shared/useApiBaseUrl";

interface ActualizarUsuarioData {
  id: number;
  name?: string;
  lastname?: string;
  email?: string;
  password?: string;
  rol?: string;
  active?: boolean;
  photo?: File | null;
  token: string; 
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
      const formData = new FormData();
      if (datos.name) formData.append("name", datos.name);
      if (datos.lastname) formData.append("lastname", datos.lastname);
      if (datos.email) formData.append("email", datos.email);
      if (datos.password) formData.append("password", datos.password);
      if (datos.rol) formData.append("rol", datos.rol);
      if (datos.active !== undefined) formData.append("active", String(datos.active));
      if (datos.photo) formData.append("photo", datos.photo);

      const response = await axios.patch(`${baseUrl}/user/${datos.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${datos.token}` // token en cabecera
        }
      });

      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Error al actualizar usuario"
      };
    }
  };

  return { actualizarUsuario };
};
