"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
const ApiRespose_1 = require("./ApiRespose");
/**
 * Clase de error personalizada para lanzar errores con código HTTP y código interno.
 */
class ApiError extends Error {
    /**
     * @param statusCode Código HTTP del error (ej: 401, 403, 500).
     * @param message Mensaje descriptivo del error.
     * @param errorCode Código interno para identificar el tipo de error.
     */
    constructor(statusCode, message, errorCode = 'INTERNAL_ERROR') {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.name = 'ApiError';
        Error.captureStackTrace(this, this.constructor); // Mejora el stack trace
    }
    // Convierte el error en una respuesta estándar ApiResponse
    toResponse() {
        return ApiRespose_1.ApiResponse.fail(this.message, this.errorCode);
    }
}
exports.ApiError = ApiError;
