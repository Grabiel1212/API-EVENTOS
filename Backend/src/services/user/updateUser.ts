import { PrismaClient } from '../../generated/prisma';
import { Users } from '../../model/users';
import {
  deletePhotoFromCloudinary,
  extractPublicId,
  uploadToCloudinary
} from '../cloudinary/cloudinaryService';

const prisma = new PrismaClient();

/**
 * Procesa una nueva imagen y elimina la anterior si es necesario.
 */
async function processPhoto(
  buffer?: Buffer,
  name?: string | null,
  previousUrl?: string | null
): Promise<string | null> {
  if (!buffer || !name) return previousUrl ?? null;

  if (previousUrl) {
    const publicId = extractPublicId(previousUrl);
    if (publicId) {
      console.log('Eliminando imagen anterior de Cloudinary:', publicId);
      await deletePhotoFromCloudinary(publicId);
    }
  }

  const filename = `${Date.now()}-${name}`;
  const { url } = await uploadToCloudinary(buffer, filename);
  return url;
}

/**
 * Actualiza SOLO nombre, apellido, correo y foto.
 */
export async function updateUser(
  id: number,
  data: Partial<Users>,
  buffer?: Buffer
): Promise<Users> {
  const existingUser = await prisma.usuarios.findUnique({
    where: { id_usuario: BigInt(id) },
  });

  // Validación de existencia y estado activo
  if (!existingUser) throw new Error('Usuario no encontrado');
  if (!existingUser.activo) {
    throw new Error('No se pueden actualizar los datos de un usuario inactivo');
  }

  // Verificación de campos no permitidos
  if ('password' in data || 'active' in data || 'rol' in data || 'googleID' in data) {
    throw new Error('Solo se permite actualizar nombre, apellido, correo y foto');
  }

  // Validar actualización de correo (solo ADMIN y que no exista)
  if (data.email && data.email !== existingUser.correo) {
    if (existingUser.rol !== 'ADMIN') {
      throw new Error('Solo los administradores pueden actualizar el correo');
    }

    const emailInUse = await prisma.usuarios.findUnique({
      where: { correo: data.email },
    });

    if (emailInUse && emailInUse.id_usuario !== existingUser.id_usuario) {
      throw new Error('Este correo ya está en uso. Por favor, usa otro diferente.');
    }
  }

  const newPhoto = await processPhoto(
    buffer,
    data.name ?? existingUser.nombre ?? undefined,
    existingUser.foto_perfil ?? undefined
  );

  const updatedUser = await prisma.usuarios.update({
    where: { id_usuario: BigInt(id) },
    data: {
      nombre: data.name ?? undefined,
      apellidos: data.lastname ?? undefined,
      correo: data.email ?? undefined,
      foto_perfil: newPhoto ?? undefined,
    },
  });

  return {
    id: Number(updatedUser.id_usuario),
    name: updatedUser.nombre ?? '',
    lastname: updatedUser.apellidos ?? '',
    email: updatedUser.correo,
    photo: updatedUser.foto_perfil,
    password: updatedUser.contrasena,
    googleID: updatedUser.google_id,
    active: updatedUser.activo ?? true,
    rol: (updatedUser.rol as 'ADMIN' | 'USUARIO') ?? 'USUARIO',
    dateCreate: updatedUser.creado_en ?? new Date(),
  };
}

