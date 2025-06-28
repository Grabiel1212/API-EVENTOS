
import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();



export  async function listarEntradasUsuario(id_usuario: number): Promise<any[]> {
  const entradas = await prisma.registros.findMany({
    where: { id_usuario: id_usuario },
    include: {
      eventos: {
        select: {
          id_evento: true,
           titulo: true,
          fecha_inicio: true,
          fecha_fin: true,
          precio: true,
          descripcion: true,
          imagen: true
        }
      }
    }
  });

  return entradas.map(entrada => ({
    id_registro: Number(entrada.id_registro),
    id_evento: Number(entrada.eventos.id_evento),
    nombre_evento: entrada.eventos.titulo ?? '',
    fecha_inicio: entrada.eventos.fecha_inicio ?? new Date(),
    fecha_fin: entrada.eventos.fecha_fin ?? new Date(),
    precio: entrada.eventos.precio ?? 0,
    descripcion_evento: entrada.eventos.descripcion ?? '',
    imagen_evento: entrada.eventos.imagen ?? null,
    cantidad: entrada.cantidad ?? 1,
    fecha_registro: entrada.fecha_registro ?? new Date()
  }));
}