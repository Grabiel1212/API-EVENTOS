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
exports.PagosController = void 0;
const ApiRespose_1 = require("../helpers/ApiRespose");
const logger_1 = require("../helpers/logger");
const status_1 = require("../helpers/status");
const pagos_validation_1 = require("../schemas/pagos/pagos.validation");
const registroPago_1 = require("../services/pagos/registroPago");
class PagosController {
    constructor() {
        this.registrarPago = this.registrarPago.bind(this);
    }
    /**
     * Registra un nuevo pago con su inscripción a evento.
     */
    registrarPago(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error, value } = pagos_validation_1.pagoConRegistroSchema.validate(req.body, {
                    abortEarly: false,
                    stripUnknown: true,
                });
                if (error) {
                    res.status(status_1.STATUS_BAD_REQUEST).json(ApiRespose_1.ApiResponse.fail('Datos inválidos', error.details.map((d) => d.message).join('; ')));
                    return;
                }
                const resultado = yield (0, registroPago_1.registrarPago)(value);
                res.status(201).json(ApiRespose_1.ApiResponse.ok('Registro creado con éxito', resultado));
            }
            catch (err) {
                logger_1.logger.error('Error al registrar el pago:', err);
                res.status(status_1.STATUS_INTERNAL_SERVER_ERROR).json(ApiRespose_1.ApiResponse.fail('Error interno al registrar el pago'));
            }
        });
    }
}
exports.PagosController = PagosController;
exports.default = new PagosController();
