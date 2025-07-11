
import { PrismaClient } from '@prisma/client';
import { Categorias } from '../../model/categorias/categorias';

import { ApiError } from '../../helpers/ApiError';
import {
  STATUS_BAD_REQUEST,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND
} from '../../helpers/status';

const prisma = new PrismaClient();

/**
 * Actualiza una categoría existente por su ID.
 * 
 * @param id - ID de la categoría a actualizar.
 * @param data - Datos parciales (nombre y/o descripción).
 * @returns La categoría actualizada.
 */
export async function updateCategorias(
  id: number,
  data: Partial<Categorias>,
  adminrequired: boolean = false,
): Promise<Categorias> {
  try {
    if (!adminrequired) {
      throw new ApiError(   
        STATUS_BAD_REQUEST,
        'Acceso denegado: se requiere rol de administrador',
        'NO_AUTORIZADO'
      );}      

    const categoriaExistente = await prisma.categorias.findUnique({
      where: { id_categoria: BigInt(id) }
    });

    if (!categoriaExistente) {
      throw new ApiError(
        STATUS_NOT_FOUND,
        'Categoría no encontrada',
        'CATEGORIA_NO_EXISTE'
      );
    }

    // Validar que al menos se envíe uno de los campos permitidos
    if (!data.nombre && !data.descripcion) {
      throw new ApiError(
        STATUS_BAD_REQUEST,
        'Se requiere al menos nombre o descripción para actualizar',
        'DATOS_INSUFICIENTES'
      );
    }

    // Ejecutar la actualización
    const categoriaActualizada = await prisma.categorias.update({
      where: { id_categoria: BigInt(id) },
      data: {
        nombre: data.nombre,
        descripcion: data.descripcion
      }
    });

    return {
      id_categoria: Number(categoriaActualizada.id_categoria),
      nombre: categoriaActualizada.nombre,
      descripcion: categoriaActualizada.descripcion ?? '',
      creado_categoria: categoriaActualizada.creado_categoria ?? new Date()
    };
  } catch (error) {
    if (error instanceof ApiError) throw error;

    throw new ApiError(
      STATUS_INTERNAL_SERVER_ERROR,
      'Error al actualizar la categoría: ' + (error as Error).message,
      'CATEGORIA_UPDATE_FAILED'
    );
  }
}
