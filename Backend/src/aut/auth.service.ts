// auth.service.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from '../config/env';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

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
    if (!email && !googleID) {
      throw new Error('Email or Google ID is required for login.');
    }

    const user = email
      ? await prisma.usuarios.findUnique({ where: { correo: email } })
      : await prisma.usuarios.findUnique({ where: { google_id: googleID } });

    if (!user) {
      throw new Error('User not found.');
    }

    // Validación de estado del usuario
    if (!user.activo) {
      throw new Error('This user is inactive. Please contact the administrator.');
    }

    // ADMIN solo con email y password
    if (user.rol === 'ADMIN') {
      if (!email || !password) {
        throw new Error('Administrators must log in with email and password.');
      }

      if (!user.contrasena) {
        throw new Error('Administrator password is not configured.');
      }

      const validPassword = await bcrypt.compare(password, user.contrasena);
      if (!validPassword) {
        throw new Error('Incorrect password.');
      }
    }

    // USUARIO con googleID o email+password
    if (user.rol === 'USUARIO') {
      if (googleID) {
        if (!user.google_id || user.google_id !== googleID) {
          throw new Error('Google ID does not match.');
        }
      } else {
        if (!user.contrasena) {
          throw new Error('This user has no password. Please use Google login.');
        }

        if (!password) {
          throw new Error('Password is required for login.');
        }

        const validPassword = await bcrypt.compare(password, user.contrasena);
        if (!validPassword) {
          throw new Error('Incorrect password.');
        }
      }
    }

    // Generar token
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
        dateCreate: user.creado_en 
      },
    };
  }
}