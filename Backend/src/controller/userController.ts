import { Request, Response } from 'express';
import { logger } from '../helpers/logger'; // Logger personalizado
import { userSchema } from '../middlewares/user.validation'; // Validación Joi
import UserService from '../services/user'; // Servicio de usuarios
import { Users } from '../model/users';

class UserController {
  // Crear un nuevo usuario
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const fileBuffer = req.file?.buffer;
      const { error, value } = userSchema.validate(req.body);
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }

      const user = await UserService.create(value, fileBuffer);
      res.status(201).json({ message: 'Usuario creado correctamente', user });
    } catch (err: any) {
      logger.error('Error al crear usuario:', err.message);
      res.status(500).json({ error: err.message });
    }
  }

  // Actualizar estado (activo/inactivo)
  async updateUserStatus(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const { activo } = req.body;

      if (typeof activo !== 'boolean') {
        res.status(400).json({ error: 'El estado activo debe ser booleano (true o false)' });
        return;
      }

      const updatedUser = await UserService.updateStatus(id, activo);

      res.status(200).json({
        message: 'Estado del usuario actualizado correctamente',
        user: updatedUser
      });
    } catch (err: any) {
      logger.error('Error al actualizar estado del usuario:', err.message);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  // Actualizar todos los datos del usuario
  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const buffer = req.file?.buffer;

      const { error, value } = userSchema.validate(req.body);
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }

      const userData: Users = {
        id: id,
        name: value.name,
        lastname: value.lastname,
        email: value.email,
        photo: null,
        password: value.password,
        googleID: value.googleID,
        active: value.active,
        rol: value.rol,
        dateCreate: new Date()
      };

      const updatedUser = await UserService.update(userData, buffer);

      res.status(200).json({
        message: 'Usuario actualizado correctamente',
        user: updatedUser
      });
    } catch (err: any) {
      logger.error('Error al actualizar usuario:', err.message);
      res.status(500).json({ error: err.message });
    }
  }

 // Eliminar usuario lógicamente
async deleteUser(req: Request, res: Response): Promise<void> {
  try {
    const id = Number(req.params.id);
    await UserService.delete(id);

    res.status(200).json({
      message: 'Usuario eliminado (lógicamente) correctamente'
    });
  } catch (err: any) {
    logger.error('Error al eliminar usuario:', err.message);
    res.status(500).json({ error: err.message });
  }
}

// Obtener usuario por ID
async getUserById(req: Request, res: Response): Promise<void> {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }

    const user = await UserService.findById(id);
    if (!user) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }

    res.status(200).json({ user });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Error al buscar el usuario' });
  }
}

async listActiveUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.listActive();
      res.status(200).json({ users });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async listInactiveUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.listInactive();
      res.status(200).json({ users });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async listUsersByRole(req: Request, res: Response): Promise<void> {
    try {
      const role = req.params.role.toUpperCase();

      if (role !== 'ADMIN' && role !== 'USUARIO') {
        res.status(400).json({ error: 'Rol inválido. Use ADMIN o USUARIO' });
        return;
      }

      const users = await UserService.listByRole(role as 'ADMIN' | 'USUARIO');
      res.status(200).json({ users });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default new UserController();
