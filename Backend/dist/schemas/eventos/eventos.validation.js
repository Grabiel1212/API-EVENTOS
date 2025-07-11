"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventoSchema = void 0;
// src/schemas/evento.schema.ts
const joi_1 = __importDefault(require("joi"));
// Validación de entrada para creación de eventos
exports.eventoSchema = joi_1.default.object({
    titulo: joi_1.default.string().max(100).required(),
    descripcion: joi_1.default.string().allow('').optional(),
    ubicacion: joi_1.default.string().max(150).allow(null, '').optional(),
    fecha_inicio: joi_1.default.date().iso().required(),
    fecha_fin: joi_1.default.date().iso().greater(joi_1.default.ref('fecha_inicio')).required(),
    precio: joi_1.default.number().precision(2).min(0).optional(),
    imagen: joi_1.default.string().uri().allow(null).optional(), // Cloudinary devolverá la URL
    id_categoria: joi_1.default.number().integer().positive().required(),
    // Estos campos los maneja el backend
    creado_evento: joi_1.default.forbidden(),
    actualizado_evento: joi_1.default.forbidden()
});
