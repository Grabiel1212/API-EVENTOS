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
exports.createCategoria = createCategoria;
const prisma_1 = require("../../generated/prisma");
const ApiError_1 = require("../../helpers/ApiError");
const status_1 = require("../../helpers/status");
const prisma = new prisma_1.PrismaClient();
/**
 * Crea una nueva categoría en la base de datos.
 *
 * @param categoriaData - Datos de la categoría a crear.
 * @param buffer - Imagen como buffer, si se subió una.
 * @returns La categoría creada.
 */
function createCategoria(categoriaData_1) {
    return __awaiter(this, arguments, void 0, function* (categoriaData, adminrequired = false) {
        try {
            if (!adminrequired) {
                throw new ApiError_1.ApiError(status_1.STATUS_FORBIDDEN, 'Acceso denegado', 'NO_AUTORIZADO');
            }
            if (!categoriaData || !categoriaData.nombre) {
                throw new ApiError_1.ApiError(status_1.STATUS_BAD_REQUEST, 'Faltan datos requeridos: nombre de categoría', 'DATOS_INCOMPLETOS');
            }
            const exists = yield prisma.categorias.findFirst({
                where: { nombre: categoriaData.nombre }
            });
            if (exists) {
                throw new ApiError_1.ApiError(status_1.STATUS_BAD_REQUEST, 'La categoría ya existe', 'CATEGORIA_DUPLICADA');
            }
            const now = new Date();
            const categoriaCreada = yield prisma.categorias.create({
                data: {
                    nombre: categoriaData.nombre,
                    descripcion: categoriaData.descripcion,
                    creado_categoria: now
                }
            });
            return mapPrismaCategoriaToModel(categoriaCreada);
        }
        catch (error) {
            if (error instanceof ApiError_1.ApiError)
                throw error;
            throw new ApiError_1.ApiError(status_1.STATUS_INTERNAL_SERVER_ERROR, 'Error al crear la categoría: ' + error.message, 'CATEGORIA_CREACION_FALLIDA');
        }
    });
}
function mapPrismaCategoriaToModel(prismaCategoria) {
    var _a, _b;
    return {
        id_categoria: Number(prismaCategoria.id_categoria),
        nombre: prismaCategoria.nombre,
        descripcion: (_a = prismaCategoria.descripcion) !== null && _a !== void 0 ? _a : '',
        creado_categoria: (_b = prismaCategoria.creado_categoria) !== null && _b !== void 0 ? _b : new Date(),
    };
}
