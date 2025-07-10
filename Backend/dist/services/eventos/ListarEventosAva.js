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
exports.listarEventosOrdenados = listarEventosOrdenados;
exports.listarEventosAleatorios = listarEventosAleatorios;
exports.listarEventosPorCategoria = listarEventosPorCategoria;
exports.listarEventosPorUbicacion = listarEventosPorUbicacion;
exports.listarEventosPorRangoFechas = listarEventosPorRangoFechas;
const prisma_1 = require("../../generated/prisma");
const prisma = new prisma_1.PrismaClient();
// 1. Ordenar eventos por fecha de creación asc/desc
function listarEventosOrdenados() {
    return __awaiter(this, arguments, void 0, function* (order = 'asc') {
        const eventos = yield prisma.eventos.findMany({
            orderBy: { creado_evento: order }
        });
        return eventos.map(evento => mapEvento(evento));
    });
}
// 2. Eventos aleatorios
function listarEventosAleatorios() {
    return __awaiter(this, void 0, void 0, function* () {
        const eventos = yield prisma.eventos.findMany();
        eventos.sort(() => Math.random() - 0.5); // Mezcla aleatoriamente
        return eventos.map(evento => mapEvento(evento));
    });
}
// 3. Listar por categoría
function listarEventosPorCategoria(id_categoria) {
    return __awaiter(this, void 0, void 0, function* () {
        const eventos = yield prisma.eventos.findMany({
            where: { id_categoria: BigInt(id_categoria) }
        });
        return eventos.map(evento => mapEvento(evento));
    });
}
// 4. Listar por ubicación
function listarEventosPorUbicacion(distrito) {
    return __awaiter(this, void 0, void 0, function* () {
        const eventos = yield prisma.eventos.findMany({
            where: {
                ubicacion: {
                    contains: distrito,
                    mode: 'insensitive',
                }
            }
        });
        const eventosFiltrados = eventos.filter(evento => {
            if (!evento.ubicacion)
                return false;
            const partes = evento.ubicacion.split(',').map(p => p.trim());
            // Asegurarse que tenga al menos 2 partes y que la segunda coincida exactamente
            return partes.length >= 2 && partes[1].toLowerCase() === distrito.toLowerCase();
        });
        return eventosFiltrados.map(evento => mapEvento(evento));
    });
}
// 5. Listar por rango de fechas
function listarEventosPorRangoFechas(desde, hasta) {
    return __awaiter(this, void 0, void 0, function* () {
        const eventos = yield prisma.eventos.findMany({
            where: {
                fecha_inicio: { gte: desde },
                fecha_fin: { lte: hasta }
            },
            orderBy: {
                fecha_inicio: 'asc'
            }
        });
        return eventos.map(evento => {
            var _a, _b, _c, _d, _e;
            return ({
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
                actualizado_evento: (_e = evento.actualizado_evento) !== null && _e !== void 0 ? _e : new Date()
            });
        });
    });
}
function mapEvento(evento) {
    var _a, _b, _c, _d, _e;
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
        actualizado_evento: (_e = evento.actualizado_evento) !== null && _e !== void 0 ? _e : new Date()
    };
}
