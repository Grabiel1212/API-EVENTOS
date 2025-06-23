import { PrismaClient } from '../../generated/prisma';
import { Eventos } from '../../model/eventos/eventos';

const prisma = new PrismaClient();

// 1. Ordenar eventos por fecha de creación asc/desc
export async function listarEventosOrdenados(order: 'asc' | 'desc' = 'asc'): Promise<Eventos[]> {
  const eventos = await prisma.eventos.findMany({
    orderBy: { creado_evento: order }
  });

  return eventos.map(evento => mapEvento(evento));
}

// 2. Eventos aleatorios
export async function listarEventosAleatorios(): Promise<Eventos[]> {
  const eventos = await prisma.eventos.findMany();
  eventos.sort(() => Math.random() - 0.5);
  return eventos.map(evento => mapEvento(evento));
}

// 3. Listar por categoría
export async function listarEventosPorCategoria(id_categoria: number): Promise<Eventos[]> {
  const eventos = await prisma.eventos.findMany({
    where: { id_categoria: BigInt(id_categoria) }
  });
  return eventos.map(evento => mapEvento(evento));
}

// 4. Listar por ubicación
export async function listarEventosPorUbicacion(distrito: string): Promise<Eventos[]> {
  const eventos = await prisma.eventos.findMany({
    where: { ubicacion: { contains: distrito, mode: 'insensitive' } }
  });
  return eventos.map(evento => mapEvento(evento));
}

// 5. Listar por rango de fechas
export async function listarEventosPorRangoFechas(desde: Date, hasta: Date): Promise<Eventos[]> {
  const eventos = await prisma.eventos.findMany({
    where: {
      fecha_inicio: { gte: desde },
      fecha_fin: { lte: hasta }
    },
    orderBy: {
      fecha_inicio: 'asc'
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

function mapEvento(evento: any): Eventos {
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
    actualizado_evento: evento.actualizado_evento ?? new Date()
  };
}