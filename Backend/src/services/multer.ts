// src/utils/multer.ts
import multer from 'multer';
import { Request } from 'express';

// Usamos memoria porque luego subiremos a Cloudinary
const storage = multer.memoryStorage();

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten imágenes'));
  }
};

export const upload = multer({ storage, fileFilter });
