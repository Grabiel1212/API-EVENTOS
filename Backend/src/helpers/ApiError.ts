import { ApiResponse } from './ApiRespose';

/**
 * Clase de error personalizada para lanzar errores con código HTTP y código interno.
 */
export class ApiError extends Error {
  public readonly statusCode: number;  // Código HTTP (ej: 400, 404, 500)
  public readonly errorCode: string;   // Código interno personalizado (ej: 'USER_NOT_FOUND')

  /**
   * @param statusCode Código HTTP del error (ej: 401, 403, 500).
   * @param message Mensaje descriptivo del error.
   * @param errorCode Código interno para identificar el tipo de error.
   */
  constructor(statusCode: number, message: string, errorCode: string = 'INTERNAL_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.name = 'ApiError';
    Error.captureStackTrace(this, this.constructor); // Mejora el stack trace
  }

  // Convierte el error en una respuesta estándar ApiResponse
  toResponse(): ApiResponse<null> {
    return ApiResponse.fail(this.message, this.errorCode);
  }
}
