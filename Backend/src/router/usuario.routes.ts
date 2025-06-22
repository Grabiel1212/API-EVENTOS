import express from 'express';
import { AuthController } from '../aut/auth.controller';
import userController from '../controller/userController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { upload } from '../middlewares/multer';

const router = express.Router();


router.post('/login', AuthController.loginUser);


// ==============================
// Rutas GET - Lectura
// ==============================

// Listar usuarios activos
// GET http://localhost:3000/api/v1/user/activos
router.get('/activos', userController.listActiveUsers);

// Listar usuarios inactivos
// GET http://localhost:3000/api/v1/user/inactivos
router.get('/inactivos', userController.listInactiveUsers);

// Listar usuarios por rol (ADMIN o USUARIO)
// GET http://localhost:3000/api/v1/user/rol/ADMIN
router.get('/rol/:role', userController.listUsersByRole);

// Buscar usuario por ID
// GET http://localhost:3000/api/v1/user/1
router.get('/:id', userController.getUserById);


// ==============================
// Rutas POST - Crear
// ==============================


router.post(
  '/registro',
  upload.single('photo'),
  userController.registrarUsuarioNormal
);

// Ruta protegida para creación de usuarios por administradores
router.post(
  '/admin/usuarios',
  authMiddleware, // Middleware de autenticación
  upload.single('photo'),
  userController.crearUsuarioComoAdmin
);


// ==============================
// Rutas PUT/PATCH - Actualizar
// ==============================

// Actualizar estado (activo/inactivo)
// PUT http://localhost:3000/api/v1/user/1/estado
router.put('/:id/estado', userController.updateUserStatus);

// Actualizar datos parciales del usuario (nombre, email, foto, etc.)
// PATCH http://localhost:3000/api/v1/user/usuarios/1
router.patch('/update/:id', upload.single('photo'), userController.updateUser);


// ==============================
// Rutas DELETE - Eliminación lógica
// ==============================

// Eliminar usuario lógicamente
// DELETE http://localhost:3000/api/v1/user/1
router.delete('/:id', userController.deleteUser);


router.post('/reset-password',userController.updatePassword)

export default router;
