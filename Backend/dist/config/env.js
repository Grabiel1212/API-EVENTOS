"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const joi_1 = __importDefault(require("joi"));
dotenv_1.default.config();
exports.env = joi_1.default.object({
    DATABASE_URL: joi_1.default.string().uri().required(),
    PORT: joi_1.default.number().default(3000).required(),
    API_PREFIX: joi_1.default.string().default('/api/v1').required(),
    CLOUDINARY_CLOUD_NAME: joi_1.default.string().required(),
    CLOUDINARY_APY_KEY: joi_1.default.string().required(),
    CLOUDINARY_API_SECRET: joi_1.default.string().required()
}).unknown();
const { error, value } = exports.env.validate(process.env);
if (error) {
    throw new Error(`Error en las variables de entorno : ${error.message}`);
}
exports.default = value;
