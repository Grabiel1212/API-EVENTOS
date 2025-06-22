import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from '../config/env';
import { PrismaClient } from '../generated/prisma';
import { ApiError } from '../helpers/ApiError';
import {
  STATUS_BAD_REQUEST,
  STATUS_FORBIDDEN,
  STATUS_NOT_FOUND,
  STATUS_UNAUTHORIZED,
} from '../helpers/status'; // Asegúrate que el path sea correcto

const prisma = new PrismaClient();

/**
 * Servicio de Autenticación
 * Encapsula la lógica de login para usuarios ADMIN y USUARIO,
 * permitiendo acceso por Google o por correo/contraseña.
 */
export class AuthService {
  static async login({
    email,
    password,
    googleID,
  }: {
    email?: string;
    password?: string;
    googleID?: string;
  }) {
    // Validación básica: al menos email o Google ID
    if (!email && !googleID) {
      throw new ApiError(STATUS_BAD_REQUEST, 'Se requiere email o Google ID.', 'LOGIN_MISSING_CREDENTIALS');
    }

    // Buscar usuario por correo o Google ID
    const user = email
      ? await prisma.usuarios.findUnique({ where: { correo: email } })
      : await prisma.usuarios.findUnique({ where: { google_id: googleID } });

    if (!user) {
      throw new ApiError(STATUS_NOT_FOUND, 'Usuario no encontrado.', 'USER_NOT_FOUND');
    }

    if (!user.activo) {
      throw new ApiError(STATUS_FORBIDDEN, 'Usuario inactivo. Contacte al administrador.', 'USER_INACTIVE');
    }

    // Lógica para ADMIN
    if (user.rol === 'ADMIN') {
      if (!email || !password) {
        throw new ApiError(
          STATUS_BAD_REQUEST,
          'Los administradores deben iniciar sesión con email y contraseña.',
          'ADMIN_MISSING_CREDENTIALS'
        );
      }

      if (!user.contrasena) {
        throw new ApiError(STATUS_FORBIDDEN, 'Contraseña del administrador no configurada.', 'ADMIN_NO_PASSWORD');
      }

      const validPassword = await bcrypt.compare(password, user.contrasena);
      if (!validPassword) {
        throw new ApiError(STATUS_UNAUTHORIZED, 'Contraseña incorrecta.', 'INVALID_PASSWORD');
      }
    }

    // Lógica para USUARIO
    if (user.rol === 'USUARIO') {
      if (googleID) {
        if (!user.google_id || user.google_id !== googleID) {
          throw new ApiError(STATUS_UNAUTHORIZED, 'El Google ID no coincide.', 'INVALID_GOOGLE_ID');
        }
      } else {
        if (!user.contrasena) {
          throw new ApiError(
            STATUS_FORBIDDEN,
            'Este usuario no tiene contraseña. Use Google para iniciar sesión.',
            'USER_NO_PASSWORD'
          );
        }

        if (!password) {
          throw new ApiError(STATUS_BAD_REQUEST, 'Se requiere contraseña para iniciar sesión.', 'PASSWORD_REQUIRED');
        }

        const validPassword = await bcrypt.compare(password, user.contrasena);
        if (!validPassword) {
          throw new ApiError(STATUS_UNAUTHORIZED, 'Contraseña incorrecta.', 'INVALID_PASSWORD');
        }
      }
    }

    // Generar token JWT válido por 2 horas
    const token = jwt.sign(
      {
        id: user.id_usuario.toString(),
        rol: user.rol,
      },
      env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    return {
      token,
      user: {
        id: user.id_usuario.toString(),
        name: user.nombre,
        role: user.rol,
        email: user.correo,
        active: user.activo,
        photo: user.foto_perfil,
        dateCreate: user.creado_en,
      },
    };
  }
}
