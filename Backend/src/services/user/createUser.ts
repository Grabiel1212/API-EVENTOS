import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { ApiError } from '../../helpers/ApiError';
import {
  STATUS_BAD_REQUEST,
  STATUS_FORBIDDEN,
  STATUS_INTERNAL_SERVER_ERROR
} from '../../helpers/status';
import { Users } from '../../model/usuarios/users';
import { uploadToCloudinary } from './../cloudinary/cloudinaryService';

const prisma = new PrismaClient();

export async function createUser(
  userData: Users,
  buffer?: Buffer,
  isAdminRequest: boolean = false
): Promise<Users> {
  try {
      // Si es registro público, forzar rol USUARIO
    if (!isAdminRequest) {
      userData.rol = 'USUARIO';
    }

    // Validación solo aplica si es ADMIN
    if (userData.rol === 'ADMIN') {
      // Requiere que sea solicitud de admin
      if (!isAdminRequest) {
        throw new ApiError(
          STATUS_FORBIDDEN,
          'Solo administradores pueden crear usuarios ADMIN',
          'ADMIN_CREATION_FORBIDDEN'
        );
      }
      
      // Validación para administradores
      if (!userData.password || userData.googleID) {
        throw new ApiError(
          STATUS_BAD_REQUEST,
          'Los administradores deben registrarse con correo y contraseña',
          'ADMIN_INVALID_REGISTRATION'
        );
      }
    }
    
    // Validar método de registro para usuarios normales
    if (userData.rol === 'USUARIO') {
      const validGoogle = !!userData.googleID && !userData.password;
      const validClassic = !userData.googleID && !!userData.password;
      
      if (!validGoogle && !validClassic) {
        throw new ApiError(
          STATUS_BAD_REQUEST,
          'Debe registrarse con Google o con correo y contraseña',
          'INVALID_REGISTRATION_METHOD'
        );
      }
    }

    // Verificar email único
    const exists = await prisma.usuarios.findUnique({
      where: { correo: userData.email }
    });

    if (exists) {
      throw new ApiError(
        STATUS_BAD_REQUEST,
        'El correo electrónico ya está registrado',
        'EMAIL_ALREADY_EXISTS'
      );
    }

    // Procesar foto
    let photo = null;
    if (buffer && userData.name) {
      const { url } = await uploadToCloudinary(buffer, `${Date.now()}-${userData.name}`);
      photo = url;
    }

    // Hash de contraseña
    let hashedPassword = null;
    if (userData.password) {
      hashedPassword = await bcrypt.hash(userData.password, 10);
    }

    // Determinar rol
    const rol = isAdminRequest ? userData.rol : 'USUARIO';

    // Crear usuario
    const created = await prisma.usuarios.create({
      data: {
        nombre: userData.name,
        apellidos: userData.lastname,
        foto_perfil: photo,
        correo: userData.email,
        contrasena: hashedPassword,
        google_id: userData.googleID || null,
        rol: rol,
        activo: true,
      },
      select: {
        id_usuario: true,
        nombre: true,
        apellidos: true,
        foto_perfil: true,
        correo: true,
        contrasena: true,
        google_id: true,
        activo: true,
        rol: true,
        creado_en: true,
      },
    });

    return mapPrismaUserToModel(created);

  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      STATUS_INTERNAL_SERVER_ERROR,
      'Error al crear el usuario: ' + (error as Error).message,
      'USER_CREATION_FAILED'
    );
  }
}

// Función auxiliar para mapear el usuario
function mapPrismaUserToModel(prismaUser: any): Users {
  return {
    id: Number(prismaUser.id_usuario),
    name: prismaUser.nombre ?? '',
    lastname: prismaUser.apellidos ?? '',
    photo: prismaUser.foto_perfil,
    email: prismaUser.correo,
    password: prismaUser.contrasena,
    googleID: prismaUser.google_id,
    active: prismaUser.activo ?? true,
    rol: prismaUser.rol as 'ADMIN' | 'USUARIO',
    dateCreate: prismaUser.creado_en ?? new Date(),
  };
}
