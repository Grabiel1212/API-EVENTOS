import { PrismaClient } from '../../generated/prisma';
import { Eventos } from '../../model/eventos/eventos';
import { deletePhotoFromCloudinary, extractPublicIdEventos, uploadToCloudinaryEventos } from '../cloudinary/cloudinaryService';

const prisma = new PrismaClient();

/**
 * Actualiza un evento si el usuario tiene permisos de administrador.
 *
 * @param id - ID del evento
 * @param data - Datos parciales del evento
 * @param buffer - Imagen opcional
 * @param isAdminRequest - Si la solicitud es de un admin (por defecto: false)
 */
export async function updateEvento(
  id: number,
  data: Partial<Eventos>,
  buffer?: Buffer,
  isAdminRequest: boolean = false
): Promise<Eventos> {
  // Validar permisos
  if (!isAdminRequest) {
    throw new Error('No tienes permisos para actualizar eventos');
  }

  const existing = await prisma.eventos.findUnique({
    where: { id_evento: BigInt(id) }
  });

  if (!existing) {
    throw new Error('Evento no encontrado');
  }

  let nuevaImagenUrl = existing.imagen;

  if (buffer) {
    // Eliminar imagen anterior
    if (existing.imagen) {
      const publicId = extractPublicIdEventos(existing.imagen);
      if (publicId) {
        await deletePhotoFromCloudinary(publicId);
      }
    }

    // Subir nueva imagen
    const uploadResult = await uploadToCloudinaryEventos(buffer, data.titulo ?? existing.titulo);
    nuevaImagenUrl = uploadResult.url;
  }

  // Actualizar evento
  const updated = await prisma.eventos.update({
    where: { id_evento: BigInt(id) },
    data: {
      titulo: data.titulo,
      descripcion: data.descripcion,
      ubicacion: data.ubicacion,
      fecha_inicio: new Date(data.fecha_inicio ?? existing.fecha_inicio),
      fecha_fin: new Date(data.fecha_fin ?? existing.fecha_fin),
      precio: data.precio,
      imagen: nuevaImagenUrl,
      id_categoria: BigInt(data.id_categoria ?? existing.id_categoria),
      actualizado_evento: new Date()
    }
  });

  return {
    id: Number(updated.id_evento),
    titulo: updated.titulo,
    descripcion: updated.descripcion ?? '',
    ubicacion: updated.ubicacion ?? '',
    fecha_inicio: updated.fecha_inicio,
    fecha_fin: updated.fecha_fin,
    precio: Number(updated.precio) ?? 0,
    imagen: updated.imagen ?? null,
    id_categoria: Number(updated.id_categoria),
    creado_evento: updated.creado_evento ?? new Date(),
    actualizado_evento: updated.actualizado_evento ?? new Date()
  };
}
