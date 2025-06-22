import { Request } from 'express';
import jwt from 'jsonwebtoken';
import env from '../config/env';

export function getCurrentUserRole(req: Request): string | null {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return null;
  
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as { rol: string };
    return decoded.rol;
  } catch {
    return null;
  }
}