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
exports.updateRegularUser = updateRegularUser;
exports.updateUserAsAdmin = updateUserAsAdmin;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = require("../../generated/prisma");
const ApiError_1 = require("../../helpers/ApiError");
const status_1 = require("../../helpers/status");
const cloudinaryService_1 = require("../cloudinary/cloudinaryService");
const prisma = new prisma_1.PrismaClient();
/**
 * Procesa una nueva imagen y elimina la anterior si es necesario.
 */
function processPhoto(buffer, name, previousUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!buffer || !name)
            return previousUrl !== null && previousUrl !== void 0 ? previousUrl : null;
        if (previousUrl) {
            const publicId = (0, cloudinaryService_1.extractPublicId)(previousUrl);
            if (publicId) {
                yield (0, cloudinaryService_1.deletePhotoFromCloudinary)(publicId);
            }
        }
        const filename = `${Date.now()}-${name}`;
        const { url } = yield (0, cloudinaryService_1.uploadToCloudinary)(buffer, filename);
        return url;
    });
}
/**
 * Actualización para USUARIOS regulares (solo nombre, apellido y foto)
 */
function updateRegularUser(id, data, buffer) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        const existingUser = yield prisma.usuarios.findUnique({
            where: { id_usuario: BigInt(id) },
        });
        // Validaciones básicas
        if (!existingUser)
            throw new Error('Usuario no encontrado');
        if (!existingUser.activo)
            throw new Error('Usuario inactivo');
        // Permitir tanto USUARIOS como ADMINS actualizar sus propios datos
        if (existingUser.rol !== 'USUARIO' && existingUser.rol !== 'ADMIN') {
            throw new ApiError_1.ApiError(status_1.STATUS_FORBIDDEN, 'Solo usuarios con rol USUARIO o ADMIN pueden actualizar sus datos', 'ROLE_NOT_ALLOWED');
        }
        // Validar campos permitidos (solo nombre, apellido)
        const allowedFields = ['name', 'lastname'];
        const invalidFields = Object.keys(data).filter(key => !allowedFields.includes(key));
        if (invalidFields.length > 0) {
            throw new ApiError_1.ApiError(status_1.STATUS_BAD_REQUEST, `Campos no permitidos: ${invalidFields.join(', ')}`, 'INVALID_FIELDS');
        }
        const newPhoto = yield processPhoto(buffer, (_b = (_a = data.name) !== null && _a !== void 0 ? _a : existingUser.nombre) !== null && _b !== void 0 ? _b : undefined, (_c = existingUser.foto_perfil) !== null && _c !== void 0 ? _c : undefined);
        const updatedUser = yield prisma.usuarios.update({
            where: { id_usuario: BigInt(id) },
            data: {
                nombre: (_d = data.name) !== null && _d !== void 0 ? _d : undefined,
                apellidos: (_e = data.lastname) !== null && _e !== void 0 ? _e : undefined,
                foto_perfil: newPhoto !== null && newPhoto !== void 0 ? newPhoto : undefined,
            },
        });
        return mapPrismaUserToModel(updatedUser);
    });
}
/**
 * Actualización para ADMINISTRADORES (todos los campos excepto googleID)
 */
function updateUserAsAdmin(id_1, data_1, buffer_1) {
    return __awaiter(this, arguments, void 0, function* (id, data, buffer, isAdminRequest = false) {
        var _a, _b, _c, _d, _e, _f;
        // Validación para actualización a rol ADMIN
        if (data.rol === 'ADMIN' && !isAdminRequest) {
            throw new ApiError_1.ApiError(status_1.STATUS_FORBIDDEN, 'Solo administradores pueden actualizar usuarios a rol ADMIN', 'ADMIN_UPDATE_FORBIDDEN');
        }
        // Validar campos permitidos
        const allowedFields = ['name', 'lastname', 'password', 'rol'];
        const invalidFields = Object.keys(data).filter(key => !allowedFields.includes(key));
        if (invalidFields.length > 0) {
            throw new ApiError_1.ApiError(status_1.STATUS_BAD_REQUEST, `Campos no permitidos: ${invalidFields.join(', ')}`, 'INVALID_FIELDS');
        }
        const existingUser = yield prisma.usuarios.findUnique({
            where: { id_usuario: BigInt(id) },
        });
        if (!existingUser)
            throw new Error('Usuario no encontrado');
        // Verificar si es usuario de Google
        const isGoogleUser = existingUser.google_id && existingUser.google_id.trim() !== '';
        // Validar actualización de contraseña para usuarios de Google
        if (isGoogleUser && data.password) {
            throw new ApiError_1.ApiError(status_1.STATUS_FORBIDDEN, 'No se puede actualizar la contraseña de usuarios registrados con Google', 'GOOGLE_PASSWORD_UPDATE_FORBIDDEN');
        }
        // Procesar contraseña si se proporciona y es usuario normal
        let hashedPassword;
        if (data.password && !isGoogleUser) {
            hashedPassword = yield bcryptjs_1.default.hash(data.password, 10);
        }
        const newPhoto = yield processPhoto(buffer, (_b = (_a = data.name) !== null && _a !== void 0 ? _a : existingUser.nombre) !== null && _b !== void 0 ? _b : undefined, (_c = existingUser.foto_perfil) !== null && _c !== void 0 ? _c : undefined);
        const updatedUser = yield prisma.usuarios.update({
            where: { id_usuario: BigInt(id) },
            data: {
                nombre: (_d = data.name) !== null && _d !== void 0 ? _d : undefined,
                apellidos: (_e = data.lastname) !== null && _e !== void 0 ? _e : undefined,
                contrasena: hashedPassword !== null && hashedPassword !== void 0 ? hashedPassword : undefined,
                rol: (_f = data.rol) !== null && _f !== void 0 ? _f : undefined,
                foto_perfil: newPhoto !== null && newPhoto !== void 0 ? newPhoto : undefined,
            },
        });
        return mapPrismaUserToModel(updatedUser);
    });
}
/**
 * Mapea el usuario de Prisma al modelo Users
 */
function mapPrismaUserToModel(prismaUser) {
    var _a, _b, _c, _d, _e;
    return {
        id: Number(prismaUser.id_usuario),
        name: (_a = prismaUser.nombre) !== null && _a !== void 0 ? _a : '',
        lastname: (_b = prismaUser.apellidos) !== null && _b !== void 0 ? _b : '',
        email: prismaUser.correo,
        photo: prismaUser.foto_perfil,
        password: prismaUser.contrasena,
        googleID: prismaUser.google_id,
        active: (_c = prismaUser.activo) !== null && _c !== void 0 ? _c : true,
        rol: (_d = prismaUser.rol) !== null && _d !== void 0 ? _d : 'USUARIO',
        dateCreate: (_e = prismaUser.creado_en) !== null && _e !== void 0 ? _e : new Date(),
    };
}
