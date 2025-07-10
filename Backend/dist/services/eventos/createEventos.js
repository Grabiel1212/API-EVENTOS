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
exports.createEventos = createEventos;
const prisma_1 = require("../../generated/prisma");
const ApiError_1 = require("../../helpers/ApiError");
const status_1 = require("../../helpers/status");
const cloudinaryService_1 = require("../cloudinary/cloudinaryService");
const prisma = new prisma_1.PrismaClient();
/**
 * Crea un nuevo evento en la base de datos.
 *
 * @param eventosData - Datos del evento a crear.
 * @param buffer - Imagen como buffer, si se subió una.
 * @param isAdminRequest - Si es una solicitud de un administrador.
 * @returns El evento creado.
 */
function createEventos(eventosData_1, buffer_1) {
    return __awaiter(this, arguments, void 0, function* (eventosData, buffer, isAdminRequest = false) {
        var _a;
        try {
            // 🔐 Verifica permisos si el evento fuera "ADMIN" (en caso se use rol en eventos)
            if (eventosData.rol === 'ADMIN' && !isAdminRequest) {
                throw new ApiError_1.ApiError(status_1.STATUS_FORBIDDEN, 'Solo administradores pueden crear eventos ADMIN', 'ADMIN_CREATION_FORBIDDEN');
            }
            // 🔍 Verifica duplicidad por título
            const exists = yield prisma.eventos.findFirst({
                where: { titulo: eventosData.titulo }
            });
            if (exists) {
                throw new ApiError_1.ApiError(status_1.STATUS_BAD_REQUEST, 'El evento ya existe', 'EVENTO_DUPLICADO');
            }
            // ☁️ Subir imagen a Cloudinary si se recibió buffer
            if (buffer) {
                const uploadResult = yield (0, cloudinaryService_1.uploadToCloudinaryEventos)(buffer, eventosData.titulo);
                eventosData.imagen = uploadResult.url;
            }
            // 🕒 Asignar fechas automáticas
            const now = new Date();
            // 📦 Crear el evento
            const eventoCreado = yield prisma.eventos.create({
                data: {
                    titulo: eventosData.titulo,
                    descripcion: eventosData.descripcion,
                    ubicacion: eventosData.ubicacion,
                    fecha_inicio: eventosData.fecha_inicio,
                    fecha_fin: eventosData.fecha_fin,
                    precio: (_a = eventosData.precio) !== null && _a !== void 0 ? _a : 0,
                    imagen: eventosData.imagen,
                    id_categoria: BigInt(eventosData.id_categoria),
                    creado_evento: now,
                    actualizado_evento: now
                }
            });
            return mapPrismaEventoToModel(eventoCreado);
        }
        catch (error) {
            if (error instanceof ApiError_1.ApiError) {
                throw error;
            }
            throw new ApiError_1.ApiError(status_1.STATUS_INTERNAL_SERVER_ERROR, 'Error al crear el evento: ' + error.message, 'EVENT_CREATION_FAILED');
        }
    });
}
/**
 * Mapea el evento de Prisma a la interfaz del modelo.
 */
function mapPrismaEventoToModel(prismaEvento) {
    var _a, _b, _c, _d, _e, _f;
    return {
        id: Number(prismaEvento.id_evento),
        titulo: (_a = prismaEvento.titulo) !== null && _a !== void 0 ? _a : '',
        descripcion: (_b = prismaEvento.descripcion) !== null && _b !== void 0 ? _b : '',
        ubicacion: (_c = prismaEvento.ubicacion) !== null && _c !== void 0 ? _c : '',
        fecha_inicio: prismaEvento.fecha_inicio,
        fecha_fin: prismaEvento.fecha_fin,
        precio: prismaEvento.precio ? Number(prismaEvento.precio) : 0,
        imagen: (_d = prismaEvento.imagen) !== null && _d !== void 0 ? _d : '',
        id_categoria: Number(prismaEvento.id_categoria),
        creado_evento: (_e = prismaEvento.creado_evento) !== null && _e !== void 0 ? _e : new Date(),
        actualizado_evento: (_f = prismaEvento.actualizado_evento) !== null && _f !== void 0 ? _f : new Date()
    };
}
