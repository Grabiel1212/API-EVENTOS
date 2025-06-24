import { Request, Response } from 'express';
import { ApiError } from '../helpers/ApiError';
import { ApiResponse } from '../helpers/ApiRespose';
import { logger } from '../helpers/logger';
import {
  STATUS_BAD_REQUEST,
  STATUS_INTERNAL_SERVER_ERROR
} from '../helpers/status';
import { Users } from '../model/usuarios/users';
import { userSchema } from '../schemas/usuarios/user.validation';
import { userPartialSchema } from '../schemas/usuarios/userPartialSchema';
import UserService from '../services/user';



class UserController {

  
  private Servicio= UserService;

  constructor(){
    // Enlazar métodos para conservar el contexto
  this.listActiveUsers = this.listActiveUsers.bind(this);
  this.listInactiveUsers = this.listInactiveUsers.bind(this);
  this.listUsersByRole = this.listUsersByRole.bind(this);
  this.getUserById = this.getUserById.bind(this);
  this.registrarUsuarioNormal = this.registrarUsuarioNormal.bind(this);
  this.crearUsuarioComoAdmin = this.crearUsuarioComoAdmin.bind(this);
  this.updateUserStatus = this.updateUserStatus.bind(this);
  this.deleteUser = this.deleteUser.bind(this);
  this.updatePassword = this.updatePassword.bind(this);
  this.findByEmail = this.findByEmail.bind(this);
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


 // Registrar usuario normal (público)
  async registrarUsuarioNormal(req: Request, res: Response): Promise<void> {
    try {
      const fileBuffer = req.file?.buffer;
      const { error, value } = userSchema.validate(req.body);
      
      if (error) {
        res.status(STATUS_BAD_REQUEST).json(
          ApiResponse.fail('Error de validación', error.details[0].message)
        );
        return;
      }

      // Forzar rol USUARIO para registro público
      const userData = {
        ...value,
        rol: 'USUARIO'
      };

      const user = await this.Servicio.create(
        userData, 
        fileBuffer, 
        false // No es solicitud de admin
      );
      
      res.status(201).json(
        ApiResponse.ok('Usuario registrado correctamente', user)
      );
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        res.status(err.statusCode).json(
          ApiResponse.fail(err.message, err.errorCode)
        );
      } else {
        const message = err instanceof Error ? err.message : 'Error desconocido';
        logger.error('Error al crear usuario:', message);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(
          ApiResponse.fail('Error al crear usuario', message)
        );
      }
    }
  }

  // Crear usuario como administrador (protegido)
  async crearUsuarioComoAdmin(req: Request, res: Response): Promise<void> {
    try {
      const fileBuffer = req.file?.buffer;
      const { error, value } = userSchema.validate(req.body);
      
      if (error) {
        res.status(STATUS_BAD_REQUEST).json(
          ApiResponse.fail('Error de validación', error.details[0].message)
        );
        return;
      }

      const user = await this.Servicio.create(
        value, 
        fileBuffer, 
        true // Es solicitud de admin
      );
      
      res.status(201).json(
        ApiResponse.ok('Usuario creado correctamente', user)
      );
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        res.status(err.statusCode).json(
          ApiResponse.fail(err.message, err.errorCode)
        );
      } else {
        const message = err instanceof Error ? err.message : 'Error desconocido';
        logger.error('Error al crear usuario:', message);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(
          ApiResponse.fail('Error al crear usuario', message)
        );
      }
    }
  }

  
 updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const buffer = req.file?.buffer;
      const currentUser = req.user; // Usuario autenticado desde el middleware
      
      // Validación de datos
      const { error, value } = userPartialSchema.validate(req.body);
      if (error) {
        res.status(400).json(ApiResponse.fail('Error de validación', error.details[0].message));
        return;
      }

      const partialData: Partial<Users> = value;

      // Determinar si es solicitud de admin
      const isAdminRequest = currentUser?.rol === 'ADMIN';

     

      // Usar this.service para acceder al servicio
      const updatedUser = await this.Servicio.update(
        id,
        partialData,
        buffer,
        isAdminRequest
      );
      
      res.status(200).json(ApiResponse.ok('Usuario actualizado', updatedUser));
    } catch (error: any) {
      // Manejo de errores
      if (error instanceof ApiError) {
        res.status(error.statusCode).json(ApiResponse.fail(error.message, error.errorCode));
      } else {
        console.error('Error en updateUser:', error);
        res.status(500).json(ApiResponse.fail('Error interno del servidor'));
      }
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


  async updatePassword(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(STATUS_BAD_REQUEST).json(ApiResponse.fail('Email y nueva contraseña son obligatorios'));
        return;
      }

      // Corrige el nombre a this.service (minúscula)
      const message = await this.Servicio.updatePassword(email, password);
      res.json(ApiResponse.ok(message));
    } catch (error: any) {
      logger.error('Error al actualizar contraseña:', error);
      
      if (error instanceof ApiError) {
        res.status(error.statusCode).json(ApiResponse.fail(error.message, error.errorCode));
      } else {
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ApiResponse.fail('Error interno del servidor'));
      }
    }
  }


 async findByEmail(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;

      // Validación básica
      if (!email || typeof email !== 'string') {
        res.status(400).json(ApiResponse.fail('El email es requerido'));
        return;
      }

      // Buscar usuario
      const user = await this.Servicio.findByEmail(email);

      // Si no se encuentra
      if (!user) {
        res.status(404).json(ApiResponse.fail('Usuario no encontrado'));
        return;
      }

      // Usuario encontrado
      res.status(200).json(ApiResponse.ok('Usuario encontrado', user));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      logger.error('Error al buscar usuario por email:', message);
      res.status(500).json(ApiResponse.fail('Error al buscar usuario por email', message));
    }
  }
}

export default new UserController();
