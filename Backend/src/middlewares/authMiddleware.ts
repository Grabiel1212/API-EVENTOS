import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import env from '../config/env';
import { ApiResponse } from '../helpers/ApiRespose';
import { STATUS_UNAUTHORIZED } from '../helpers/status';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    res.status(STATUS_UNAUTHORIZED).json(
      ApiResponse.fail('Acceso denegado: Token no proporcionado')
    );
    return;
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as {
      id: string;
      rol: 'ADMIN' | 'USUARIO';
    };

    req.user = {
      id: decoded.id,
      rol: decoded.rol
    };

    next();
  } catch (error) {
    res.status(STATUS_UNAUTHORIZED).json(
      ApiResponse.fail('Token inválido o expirado')
    );
    return;
  }
};
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        rol: 'ADMIN' | 'USUARIO';
      };
    }
  }
}
