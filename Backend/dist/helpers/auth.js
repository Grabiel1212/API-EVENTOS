"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUserRole = getCurrentUserRole;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../config/env"));
function getCurrentUserRole(req) {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token)
        return null;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.default.JWT_SECRET);
        return decoded.rol;
    }
    catch (_b) {
        return null;
    }
}
