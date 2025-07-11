import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { ApiError } from '../../helpers/ApiError';
import { STATUS_BAD_REQUEST, STATUS_FORBIDDEN } from '../../helpers/status';
import { Users } from '../../model/usuarios/users';
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
      await deletePhotoFromCloudinary(publicId);
    }
  }

  const filename = `${Date.now()}-${name}`;
  const { url } = await uploadToCloudinary(buffer, filename);
  return url;
}

/**
 * Actualización para USUARIOS regulares (solo nombre, apellido y foto)
 */
export async function updateRegularUser(
  id: number,
  data: Partial<Users>,
  buffer?: Buffer
): Promise<Users> {
  const existingUser = await prisma.usuarios.findUnique({
    where: { id_usuario: BigInt(id) },
  });

  // Validaciones básicas
  if (!existingUser) throw new Error('Usuario no encontrado');
  if (!existingUser.activo) throw new Error('Usuario inactivo');
  
  // Permitir tanto USUARIOS como ADMINS actualizar sus propios datos
  if (existingUser.rol !== 'USUARIO' && existingUser.rol !== 'ADMIN') {
    throw new ApiError(
      STATUS_FORBIDDEN,
      'Solo usuarios con rol USUARIO o ADMIN pueden actualizar sus datos',
      'ROLE_NOT_ALLOWED'
    );
  }

  // Validar campos permitidos (solo nombre, apellido)
  const allowedFields = ['name', 'lastname'];
  const invalidFields = Object.keys(data).filter(
    key => !allowedFields.includes(key)
  );

  if (invalidFields.length > 0) {
    throw new ApiError(
      STATUS_BAD_REQUEST,
      `Campos no permitidos: ${invalidFields.join(', ')}`,
      'INVALID_FIELDS'
    );
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
      foto_perfil: newPhoto ?? undefined,
    },
  });

  return mapPrismaUserToModel(updatedUser);
}

/**
 * Actualización para ADMINISTRADORES (todos los campos excepto googleID)
 */
export async function updateUserAsAdmin(
  id: number,
  data: Partial<Users>,
  buffer?: Buffer,
  isAdminRequest: boolean = false
): Promise<Users> {
  // Validación para actualización a rol ADMIN
  if (data.rol === 'ADMIN' && !isAdminRequest) {
    throw new ApiError(
      STATUS_FORBIDDEN,
      'Solo administradores pueden actualizar usuarios a rol ADMIN',
      'ADMIN_UPDATE_FORBIDDEN'
    );
  }

  // Validar campos permitidos
  const allowedFields = ['name', 'lastname', 'password', 'rol'];
  const invalidFields = Object.keys(data).filter(
    key => !allowedFields.includes(key)
  );

  if (invalidFields.length > 0) {
    throw new ApiError(
      STATUS_BAD_REQUEST,
      `Campos no permitidos: ${invalidFields.join(', ')}`,
      'INVALID_FIELDS'
    );
  }

  const existingUser = await prisma.usuarios.findUnique({
    where: { id_usuario: BigInt(id) },
  });

  if (!existingUser) throw new Error('Usuario no encontrado');
  
  // Verificar si es usuario de Google
  const isGoogleUser = existingUser.google_id && existingUser.google_id.trim() !== '';
  
  // Validar actualización de contraseña para usuarios de Google
  if (isGoogleUser && data.password) {
    throw new ApiError(
      STATUS_FORBIDDEN,
      'No se puede actualizar la contraseña de usuarios registrados con Google',
      'GOOGLE_PASSWORD_UPDATE_FORBIDDEN'
    );
  }

  // Procesar contraseña si se proporciona y es usuario normal
  let hashedPassword: string | undefined;
  if (data.password && !isGoogleUser) {
    hashedPassword = await bcrypt.hash(data.password, 10);
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
      contrasena: hashedPassword ?? undefined,
      rol: data.rol ?? undefined,
      foto_perfil: newPhoto ?? undefined,
    },
  });

  return mapPrismaUserToModel(updatedUser);
}


/**
 * Mapea el usuario de Prisma al modelo Users
 */
function mapPrismaUserToModel(prismaUser: any): Users {
  return {
    id: Number(prismaUser.id_usuario),
    name: prismaUser.nombre ?? '',
    lastname: prismaUser.apellidos ?? '',
    email: prismaUser.correo,
    photo: prismaUser.foto_perfil,
    password: prismaUser.contrasena,
    googleID: prismaUser.google_id,
    active: prismaUser.activo ?? true,
    rol: (prismaUser.rol as 'ADMIN' | 'USUARIO') ?? 'USUARIO',
    dateCreate: prismaUser.creado_en ?? new Date(),
  };
}
