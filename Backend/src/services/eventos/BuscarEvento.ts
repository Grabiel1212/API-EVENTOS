import { PrismaClient } from '@prisma/client';
import Fuse from 'fuse.js';
import { Eventos } from '../../model/eventos/eventos';

const prisma = new PrismaClient();

// ✅ Tipo seguro sin null
type EventoPrisma = NonNullable<Awaited<ReturnType<typeof prisma.eventos.findFirst>>>;

/**
 * Busca eventos por nombre con coincidencia parcial e insensible a mayúsculas/minúsculas.
 * 
 * @param nombre - Parte del nombre del evento a buscar.
 * @returns Lista de eventos que coinciden con el nombre.
 */
export async function buscarEventosPorNombre(nombre: string): Promise<Eventos[]> {
  const eventos = await prisma.eventos.findMany();

  const fuse = new Fuse<EventoPrisma>(eventos, {
    keys: ['titulo'],
    threshold: 0.4,
  });

  const resultado = fuse.search(nombre);

  return resultado.map(({ item }) => {
    const evento = item as EventoPrisma; // 👈 aseguramos que no es null

    return {
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
      actualizado_evento: evento.actualizado_evento ?? new Date(),
    };
  });
}
