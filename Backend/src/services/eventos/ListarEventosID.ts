import { PrismaClient } from '../../generated/prisma'; // ✅ Asegúrate de importar esto
import { Eventos } from '../../model/eventos/eventos';

const prisma = new PrismaClient();

/**
 * Busca un Evento por su ID en la base de datos.
 * 
 * @param {number} id - ID del Evento a buscar.
 * @returns {Promise<Users | null>} Retorna un objeto `Users` con toda la información del usuario si se encuentra.
 * @throws {Error} Si el Evento no existe.
 */

export async function ListarEventosID(id:number): Promise <Eventos | null> {
  
  const evento = await prisma.eventos.findUnique({
    where: { id_evento: BigInt(id) }
  });

  if (!evento) {
    throw new Error('Evento no encontrado');
  }

  return {
    id: Number(evento.id_evento),
    titulo: evento.titulo,
    descripcion: evento.descripcion ?? undefined,
    ubicacion: evento.ubicacion ?? undefined,
    fecha_inicio: evento.fecha_inicio,
    fecha_fin: evento.fecha_fin,
    precio: evento.precio ? Number(evento.precio) : undefined,
    imagen: evento.imagen ?? undefined,
    creado_evento: evento.creado_evento ?? new Date(),
    actualizado_evento: evento.actualizado_evento ?? new Date(),
    id_categoria: Number(evento.id_categoria)
  };
}