import express from 'express';

import userController from '../controller/userController';
import { upload } from '../middlewares/multer';

const router = express.Router();


// Rutas
router.post('/crear', upload.single('photo'), userController.createUser);
//router.get('/', userController.getAllUsers);   // http://localhost:3000/api/v1/user para poder visualizar todos los usuarios

router.put('/:id/estado',userController.updateUserStatus ); // http://localhost:3000/api/v1/user/1/estado  para actualizar el estado de un usuario
// Actualizar datos del usuario (incluye imagen)
router.put('/usuarios/:id', upload.single('foto'), userController.updateUser); // http://localhost:3000/api/v1/user/usuarios/1 actualizar un usuario completo

// Eliminar lógicamente al usuario
router.delete('/:id', userController.deleteUser); // http://localhost:3000/api/v1/user/1 eliminar un usuario lógicamente

// Buscar usuario por ID
router.get('/:id', userController.getUserById); // http://localhost:3000/api/v1/user/1 obtener un usuario por ID

// Listar usuarios activos
router.get('/activos', userController.listActiveUsers); // http://localhost:3000/api/v1/user/activos listar usuarios activos

// Listar usuarios inactivos
router.get('/inactivos', userController.listInactiveUsers); // http://localhost:3000/api/v1/user/inactivos listar usuarios inactivos

// Listar usuarios por rol
router.get('/rol/:role', userController.listUsersByRole); // http://localhost:3000/api/v1/user/rol/ADMIN listar usuarios por rol (ADMIN o USUARIO)

export default router;
