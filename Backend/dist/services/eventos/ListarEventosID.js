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
exports.ListarEventosID = ListarEventosID;
const prisma_1 = require("../../generated/prisma"); // ✅ Asegúrate de importar esto
const prisma = new prisma_1.PrismaClient();
/**
 * Busca un Evento por su ID en la base de datos.
 *
 * @param {number} id - ID del Evento a buscar.
 * @returns {Promise<Users | null>} Retorna un objeto `Users` con toda la información del usuario si se encuentra.
 * @throws {Error} Si el Evento no existe.
 */
function ListarEventosID(id) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        const evento = yield prisma.eventos.findUnique({
            where: { id_evento: BigInt(id) }
        });
        if (!evento) {
            throw new Error('Evento no encontrado');
        }
        return {
            id: Number(evento.id_evento),
            titulo: evento.titulo,
            descripcion: (_a = evento.descripcion) !== null && _a !== void 0 ? _a : undefined,
            ubicacion: (_b = evento.ubicacion) !== null && _b !== void 0 ? _b : undefined,
            fecha_inicio: evento.fecha_inicio,
            fecha_fin: evento.fecha_fin,
            precio: evento.precio ? Number(evento.precio) : undefined,
            imagen: (_c = evento.imagen) !== null && _c !== void 0 ? _c : undefined,
            creado_evento: (_d = evento.creado_evento) !== null && _d !== void 0 ? _d : new Date(),
            actualizado_evento: (_e = evento.actualizado_evento) !== null && _e !== void 0 ? _e : new Date(),
            id_categoria: Number(evento.id_categoria)
        };
    });
}
