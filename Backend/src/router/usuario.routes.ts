import express from 'express';

import userController from '../controller/userController';
import { upload } from '../middlewares/multer';

const router = express.Router();


// Rutas
router.post('/crear', upload.single('photo'), userController.createUser);
//router.get('/', userController.getAllUsers);   // http://localhost:3000/api/v1/user para poder visualizar todos los usuarios


export default router;
