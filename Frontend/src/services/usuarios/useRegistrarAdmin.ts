import axios from "axios";
import { useApiBaseUrl } from "../../shared/useApiBaseUrl";

interface UsuarioData {
  name: string;
  lastname: string;
  email: string;
  password: string;
  rol: "ADMIN" | "USUARIO"; // Soportar ambos roles
  photo?: File | null;      // Opcional
}

interface UsuarioResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const useRegistrarAdmin = () => {
  const baseUrl = useApiBaseUrl();

  const registrarUsuario = async (
    usuario: UsuarioData,
    token?: string // solo requerido para ADMIN
  ): Promise<UsuarioResponse> => {
    try {
      const formData = new FormData();
      formData.append("name", usuario.name);
      formData.append("lastname", usuario.lastname);
      formData.append("email", usuario.email);
      formData.append("password", usuario.password);
      formData.append("rol", usuario.rol);

      if (usuario.photo) {
        formData.append("photo", usuario.photo);
      }

      // Determinar endpoint según rol
      const endpoint =
        usuario.rol === "ADMIN"
          ? `${baseUrl}/user/admin/registro`
          : `${baseUrl}/user/registro`;

      const headers: any = {
        "Content-Type": "multipart/form-data",
      };

      // Solo ADMIN necesita token
      if (usuario.rol === "ADMIN" && token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await axios.post(endpoint, formData, { headers });

      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Error al registrar usuario",
      };
    }
  };

  return { registrarUsuario };
};
