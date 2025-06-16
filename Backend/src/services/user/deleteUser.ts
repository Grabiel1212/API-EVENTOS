import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

/**
 * Realiza la eliminación lógica de un usuario.
 * 
 * En lugar de borrar el registro de la base de datos, se actualiza el campo `activo` a `false`.
 *
 * @param {number} id - ID del usuario a desactivar.
 * @throws {Error} Si el usuario no existe.
 * @throws {Error} Si el usuario ya está inactivo.
 * @returns {Promise<void>} No retorna ningún dato. Solo realiza la actualización.
 */
export async function deleteUser(id: number): Promise<void> {
  const existingUser = await prisma.usuarios.findUnique({
    where: { id_usuario: BigInt(id) }
  });

  if (!existingUser) {
    throw new Error('Usuario no encontrado');
  }

  if (!existingUser.activo) {
    throw new Error('El usuario ya está inactivo');
  }

  await prisma.usuarios.update({
    where: { id_usuario: BigInt(id) },
    data: { activo: false }
  });
}
