import { Users } from '../../model/users';
import { PrismaClient } from '../../generated/prisma';
const prisma = new PrismaClient();


 /**
 * Lista todos los usuarios con estado activo (activo = true).
 * @returns Lista de usuarios activos.
 */

export async function listActiveUsers(): Promise<Users[]> {
  const users = await prisma.usuarios.findMany({
    where: { activo: true }
  });
  return users.map(user => ({
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
  }));
}


/**
 * Lista todos los usuarios con estado inactivo (activo = false).
 * @returns Lista de usuarios inactivos.
 */
export async function listInactiveUsers(): Promise<Users[]> {
  const users = await prisma.usuarios.findMany({
    where: { activo: false }
  });

  return users.map(user => ({
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
  }));
}


/**
 * Lista los usuarios según su rol ('ADMIN' o 'USUARIO').
 * @param role Rol del usuario (ADMIN o USUARIO).
 * @returns Lista de usuarios con el rol indicado.
 */
export async function listUsersByRole(role: 'ADMIN' | 'USUARIO'): Promise<Users[]> {
  const users = await prisma.usuarios.findMany({
    where: { rol: role }
  });

  return users.map(user => ({
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
  }));
}
