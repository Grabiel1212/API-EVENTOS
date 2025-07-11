import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { ApiError } from '../../helpers/ApiError';
import {
  STATUS_BAD_REQUEST,
  STATUS_FORBIDDEN
} from '../../helpers/status';

const prisma = new PrismaClient();

export async function updatePassword(
  email: string,
  password: string
): Promise<string> {

  // Validar que la nueva contraseña no esté vacía
  if (!password || password.trim() === '') {
    throw new ApiError(
      STATUS_BAD_REQUEST,
      'La nueva contraseña no puede estar vacía',
      'EMPTY_PASSWORD'
    );
  }

  // Buscar usuario por email
  const user = await prisma.usuarios.findUnique({
    where: { correo: email }
  });

  // Validar existencia del usuario
  if (!user) {
    throw new ApiError(
      STATUS_BAD_REQUEST,
      'Este correo no está registrado',
      'EMAIL_NOT_FOUND'
    );
  }

  // Validar que la cuenta esté activa
  if (user.activo !== true) {
    throw new ApiError(
      STATUS_FORBIDDEN,
      'Esta cuenta está inactiva. No puede actualizar la contraseña.',
      'INACTIVE_ACCOUNT'
    );
  }

  // Validar que no esté asociado a cuenta Google
  if (user.google_id && user.google_id.trim() !== '') {
    throw new ApiError(
      STATUS_FORBIDDEN,
      'Este correo está vinculado a una cuenta de Google. No puede recuperar la contraseña manualmente.',
      'GOOGLE_ACCOUNT_LINKED'
    );
  }

  // Validar que el rol sea USUARIO
  if (user.rol !== 'USUARIO') {
    throw new ApiError(
      STATUS_FORBIDDEN,
      'Solo los usuarios con rol USUARIO pueden recuperar su contraseña',
      'ROLE_NOT_ALLOWED'
    );
  }

  // Encriptar la nueva contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Actualizar contraseña en la base de datos
  await prisma.usuarios.update({
    where: { id_usuario: user.id_usuario },
    data: { contrasena: hashedPassword }
  });

  // Retornar solo un mensaje
  return 'Contraseña actualizada correctamente';
}
