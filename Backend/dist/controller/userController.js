"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = require("../helpers/ApiError");
const ApiRespose_1 = require("../helpers/ApiRespose");
const logger_1 = require("../helpers/logger");
const status_1 = require("../helpers/status");
const user_validation_1 = require("../schemas/usuarios/user.validation");
const userPartialSchema_1 = require("../schemas/usuarios/userPartialSchema");
const user_1 = __importDefault(require("../services/user"));
class UserController {
    constructor() {
        this.Servicio = user_1.default;
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const id = Number(req.params.id);
                const buffer = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer;
                const currentUser = req.user; // Usuario autenticado desde el middleware
                // Validación de datos
                const { error, value } = userPartialSchema_1.userPartialSchema.validate(req.body);
                if (error) {
                    res.status(400).json(ApiRespose_1.ApiResponse.fail('Error de validación', error.details[0].message));
                    return;
                }
                const partialData = value;
                // Determinar si es solicitud de admin
                const isAdminRequest = (currentUser === null || currentUser === void 0 ? void 0 : currentUser.rol) === 'ADMIN';
                // Usar this.service para acceder al servicio
                const updatedUser = yield this.Servicio.update(id, partialData, buffer, isAdminRequest);
                res.status(200).json(ApiRespose_1.ApiResponse.ok('Usuario actualizado', updatedUser));
            }
            catch (error) {
                // Manejo de errores
                if (error instanceof ApiError_1.ApiError) {
                    res.status(error.statusCode).json(ApiRespose_1.ApiResponse.fail(error.message, error.errorCode));
                }
                else {
                    console.error('Error en updateUser:', error);
                    res.status(500).json(ApiRespose_1.ApiResponse.fail('Error interno del servidor'));
                }
            }
        });
        // Enlazar métodos para conservar el contexto
        this.listActiveUsers = this.listActiveUsers.bind(this);
        this.listInactiveUsers = this.listInactiveUsers.bind(this);
        this.listUsersByRole = this.listUsersByRole.bind(this);
        this.getUserById = this.getUserById.bind(this);
        this.registrarUsuarioNormal = this.registrarUsuarioNormal.bind(this);
        this.crearUsuarioComoAdmin = this.crearUsuarioComoAdmin.bind(this);
        this.updateUserStatus = this.updateUserStatus.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.findByEmail = this.findByEmail.bind(this);
    }
    // LISTAR USUARIOS ACTIVOS
    listActiveUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.Servicio.listActive();
                res.status(200).json(ApiRespose_1.ApiResponse.ok('Usuarios activos', users));
            }
            catch (err) {
                const message = err instanceof Error ? err.message : 'Error desconocido';
                logger_1.logger.error('Error al listar usuarios activos:', message);
                res.status(500).json(ApiRespose_1.ApiResponse.fail('Error al obtener usuarios activos', message));
            }
        });
    }
    // LISTAR USUARIOS INACTIVOS
    listInactiveUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.Servicio.listInactive();
                res.status(200).json(ApiRespose_1.ApiResponse.ok('Usuarios inactivos', users));
            }
            catch (err) {
                const message = err instanceof Error ? err.message : 'Error desconocido';
                logger_1.logger.error('Error al listar usuarios inactivos:', message);
                res.status(500).json(ApiRespose_1.ApiResponse.fail('Error al obtener usuarios inactivos', message));
            }
        });
    }
    // LISTAR USUARIOS POR ROL
    listUsersByRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const role = req.params.role.toUpperCase();
                if (role !== 'ADMIN' && role !== 'USUARIO') {
                    res.status(400).json(ApiRespose_1.ApiResponse.fail('Rol inválido. Use ADMIN o USUARIO'));
                    return;
                }
                const users = yield this.Servicio.listByRole(role);
                res.status(200).json(ApiRespose_1.ApiResponse.ok(`Usuarios con rol ${role}`, users));
            }
            catch (err) {
                const message = err instanceof Error ? err.message : 'Error desconocido';
                res.status(500).json(ApiRespose_1.ApiResponse.fail('Error al obtener usuarios por rol', message));
            }
        });
    }
    // OBTENER USUARIO POR ID
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (isNaN(id)) {
                    res.status(400).json(ApiRespose_1.ApiResponse.fail('ID inválido'));
                    return;
                }
                const user = yield this.Servicio.findById(id);
                if (!user) {
                    res.status(404).json(ApiRespose_1.ApiResponse.fail('Usuario no encontrado'));
                    return;
                }
                res.status(200).json(ApiRespose_1.ApiResponse.ok('Usuario encontrado', user));
            }
            catch (err) {
                const message = err instanceof Error ? err.message : 'Error desconocido';
                res.status(500).json(ApiRespose_1.ApiResponse.fail('Error al obtener usuario por ID', message));
            }
        });
    }
    // Registrar usuario normal (público)
    registrarUsuarioNormal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const fileBuffer = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer;
                const { error, value } = user_validation_1.userSchema.validate(req.body);
                if (error) {
                    res.status(status_1.STATUS_BAD_REQUEST).json(ApiRespose_1.ApiResponse.fail('Error de validación', error.details[0].message));
                    return;
                }
                // Forzar rol USUARIO para registro público
                const userData = Object.assign(Object.assign({}, value), { rol: 'USUARIO' });
                const user = yield this.Servicio.create(userData, fileBuffer, false // No es solicitud de admin
                );
                res.status(201).json(ApiRespose_1.ApiResponse.ok('Usuario registrado correctamente', user));
            }
            catch (err) {
                if (err instanceof ApiError_1.ApiError) {
                    res.status(err.statusCode).json(ApiRespose_1.ApiResponse.fail(err.message, err.errorCode));
                }
                else {
                    const message = err instanceof Error ? err.message : 'Error desconocido';
                    logger_1.logger.error('Error al crear usuario:', message);
                    res.status(status_1.STATUS_INTERNAL_SERVER_ERROR).json(ApiRespose_1.ApiResponse.fail('Error al crear usuario', message));
                }
            }
        });
    }
    // Crear usuario como administrador (protegido)
    crearUsuarioComoAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const fileBuffer = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer;
                const { error, value } = user_validation_1.userSchema.validate(req.body);
                if (error) {
                    res.status(status_1.STATUS_BAD_REQUEST).json(ApiRespose_1.ApiResponse.fail('Error de validación', error.details[0].message));
                    return;
                }
                const user = yield this.Servicio.create(value, fileBuffer, true // Es solicitud de admin
                );
                res.status(201).json(ApiRespose_1.ApiResponse.ok('Usuario creado correctamente', user));
            }
            catch (err) {
                if (err instanceof ApiError_1.ApiError) {
                    res.status(err.statusCode).json(ApiRespose_1.ApiResponse.fail(err.message, err.errorCode));
                }
                else {
                    const message = err instanceof Error ? err.message : 'Error desconocido';
                    logger_1.logger.error('Error al crear usuario:', message);
                    res.status(status_1.STATUS_INTERNAL_SERVER_ERROR).json(ApiRespose_1.ApiResponse.fail('Error al crear usuario', message));
                }
            }
        });
    }
    // ACtivar  USUARIO
    updateUserStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const { activo } = req.body;
                if (typeof activo !== 'boolean') {
                    res.status(400).json(ApiRespose_1.ApiResponse.fail('El estado activo debe ser booleano'));
                    return;
                }
                yield this.Servicio.updateStatus(id, activo);
                res.status(200).json(ApiRespose_1.ApiResponse.ok('Estado del usuario actualizado correctamente'));
            }
            catch (err) {
                const message = err instanceof Error ? err.message : 'Error desconocido';
                logger_1.logger.error('Error al actualizar estado del usuario:', message);
                res.status(500).json(ApiRespose_1.ApiResponse.fail('Error al actualizar estado', message));
            }
        });
    }
    // ELIMINAR USUARIO (LÓGICO)
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                yield this.Servicio.delete(id);
                res.status(200).json(ApiRespose_1.ApiResponse.ok('Usuario eliminado correctamente'));
            }
            catch (err) {
                const message = err instanceof Error ? err.message : 'Error desconocido';
                logger_1.logger.error('Error al eliminar usuario:', message);
                res.status(500).json(ApiRespose_1.ApiResponse.fail('Error al eliminar usuario', message));
            }
        });
    }
    updatePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    res.status(status_1.STATUS_BAD_REQUEST).json(ApiRespose_1.ApiResponse.fail('Email y nueva contraseña son obligatorios'));
                    return;
                }
                // Corrige el nombre a this.service (minúscula)
                const message = yield this.Servicio.updatePassword(email, password);
                res.json(ApiRespose_1.ApiResponse.ok(message));
            }
            catch (error) {
                logger_1.logger.error('Error al actualizar contraseña:', error);
                if (error instanceof ApiError_1.ApiError) {
                    res.status(error.statusCode).json(ApiRespose_1.ApiResponse.fail(error.message, error.errorCode));
                }
                else {
                    res.status(status_1.STATUS_INTERNAL_SERVER_ERROR).json(ApiRespose_1.ApiResponse.fail('Error interno del servidor'));
                }
            }
        });
    }
    findByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                // Validación básica
                if (!email || typeof email !== 'string') {
                    res.status(400).json(ApiRespose_1.ApiResponse.fail('El email es requerido'));
                    return;
                }
                // Buscar usuario
                const user = yield this.Servicio.findByEmail(email);
                // Si no se encuentra
                if (!user) {
                    res.status(404).json(ApiRespose_1.ApiResponse.fail('Usuario no encontrado'));
                    return;
                }
                // Usuario encontrado
                res.status(200).json(ApiRespose_1.ApiResponse.ok('Usuario encontrado', user));
            }
            catch (err) {
                const message = err instanceof Error ? err.message : 'Error desconocido';
                logger_1.logger.error('Error al buscar usuario por email:', message);
                res.status(500).json(ApiRespose_1.ApiResponse.fail('Error al buscar usuario por email', message));
            }
        });
    }
}
exports.default = new UserController();
