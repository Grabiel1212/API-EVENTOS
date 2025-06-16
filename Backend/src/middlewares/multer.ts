// src/middlewares/multer.ts

import { Request } from 'express';
import multer from 'multer';

/**
 * Almacenamiento en memoria para archivos cargados.
 * 
 * `memoryStorage` mantiene los archivos en memoria como `Buffer`,
 * lo cual es útil para procesarlos directamente (por ejemplo, subir a Cloudinary).
 */
const storage = multer.memoryStorage();

/**
 * Filtro personalizado para aceptar únicamente archivos de imagen.
 *
 * - Si el archivo tiene un tipo MIME que comienza con `image/`, se acepta.
 * - De lo contrario, se rechaza con un error.
 *
 * @param {Request} req - Objeto de solicitud HTTP.
 * @param {Express.Multer.File} file - Archivo cargado.
 * @param {multer.FileFilterCallback} cb - Callback que determina si se acepta o rechaza el archivo.
 */
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten imágenes')); // Rechazar si no es imagen
  }
};

/**
 * Middleware de subida de archivos usando multer.
 * 
 * - Almacena los archivos en memoria (no en disco).
 * - Solo permite archivos de imagen (JPEG, PNG, etc.).
 * 
 * Este middleware se puede usar en las rutas como:
 * ```ts
 * router.post('/usuario', upload.single('foto'), controller.createUser);
 * ```
 */
export const upload = multer({ storage, fileFilter });
