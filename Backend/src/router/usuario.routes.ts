import express from 'express';
import multer from 'multer';
import userController from '../controller/userController'; // Sin llaves

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Almacena temporalmente para Cloudinary

// Rutas
router.post('/Crear', upload.single('photo'), userController.createUser); // http://localhost:3000/api/v1/user/Crear para crear un usuario
router.get('/', userController.getAllUsers);   // http://localhost:3000/api/v1/user para poder visualizar todos los usuarios

export default router;
