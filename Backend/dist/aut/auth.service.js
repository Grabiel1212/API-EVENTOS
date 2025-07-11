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
exports.AuthService = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../config/env"));
const ApiError_1 = require("../helpers/ApiError");
const status_1 = require("../helpers/status"); // Asegúrate que el path sea correcto
const prisma = new client_1.PrismaClient();
/**
 * Servicio de Autenticación
 * Encapsula la lógica de login para usuarios ADMIN y USUARIO,
 * permitiendo acceso por Google o por correo/contraseña.
 */
class AuthService {
    static login(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password, googleID, }) {
            // Validación básica: al menos email o Google ID
            if (!email && !googleID) {
                throw new ApiError_1.ApiError(status_1.STATUS_BAD_REQUEST, 'Se requiere email o Google ID.', 'LOGIN_MISSING_CREDENTIALS');
            }
            // Buscar usuario por correo o Google ID
            const user = email
                ? yield prisma.usuarios.findUnique({ where: { correo: email } })
                : yield prisma.usuarios.findUnique({ where: { google_id: googleID } });
            if (!user) {
                throw new ApiError_1.ApiError(status_1.STATUS_NOT_FOUND, 'Usuario no encontrado.', 'USER_NOT_FOUND');
            }
            if (!user.activo) {
                throw new ApiError_1.ApiError(status_1.STATUS_FORBIDDEN, 'Usuario inactivo. Contacte al administrador.', 'USER_INACTIVE');
            }
            // Lógica para ADMIN
            if (user.rol === 'ADMIN') {
                if (!email || !password) {
                    throw new ApiError_1.ApiError(status_1.STATUS_BAD_REQUEST, 'Los administradores deben iniciar sesión con email y contraseña.', 'ADMIN_MISSING_CREDENTIALS');
                }
                if (!user.contrasena) {
                    throw new ApiError_1.ApiError(status_1.STATUS_FORBIDDEN, 'Contraseña del administrador no configurada.', 'ADMIN_NO_PASSWORD');
                }
                const validPassword = yield bcrypt_1.default.compare(password, user.contrasena);
                if (!validPassword) {
                    throw new ApiError_1.ApiError(status_1.STATUS_UNAUTHORIZED, 'Contraseña incorrecta.', 'INVALID_PASSWORD');
                }
            }
            // Lógica para USUARIO
            if (user.rol === 'USUARIO') {
                if (googleID) {
                    if (!user.google_id || user.google_id !== googleID) {
                        throw new ApiError_1.ApiError(status_1.STATUS_UNAUTHORIZED, 'El Google ID no coincide.', 'INVALID_GOOGLE_ID');
                    }
                }
                else {
                    if (!user.contrasena) {
                        throw new ApiError_1.ApiError(status_1.STATUS_FORBIDDEN, 'Este usuario no tiene contraseña. Use Google para iniciar sesión.', 'USER_NO_PASSWORD');
                    }
                    if (!password) {
                        throw new ApiError_1.ApiError(status_1.STATUS_BAD_REQUEST, 'Se requiere contraseña para iniciar sesión.', 'PASSWORD_REQUIRED');
                    }
                    const validPassword = yield bcrypt_1.default.compare(password, user.contrasena);
                    if (!validPassword) {
                        throw new ApiError_1.ApiError(status_1.STATUS_UNAUTHORIZED, 'Contraseña incorrecta.', 'INVALID_PASSWORD');
                    }
                }
            }
            // Generar token JWT válido por 2 horas
            const token = jsonwebtoken_1.default.sign({
                id: user.id_usuario.toString(),
                rol: user.rol,
            }, env_1.default.JWT_SECRET, { expiresIn: '2h' });
            return {
                token,
                user: {
                    id: user.id_usuario.toString(),
                    name: user.nombre,
                    role: user.rol,
                    email: user.correo,
                    active: user.activo,
                    photo: user.foto_perfil,
                    dateCreate: user.creado_en,
                },
            };
        });
    }
}
exports.AuthService = AuthService;
