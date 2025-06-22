import { Request, Response } from 'express';
import { ApiError } from '../helpers/ApiError';
import { ApiResponse } from '../helpers/ApiRespose';
import { STATUS_INTERNAL_SERVER_ERROR } from '../helpers/status';
import { AuthService } from './auth.service';

export class AuthController {
  static async loginUser(req: Request, res: Response): Promise<void> {
    const { email, password, googleID } = req.body;

    try {
      const result = await AuthService.login({ email, password, googleID });
      res.status(200).json(ApiResponse.ok('Inicio de sesión exitoso', result));
    } catch (error) {
      console.error('Error en loginUser:', error);

      if (error instanceof ApiError) {
        res.status(error.statusCode).json(error.toResponse());
      } else {
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(
          ApiResponse.fail('Error inesperado en el servidor')
        );
      }
    }
  }
}
