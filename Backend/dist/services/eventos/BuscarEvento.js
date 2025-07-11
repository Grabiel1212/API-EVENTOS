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
exports.buscarEventosPorNombre = buscarEventosPorNombre;
const client_1 = require("@prisma/client");
const fuse_js_1 = __importDefault(require("fuse.js"));
const prisma = new client_1.PrismaClient();
/**
 * Busca eventos por nombre con coincidencia parcial e insensible a mayúsculas/minúsculas.
 *
 * @param nombre - Parte del nombre del evento a buscar.
 * @returns Lista de eventos que coinciden con el nombre.
 */
function buscarEventosPorNombre(nombre) {
    return __awaiter(this, void 0, void 0, function* () {
        const eventos = yield prisma.eventos.findMany();
        const fuse = new fuse_js_1.default(eventos, {
            keys: ['titulo'],
            threshold: 0.4,
        });
        const resultado = fuse.search(nombre);
        return resultado.map(({ item }) => {
            var _a, _b, _c, _d, _e;
            const evento = item; // 👈 aseguramos que no es null
            return {
                id: Number(evento.id_evento),
                titulo: evento.titulo,
                descripcion: (_a = evento.descripcion) !== null && _a !== void 0 ? _a : '',
                ubicacion: (_b = evento.ubicacion) !== null && _b !== void 0 ? _b : '',
                fecha_inicio: evento.fecha_inicio,
                fecha_fin: evento.fecha_fin,
                precio: Number(evento.precio) || 0,
                imagen: (_c = evento.imagen) !== null && _c !== void 0 ? _c : '',
                id_categoria: Number(evento.id_categoria),
                creado_evento: (_d = evento.creado_evento) !== null && _d !== void 0 ? _d : new Date(),
                actualizado_evento: (_e = evento.actualizado_evento) !== null && _e !== void 0 ? _e : new Date(),
            };
        });
    });
}
