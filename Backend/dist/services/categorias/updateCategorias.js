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
exports.updateCategorias = updateCategorias;
const client_1 = require("@prisma/client");
const ApiError_1 = require("../../helpers/ApiError");
const status_1 = require("../../helpers/status");
const prisma = new client_1.PrismaClient();
/**
 * Actualiza una categoría existente por su ID.
 *
 * @param id - ID de la categoría a actualizar.
 * @param data - Datos parciales (nombre y/o descripción).
 * @returns La categoría actualizada.
 */
function updateCategorias(id_1, data_1) {
    return __awaiter(this, arguments, void 0, function* (id, data, adminrequired = false) {
        var _a, _b;
        try {
            if (!adminrequired) {
                throw new ApiError_1.ApiError(status_1.STATUS_BAD_REQUEST, 'Acceso denegado: se requiere rol de administrador', 'NO_AUTORIZADO');
            }
            const categoriaExistente = yield prisma.categorias.findUnique({
                where: { id_categoria: BigInt(id) }
            });
            if (!categoriaExistente) {
                throw new ApiError_1.ApiError(status_1.STATUS_NOT_FOUND, 'Categoría no encontrada', 'CATEGORIA_NO_EXISTE');
            }
            // Validar que al menos se envíe uno de los campos permitidos
            if (!data.nombre && !data.descripcion) {
                throw new ApiError_1.ApiError(status_1.STATUS_BAD_REQUEST, 'Se requiere al menos nombre o descripción para actualizar', 'DATOS_INSUFICIENTES');
            }
            // Ejecutar la actualización
            const categoriaActualizada = yield prisma.categorias.update({
                where: { id_categoria: BigInt(id) },
                data: {
                    nombre: data.nombre,
                    descripcion: data.descripcion
                }
            });
            return {
                id_categoria: Number(categoriaActualizada.id_categoria),
                nombre: categoriaActualizada.nombre,
                descripcion: (_a = categoriaActualizada.descripcion) !== null && _a !== void 0 ? _a : '',
                creado_categoria: (_b = categoriaActualizada.creado_categoria) !== null && _b !== void 0 ? _b : new Date()
            };
        }
        catch (error) {
            if (error instanceof ApiError_1.ApiError)
                throw error;
            throw new ApiError_1.ApiError(status_1.STATUS_INTERNAL_SERVER_ERROR, 'Error al actualizar la categoría: ' + error.message, 'CATEGORIA_UPDATE_FAILED');
        }
    });
}
