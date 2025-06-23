import { Eventos } from "../../model/eventos/eventos";
import { EventosInterface } from "../../model/eventos/eventosInterface";
import { createEventos } from "./createEventos";
import { deleteEventos } from "./deleteEventos";
import { ListarEventosID } from "./ListarEventosID";
import { listarEventos } from "./ListarEventos";
import { updateEvento } from "./updateEventos";

import {
  listarEventosOrdenados,
  listarEventosAleatorios,
  listarEventosPorCategoria,
  listarEventosPorUbicacion,
  listarEventosPorRangoFechas
} from "./ListarEventosAva"; // Ajusta el nombre si lo tienes diferente
import { buscarEventosPorNombre } from "./BuscarEvento";

class EventosService implements EventosInterface {
  // 1. Obtener todos los eventos
  async getEventos(): Promise<Eventos[]> {
    return listarEventos();
  }

  // 2. Obtener evento por ID
  async getEventoById(id: string): Promise<Eventos | null> {
    return ListarEventosID(Number(id));
  }

  // 3. Crear evento
  async createEvento(evento: Eventos, buffer?: Buffer, isAdminRequest?: boolean): Promise<Eventos> {
    return createEventos(evento, buffer, isAdminRequest);
  }

  // 4. Actualizar evento
  async updateEvento(id: string, data: Partial<Eventos>, buffer?: Buffer): Promise<Eventos> {
    return updateEvento(Number(id), data, buffer);
  }

  // 5. Eliminar evento (lógico)
  async deleteEvento(id: string): Promise<boolean> {
    await deleteEventos(Number(id));
    return true;
  }

  // 6. Listar eventos ordenados por fecha de creación (asc o desc)
  async listOrdered(order: 'asc' | 'desc' = 'asc'): Promise<Eventos[]> {
    return listarEventosOrdenados(order);
  }

  // 7. Listar eventos aleatorios
  async listRandom(): Promise<Eventos[]> {
    return listarEventosAleatorios();
  }

  // 8. Listar por categoría
  async listByCategory(id_categoria: number): Promise<Eventos[]> {
    return listarEventosPorCategoria(id_categoria);
  }

  // 9. Listar por ubicación (distrito)
  async listByLocation(distrito: string): Promise<Eventos[]> {
    return listarEventosPorUbicacion(distrito);
  }

  // 10. Listar por rango de fechas (ya usando Date)
  async listByDateRange(desde: Date, hasta: Date): Promise<Eventos[]> {
    return listarEventosPorRangoFechas(desde, hasta);
  }
  // 11. Buscar eventos por nombre
  async searchByName(nombre: string): Promise<Eventos[]> {
    return buscarEventosPorNombre(nombre);
  }
}

export default new EventosService();
