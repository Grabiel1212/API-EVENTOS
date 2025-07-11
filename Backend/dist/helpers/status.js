"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESPONSE_DELETE_OK = exports.RESPONSE_UPDATE_OK = exports.RESPONSE_INSERT_OK = exports.STATUS_INTERNAL_SERVER_ERROR = exports.STATUS_NOT_FOUND = exports.STATUS_FORBIDDEN = exports.STATUS_UNAUTHORIZED = exports.STATUS_BAD_REQUEST = exports.STATUS_NO_CONTENT = exports.STATUS_CREATED = exports.STATUS_OK = void 0;
// Códigos de estado HTTP principales
exports.STATUS_OK = 200; // Solicitud exitosa
exports.STATUS_CREATED = 201; // Recurso creado
exports.STATUS_NO_CONTENT = 204; // Sin contenido (respuesta vacía)
exports.STATUS_BAD_REQUEST = 400; // Solicitud mal formada
exports.STATUS_UNAUTHORIZED = 401; // No autenticado (token faltante o inválido)
exports.STATUS_FORBIDDEN = 403; // Acceso denegado (aunque autenticado)
exports.STATUS_NOT_FOUND = 404; // Recurso no encontrado
exports.STATUS_INTERNAL_SERVER_ERROR = 500; // Error interno del servidor
// Mensajes comunes de respuesta exitosa
exports.RESPONSE_INSERT_OK = 'Insertado correctamente';
exports.RESPONSE_UPDATE_OK = 'Actualizado correctamente';
exports.RESPONSE_DELETE_OK = 'Eliminado correctamente';
