"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const joi_1 = __importDefault(require("joi"));
// servira para validar la entrada de nuestros datos
exports.userSchema = joi_1.default.object({
    name: joi_1.default.string().max(100).required(),
    lastname: joi_1.default.string().max(100).required(),
    photo: joi_1.default.string().uri().allow(null),
    email: joi_1.default.string().required(),
    password: joi_1.default.string().max(100).allow(null),
    googleID: joi_1.default.string().allow(null),
    active: joi_1.default.boolean().default(true),
    rol: joi_1.default.string().valid('ADMIN', 'USUARIO').default('USUARIO'),
    dateCreate: joi_1.default.date().default(() => new Date())
});
