"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriaSchema = void 0;
const joi_1 = __importDefault(require("joi"));
// Validación de entrada para creación o actualización de categorías
exports.categoriaSchema = joi_1.default.object({
    nombre: joi_1.default.string().max(100).required(),
    descripcion: joi_1.default.string().allow('', null).optional(),
    // Campos controlados por el backend, no deben ser enviados por el cliente
    creado_categoria: joi_1.default.forbidden()
});
