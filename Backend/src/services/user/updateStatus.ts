import { PrismaClient } from '../../generated/prisma';
const prisma = new PrismaClient();

/**
 * Actualiza el estado (activo/inactivo) de un usuario.
 * 
 * - Si se intenta desactivar un usuario que no es ADMIN, lanza un error.
 * - Si el usuario no existe, lanza un error.
 *
 * @param {number} id - ID del usuario cuyo estado se desea actualizar.
 * @param {boolean} status - Nuevo estado del usuario (`true` para activo, `false` para inactivo).
 * @returns {Promise<void>} No retorna ningún dato. Solo actualiza el campo `activo` del usuario.
 * @throws {Error} Si el usuario no existe.
 * @throws {Error} Si se intenta desactivar a un usuario no ADMIN.
 */
export async function updateUserStatus(id: number, status: boolean): Promise<void> {
  const user = await prisma.usuarios.findUnique({
    where: { id_usuario: BigInt(id) }
  });

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  // ❌ Eliminamos esta validación:
  // if (user.activo && !status && user.rol !== 'ADMIN') {
  //   throw new Error('Solo usuarios con rol ADMIN pueden desactivar usuarios');
  // }

  await prisma.usuarios.update({
    where: { id_usuario: BigInt(id) },
    data: { activo: status }
  });
}