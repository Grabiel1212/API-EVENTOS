import Fuse from 'fuse.js';
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
  const eventos = await prisma.eventos.findMany();

    const fuse = new Fuse(eventos, {
    keys: ['titulo'],
    threshold: 0.4,
  });

    const resultado = fuse.search(nombre);

   return resultado.map(({ item }) => ({
    id: Number(item.id_evento),
    titulo: item.titulo,
    descripcion: item.descripcion ?? '',
    ubicacion: item.ubicacion ?? '',
    fecha_inicio: item.fecha_inicio,
    fecha_fin: item.fecha_fin,
    precio: Number(item.precio) || 0,
    imagen: item.imagen ?? '',
    id_categoria: Number(item.id_categoria),
    creado_evento: item.creado_evento ?? new Date(),
    actualizado_evento: item.actualizado_evento ?? new Date()
  }));
}
