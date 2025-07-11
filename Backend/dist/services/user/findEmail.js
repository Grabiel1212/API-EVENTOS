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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarCuentaParaRecuperacion = verificarCuentaParaRecuperacion;
const client_1 = require("@prisma/client");
const ApiError_1 = require("../../helpers/ApiError");
const status_1 = require("../../helpers/status");
const prisma = new client_1.PrismaClient();
function verificarCuentaParaRecuperacion(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.usuarios.findUnique({
            where: { correo: email }
        });
        if (!user) {
            throw new ApiError_1.ApiError(status_1.STATUS_NOT_FOUND, 'Este correo no está registrado', 'USER_NOT_FOUND');
        }
        if (user.activo !== true) {
            throw new ApiError_1.ApiError(status_1.STATUS_FORBIDDEN, 'Esta cuenta está inactiva', 'ACCOUNT_INACTIVE');
        }
        if (user.google_id && user.google_id.trim() !== '') {
            throw new ApiError_1.ApiError(status_1.STATUS_FORBIDDEN, 'Esta cuenta está asociada a Google', 'GOOGLE_ACCOUNT');
        }
        if (user.rol !== 'USUARIO') {
            throw new ApiError_1.ApiError(status_1.STATUS_FORBIDDEN, 'Solo los usuarios con rol USUARIO pueden recuperar su contraseña', 'INVALID_ROLE');
        }
        return true; // Todas las validaciones pasaron
    });
}
