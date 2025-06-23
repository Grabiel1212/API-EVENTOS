import { ApiError } from "../../helpers/ApiError";
import { STATUS_BAD_REQUEST, STATUS_FORBIDDEN, STATUS_INTERNAL_SERVER_ERROR } from "../../helpers/status";
import { Eventos } from "../../model/eventos/eventos";
import { PrismaClient } from '../../generated/prisma';
import { uploadToCloudinary } from "../cloudinary/cloudinaryService";

const prisma = new PrismaClient();

/**
 * Crea un nuevo evento en la base de datos.
 * 
 * @param eventosData - Datos del evento a crear.
 * @param buffer - Imagen como buffer, si se subió una.
 * @param isAdminRequest - Si es una solicitud de un administrador.
 * @returns El evento creado.
 */
export async function createEventos(
  eventosData: Eventos,
  buffer?: Buffer,
  isAdminRequest: boolean = false
): Promise<Eventos> {
  try {
    // 🔐 Verifica permisos si el evento fuera "ADMIN" (en caso se use rol en eventos)
    if ((eventosData as any).rol === 'ADMIN' && !isAdminRequest) {
      throw new ApiError(
        STATUS_FORBIDDEN,
        'Solo administradores pueden crear eventos ADMIN',
        'ADMIN_CREATION_FORBIDDEN'
      );
    }

    // 🔍 Verifica duplicidad por título
    const exists = await prisma.eventos.findFirst({
      where: { titulo: eventosData.titulo }
    });

    if (exists) {
      throw new ApiError(
        STATUS_BAD_REQUEST,
        'El evento ya existe',
        'EVENTO_DUPLICADO'
      );
    }

    // ☁️ Subir imagen a Cloudinary si se recibió buffer
    if (buffer) {
      const uploadResult = await uploadToCloudinary(buffer, eventosData.titulo);
      eventosData.imagen = uploadResult.url;
    }

    // 🕒 Asignar fechas automáticas
    const now = new Date();

    // 📦 Crear el evento
    const eventoCreado = await prisma.eventos.create({
      data: {
        titulo: eventosData.titulo,
        descripcion: eventosData.descripcion,
        ubicacion: eventosData.ubicacion,
        fecha_inicio: eventosData.fecha_inicio,
        fecha_fin: eventosData.fecha_fin,
        precio: eventosData.precio ?? 0,
        imagen: eventosData.imagen,
        id_categoria: BigInt(eventosData.id_categoria),
        creado_evento: now,
        actualizado_evento: now
      }
    });

    return mapPrismaEventoToModel(eventoCreado);

  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(
      STATUS_INTERNAL_SERVER_ERROR,
      'Error al crear el evento: ' + (error as Error).message,
      'EVENT_CREATION_FAILED'
    );
  }
}

/**
 * Mapea el evento de Prisma a la interfaz del modelo.
 */
function mapPrismaEventoToModel(prismaEvento: any): Eventos {
  return {
    id: Number(prismaEvento.id_evento),
    titulo: prismaEvento.titulo ?? '',
    descripcion: prismaEvento.descripcion ?? '',
    ubicacion: prismaEvento.ubicacion ?? '',
    fecha_inicio: prismaEvento.fecha_inicio,
    fecha_fin: prismaEvento.fecha_fin,
    precio: prismaEvento.precio ? Number(prismaEvento.precio) : 0,
    imagen: prismaEvento.imagen ?? '',
    id_categoria: Number(prismaEvento.id_categoria),
    creado_evento: prismaEvento.creado_evento ?? new Date(),
    actualizado_evento: prismaEvento.actualizado_evento ?? new Date()
  };
}
