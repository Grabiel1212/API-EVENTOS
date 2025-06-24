import { File } from 'multer'; // importa el tipo Multer

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        rol: 'ADMIN' | 'USUARIO';
      };
      file?: File; // <-- necesario para req.file
    }
  }
}
