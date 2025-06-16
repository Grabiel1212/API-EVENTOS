import { Users } from '../../model/users';
import { PrismaClient } from '../../generated/prisma';
import cloudinary from '../../config/cloudinary';
const prisma = new PrismaClient();

/**
 * Actualiza la información de un usuario.
 * 
 * ### Reglas de negocio:
 * - El usuario debe existir y estar activo.
 * - Los usuarios autenticados con Google **no pueden** cambiar su correo ni su Google ID.
 * - Solo los usuarios con rol `ADMIN` pueden modificar el correo electrónico.
 * - Solo los `ADMIN` pueden asignar un Google ID si el usuario no lo tenía previamente.
 * - Si se proporciona una imagen (`buffer`), se sube a Cloudinary y se actualiza la URL.
 * 
 * @param {Users} user - Objeto con los nuevos datos del usuario a actualizar.
 * @param {Buffer} [buffer] - Imagen de perfil opcional (como buffer) para subir a Cloudinary.
 * @returns {Promise<Users>} - El usuario actualizado con los campos formateados.
 * 
 * @throws {Error} Si el usuario no existe o está inactivo.
 * @throws {Error} Si se viola alguna de las restricciones para usuarios Google o no ADMIN.
 */
export async function updateUser(user: Users, buffer?: Buffer): Promise<Users> {
  // Buscar usuario actual en la base de datos
  const existingUser = await prisma.usuarios.findUnique({
    where: { id_usuario: BigInt(user.id) }
  });

  if (!existingUser) {
    throw new Error('Usuario no encontrado');
  }

  if (!existingUser.activo) {
    throw new Error('Usuario inactivo. No se puede actualizar.');
  }

  // Reglas para usuarios autenticados con Google
  const isGoogleUser = !!existingUser.google_id;
  if (isGoogleUser) {
    if (
      user.email && user.email !== existingUser.correo ||
      user.googleID && user.googleID !== existingUser.google_id
    ) {
      throw new Error('Usuarios autenticados con Google no pueden modificar su correo ni su Google ID');
    }
  }

  // Reglas para cambio de correo: solo ADMIN puede
  if (
    user.email &&
    user.email !== existingUser.correo &&
    existingUser.rol !== 'ADMIN'
  ) {
    throw new Error('Solo usuarios con rol ADMIN pueden modificar el correo');
  }

  // Preparar campos actualizables
  const updateFields: any = {
    nombre: user.name ?? existingUser.nombre,
    apellidos: user.lastname ?? existingUser.apellidos,
    foto_perfil: user.photo ?? existingUser.foto_perfil,
    correo: user.email ?? existingUser.correo,
    contrasena: user.password ? user.password : existingUser.contrasena,
    activo: user.active !== undefined ? user.active : existingUser.activo,
    rol: user.rol === 'ADMIN' ? 'ADMIN' : 'USUARIO'
  };

  // ADMIN puede actualizar el correo
  if (user.email && existingUser.rol === 'ADMIN') {
    updateFields.correo = user.email;
  }

  // ADMIN puede asignar Google ID si no tenía uno
  if (user.googleID && !existingUser.google_id && existingUser.rol === 'ADMIN') {
    updateFields.google_id = user.googleID;
  }

  // Manejo de imagen con Cloudinary
  if (buffer) {
    if (existingUser.foto_perfil) {
      const publicId = existingUser.foto_perfil;
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'usuarios' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as any);
        }
      );
      stream.end(buffer);
    });

    updateFields.foto_perfil = result.secure_url;
  }

  // Actualizar usuario en la base de datos
  const updatedUser = await prisma.usuarios.update({
    where: { id_usuario: BigInt(user.id) },
    data: updateFields
  });

  // Retornar el usuario actualizado
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
    dateCreate: updatedUser.creado_en ?? new Date()
  };
}
