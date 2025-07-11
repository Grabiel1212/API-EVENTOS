"use strict";
// src/utils/logger.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
const { combine, timestamp, printf, colorize } = winston_1.format;
/**
 * Formato personalizado del log.
 * - Incluye la marca de tiempo, nivel del log y el mensaje.
 * - Ejemplo: 2025-06-16 22:14:01 [info]: Usuario creado exitosamente
 */
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});
/**
 * Logger personalizado usando Winston.
 *
 * - Nivel por defecto: `info`
 * - Soporta color en consola para diferenciar niveles (`info`, `error`, etc.)
 * - Registra:
 *    - Todos los logs en consola.
 *    - Logs de error en `logs/error.log`.
 *    - Todos los logs combinados en `logs/combined.log`.
 */
exports.logger = (0, winston_1.createLogger)({
    level: 'info',
    format: combine(colorize(), // Colores para la consola
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Formato de fecha y hora
    logFormat // Aplicación del formato personalizado
    ),
    transports: [
        new winston_1.transports.Console(), // Muestra logs en la consola
        new winston_1.transports.File({ filename: 'logs/error.log', level: 'error' }), // Solo errores
        new winston_1.transports.File({ filename: 'logs/combined.log' }) // Todos los logs
    ]
});
