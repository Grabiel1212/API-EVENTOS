"use strict";
// src/middlewares/multer.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
/**
 * Almacenamiento en memoria para archivos cargados.
 *
 * `memoryStorage` mantiene los archivos en memoria como `Buffer`,
 * lo cual es útil para procesarlos directamente (por ejemplo, subir a Cloudinary).
 */
const storage = multer_1.default.memoryStorage();
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
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    }
    else {
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
exports.upload = (0, multer_1.default)({ storage, fileFilter });
