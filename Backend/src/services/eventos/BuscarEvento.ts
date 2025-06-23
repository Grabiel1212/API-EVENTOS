import { PrismaClient } from '../../generated/prisma';
import { Eventos } from '../../model/eventos/eventos';

const prisma = new PrismaClient();

/**
 * Busca eventos por nombre con coincidencia parcial e insensible a mayúsculas/minúsculas.
 * 
 * @param nombre - Parte del nombre del evento a buscar.
 * @returns Lista de eventos que coinciden con el nombre.
 */
export async function buscarEventosPorNombre(nombre: string): Promise<Eventos[]> {
  const eventos = await prisma.eventos.findMany({
    where: {
      titulo: {
        contains: nombre,
        mode: 'insensitive'
      }
    },
    orderBy: {
      creado_evento: 'desc'
    }
  });

  return eventos.map(evento => ({
    id: Number(evento.id_evento),
    titulo: evento.titulo,
    descripcion: evento.descripcion ?? '',
    ubicacion: evento.ubicacion ?? '',
    fecha_inicio: evento.fecha_inicio,
    fecha_fin: evento.fecha_fin,
    precio: Number(evento.precio) || 0,
    imagen: evento.imagen ?? '',
    id_categoria: Number(evento.id_categoria),
    creado_evento: evento.creado_evento ?? new Date(),
    actualizado_evento: evento.actualizado_evento ?? new Date()
  }));
}
