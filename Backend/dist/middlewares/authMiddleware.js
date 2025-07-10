"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../config/env"));
const ApiRespose_1 = require("../helpers/ApiRespose");
const status_1 = require("../helpers/status");
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.status(status_1.STATUS_UNAUTHORIZED).json(ApiRespose_1.ApiResponse.fail('Acceso denegado: Token no proporcionado'));
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.default.JWT_SECRET);
        req.user = {
            id: decoded.id,
            rol: decoded.rol
        };
        next();
    }
    catch (error) {
        res.status(status_1.STATUS_UNAUTHORIZED).json(ApiRespose_1.ApiResponse.fail('Token inválido o expirado'));
        return;
    }
};
exports.authMiddleware = authMiddleware;
