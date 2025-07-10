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
exports.updatePassword = updatePassword;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = require("../../generated/prisma");
const ApiError_1 = require("../../helpers/ApiError");
const status_1 = require("../../helpers/status");
const prisma = new prisma_1.PrismaClient();
function updatePassword(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        // Validar que la nueva contraseña no esté vacía
        if (!password || password.trim() === '') {
            throw new ApiError_1.ApiError(status_1.STATUS_BAD_REQUEST, 'La nueva contraseña no puede estar vacía', 'EMPTY_PASSWORD');
        }
        // Buscar usuario por email
        const user = yield prisma.usuarios.findUnique({
            where: { correo: email }
        });
        // Validar existencia del usuario
        if (!user) {
            throw new ApiError_1.ApiError(status_1.STATUS_BAD_REQUEST, 'Este correo no está registrado', 'EMAIL_NOT_FOUND');
        }
        // Validar que la cuenta esté activa
        if (user.activo !== true) {
            throw new ApiError_1.ApiError(status_1.STATUS_FORBIDDEN, 'Esta cuenta está inactiva. No puede actualizar la contraseña.', 'INACTIVE_ACCOUNT');
        }
        // Validar que no esté asociado a cuenta Google
        if (user.google_id && user.google_id.trim() !== '') {
            throw new ApiError_1.ApiError(status_1.STATUS_FORBIDDEN, 'Este correo está vinculado a una cuenta de Google. No puede recuperar la contraseña manualmente.', 'GOOGLE_ACCOUNT_LINKED');
        }
        // Validar que el rol sea USUARIO
        if (user.rol !== 'USUARIO') {
            throw new ApiError_1.ApiError(status_1.STATUS_FORBIDDEN, 'Solo los usuarios con rol USUARIO pueden recuperar su contraseña', 'ROLE_NOT_ALLOWED');
        }
        // Encriptar la nueva contraseña
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Actualizar contraseña en la base de datos
        yield prisma.usuarios.update({
            where: { id_usuario: user.id_usuario },
            data: { contrasena: hashedPassword }
        });
        // Retornar solo un mensaje
        return 'Contraseña actualizada correctamente';
    });
}
