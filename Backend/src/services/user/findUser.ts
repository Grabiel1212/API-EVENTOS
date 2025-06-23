import { Users } from '../../model/usuarios/users';
import { PrismaClient } from '../../generated/prisma'; // ✅ Asegúrate de importar esto

const prisma = new PrismaClient();

/**
 * Busca un usuario por su ID en la base de datos.
 * 
 * @param {number} id - ID del usuario a buscar.
 * @returns {Promise<Users | null>} Retorna un objeto `Users` con toda la información del usuario si se encuentra.
 * @throws {Error} Si el usuario no existe.
 */
export async function findUserById(id: number): Promise<Users | null> {
  
  const user = await prisma.usuarios.findUnique({
    where: { id_usuario: BigInt(id) }
  });

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  return {
    id: Number(user.id_usuario),
    name: user.nombre ?? '',
    lastname: user.apellidos ?? '',
    email: user.correo,
    photo: user.foto_perfil ?? null,
    password: user.contrasena ?? null,
    googleID: user.google_id ?? null,
    active: user.activo ?? false,
    rol: user.rol as 'ADMIN' | 'USUARIO',
    dateCreate: user.creado_en ?? new Date()
  };
}
