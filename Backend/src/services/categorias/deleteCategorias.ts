

import { PrismaClient } from '../../generated/prisma';
import { ApiError } from '../../helpers/ApiError';
import { STATUS_NOT_FOUND, STATUS_INTERNAL_SERVER_ERROR } from '../../helpers/status';

const prisma = new PrismaClient();

/**
 * Elimina una categoría de la base de datos.
 *
 * @param {number} id - ID de la categoría a eliminar.
 * @throws {ApiError} Si la categoría no existe o falla la operación.
 * @returns {Promise<void>}
 */
export async function deleteCategorias(id: number): Promise<void> {
  try {
    const existingCategoria = await prisma.categorias.findUnique({
      where: { id_categoria: BigInt(id) }
    });

    if (!existingCategoria) {
      throw new ApiError(
        STATUS_NOT_FOUND,
        'Categoría no encontrada',
        'CATEGORIA_NO_EXISTE'
      );
    }

    await prisma.categorias.delete({
      where: { id_categoria: BigInt(id) }
    });

  } catch (error) {
    throw new ApiError(
      STATUS_INTERNAL_SERVER_ERROR,
      'Error al eliminar la categoría: ' + (error as Error).message,
      'CATEGORIA_DELETE_FAILED'
    );
  }
}