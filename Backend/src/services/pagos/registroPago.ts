import { Prisma, PrismaClient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { PagoConRegistroInput } from './dto';

const prisma = new PrismaClient();

export async function registrarPago(data: PagoConRegistroInput) {
  try {
    return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const evento = await tx.eventos.findUnique({
        where: { id_evento: data.registro.id_evento },
      });

      if (!evento || evento.precio === null) {
        throw new Error('Evento no encontrado o sin precio definido');
      }

      const precio = new Decimal(evento.precio);
      const cantidad = data.registro.cantidad ?? 1;
      const montoCalculado = precio.mul(cantidad);

      const nuevoPago = await tx.pagos.create({
        data: {
          id_usuario: data.pago.id_usuario,
          monto: montoCalculado.toNumber(),
          metodo_pago: data.pago.metodo_pago ?? 'Visa',
          estado_pago: data.pago.estado_pago ?? 'PAGADO',
        },
      });

      const nuevoRegistro = await tx.registros.create({
        data: {
          id_usuario: data.pago.id_usuario,
          id_evento: data.registro.id_evento,
          id_pago: nuevoPago.id_pago,
          cantidad,
        },
      });

      // ✅ Convertir BigInt a number antes de devolver
      return {
        pago: {
          ...nuevoPago,
          id_pago: Number(nuevoPago.id_pago),
          id_usuario: Number(nuevoPago.id_usuario),
        },
        registro: {
          ...nuevoRegistro,
          id_registro: Number(nuevoRegistro.id_registro),
          id_pago: Number(nuevoRegistro.id_pago),
          id_usuario: Number(nuevoRegistro.id_usuario),
          id_evento: Number(nuevoRegistro.id_evento),
        },
        total: montoCalculado.toNumber(),
      };
    });
  } catch (error: any) {
    console.error('❌ Error en registrarPago:', error.message, error.stack);
    throw error;
  }
}
