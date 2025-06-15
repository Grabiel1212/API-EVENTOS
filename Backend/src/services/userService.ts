import { PrismaClient } from '../generated/prisma';
import { Users } from '../model/users';
import bcrypt from 'bcryptjs';
import { uploadImageToCloudinary } from '../utils/cloudinary';

const prisma = new PrismaClient();

export const UserService = {
  async createUser(input: any, file?: Express.Multer.File): Promise<Users> {
    // Validar usuario existente
    const existing = await prisma.usuarios.findUnique({
      where: { correo: input.email }
    });
    if (existing) {
      throw new Error('El correo electrónico ya se encuentra registrado');
    }

    // Procesar imagen
    const photoUrl = file 
      ? (await uploadImageToCloudinary(file.path)).secure_url
      : input.photo || null;

    // Hash de contraseña si es necesario
    const hashedPassword = input.password
      ? await bcrypt.hash(input.password, 10)
      : null;

    // Crear usuario en Prisma
    const newUser = await prisma.usuarios.create({
      data: {
        nombre: input.name,
        apellidos: input.lastname,
        foto_perfil: photoUrl,
        correo: input.email,
        contrasena: hashedPassword,
        google_id: input.googleID,
        activo: true,
        rol: input.rol || 'USUARIO',
        creado_en: new Date()
      }
    });

    // Mapear a la interfaz Users
    return {
      id: Number(newUser.id_usuario),
      name: newUser.nombre || '',
      lastname: newUser.apellidos || '',
      photo: newUser.foto_perfil,
      email: newUser.correo,
      password: newUser.contrasena,
      googleID: newUser.google_id,
      active: newUser.activo ?? true,
      rol: (newUser.rol as 'ADMIN' | 'USUARIO') || 'USUARIO',
      dateCreate: newUser.creado_en || new Date()
    };
  },

 async getAllUsers(): Promise<Users[]> {
  const users = await prisma.usuarios.findMany();

  return users.map((user) => ({
    id: Number(user.id_usuario),
    name: user.nombre || '',
    lastname: user.apellidos || '',
    photo: user.foto_perfil,
    email: user.correo,
    password: user.contrasena,
    googleID: user.google_id,
    active: user.activo ?? true,
    rol: (user.rol ?? 'USUARIO') as 'ADMIN' | 'USUARIO',
    dateCreate: user.creado_en || new Date()
  }));
}
}


