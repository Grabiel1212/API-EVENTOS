// src/hooks/useBuscarEventosPorNombre.ts
import axios from "axios";
import { useState } from "react";
import { useApiBaseUrl } from "../../shared/useApiBaseUrl";

export interface Evento {
  id: number;
  titulo: string;
  descripcion: string;
  ubicacion: string;
  fecha_inicio: string;
  fecha_fin: string;
  precio: number;
  imagen: string;
  id_categoria: number;
  creado_evento: string;
  actualizado_evento: string;
}

export const useEventosFilterSearch = () => {
  const baseUrl = useApiBaseUrl();
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const buscarEventos = async (nombre: string) => {
    if (!nombre.trim()) {
      setEventos([]);
      return;
    }

    setCargando(true);
    setError(null);

    try {
      // USAR POST CON CUERPO JSON
      const response = await axios.post(
        `${baseUrl}/evento/buscar/nombre`,
        { nombre }, // <-- Enviar como objeto JSON
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setEventos(response.data.data);
      } else {
        setEventos([]);
        setError(response.data.message || "No se encontraron eventos.");
      }
    } catch (err: any) {
      console.error("Error buscando eventos:", err);
      
      let errorMessage = "Ocurrió un error al buscar eventos";
      
      if (err.response) {
        // Manejar errores específicos del backend
        if (err.response.status === 500) {
          errorMessage = "Error en el servidor: " + 
            (err.response.data?.error || "Fallo al procesar la búsqueda");
        } else {
          errorMessage = err.response.data?.message || err.response.statusText;
        }
      } else if (err.request) {
        errorMessage = "No se recibió respuesta del servidor";
      } else {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      setEventos([]);
    } finally {
      setCargando(false);
    }
  };

  return {
    eventos,
    cargando,
    error,
    buscarEventos,
  };
};