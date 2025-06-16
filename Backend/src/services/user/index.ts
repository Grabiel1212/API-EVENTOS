import { userInterface } from '../../model/userInterface';
import { Users } from '../../model/users';
import { createUser } from './createUser';
import { deleteUser } from './deleteUser';
import { findUserById } from './findUser';
import { listActiveUsers, listInactiveUsers, listUsersByRole } from './listarUser';
import { updateUserStatus } from './updateStatus';
import { updateUser } from './updateUser';

class UserService implements userInterface {
  async create(user: Users, buffer?: Buffer): Promise<Users> {
    return createUser(user, buffer);                 // Crear usuario (con o sin foto)
  }

  async update(user: Users, buffer?: Buffer): Promise<Users> {
    return updateUser(user, buffer);                 // Actualizar datos de usuario
  }

async delete(id: number): Promise<void> {
  await deleteUser(id); // esta función debe retornar void
}

  async updateStatus(id: number, status: boolean): Promise<void> {
    return updateUserStatus(id, status);             // Activar o desactivar usuario
  }

  async findById(id: number): Promise<Users | null> {
    return findUserById(id);                         // Buscar usuario por ID
  }

  async listActive(): Promise<Users[]> {
    return listActiveUsers();                        // Listar usuarios activos
  }

  async listInactive(): Promise<Users[]> {
    return listInactiveUsers();                      // Listar usuarios inactivos
  }

  async listByRole(role: 'ADMIN' | 'USUARIO'): Promise<Users[]> {
    return listUsersByRole(role);                    // Listar usuarios por rol
  }
}

export default new UserService(); // Exporta instancia Singleton
