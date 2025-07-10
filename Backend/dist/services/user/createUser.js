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
exports.createUser = createUser;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = require("../../generated/prisma");
const ApiError_1 = require("../../helpers/ApiError");
const status_1 = require("../../helpers/status");
const cloudinaryService_1 = require("./../cloudinary/cloudinaryService");
const prisma = new prisma_1.PrismaClient();
function createUser(userData_1, buffer_1) {
    return __awaiter(this, arguments, void 0, function* (userData, buffer, isAdminRequest = false) {
        try {
            // Si es registro público, forzar rol USUARIO
            if (!isAdminRequest) {
                userData.rol = 'USUARIO';
            }
            // Validación solo aplica si es ADMIN
            if (userData.rol === 'ADMIN') {
                // Requiere que sea solicitud de admin
                if (!isAdminRequest) {
                    throw new ApiError_1.ApiError(status_1.STATUS_FORBIDDEN, 'Solo administradores pueden crear usuarios ADMIN', 'ADMIN_CREATION_FORBIDDEN');
                }
                // Validación para administradores
                if (!userData.password || userData.googleID) {
                    throw new ApiError_1.ApiError(status_1.STATUS_BAD_REQUEST, 'Los administradores deben registrarse con correo y contraseña', 'ADMIN_INVALID_REGISTRATION');
                }
            }
            // Validar método de registro para usuarios normales
            if (userData.rol === 'USUARIO') {
                const validGoogle = !!userData.googleID && !userData.password;
                const validClassic = !userData.googleID && !!userData.password;
                if (!validGoogle && !validClassic) {
                    throw new ApiError_1.ApiError(status_1.STATUS_BAD_REQUEST, 'Debe registrarse con Google o con correo y contraseña', 'INVALID_REGISTRATION_METHOD');
                }
            }
            // Verificar email único
            const exists = yield prisma.usuarios.findUnique({
                where: { correo: userData.email }
            });
            if (exists) {
                throw new ApiError_1.ApiError(status_1.STATUS_BAD_REQUEST, 'El correo electrónico ya está registrado', 'EMAIL_ALREADY_EXISTS');
            }
            // Procesar foto
            let photo = null;
            if (buffer && userData.name) {
                const { url } = yield (0, cloudinaryService_1.uploadToCloudinary)(buffer, `${Date.now()}-${userData.name}`);
                photo = url;
            }
            // Hash de contraseña
            let hashedPassword = null;
            if (userData.password) {
                hashedPassword = yield bcryptjs_1.default.hash(userData.password, 10);
            }
            // Determinar rol
            const rol = isAdminRequest ? userData.rol : 'USUARIO';
            // Crear usuario
            const created = yield prisma.usuarios.create({
                data: {
                    nombre: userData.name,
                    apellidos: userData.lastname,
                    foto_perfil: photo,
                    correo: userData.email,
                    contrasena: hashedPassword,
                    google_id: userData.googleID || null,
                    rol: rol,
                    activo: true,
                },
                select: {
                    id_usuario: true,
                    nombre: true,
                    apellidos: true,
                    foto_perfil: true,
                    correo: true,
                    contrasena: true,
                    google_id: true,
                    activo: true,
                    rol: true,
                    creado_en: true,
                },
            });
            return mapPrismaUserToModel(created);
        }
        catch (error) {
            if (error instanceof ApiError_1.ApiError) {
                throw error;
            }
            throw new ApiError_1.ApiError(status_1.STATUS_INTERNAL_SERVER_ERROR, 'Error al crear el usuario: ' + error.message, 'USER_CREATION_FAILED');
        }
    });
}
// Función auxiliar para mapear el usuario
function mapPrismaUserToModel(prismaUser) {
    var _a, _b, _c, _d;
    return {
        id: Number(prismaUser.id_usuario),
        name: (_a = prismaUser.nombre) !== null && _a !== void 0 ? _a : '',
        lastname: (_b = prismaUser.apellidos) !== null && _b !== void 0 ? _b : '',
        photo: prismaUser.foto_perfil,
        email: prismaUser.correo,
        password: prismaUser.contrasena,
        googleID: prismaUser.google_id,
        active: (_c = prismaUser.activo) !== null && _c !== void 0 ? _c : true,
        rol: prismaUser.rol,
        dateCreate: (_d = prismaUser.creado_en) !== null && _d !== void 0 ? _d : new Date(),
    };
}
