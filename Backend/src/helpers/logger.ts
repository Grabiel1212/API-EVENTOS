// src/utils/logger.ts

import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize } = format;

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
export const logger = createLogger({
  level: 'info',
  format: combine(
    colorize(), // Colores para la consola
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Formato de fecha y hora
    logFormat // Aplicación del formato personalizado
  ),
  transports: [
    new transports.Console(), // Muestra logs en la consola
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // Solo errores
    new transports.File({ filename: 'logs/combined.log' }) // Todos los logs
  ]
});
