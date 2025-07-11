import { PrismaClient } from '@prisma/client';
import { deletePhotoFromCloudinary, extractPublicIdEventos } from '../cloudinary/cloudinaryService';

const prisma = new PrismaClient();

/**
 * Elimina un evento y su imagen asociada de Cloudinary (si existe).
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

  // Eliminar imagen de Cloudinary si existe
  if (existingEvento.imagen) {
    const publicId = extractPublicIdEventos(existingEvento.imagen);
    if (publicId) {
      await deletePhotoFromCloudinary(publicId);
    }
  }

  // Eliminar evento de la base de datos
  await prisma.eventos.delete({
    where: { id_evento: BigInt(id) }
  });
}
