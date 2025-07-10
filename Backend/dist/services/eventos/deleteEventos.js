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
exports.deleteEventos = deleteEventos;
const prisma_1 = require("../../generated/prisma");
const cloudinaryService_1 = require("../cloudinary/cloudinaryService");
const prisma = new prisma_1.PrismaClient();
/**
 * Elimina un evento y su imagen asociada de Cloudinary (si existe).
 *
 * @param {number} id - ID del evento a eliminar.
 * @throws {Error} Si el evento no existe.
 * @returns {Promise<void>}
 */
function deleteEventos(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingEvento = yield prisma.eventos.findUnique({
            where: { id_evento: BigInt(id) }
        });
        if (!existingEvento) {
            throw new Error('Evento no encontrado');
        }
        // Eliminar imagen de Cloudinary si existe
        if (existingEvento.imagen) {
            const publicId = (0, cloudinaryService_1.extractPublicIdEventos)(existingEvento.imagen);
            if (publicId) {
                yield (0, cloudinaryService_1.deletePhotoFromCloudinary)(publicId);
            }
        }
        // Eliminar evento de la base de datos
        yield prisma.eventos.delete({
            where: { id_evento: BigInt(id) }
        });
    });
}
