// src/helpers/ApiResponse.ts

export class ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;

  constructor(success: boolean, message: string, data?: T, error?: string) {
    this.success = success;
    this.message = message;
    if (data !== undefined) this.data = data;
    if (error !== undefined) this.error = error;
  }

  static ok<T>(message: string, data?: T): ApiResponse<T> {
    return new ApiResponse<T>(true, message, data);
  }

  static fail<T>(message: string, error?: string): ApiResponse<T> {
    return new ApiResponse<T>(false, message, undefined, error ?? 'Error desconocido');
  }
}
