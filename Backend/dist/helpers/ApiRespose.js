"use strict";
// src/helpers/ApiResponse.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    constructor(success, message, data, error) {
        this.success = success;
        this.message = message;
        if (data !== undefined)
            this.data = data;
        if (error !== undefined)
            this.error = error;
    }
    static ok(message, data) {
        return new ApiResponse(true, message, data);
    }
    static fail(message, error) {
        return new ApiResponse(false, message, undefined, error !== null && error !== void 0 ? error : 'Error desconocido');
    }
}
exports.ApiResponse = ApiResponse;
