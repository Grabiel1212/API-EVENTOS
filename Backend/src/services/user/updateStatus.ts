import { PrismaClient } from '@prisma/client';
import { ApiError } from '../../helpers/ApiError';
import { STATUS_NOT_FOUND } from '../../helpers/status';

const prisma = new PrismaClient();

/**
 * Actualiza el estado (activo/inactivo) de un usuario.
 * 
 * - Si el usuario no existe, lanza un error.
 *
 * @param {number} id - ID del usuario cuyo estado se desea actualizar.
 * @param {boolean} status - Nuevo estado del usuario (`true` para activo, `false` para inactivo).
 * @returns {Promise<void>} No retorna ningún dato. Solo actualiza el campo `activo` del usuario.
 * @throws {ApiError} Si el usuario no existe.
 */
export async function updateUserStatus(id: number, status: boolean): Promise<void> {
  const user = await prisma.usuarios.findUnique({
    where: { id_usuario: BigInt(id) }
  });

  if (!user) {
    throw new ApiError(STATUS_NOT_FOUND, 'Usuario no encontrado', 'USER_NOT_FOUND');
  }

  await prisma.usuarios.update({
    where: { id_usuario: BigInt(id) },
    data: { activo: status }
  });
}
