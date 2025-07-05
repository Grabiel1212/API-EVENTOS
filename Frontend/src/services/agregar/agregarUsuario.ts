
import axios from "axios";
import { useApiBaseUrl } from "../../shared/useApiBaseUrl"; // Ajusta esto a tu proyecto

interface RegisterWithEmailParams {
  name: string;
  lastname: string;
  email: string;
  password: string;
  photo?: File; // Opcional
}

interface RegisterWithGoogleParams {
  name: string;
  lastname: string;
  googleID: string;
  email: string;
}

export const useRegister = () => {
  const baseUrl = useApiBaseUrl(); // Ej: http://localhost:3000/api/v1

  // Registro con email y contraseña
  const registerWithEmail = async (data: RegisterWithEmailParams) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("lastname", data.lastname);
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (data.photo) {
      formData.append("photo", data.photo);
    }

    const response = await axios.post(`${baseUrl}/user/registro`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    return response.data;
  };

  // Registro con Google
  const registerWithGoogle = async (data: RegisterWithGoogleParams) => {
    const response = await axios.post(`${baseUrl}/user/registro`, data);
    return response.data;
  };

  return { registerWithEmail, registerWithGoogle };
};
