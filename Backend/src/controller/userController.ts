import { Request, Response } from 'express';
import { logger } from '../helpers/logger'; // Logger personalizado
import { userSchema } from '../middlewares/user.validation'; // Validación Joi
import UserService from '../services/user/index'; // Servicio de usuarios

class UserController {
  // Crear un nuevo usuario
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const fileBuffer = req.file?.buffer; // Foto recibida (si existe)

      // Validar datos de entrada con Joi
      const { error, value } = userSchema.validate(req.body);
      if (error) {
        res.status(400).json({ error: error.details[0].message }); // Error de validación
        return;
      }

      // Crear usuario con el servicio
      const user = await UserService.create(value, fileBuffer);

      // Respuesta exitosa
      res.status(201).json({ message: 'Usuario creado correctamente', user });
    } catch (err: any) {
      // Log y manejo de errores
      logger.error('Error al crear usuario:', err.message);
      res.status(500).json({ error: err.message });
    }
  }
}

export default new UserController(); // Exportar instancia del controlador
