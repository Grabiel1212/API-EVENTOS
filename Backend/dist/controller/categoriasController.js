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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiRespose_1 = require("../helpers/ApiRespose");
const logger_1 = require("../helpers/logger");
const status_1 = require("../helpers/status");
const categorias_validation_1 = require("../schemas/categorias/categorias.validation");
const categorias_1 = __importDefault(require("../services/categorias"));
class CategoriasController {
    constructor() {
        this.Servicio = categorias_1.default;
        this.listarCategorias = this.listarCategorias.bind(this);
        this.buscarCategoria = this.buscarCategoria.bind(this);
        this.createCategoria = this.createCategoria.bind(this);
        this.updateCategoria = this.updateCategoria.bind(this);
    }
    /** GET /categorias */
    listarCategorias(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categorias = yield this.Servicio.getCategorias();
                res.json(ApiRespose_1.ApiResponse.ok('Categorías listadas correctamente', categorias));
            }
            catch (error) {
                logger_1.logger.error('Error al listar categorías:', error);
                res.status(status_1.STATUS_INTERNAL_SERVER_ERROR).json(ApiRespose_1.ApiResponse.fail('Error al listar categorías'));
            }
        });
    }
    /** POST /categorias/buscar */
    buscarCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                if (id === undefined || isNaN(Number(id))) {
                    res.status(status_1.STATUS_BAD_REQUEST).json(ApiRespose_1.ApiResponse.fail('El parámetro ID es obligatorio y debe ser un número'));
                    return;
                }
                const categorias = yield this.Servicio.getCategoriaById(Number(id));
                if (!categorias) {
                    res.status(status_1.STATUS_BAD_REQUEST).json(ApiRespose_1.ApiResponse.fail('Categoría no encontrada'));
                    return;
                }
                res.json(ApiRespose_1.ApiResponse.ok('Categoría encontrada', categorias));
            }
            catch (error) {
                logger_1.logger.error('Error al buscar categoría:', error);
                res.status(status_1.STATUS_INTERNAL_SERVER_ERROR).json(ApiRespose_1.ApiResponse.fail('Error interno al buscar categoría'));
            }
        });
    }
    /** POST /categorias */
    createCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const adminRequired = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.rol) === 'ADMIN';
                if (!adminRequired) {
                    res.status(status_1.STATUS_BAD_REQUEST).json(ApiRespose_1.ApiResponse.fail('Acceso denegado: se requiere rol de administrador'));
                    return;
                }
                const { error, value } = categorias_validation_1.categoriaSchema.validate(req.body);
                if (error) {
                    res.status(status_1.STATUS_BAD_REQUEST).json(ApiRespose_1.ApiResponse.fail('Error de validación', error.details[0].message));
                    return;
                }
                const categoria = yield this.Servicio.createCategoria(value, adminRequired);
                res.status(201).json(ApiRespose_1.ApiResponse.ok('Categoría creada correctamente', categoria));
            }
            catch (error) {
                logger_1.logger.error('Error al crear categoría:', error);
                res.status(status_1.STATUS_INTERNAL_SERVER_ERROR).json(ApiRespose_1.ApiResponse.fail('Error al crear categoría'));
            }
        });
    }
    /** PUT /categorias/:id */
    updateCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const id = Number(req.params.id);
                const adminRequired = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.rol) === 'ADMIN';
                if (!adminRequired) {
                    res.status(status_1.STATUS_BAD_REQUEST).json(ApiRespose_1.ApiResponse.fail('Acceso denegado: se requiere rol de administrador'));
                    return;
                }
                if (isNaN(id)) {
                    res.status(status_1.STATUS_BAD_REQUEST).json(ApiRespose_1.ApiResponse.fail('ID inválido'));
                    return;
                }
                const categoria = yield this.Servicio.updateCategoria(id.toString(), req.body, adminRequired);
                res.json(ApiRespose_1.ApiResponse.ok('Categoría actualizada correctamente', categoria));
            }
            catch (error) {
                logger_1.logger.error('Error al actualizar categoría:', error);
                res.status(status_1.STATUS_INTERNAL_SERVER_ERROR).json(ApiRespose_1.ApiResponse.fail('Error al actualizar categoría'));
            }
        });
    }
}
exports.default = new CategoriasController();
