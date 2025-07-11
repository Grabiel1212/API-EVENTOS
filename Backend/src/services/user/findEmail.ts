import { PrismaClient } from '@prisma/client';
import { ApiError } from '../../helpers/ApiError';
import {
  STATUS_FORBIDDEN,
  STATUS_NOT_FOUND
} from '../../helpers/status';

const prisma = new PrismaClient();

export async function verificarCuentaParaRecuperacion(email: string): Promise<true> {
  const user = await prisma.usuarios.findUnique({
    where: { correo: email }
  });

  if (!user) {
    throw new ApiError(STATUS_NOT_FOUND, 'Este correo no está registrado', 'USER_NOT_FOUND');
  }

  if (user.activo !== true) {
    throw new ApiError(STATUS_FORBIDDEN, 'Esta cuenta está inactiva', 'ACCOUNT_INACTIVE');
  }

  if (user.google_id && user.google_id.trim() !== '') {
    throw new ApiError(STATUS_FORBIDDEN, 'Esta cuenta está asociada a Google', 'GOOGLE_ACCOUNT');
  }

  if (user.rol !== 'USUARIO') {
    throw new ApiError(STATUS_FORBIDDEN, 'Solo los usuarios con rol USUARIO pueden recuperar su contraseña', 'INVALID_ROLE');
  }

  return true; // Todas las validaciones pasaron
}
