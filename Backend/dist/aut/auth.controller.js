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
exports.AuthController = void 0;
const ApiError_1 = require("../helpers/ApiError");
const ApiRespose_1 = require("../helpers/ApiRespose");
const status_1 = require("../helpers/status");
const auth_service_1 = require("./auth.service");
class AuthController {
    static loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, googleID } = req.body;
            try {
                const result = yield auth_service_1.AuthService.login({ email, password, googleID });
                res.status(200).json(ApiRespose_1.ApiResponse.ok('Inicio de sesión exitoso', result));
            }
            catch (error) {
                console.error('Error en loginUser:', error);
                if (error instanceof ApiError_1.ApiError) {
                    res.status(error.statusCode).json(error.toResponse());
                }
                else {
                    res.status(status_1.STATUS_INTERNAL_SERVER_ERROR).json(ApiRespose_1.ApiResponse.fail('Error inesperado en el servidor'));
                }
            }
        });
    }
}
exports.AuthController = AuthController;
