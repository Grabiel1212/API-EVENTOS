import { PrismaClient } from '../../generated/prisma';
import { ApiError } from '../../helpers/ApiError';
import {
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND
} from '../../helpers/status';

const prisma = new PrismaClient();

/**
 * Realiza la eliminación lógica de un usuario.
 * 
 * En lugar de borrar el registro de la base de datos, se actualiza el campo `activo` a `false`.
 *
 * @param {number} id - ID del usuario a desactivar.
 * @throws {ApiError} Si el usuario no existe o ya está inactivo.
 * @returns {Promise<void>} No retorna ningún dato. Solo realiza la actualización.
 */
export async function deleteUser(id: number): Promise<void> {
  const existingUser = await prisma.usuarios.findUnique({
    where: { id_usuario: BigInt(id) }
  });

  if (!existingUser) {
    throw new ApiError(STATUS_NOT_FOUND, 'Usuario no encontrado', 'USER_NOT_FOUND');
  }

  if (!existingUser.activo) {
    throw new ApiError(STATUS_BAD_REQUEST, 'El usuario ya está inactivo', 'USER_ALREADY_INACTIVE');
  }

  await prisma.usuarios.update({
    where: { id_usuario: BigInt(id) },
    data: { activo: false }
  });
}
