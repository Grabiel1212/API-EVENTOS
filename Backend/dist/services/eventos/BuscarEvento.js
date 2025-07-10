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
const fuse_js_1 = __importDefault(require("fuse.js"));
const prisma_1 = require("../../generated/prisma");
const prisma = new prisma_1.PrismaClient();
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
            return ({
                id: Number(item.id_evento),
                titulo: item.titulo,
                descripcion: (_a = item.descripcion) !== null && _a !== void 0 ? _a : '',
                ubicacion: (_b = item.ubicacion) !== null && _b !== void 0 ? _b : '',
                fecha_inicio: item.fecha_inicio,
                fecha_fin: item.fecha_fin,
                precio: Number(item.precio) || 0,
                imagen: (_c = item.imagen) !== null && _c !== void 0 ? _c : '',
                id_categoria: Number(item.id_categoria),
                creado_evento: (_d = item.creado_evento) !== null && _d !== void 0 ? _d : new Date(),
                actualizado_evento: (_e = item.actualizado_evento) !== null && _e !== void 0 ? _e : new Date()
            });
        });
    });
}
