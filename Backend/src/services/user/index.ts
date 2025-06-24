import { userInterface } from '../../model/usuarios/userInterface';
import { Users } from '../../model/usuarios/users';
import { createUser } from './createUser';
import { deleteUser } from './deleteUser';
import { verificarCuentaParaRecuperacion } from './findEmail';
import { findUserById } from './findUser';
import { listActiveUsers, listInactiveUsers, listUsersByRole } from './listarUser';
import { updatePassword } from './updatePassword';
import { updateUserStatus } from './updateStatus';
import { updateRegularUser, updateUserAsAdmin } from './updateUser';


class UserService implements userInterface {
 async create(user: Users, buffer?: Buffer, isAdminRequest?: boolean): Promise<Users> {
    return createUser(user, buffer, isAdminRequest);
  }

  async update(
    id: number,
    data: Partial<Users>,
    buffer?: Buffer,
    isAdminRequest: boolean = false
  ): Promise<Users> {
    if (isAdminRequest) {
      return updateUserAsAdmin(id, data, buffer, isAdminRequest);
    } else {
      return updateRegularUser(id, data, buffer);
    }
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

  async updatePassword(email: string, password: string): Promise<string> {
    return await updatePassword(email, password);
  }

  async findByEmail(email: string): Promise<boolean> {
    return await verificarCuentaParaRecuperacion(email);                      // Buscar usuario por correo electrónico
  }

  
}

export default new UserService();
