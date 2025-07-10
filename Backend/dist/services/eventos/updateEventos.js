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
exports.updateEvento = updateEvento;
const prisma_1 = require("../../generated/prisma");
const cloudinaryService_1 = require("../cloudinary/cloudinaryService");
const prisma = new prisma_1.PrismaClient();
/**
 * Actualiza un evento si el usuario tiene permisos de administrador.
 *
 * @param id - ID del evento
 * @param data - Datos parciales del evento
 * @param buffer - Imagen opcional
 * @param isAdminRequest - Si la solicitud es de un admin (por defecto: false)
 */
function updateEvento(id_1, data_1, buffer_1) {
    return __awaiter(this, arguments, void 0, function* (id, data, buffer, isAdminRequest = false) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        // Validar permisos
        if (!isAdminRequest) {
            throw new Error('No tienes permisos para actualizar eventos');
        }
        const existing = yield prisma.eventos.findUnique({
            where: { id_evento: BigInt(id) }
        });
        if (!existing) {
            throw new Error('Evento no encontrado');
        }
        let nuevaImagenUrl = existing.imagen;
        if (buffer) {
            // Eliminar imagen anterior
            if (existing.imagen) {
                const publicId = (0, cloudinaryService_1.extractPublicIdEventos)(existing.imagen);
                if (publicId) {
                    yield (0, cloudinaryService_1.deletePhotoFromCloudinary)(publicId);
                }
            }
            // Subir nueva imagen
            const uploadResult = yield (0, cloudinaryService_1.uploadToCloudinaryEventos)(buffer, (_a = data.titulo) !== null && _a !== void 0 ? _a : existing.titulo);
            nuevaImagenUrl = uploadResult.url;
        }
        // Actualizar evento
        const updated = yield prisma.eventos.update({
            where: { id_evento: BigInt(id) },
            data: {
                titulo: data.titulo,
                descripcion: data.descripcion,
                ubicacion: data.ubicacion,
                fecha_inicio: new Date((_b = data.fecha_inicio) !== null && _b !== void 0 ? _b : existing.fecha_inicio),
                fecha_fin: new Date((_c = data.fecha_fin) !== null && _c !== void 0 ? _c : existing.fecha_fin),
                precio: data.precio,
                imagen: nuevaImagenUrl,
                id_categoria: BigInt((_d = data.id_categoria) !== null && _d !== void 0 ? _d : existing.id_categoria),
                actualizado_evento: new Date()
            }
        });
        return {
            id: Number(updated.id_evento),
            titulo: updated.titulo,
            descripcion: (_e = updated.descripcion) !== null && _e !== void 0 ? _e : '',
            ubicacion: (_f = updated.ubicacion) !== null && _f !== void 0 ? _f : '',
            fecha_inicio: updated.fecha_inicio,
            fecha_fin: updated.fecha_fin,
            precio: (_g = Number(updated.precio)) !== null && _g !== void 0 ? _g : 0,
            imagen: (_h = updated.imagen) !== null && _h !== void 0 ? _h : null,
            id_categoria: Number(updated.id_categoria),
            creado_evento: (_j = updated.creado_evento) !== null && _j !== void 0 ? _j : new Date(),
            actualizado_evento: (_k = updated.actualizado_evento) !== null && _k !== void 0 ? _k : new Date()
        };
    });
}
