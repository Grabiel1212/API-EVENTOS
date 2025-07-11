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
exports.RegistrosController = void 0;
const ApiRespose_1 = require("../helpers/ApiRespose");
const logger_1 = require("../helpers/logger");
const serializeBigInt_1 = require("../helpers/serializeBigInt");
const status_1 = require("../helpers/status");
const entradasUsuario_1 = require("../services/registros/entradasUsuario");
const registro_service_1 = require("../services/registros/registro.service");
const registroService = new registro_service_1.RegistroService();
class RegistrosController {
    constructor() {
        this.listarEntradasUsuario = this.listarEntradasUsuario.bind(this);
    }
    listarEntradasUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_usuario } = req.params;
            const id = Number(id_usuario);
            if (!id_usuario || isNaN(id)) {
                logger_1.logger.warn(`ID de usuario inválido: ${id_usuario}`);
                res
                    .status(status_1.STATUS_BAD_REQUEST)
                    .json(new ApiRespose_1.ApiResponse(false, 'ID de usuario inválido'));
                return;
            }
            try {
                const entradas = yield (0, entradasUsuario_1.listarEntradasUsuario)(id);
                res
                    .status(status_1.STATUS_OK)
                    .json(new ApiRespose_1.ApiResponse(true, 'Entradas recuperadas con éxito', entradas));
            }
            catch (error) {
                logger_1.logger.error('Error al listar entradas del usuario', error);
                res
                    .status(status_1.STATUS_INTERNAL_SERVER_ERROR)
                    .json(new ApiRespose_1.ApiResponse(false, 'Error interno del servidor'));
            }
        });
    }
    reporteGeneral(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield registroService.obtenerReporteGeneral();
                res.status(200).json(new ApiRespose_1.ApiResponse(true, 'Reporte generado', (0, serializeBigInt_1.serializeBigInts)(data)));
            }
            catch (error) {
                logger_1.logger.error('Error en reporte general', error);
                res.status(500).json(new ApiRespose_1.ApiResponse(false, 'Error interno del servidor'));
            }
        });
    }
    resumenUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield registroService.obtenerResumenUsuarios();
                res
                    .status(status_1.STATUS_OK)
                    .json(new ApiRespose_1.ApiResponse(true, 'Resumen de usuarios generado con éxito', (0, serializeBigInt_1.serializeBigInts)(data)));
            }
            catch (error) {
                logger_1.logger.error('Error en resumen de usuarios', error);
                res
                    .status(status_1.STATUS_INTERNAL_SERVER_ERROR)
                    .json(new ApiRespose_1.ApiResponse(false, 'Error interno del servidor'));
            }
        });
    }
    reportePorUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const id_usuario = Number(id);
            if (!id || isNaN(id_usuario)) {
                res
                    .status(status_1.STATUS_BAD_REQUEST)
                    .json(new ApiRespose_1.ApiResponse(false, 'ID de usuario inválido'));
                return;
            }
            try {
                const data = yield registroService.obtenerReportePorUsuario(id_usuario);
                res
                    .status(status_1.STATUS_OK)
                    .json(new ApiRespose_1.ApiResponse(true, 'Reporte del usuario obtenido', (0, serializeBigInt_1.serializeBigInts)(data)));
            }
            catch (error) {
                logger_1.logger.error('Error en reportePorUsuario', error);
                res
                    .status(status_1.STATUS_INTERNAL_SERVER_ERROR)
                    .json(new ApiRespose_1.ApiResponse(false, 'Error interno del servidor'));
            }
        });
    }
}
exports.RegistrosController = RegistrosController;
exports.default = new RegistrosController();
