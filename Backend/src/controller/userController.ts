import { Request, Response } from 'express';
import { ApiResponse } from '../helpers/ApiRespose';
import { logger } from '../helpers/logger';
import { Users } from '../model/users';
import { userSchema } from '../schemas/user.validation';
import { userPartialSchema } from '../schemas/userPartialSchema';
import UserService from '../services/user';


class UserController {

  private Servicio= UserService;

  constructor(){
    // Enlazar métodos para conservar el contexto
  this.listActiveUsers = this.listActiveUsers.bind(this);
  this.listInactiveUsers = this.listInactiveUsers.bind(this);
  this.listUsersByRole = this.listUsersByRole.bind(this);
  this.getUserById = this.getUserById.bind(this);
  this.createUser = this.createUser.bind(this);
  this.updateUser = this.updateUser.bind(this);
  this.updateUserStatus = this.updateUserStatus.bind(this);
  this.deleteUser = this.deleteUser.bind(this);
  }

  

  // LISTAR USUARIOS ACTIVOS
  async listActiveUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.Servicio.listActive();
      res.status(200).json(ApiResponse.ok('Usuarios activos', users));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      logger.error('Error al listar usuarios activos:', message);
      res.status(500).json(ApiResponse.fail('Error al obtener usuarios activos', message));
    }
  }

  // LISTAR USUARIOS INACTIVOS
  async listInactiveUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.Servicio.listInactive();
      res.status(200).json(ApiResponse.ok('Usuarios inactivos', users));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      logger.error('Error al listar usuarios inactivos:', message);
      res.status(500).json(ApiResponse.fail('Error al obtener usuarios inactivos', message));
    }
  }

  // LISTAR USUARIOS POR ROL
  async listUsersByRole(req: Request, res: Response): Promise<void> {
    try {
      const role = req.params.role.toUpperCase();
      if (role !== 'ADMIN' && role !== 'USUARIO') {
        res.status(400).json(ApiResponse.fail('Rol inválido. Use ADMIN o USUARIO'));
        return;
      }

      const users = await this.Servicio.listByRole(role as 'ADMIN' | 'USUARIO');
      res.status(200).json(ApiResponse.ok(`Usuarios con rol ${role}`, users));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      res.status(500).json(ApiResponse.fail('Error al obtener usuarios por rol', message));
    }
  }

  // OBTENER USUARIO POR ID
  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json(ApiResponse.fail('ID inválido'));
        return;
      }

      const user = await this.Servicio.findById(id);
      if (!user) {
        res.status(404).json(ApiResponse.fail('Usuario no encontrado'));
        return;
      }

      res.status(200).json(ApiResponse.ok('Usuario encontrado', user));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      res.status(500).json(ApiResponse.fail('Error al obtener usuario por ID', message));
    }
  }

  // CREAR USUARIO
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const fileBuffer = req.file?.buffer;
      const { error, value } = userSchema.validate(req.body);
      if (error) {
        res.status(400).json(ApiResponse.fail('Error de validación', error.details[0].message));
        return;
      }

      const user = await this.Servicio.create(value, fileBuffer);
      res.status(201).json(ApiResponse.ok('Usuario creado correctamente', user));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      logger.error('Error al crear usuario:', message);
      res.status(500).json(ApiResponse.fail('Error al crear usuario', message));
    }
  }

  // ACTUALIZAR USUARIO PARCIALMENTE
  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json(ApiResponse.fail('ID inválido'));
        return;
      }

      const buffer = req.file?.buffer;
      const { error, value } = userPartialSchema.validate(req.body, { allowUnknown: false });
      if (error) {
        res.status(400).json(ApiResponse.fail('Error de validación', error.details[0].message));
        return;
      }

      const partialData: Partial<Users> = {
        name: value.name,
        lastname: value.lastname,
        email: value.email,
      };

      const updatedUser = await this.Servicio.update(id, partialData, buffer);
      res.status(200).json(ApiResponse.ok('Usuario actualizado correctamente', updatedUser));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      logger.error('Error al actualizar usuario parcialmente:', message);
      res.status(500).json(ApiResponse.fail('Error al actualizar usuario', message));
    }
  }

  // ACtivar  USUARIO
  async updateUserStatus(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const { activo } = req.body;

      if (typeof activo !== 'boolean') {
        res.status(400).json(ApiResponse.fail('El estado activo debe ser booleano'));
        return;
      }

      await this.Servicio.updateStatus(id, activo);
      res.status(200).json(ApiResponse.ok('Estado del usuario actualizado correctamente'));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      logger.error('Error al actualizar estado del usuario:', message);
      res.status(500).json(ApiResponse.fail('Error al actualizar estado', message));
    }
  }

  // ELIMINAR USUARIO (LÓGICO)
  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      await this.Servicio.delete(id);
      res.status(200).json(ApiResponse.ok('Usuario eliminado correctamente'));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      logger.error('Error al eliminar usuario:', message);
      res.status(500).json(ApiResponse.fail('Error al eliminar usuario', message));
    }
  }
}

export default new UserController();
