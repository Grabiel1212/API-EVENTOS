import { PrismaClient } from '../../generated/prisma';
import { Eventos } from '../../model/eventos/eventos';

const prisma = new PrismaClient();

/**
 * Lista todos los eventos almacenados en la base de datos.
 * 
 * @returns {Promise<Eventos[]>} Arreglo con todos los eventos encontrados.
 */
export async function listarEventos(): Promise<Eventos[]> {
  const eventos = await prisma.eventos.findMany();

  return eventos.map(evento => ({
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
  }));
}
