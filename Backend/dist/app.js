"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Configurar  CONEXION A LA BASE DE DATOS y otras cosas de los SERVICIOS
const express_1 = __importDefault(require("express"));
const usuario_route_1 = __importDefault(require("./routes/usuario.route"));
const constans_1 = require("./shared/constans");
const app = (0, express_1.default)();
// Middleware para parsear JSON
app.use(express_1.default.json());
// Registrar rutas con prefijo /api/v1 o similar
app.use(`${constans_1.API_PREFIX}/usuarios`, usuario_route_1.default);
exports.default = app;
//(backticks ``) son para interpolar variables en cadenas de texto
//En teclados en inglés (US layout): Generalmente está a la izquierda del número 1, encima de la tecla Tab.
