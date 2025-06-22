// Códigos de estado HTTP principales
export const STATUS_OK = 200;                         // Solicitud exitosa
export const STATUS_CREATED = 201;                    // Recurso creado
export const STATUS_NO_CONTENT = 204;                 // Sin contenido (respuesta vacía)

export const STATUS_BAD_REQUEST = 400;                // Solicitud mal formada
export const STATUS_UNAUTHORIZED = 401;               // No autenticado (token faltante o inválido)
export const STATUS_FORBIDDEN = 403;                  // Acceso denegado (aunque autenticado)
export const STATUS_NOT_FOUND = 404;                  // Recurso no encontrado
export const STATUS_INTERNAL_SERVER_ERROR = 500;      // Error interno del servidor

// Mensajes comunes de respuesta exitosa
export const RESPONSE_INSERT_OK = 'Insertado correctamente';
export const RESPONSE_UPDATE_OK = 'Actualizado correctamente';
export const RESPONSE_DELETE_OK = 'Eliminado correctamente';
