"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createCategorias_1 = require("./createCategorias");
const buscarCategoria_1 = require("./buscarCategoria");
const listarCategorias_1 = require("./listarCategorias");
const updateCategorias_1 = require("./updateCategorias");
class CategoriasService {
    getCategorias() {
        return (0, listarCategorias_1.listarCategorias)();
    }
    getCategoriaById(id) {
        return (0, buscarCategoria_1.buscarCategoriasPorId)(id);
    }
    createCategoria(data, adminrequired) {
        return (0, createCategorias_1.createCategoria)(data, adminrequired);
    }
    updateCategoria(id, data, adminrequired) {
        return (0, updateCategorias_1.updateCategorias)(Number(id), data, adminrequired);
    }
}
exports.default = new CategoriasService();
