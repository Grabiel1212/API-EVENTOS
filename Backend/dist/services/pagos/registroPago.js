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
exports.registrarPago = registrarPago;
const client_1 = require("@prisma/client");
const library_1 = require("@prisma/client/runtime/library");
const prisma = new client_1.PrismaClient();
function registrarPago(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield prisma.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c;
                const evento = yield tx.eventos.findUnique({
                    where: { id_evento: data.registro.id_evento },
                });
                if (!evento || evento.precio === null) {
                    throw new Error('Evento no encontrado o sin precio definido');
                }
                const precio = new library_1.Decimal(evento.precio);
                const cantidad = (_a = data.registro.cantidad) !== null && _a !== void 0 ? _a : 1;
                const montoCalculado = precio.mul(cantidad);
                const nuevoPago = yield tx.pagos.create({
                    data: {
                        id_usuario: data.pago.id_usuario,
                        monto: montoCalculado.toNumber(),
                        metodo_pago: (_b = data.pago.metodo_pago) !== null && _b !== void 0 ? _b : 'Visa',
                        estado_pago: (_c = data.pago.estado_pago) !== null && _c !== void 0 ? _c : 'PAGADO',
                    },
                });
                const nuevoRegistro = yield tx.registros.create({
                    data: {
                        id_usuario: data.pago.id_usuario,
                        id_evento: data.registro.id_evento,
                        id_pago: nuevoPago.id_pago,
                        cantidad,
                    },
                });
                // ✅ Convertir BigInt a number antes de devolver
                return {
                    pago: Object.assign(Object.assign({}, nuevoPago), { id_pago: Number(nuevoPago.id_pago), id_usuario: Number(nuevoPago.id_usuario) }),
                    registro: Object.assign(Object.assign({}, nuevoRegistro), { id_registro: Number(nuevoRegistro.id_registro), id_pago: Number(nuevoRegistro.id_pago), id_usuario: Number(nuevoRegistro.id_usuario), id_evento: Number(nuevoRegistro.id_evento) }),
                    total: montoCalculado.toNumber(),
                };
            }));
        }
        catch (error) {
            console.error('❌ Error en registrarPago:', error.message, error.stack);
            throw error;
        }
    });
}
