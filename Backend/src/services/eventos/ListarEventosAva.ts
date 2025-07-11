import { PrismaClient } from '@prisma/client';
import { Eventos } from '../../model/eventos/eventos';

const prisma = new PrismaClient();

// ✅ Tipo seguro: sin null
type EventoPrisma = NonNullable<Awaited<ReturnType<typeof prisma.eventos.findFirst>>>;

/**
 * Listar eventos ordenados
 */
export async function listarEventosOrdenados(order: 'asc' | 'desc' = 'asc'): Promise<Eventos[]> {
  const eventos = await prisma.eventos.findMany({
    orderBy: { creado_evento: order }
  });
  return eventos.map(mapEvento);
}

/**
 * Eventos aleatorios
 */
export async function listarEventosAleatorios(): Promise<Eventos[]> {
  const eventos = await prisma.eventos.findMany();
  eventos.sort(() => Math.random() - 0.5);
  return eventos.map(mapEvento);
}

/**
 * Listar por categoría
 */
export async function listarEventosPorCategoria(id_categoria: number): Promise<Eventos[]> {
  const eventos = await prisma.eventos.findMany({
    where: { id_categoria: BigInt(id_categoria) }
  });
  return eventos.map(mapEvento);
}

/**
 * Listar por ubicación
 */
export async function listarEventosPorUbicacion(distrito: string): Promise<Eventos[]> {
  const eventos = await prisma.eventos.findMany({
    where: {
      ubicacion: {
        contains: distrito,
        mode: 'insensitive',
      }
    }
  });

  return eventos
    .filter((evento:any): evento is EventoPrisma => Boolean(evento?.ubicacion)) // 🧠 filtro seguro
    .filter((evento:any) => {
      const partes = evento.ubicacion.split(',').map((p:any) => p.trim());
      return partes.length >= 2 && partes[1].toLowerCase() === distrito.toLowerCase();
    })
    .map(mapEvento);
}

/**
 * Listar por rango de fechas
 */
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

  return eventos.map(mapEvento);
}

/**
 * Mapper: Prisma → DTO
 */
function mapEvento(evento: EventoPrisma): Eventos {
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
