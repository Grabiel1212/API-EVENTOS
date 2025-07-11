"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../aut/auth.controller");
const userController_1 = __importDefault(require("../controller/userController"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const multer_1 = require("../middlewares/multer");
const router = express_1.default.Router();
// ==============================
// Rutas de Autenticación y Recuperación
// ==============================
// Login
router.post('/login', auth_controller_1.AuthController.loginUser);
// Buscar por correo para recuperación
router.post('/buscarEmail', userController_1.default.findByEmail);
// Actualizar contraseña (recuperación)
router.post('/reset-password', userController_1.default.updatePassword);
// ==============================
// Rutas GET - Lectura
// ==============================
// Listar usuarios activos
// GET http://localhost:3000/api/v1/user/activos
router.get('/activos', userController_1.default.listActiveUsers);
// Listar usuarios inactivos
// GET http://localhost:3000/api/v1/user/inactivos
router.get('/inactivos', userController_1.default.listInactiveUsers);
// Listar usuarios por rol (ADMIN o USUARIO)
// GET http://localhost:3000/api/v1/user/rol/ADMIN
router.get('/rol/:role', userController_1.default.listUsersByRole);
// Buscar usuario por ID
// GET http://localhost:3000/api/v1/user/1
router.get('/:id', userController_1.default.getUserById);
// ==============================
// Rutas POST - Crear
// ==============================
// Registro de usuario normal
router.post('/registro', multer_1.upload.single('photo'), userController_1.default.registrarUsuarioNormal);
// Crear usuario como administrador (ruta protegida)
router.post('/admin/registro', authMiddleware_1.authMiddleware, multer_1.upload.single('photo'), userController_1.default.crearUsuarioComoAdmin);
// ==============================
// Rutas PUT/PATCH - Actualizar
// ==============================
// Actualizar información de usuario (protegida)
router.patch('/actualizar/:id', authMiddleware_1.authMiddleware, multer_1.upload.single('photo'), userController_1.default.updateUser);
// Actualizar estado activo/inactivo
// PUT http://localhost:3000/api/v1/user/1/estado
router.put('/:id/estado', userController_1.default.updateUserStatus);
// ==============================
// Rutas DELETE - Eliminación lógica
// ==============================
// Eliminar usuario (lógicamente)
router.delete('/:id', userController_1.default.deleteUser);
exports.default = router;
