import axios from "axios";
import { useApiBaseUrl } from "../../shared/useApiBaseUrl";

// Definimos un tipo para la respuesta
type EmailCheckResult = {
  canRegister: boolean;
  message: string;
};

export const useCheckEmail = () => {
  const baseUrl = useApiBaseUrl();

  const checkEmailExists = async (email: string): Promise<EmailCheckResult> => {
    try {
      const response = await axios.post(`${baseUrl}/user/buscarEmail`, { email });
      
      // Verificamos si la respuesta tiene la estructura esperada
      if (!response.data || typeof response.data.success !== 'boolean') {
        throw new Error("Respuesta del servidor inválida");
      }

      // Email ya registrado
      if (response.data.success && response.data.data === true) {
        return {
          canRegister: false,
          message: "Este correo ya se encuentra registrado. Por favor, inicia sesión.",
        };
      }

      // Email disponible
      return {
        canRegister: true,
        message: "Correo disponible para registro.",
      };
      
    } catch (error: any) {
      // Manejo específico de errores de Axios
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error;
        
        // Caso: Cuenta asociada a Google
        if (errorMessage === "Esta cuenta está asociada a Google") {
          return {
            canRegister: false,
            message: "Este correo está registrado con Google. Por favor, inicia sesión con Google.",
          };
        } 
        // Caso: Correo no registrado
        else if (errorMessage === "Este correo no está registrado") {
          return {
            canRegister: true,
            message: "Correo disponible para registro.",
          };
        }
        // Caso: Respuesta de error sin mensaje específico
        else if (error.response) {
          return {
            canRegister: false,
            message: error.response.data?.message || "Error al verificar el correo",
          };
        }
      }
      
      // Manejo de errores genéricos
      return {
        canRegister: false,
        message: error.message || "Error inesperado al verificar el correo",
      };
    }
  };

  return { checkEmailExists };
};