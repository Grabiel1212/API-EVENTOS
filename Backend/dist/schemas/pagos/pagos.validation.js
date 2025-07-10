"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagoConRegistroSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.pagoConRegistroSchema = joi_1.default.object({
    pago: joi_1.default.object({
        id_usuario: joi_1.default.number().integer().required(),
        metodo_pago: joi_1.default.string().optional(),
        estado_pago: joi_1.default.string().valid('PAGADO', 'PENDIENTE', 'CANCELADO').optional()
    }).required(),
    registro: joi_1.default.object({
        id_evento: joi_1.default.number().integer().required(),
        cantidad: joi_1.default.number().integer().min(1).optional()
    }).required()
});
