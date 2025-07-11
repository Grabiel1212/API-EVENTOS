import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ✅ Tipo manual con relaciones incluidas
type EntradaConEventoYPago = {
  id_registro: bigint;
  cantidad: number;
  fecha_registro: Date | null;
  eventos: {
    id_evento: bigint;
    titulo: string;
    fecha_inicio: Date;
    fecha_fin: Date;
    precio: bigint | null;
    descripcion: string | null;
    imagen: string | null;
  };
  pagos: {
    monto: bigint | null;
    metodo_pago: string | null;
    estado_pago: string | null;
    fecha_pago: Date | null;
  } | null;
};

/**
 * Lista las entradas compradas por un usuario.
 */
export async function listarEntradasUsuario(id_usuario: number): Promise<any[]> {
  const entradas = await prisma.registros.findMany({
    where: { id_usuario },
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
      },
      pagos: {
        select: {
          monto: true,
          metodo_pago: true,
          estado_pago: true,
          fecha_pago: true
        }
      }
    }
  });

  return entradas
    .filter((entrada:any): entrada is EntradaConEventoYPago => entrada != null && entrada.eventos != null)
    .map((entrada:any) => ({
      id_registro: Number(entrada.id_registro),
      id_evento: Number(entrada.eventos.id_evento),
      nombre_evento: entrada.eventos.titulo ?? '',
      fecha_inicio: entrada.eventos.fecha_inicio ?? new Date(),
      fecha_fin: entrada.eventos.fecha_fin ?? new Date(),
      precio: entrada.eventos.precio ? Number(entrada.eventos.precio) : 0,
      descripcion_evento: entrada.eventos.descripcion ?? '',
      imagen_evento: entrada.eventos.imagen ?? null,
      cantidad: entrada.cantidad ?? 1,
      fecha_registro: entrada.fecha_registro ?? new Date(),

      monto_total: entrada.pagos?.monto ? Number(entrada.pagos.monto) : 0,
      metodo_pago: entrada.pagos?.metodo_pago ?? '',
      estado_pago: entrada.pagos?.estado_pago ?? '',
      fecha_pago: entrada.pagos?.fecha_pago ?? null
    }));
}
