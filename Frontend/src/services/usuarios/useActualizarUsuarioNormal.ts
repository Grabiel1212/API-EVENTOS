// src/hooks/useActualizarUsuario.ts
import axios from "axios";
import { useApiBaseUrl } from "../../shared/useApiBaseUrl"; // si usas una base dinámica

export const useActualizarUsuario = () => {
  const baseUrl = useApiBaseUrl(); // asegúrate que devuelve algo como "http://localhost:3000"

  const actualizarUsuario = async (
    id: number,
    name: string,
    lastname: string,
    photo: File | null,
    token: string
  ) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("lastname", lastname);
    if (photo) {
      formData.append("photo", photo); // clave debe coincidir con lo que espera tu backend
    }

    try {
      const response = await axios.patch(`${baseUrl}/user/actualizar/${id}`, formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error: any) {
      console.error("Error al actualizar usuario:", error);
      throw error.response?.data || { message: "Error desconocido al actualizar" };
    }
  };

  return { actualizarUsuario };
};
