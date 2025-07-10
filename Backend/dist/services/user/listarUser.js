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
exports.listActiveUsers = listActiveUsers;
exports.listInactiveUsers = listInactiveUsers;
exports.listUsersByRole = listUsersByRole;
const prisma_1 = require("../../generated/prisma");
const prisma = new prisma_1.PrismaClient();
/**
* Lista todos los usuarios con estado activo (activo = true).
* @returns Lista de usuarios activos.
*/
function listActiveUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield prisma.usuarios.findMany({
            where: { activo: true }
        });
        return users.map(user => {
            var _a, _b, _c, _d, _e, _f, _g;
            return ({
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
            });
        });
    });
}
/**
 * Lista todos los usuarios con estado inactivo (activo = false).
 * @returns Lista de usuarios inactivos.
 */
function listInactiveUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield prisma.usuarios.findMany({
            where: { activo: false }
        });
        return users.map(user => {
            var _a, _b, _c, _d, _e, _f, _g;
            return ({
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
            });
        });
    });
}
/**
 * Lista los usuarios según su rol ('ADMIN' o 'USUARIO').
 * @param role Rol del usuario (ADMIN o USUARIO).
 * @returns Lista de usuarios con el rol indicado.
 */
function listUsersByRole(role) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield prisma.usuarios.findMany({
            where: { rol: role, activo: true },
        });
        return users.map(user => {
            var _a, _b, _c, _d, _e, _f, _g;
            return ({
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
            });
        });
    });
}
