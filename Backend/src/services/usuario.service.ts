

type Rol = 'admin' | 'user' | 'moderador';

interface Usuario {
  id: number;
  nombre: string;
  apellidos: string;
  foto_perfil: string;
  correo: string;
  contrasena: string;
  rol: Rol;
}

let usuarios: Usuario[] = [
  {
    id: 1,
    nombre: "Juan",
    apellidos: "Pérez",
    foto_perfil: "",
    correo: "juan@example.com",
    contrasena: "123456",
    rol: "user"
  },
  {
    id: 2,
    nombre: "Ana",
    apellidos: "Gómez",
    foto_perfil: "",
    correo: "ana@example.com",
    contrasena: "abcdef",
    rol: "admin"
  },



  
   {
    id: 3,
    nombre: "Gabriela",
    apellidos: "Martínez",
    foto_perfil: "",
    correo: "gaby_12@example.com",
    contrasena: "abcdef",
    rol: "admin"
  },

  {
    id: 4,
    nombre: "David",
    apellidos: "Lopez",
    foto_perfil: "",
    correo: "david_12@example.com",
    contrasena: "abcdef",
    rol: "user"
  }




];

// Siempre arranca con el ID mayor actual + 1
let nextId = usuarios.reduce((max, u) => (u.id > max ? u.id : max), 0) + 1;


export const listarUsuarios = async () => {
  try {
    return usuarios;
  } catch (error) {
    console.error("Error al listar usuarios:", error);
    throw new Error("Error al listar usuarios");
  }
};

export const obtenerUsuario = async (id: number) => {
  try {
    return usuarios.find(u => u.id === id);
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    throw new Error("Error al obtener usuario");
  }
};

export const crearUsuario = async (usuario: Omit<Usuario, 'id'>) => {
  try {
    const nuevoUsuario: Usuario = {
      id: nextId++,
      ...usuario
    };
    usuarios.push(nuevoUsuario);
    return nuevoUsuario;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw new Error("Error al crear usuario");
  }
};

export const actualizarUsuario = async (id: number, datos: Partial<Usuario>) => {
  try {
    const index = usuarios.findIndex(u => u.id === id);
    if (index !== -1) {
      usuarios[index] = { ...usuarios[index], ...datos };
      return usuarios[index];
    }
    return undefined;
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    throw new Error("Error al actualizar usuario");
  }
};

export const eliminarUsuario = async (id: number) => {
  try {
    const index = usuarios.findIndex(u => u.id === id);
    if (index !== -1) {
      usuarios.splice(index, 1);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    throw new Error("Error al eliminar usuario");
  }
};
