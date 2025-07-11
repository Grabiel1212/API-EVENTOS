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
exports.updateUserStatus = updateUserStatus;
const client_1 = require("@prisma/client");
const ApiError_1 = require("../../helpers/ApiError");
const status_1 = require("../../helpers/status");
const prisma = new client_1.PrismaClient();
/**
 * Actualiza el estado (activo/inactivo) de un usuario.
 *
 * - Si el usuario no existe, lanza un error.
 *
 * @param {number} id - ID del usuario cuyo estado se desea actualizar.
 * @param {boolean} status - Nuevo estado del usuario (`true` para activo, `false` para inactivo).
 * @returns {Promise<void>} No retorna ningún dato. Solo actualiza el campo `activo` del usuario.
 * @throws {ApiError} Si el usuario no existe.
 */
function updateUserStatus(id, status) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.usuarios.findUnique({
            where: { id_usuario: BigInt(id) }
        });
        if (!user) {
            throw new ApiError_1.ApiError(status_1.STATUS_NOT_FOUND, 'Usuario no encontrado', 'USER_NOT_FOUND');
        }
        yield prisma.usuarios.update({
            where: { id_usuario: BigInt(id) },
            data: { activo: status }
        });
    });
}
