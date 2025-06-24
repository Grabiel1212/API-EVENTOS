import express from 'express';
import { AuthController } from '../aut/auth.controller';
import userController from '../controller/userController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { upload } from '../middlewares/multer';

const router = express.Router();

// ==============================
// Rutas de Autenticación y Recuperación
// ==============================

// Login
router.post('/login', AuthController.loginUser);

// Buscar por correo para recuperación
router.post('/buscarEmail', userController.findByEmail);

// Actualizar contraseña (recuperación)
router.post('/reset-password', userController.updatePassword);


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

// Registro de usuario normal
router.post(
  '/registro',
  upload.single('photo'),
  userController.registrarUsuarioNormal
);

// Crear usuario como administrador (ruta protegida)
router.post(
  '/admin/usuarios',
  authMiddleware,
  upload.single('photo'),
  userController.crearUsuarioComoAdmin
);


// ==============================
// Rutas PUT/PATCH - Actualizar
// ==============================

// Actualizar información de usuario (protegida)
router.patch(
  '/actualizar/:id',
  authMiddleware,
  upload.single('photo'),
  userController.updateUser
);

// Actualizar estado activo/inactivo
// PUT http://localhost:3000/api/v1/user/1/estado
router.put('/:id/estado', userController.updateUserStatus);


// ==============================
// Rutas DELETE - Eliminación lógica
// ==============================

// Eliminar usuario (lógicamente)
router.delete('/:id', userController.deleteUser);

export default router;
