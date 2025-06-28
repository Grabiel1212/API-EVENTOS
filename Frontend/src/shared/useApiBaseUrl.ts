export function useApiBaseUrl(): string {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  if (!baseUrl) {
    throw new Error("VITE_API_BASE_URL no esta definida en el entorno o el archivo .env");
  }

  return baseUrl;
}
 