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
const eventos_validation_1 = require("../schemas/eventos/eventos.validation");
const eventos_1 = __importDefault(require("../services/eventos"));
class EventosController {
    constructor() {
        this.Servicio = eventos_1.default;
        this.listAllEventos = this.listAllEventos.bind(this);
        this.getEventoById = this.getEventoById.bind(this);
        this.createEvento = this.createEvento.bind(this);
        this.updateEvento = this.updateEvento.bind(this);
        this.deleteEvento = this.deleteEvento.bind(this);
        this.listByCategory = this.listByCategory.bind(this);
        this.listByUbicacion = this.listByUbicacion.bind(this);
        this.listByDateRange = this.listByDateRange.bind(this);
        this.buscarPorNombre = this.buscarPorNombre.bind(this);
        this.listAleatorios = this.listAleatorios.bind(this);
        this.listOrdenados = this.listOrdenados.bind(this);
    }
    listAllEventos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const eventos = yield this.Servicio.getEventos();
                res.json(ApiRespose_1.ApiResponse.ok('Eventos listados correctamente', eventos));
            }
            catch (error) {
                logger_1.logger.error('Error al listar eventos:', error);
                res.status(500).json(ApiRespose_1.ApiResponse.fail('Error al listar eventos'));
            }
        });
    }
    getEventoById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id || isNaN(Number(id))) {
                    res.status(400).json(ApiRespose_1.ApiResponse.fail('ID inválido'));
                    return;
                }
                const evento = yield this.Servicio.getEventoById(id);
                if (!evento) {
                    res.status(404).json(ApiRespose_1.ApiResponse.fail('Evento no encontrado'));
                    return;
                }
                res.json(ApiRespose_1.ApiResponse.ok('Evento encontrado', evento));
            }
            catch (error) {
                logger_1.logger.error('Error al obtener evento:', error);
                res.status(500).json(ApiRespose_1.ApiResponse.fail('Error al obtener evento'));
            }
        });
    }
    createEvento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const buffer = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer;
                const isAdmin = ((_b = req.user) === null || _b === void 0 ? void 0 : _b.rol) === 'ADMIN';
                if (!isAdmin) {
                    res.status(403).json(ApiRespose_1.ApiResponse.fail('No tienes permisos para crear eventos'));
                    return;
                }
                const { error, value } = eventos_validation_1.eventoSchema.validate(req.body);
                if (error) {
                    res.status(status_1.STATUS_BAD_REQUEST).json(ApiRespose_1.ApiResponse.fail('Error de validación', error.details[0].message));
                    return;
                }
                const evento = yield this.Servicio.createEvento(value, buffer);
                res.status(201).json(ApiRespose_1.ApiResponse.ok('Evento creado correctamente', evento));
            }
            catch (err) {
                logger_1.logger.error('Error al crear evento:', err);
                res.status(status_1.STATUS_INTERNAL_SERVER_ERROR).json(ApiRespose_1.ApiResponse.fail('Error al crear evento'));
            }
        });
    }
    updateEvento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const id = req.params.id;
                const buffer = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer;
                const isAdmin = ((_b = req.user) === null || _b === void 0 ? void 0 : _b.rol) === 'ADMIN'; // o req.user?.isAdmin
                if (!isAdmin) {
                    res.status(403).json(ApiRespose_1.ApiResponse.fail('No tienes permisos para actualizar eventos'));
                    return;
                }
                const evento = yield this.Servicio.updateEvento(id, req.body, buffer, isAdmin);
                res.json(ApiRespose_1.ApiResponse.ok('Evento actualizado correctamente', evento));
            }
            catch (error) {
                logger_1.logger.error('Error al actualizar evento:', error);
                res.status(500).json(ApiRespose_1.ApiResponse.fail('Error al actualizar evento'));
            }
        });
    }
    deleteEvento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield this.Servicio.deleteEvento(id);
                res.json(ApiRespose_1.ApiResponse.ok('Evento eliminado correctamente'));
            }
            catch (error) {
                logger_1.logger.error('Error al eliminar evento:', error);
                res.status(500).json(ApiRespose_1.ApiResponse.fail('Error al eliminar evento'));
            }
        });
    }
    listByCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id_categoria);
                const eventos = yield this.Servicio.listByCategory(id);
                res.json(ApiRespose_1.ApiResponse.ok('Eventos por categoría', eventos));
            }
            catch (error) {
                logger_1.logger.error('Error al listar eventos por categoría:', error);
                res.status(500).json(ApiRespose_1.ApiResponse.fail('Error al listar eventos por categoría'));
            }
        });
    }
    listByUbicacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const distrito = req.params.distrito;
                const eventos = yield this.Servicio.listByLocation(distrito);
                res.json(ApiRespose_1.ApiResponse.ok('Eventos por ubicación', eventos));
            }
            catch (error) {
                logger_1.logger.error('Error al listar eventos por ubicación:', error);
                res.status(500).json(ApiRespose_1.ApiResponse.fail('Error al listar eventos por ubicación'));
            }
        });
    }
    listByDateRange(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { desde, hasta } = req.body;
                if (!desde || !hasta) {
                    res.status(400).json(ApiRespose_1.ApiResponse.fail('Parámetros de fecha requeridos'));
                    return;
                }
                const eventos = yield this.Servicio.listByDateRange(new Date(desde), new Date(hasta));
                res.json(ApiRespose_1.ApiResponse.ok('Eventos por rango de fechas', eventos));
            }
            catch (error) {
                logger_1.logger.error('Error al listar eventos por rango de fechas:', error);
                res.status(500).json(ApiRespose_1.ApiResponse.fail('Error al listar eventos por rango de fechas'));
            }
        });
    }
    buscarPorNombre(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre } = req.body;
                if (!nombre) {
                    res.status(400).json(ApiRespose_1.ApiResponse.fail('El parámetro nombre es obligatorio'));
                    return;
                }
                const eventos = yield this.Servicio.searchByName(nombre);
                res.json(ApiRespose_1.ApiResponse.ok('Eventos encontrados', eventos));
            }
            catch (error) {
                logger_1.logger.error('Error al buscar eventos por nombre:', error);
                res.status(500).json(ApiRespose_1.ApiResponse.fail('Error al buscar eventos por nombre'));
            }
        });
    }
    listAleatorios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const eventos = yield this.Servicio.listRandom(); // <- Corrección aquí
                res.json(ApiRespose_1.ApiResponse.ok('Eventos aleatorios', eventos));
            }
            catch (error) {
                logger_1.logger.error('Error al listar eventos aleatorios:', error);
                res.status(500).json(ApiRespose_1.ApiResponse.fail('Error al listar eventos aleatorios'));
            }
        });
    }
    listOrdenados(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = req.query.order || 'asc';
                const eventos = yield this.Servicio.listOrdered(order);
                res.json(ApiRespose_1.ApiResponse.ok('Eventos ordenados', eventos));
            }
            catch (error) {
                logger_1.logger.error('Error al listar eventos ordenados:', error);
                res.status(500).json(ApiRespose_1.ApiResponse.fail('Error al listar eventos ordenados'));
            }
        });
    }
}
exports.default = new EventosController();
