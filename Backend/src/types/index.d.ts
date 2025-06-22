// Esto extiende el tipo de Express.Request
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
