import axios from "axios";
import { useApiBaseUrl } from "../../shared/useApiBaseUrl";

// Definimos un tipo para la respuesta
type EmailCheckResult = {
  canRecover: boolean; // Cambiado a canRecover para mejor semántica
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

      // Caso 1: Email encontrado y es usuario regular
      if (response.data.success && response.data.data === true) {
        return {
          canRecover: true,
          message: "Correo verificado. Puede continuar con la recuperación.",
        };
      }

      // Este caso no debería ocurrir normalmente, pero lo manejamos
      return {
        canRecover: false,
        message: "Estado del correo no reconocido",
      };
      
    } catch (error: any) {
      // Manejo específico de errores de Axios
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || error.response?.data?.message;
        
        // Caso 2: Cuenta asociada a Google
        if (errorMessage === "Esta cuenta está asociada a Google") {
          return {
            canRecover: false,
            message: "Este correo está registrado con Google. Por favor, inicia sesión con Google.",
          };
        } 
        // Caso 3: Usuario es administrador
        else if (errorMessage === "Solo los usuarios con rol USUARIO pueden recuperar su contraseña") {
          return {
            canRecover: false,
            message: "Solo los usuarios regulares pueden recuperar su contraseña.",
          };
        }
        // Caso 4: Correo no registrado
        else if (errorMessage === "Este correo no está registrado") {
          return {
            canRecover: false,
            message: "Este correo no está registrado en nuestro sistema.",
          };
        }
        // Caso 5: Otros errores de la API
        else if (error.response) {
          return {
            canRecover: false,
            message: errorMessage || "Error al verificar el correo",
          };
        }
      }
      
      // Manejo de errores genéricos
      return {
        canRecover: false,
        message: error.message || "Error inesperado al verificar el correo",
      };
    }
  };

  return { checkEmailExists };
};