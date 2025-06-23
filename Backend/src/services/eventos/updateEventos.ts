import { PrismaClient } from '../../generated/prisma';
import { Eventos } from '../../model/eventos/eventos';
import { uploadToCloudinary, deletePhotoFromCloudinary } from '../cloudinary/cloudinaryService';

const prisma = new PrismaClient();

export async function updateEvento(id: number, data: Partial<Eventos>, buffer?: Buffer): Promise<Eventos> {
  const existing = await prisma.eventos.findUnique({
    where: { id_evento: BigInt(id) }
  });

  if (!existing) {
    throw new Error('Evento no encontrado');
  }

  let nuevaImagenUrl = existing.imagen;

  // Si hay una nueva imagen
  if (buffer) {
    // Eliminar imagen anterior de Cloudinary
    if (existing.imagen) {
      await deletePhotoFromCloudinary(existing.imagen);
    }

    // Subir nueva imagen
    const uploadResult = await uploadToCloudinary(buffer, data.titulo ?? existing.titulo);
    nuevaImagenUrl = uploadResult.url;
  }

  // Actualizar evento
  const updated = await prisma.eventos.update({
    where: { id_evento: BigInt(id) },
    data: {
      titulo: data.titulo,
      descripcion: data.descripcion,
      ubicacion: data.ubicacion,
      fecha_inicio: data.fecha_inicio,
      fecha_fin: data.fecha_fin,
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
