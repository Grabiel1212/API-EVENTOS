import { PrismaClient } from '@prisma/client';
import { Users } from '../../model/usuarios/users';

const prisma = new PrismaClient();

// ✅ Tipo inferido desde Prisma
type UsuarioPrisma = Awaited<ReturnType<typeof prisma.usuarios.findFirst>>;

/**
 * Lista todos los usuarios con estado activo.
 */
export async function listActiveUsers(): Promise<Users[]> {
  const users = await prisma.usuarios.findMany({
    where: { activo: true }
  });

  return users.map((user:any) => mapUser(user as NonNullable<UsuarioPrisma>));
}

/**
 * Lista todos los usuarios con estado inactivo.
 */
export async function listInactiveUsers(): Promise<Users[]> {
  const users = await prisma.usuarios.findMany({
    where: { activo: false }
  });

  return users.map((user:any) => mapUser(user as NonNullable<UsuarioPrisma>));
}

/**
 * Lista usuarios por rol.
 */
export async function listUsersByRole(role: 'ADMIN' | 'USUARIO'): Promise<Users[]> {
  const users = await prisma.usuarios.findMany({
    where: { rol: role, activo: true }
  });

  return users.map((user:any) => mapUser(user as NonNullable<UsuarioPrisma>));
}

/**
 * Función reutilizable para mapear usuario de Prisma a DTO.
 */
function mapUser(user: NonNullable<UsuarioPrisma>): Users {
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
