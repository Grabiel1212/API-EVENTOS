import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

/**
 * Elimina físicamente un evento de la base de datos.
 *
 * @param {number} id - ID del evento a eliminar.
 * @throws {Error} Si el evento no existe.
 * @returns {Promise<void>}
 */
export async function deleteEventos(id: number): Promise<void> {
  const existingEvento = await prisma.eventos.findUnique({
    where: { id_evento: BigInt(id) }
  });

  if (!existingEvento) {
    throw new Error('Evento no encontrado');
  }

  await prisma.eventos.delete({
    where: { id_evento: BigInt(id) }
  });
}
