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
exports.buscarCategoriasPorId = buscarCategoriasPorId;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
/**
 * Busca una categoría por ID.
 *
 * @param id - ID de la categoría.
 * @returns Categoría encontrada como un arreglo de un solo elemento.
 * @throws ApiError si no se encuentra la categoría.
 */
function buscarCategoriasPorId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const categoria = yield prisma.categorias.findUnique({
            where: {
                id_categoria: id,
            },
        });
        if (!categoria)
            return null;
        return {
            id_categoria: Number(categoria.id_categoria),
            nombre: categoria.nombre,
            descripcion: (_a = categoria.descripcion) !== null && _a !== void 0 ? _a : '',
            creado_categoria: (_b = categoria.creado_categoria) !== null && _b !== void 0 ? _b : new Date(),
        };
    });
}
