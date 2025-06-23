import { Eventos} from './eventos';


export interface EventosInterface {
  getEventos(): Promise<Eventos[]>; // Obtiene todos los eventos
  getEventoById(id: string): Promise<Eventos | null>;  // Obtiene un evento por su ID
  createEvento(evento: Eventos): Promise<Eventos>;  // Crea un nuevo evento
  updateEvento(id: string, evento: Eventos): Promise<Eventos | null>;  // Actualiza un evento existente
  deleteEvento(id: string): Promise<boolean>; // Elimina un evento por su ID
}