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
exports.findUserById = findUserById;
const client_1 = require("@prisma/client");
const ApiError_1 = require("../../helpers/ApiError");
const status_1 = require("../../helpers/status");
const prisma = new client_1.PrismaClient();
/**
 * Busca un usuario por su ID en la base de datos.
 *
 * @param {number} id - ID del usuario a buscar.
 * @returns {Promise<Users | null>} Retorna un objeto `Users` con toda la información del usuario si se encuentra.
 * @throws {ApiError} Si el usuario no existe.
 */
function findUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g;
        const user = yield prisma.usuarios.findUnique({
            where: { id_usuario: BigInt(id) }
        });
        if (!user) {
            throw new ApiError_1.ApiError(status_1.STATUS_NOT_FOUND, 'Usuario no encontrado', 'USER_NOT_FOUND');
        }
        return {
            id: Number(user.id_usuario),
            name: (_a = user.nombre) !== null && _a !== void 0 ? _a : '',
            lastname: (_b = user.apellidos) !== null && _b !== void 0 ? _b : '',
            email: user.correo,
            photo: (_c = user.foto_perfil) !== null && _c !== void 0 ? _c : null,
            password: (_d = user.contrasena) !== null && _d !== void 0 ? _d : null,
            googleID: (_e = user.google_id) !== null && _e !== void 0 ? _e : null,
            active: (_f = user.activo) !== null && _f !== void 0 ? _f : false,
            rol: user.rol,
            dateCreate: (_g = user.creado_en) !== null && _g !== void 0 ? _g : new Date()
        };
    });
}
