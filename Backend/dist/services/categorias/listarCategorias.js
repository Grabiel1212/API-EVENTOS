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
exports.listarCategorias = listarCategorias;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
/**
 * Lista todas las categorías almacenadas en la base de datos.
 *
 * @returns {Promise<Categorias[]>} Arreglo con todas las categorías encontradas.
 */
function listarCategorias() {
    return __awaiter(this, void 0, void 0, function* () {
        const categorias = yield prisma.categorias.findMany();
        return categorias.map((categoria) => {
            var _a, _b;
            return ({
                id_categoria: Number(categoria.id_categoria),
                nombre: categoria.nombre,
                descripcion: (_a = categoria.descripcion) !== null && _a !== void 0 ? _a : undefined,
                creado_categoria: (_b = categoria.creado_categoria) !== null && _b !== void 0 ? _b : new Date()
            });
        });
    });
}
