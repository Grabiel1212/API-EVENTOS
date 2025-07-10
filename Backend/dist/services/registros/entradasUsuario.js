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
exports.listarEntradasUsuario = listarEntradasUsuario;
const prisma_1 = require("../../generated/prisma");
const prisma = new prisma_1.PrismaClient();
function listarEntradasUsuario(id_usuario) {
    return __awaiter(this, void 0, void 0, function* () {
        const entradas = yield prisma.registros.findMany({
            where: { id_usuario },
            include: {
                eventos: {
                    select: {
                        id_evento: true,
                        titulo: true,
                        fecha_inicio: true,
                        fecha_fin: true,
                        precio: true,
                        descripcion: true,
                        imagen: true
                    }
                },
                pagos: {
                    select: {
                        monto: true,
                        metodo_pago: true,
                        estado_pago: true,
                        fecha_pago: true
                    }
                }
            }
        });
        return entradas.map(entrada => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
            return ({
                id_registro: Number(entrada.id_registro),
                id_evento: Number(entrada.eventos.id_evento),
                nombre_evento: (_a = entrada.eventos.titulo) !== null && _a !== void 0 ? _a : '',
                fecha_inicio: (_b = entrada.eventos.fecha_inicio) !== null && _b !== void 0 ? _b : new Date(),
                fecha_fin: (_c = entrada.eventos.fecha_fin) !== null && _c !== void 0 ? _c : new Date(),
                precio: (_e = (_d = entrada.eventos.precio) === null || _d === void 0 ? void 0 : _d.toNumber()) !== null && _e !== void 0 ? _e : 0,
                descripcion_evento: (_f = entrada.eventos.descripcion) !== null && _f !== void 0 ? _f : '',
                imagen_evento: (_g = entrada.eventos.imagen) !== null && _g !== void 0 ? _g : null,
                cantidad: (_h = entrada.cantidad) !== null && _h !== void 0 ? _h : 1,
                fecha_registro: (_j = entrada.fecha_registro) !== null && _j !== void 0 ? _j : new Date(),
                // Datos de la tabla pagos
                monto_total: (_m = (_l = (_k = entrada.pagos) === null || _k === void 0 ? void 0 : _k.monto) === null || _l === void 0 ? void 0 : _l.toNumber()) !== null && _m !== void 0 ? _m : 0,
                metodo_pago: (_p = (_o = entrada.pagos) === null || _o === void 0 ? void 0 : _o.metodo_pago) !== null && _p !== void 0 ? _p : '',
                estado_pago: (_r = (_q = entrada.pagos) === null || _q === void 0 ? void 0 : _q.estado_pago) !== null && _r !== void 0 ? _r : '',
                fecha_pago: (_t = (_s = entrada.pagos) === null || _s === void 0 ? void 0 : _s.fecha_pago) !== null && _t !== void 0 ? _t : null
            });
        });
    });
}
