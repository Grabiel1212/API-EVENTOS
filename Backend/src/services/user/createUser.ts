import bcrypt from 'bcryptjs';
import { PrismaClient } from '../../generated/prisma';
import { Users } from '../../model/users';
import { uploadToCloudinary } from './../cloudinary/cloudinaryService';

const prisma = new PrismaClient();

/// Crear un nuevo usuario con validación, procesamiento de imagen y hash de contraseña
export async function createUser(user: Users, buffer?: Buffer): Promise<Users> {
  await validateEmail(user.email); /// Validar que el correo no esté duplicado
  validateRegistrationMethod(user); /// Validar las reglas de registro según el rol

  const photo = await processPhoto(buffer, user.name); /// Subir foto a Cloudinary (si hay)
  const hashedPassword = await hashPassword(user.password); /// Hashear contraseña (si hay)

  /// Crear el usuario en la base de datos
  const created = await prisma.usuarios.create({
    data: {
      nombre: user.name,
      apellidos: user.lastname,
      foto_perfil: photo,
      correo: user.email,
      contrasena: hashedPassword,
      google_id: user.googleID ?? null,
      rol: user.rol === 'ADMIN' ? 'ADMIN' : 'USUARIO',
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

  /// Devolver el usuario con estructura tipada
  return {
    id: Number(created.id_usuario),
    name: created.nombre ?? '',
    lastname: created.apellidos ?? '',
    photo: created.foto_perfil,
    email: created.correo,
    password: created.contrasena,
    googleID: created.google_id,
    active: created.activo ?? true,
    rol: created.rol as 'ADMIN' | 'USUARIO',
    dateCreate: created.creado_en ?? new Date(),
  };
}

// ============================================
//             FUNCIONES HELPER
// ============================================

/// Verifica si el correo ya está registrado
async function validateEmail(email: string): Promise<void> {
  const exists = await prisma.usuarios.findUnique({ where: { correo: email } });
  if (exists) throw new Error('Correo ya registrado.');
}

/// Valida que el registro cumpla con las reglas por rol
function validateRegistrationMethod(user: Users): void {
  if (user.rol === 'ADMIN' && (!user.password || user.googleID)) {
    throw new Error('ADMIN debe registrarse con correo y contraseña.');
  }
  if (user.rol === 'USUARIO') {
    const validGoogle = !!user.googleID && !user.password;
    const validClassic = !user.googleID && !!user.password;
    if (!validGoogle && !validClassic) {
      throw new Error('Debe registrarse con Google o correo y contraseña.');
    }
  }
}

/// Procesa la imagen, subiéndola a Cloudinary (opcional)
async function processPhoto(buffer?: Buffer, name?: string): Promise<string | null> {
  if (!buffer || !name) return null;
  return uploadToCloudinary(buffer, `${Date.now()}-${name}`);
}

/// Hashea la contraseña (si se proporciona)
async function hashPassword(password: string | null): Promise<string | null> {
  if (!password) return null;
  return await bcrypt.hash(password, 10);
}
