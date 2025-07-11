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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
/**
 * Lista las entradas compradas por un usuario.
 */
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
        return entradas
            .filter((entrada) => entrada != null && entrada.eventos != null)
            .map((entrada) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
            return ({
                id_registro: Number(entrada.id_registro),
                id_evento: Number(entrada.eventos.id_evento),
                nombre_evento: (_a = entrada.eventos.titulo) !== null && _a !== void 0 ? _a : '',
                fecha_inicio: (_b = entrada.eventos.fecha_inicio) !== null && _b !== void 0 ? _b : new Date(),
                fecha_fin: (_c = entrada.eventos.fecha_fin) !== null && _c !== void 0 ? _c : new Date(),
                precio: entrada.eventos.precio ? Number(entrada.eventos.precio) : 0,
                descripcion_evento: (_d = entrada.eventos.descripcion) !== null && _d !== void 0 ? _d : '',
                imagen_evento: (_e = entrada.eventos.imagen) !== null && _e !== void 0 ? _e : null,
                cantidad: (_f = entrada.cantidad) !== null && _f !== void 0 ? _f : 1,
                fecha_registro: (_g = entrada.fecha_registro) !== null && _g !== void 0 ? _g : new Date(),
                monto_total: ((_h = entrada.pagos) === null || _h === void 0 ? void 0 : _h.monto) ? Number(entrada.pagos.monto) : 0,
                metodo_pago: (_k = (_j = entrada.pagos) === null || _j === void 0 ? void 0 : _j.metodo_pago) !== null && _k !== void 0 ? _k : '',
                estado_pago: (_m = (_l = entrada.pagos) === null || _l === void 0 ? void 0 : _l.estado_pago) !== null && _m !== void 0 ? _m : '',
                fecha_pago: (_p = (_o = entrada.pagos) === null || _o === void 0 ? void 0 : _o.fecha_pago) !== null && _p !== void 0 ? _p : null
            });
        });
    });
}
