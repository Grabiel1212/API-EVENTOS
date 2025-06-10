
export interface Usuario {
  id?: number;
  nombre: string;
  apellidos: string;
  foto_perfil: string;
  correo: string;
  contrasena: string;
  rol: 'admin' | 'user' | 'moderador'; // Según tus valores ENUM
}


