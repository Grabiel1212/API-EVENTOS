import { Request, Response } from 'express';
import { Users } from '../model/users';
import { UserService } from '../services/userService';
import { unlinkSync } from 'fs';
import { logger } from '../utils/logger';


type SafeUser = Omit<Users, 'password'>;

export const UserController = {
  async createUser(req: Request, res: Response): Promise<void> {
    const { file, body: userData } = req;
    
    try {
      if (!userData.email || (!userData.password && !userData.googleID)) {
        UserController.cleanupFile(file);
        res.status(400).json({ 
          success: false,
          error: 'Email y contraseña o Google ID son requeridos' 
        });
        return;
      }

      // Asegurar el tipo Users
      const user: Users = await UserService.createUser(userData, file);
      UserController.cleanupFile(file);

      const responseUser: SafeUser = {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        photo: user.photo,
        email: user.email,
        googleID: user.googleID,
        active: user.active,   // es opcional, pero se maneja como booleano
        rol: user.rol,
        dateCreate: user.dateCreate
      };

      res.status(201).json({
        success: true,
        message: 'Usuario creado correctamente',
        user: responseUser
      });

    } catch (error: any) {
      UserController.handleError(error, req.file, res);
    }
  },

  async getAllUsers(_req: Request, res: Response): Promise<void> {
    try {
      // Asegurar el tipo Users[]
      const users: Users[] = await UserService.getAllUsers();
      
      // Tipado explícito en el callback
      const safeUsers = users.map((user: Users) => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      
      res.status(200).json({
        success: true,
        data: safeUsers
      });

    } catch (error: any) {
      logger.error('Error en getAllUsers:', error);
      res.status(500).json({
        success: false,
        error: 'Error interno al obtener usuarios'
      });
    }
  },

  cleanupFile(file?: Express.Multer.File): void {
    if (file?.path) {
      try {
        unlinkSync(file.path);
      } catch (error) {
        logger.error('Error al limpiar archivo temporal:', error);
      }
    }
  },

  handleError(error: any, file: Express.Multer.File | undefined, res: Response): void {
    UserController.cleanupFile(file);
    
    const statusCode = error.message.includes('existente') ? 409 : 400;
    res.status(statusCode).json({
      success: false,
      error: error.message
    });
  }
};

export default UserController;