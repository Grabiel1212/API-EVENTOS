import { Users } from './users';

/**
 * Interfaz que define las operaciones del servicio de usuario.
 */
export interface userInterface {
 
  create(user: Users, buffer?: Buffer): Promise<Users>;//Crea un nuevo usuario .
  update(user: Users, buffer?: Buffer): Promise<Users>;//Actualiza los datos del usuario (solo si está activo)
  delete(id: number): Promise<void>;//Elimina lógicamente un usuario (cambia estado a false).
  updateStatus(id: number, status: boolean): Promise<void>;//Cambia el estado activo/inactivo del usuario.
  findById(id: number): Promise<Users | null>;//Busca un usuario por su ID.
  listActive(): Promise<Users[]>;// Lista todos los usuarios activos.
  listInactive(): Promise<Users[]>;//Lista todos los usuarios inactivos.
  listByRole(role: 'ADMIN' | 'USUARIO'): Promise<Users[]>;//Lista los usuarios según su rol (ADMIN o USUARIO).
}
