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
exports.deleteUser = deleteUser;
const client_1 = require("@prisma/client");
const ApiError_1 = require("../../helpers/ApiError");
const status_1 = require("../../helpers/status");
const prisma = new client_1.PrismaClient();
/**
 * Realiza la eliminación lógica de un usuario.
 *
 * En lugar de borrar el registro de la base de datos, se actualiza el campo `activo` a `false`.
 *
 * @param {number} id - ID del usuario a desactivar.
 * @throws {ApiError} Si el usuario no existe o ya está inactivo.
 * @returns {Promise<void>} No retorna ningún dato. Solo realiza la actualización.
 */
function deleteUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield prisma.usuarios.findUnique({
            where: { id_usuario: BigInt(id) }
        });
        if (!existingUser) {
            throw new ApiError_1.ApiError(status_1.STATUS_NOT_FOUND, 'Usuario no encontrado', 'USER_NOT_FOUND');
        }
        if (!existingUser.activo) {
            throw new ApiError_1.ApiError(status_1.STATUS_BAD_REQUEST, 'El usuario ya está inactivo', 'USER_ALREADY_INACTIVE');
        }
        yield prisma.usuarios.update({
            where: { id_usuario: BigInt(id) },
            data: { activo: false }
        });
    });
}
