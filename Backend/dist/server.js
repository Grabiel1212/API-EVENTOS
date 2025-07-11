"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = __importDefault(require("./config/env"));
const PORT = env_1.default.PORT; //optenmos nuestro puerto desde nuestro env 
const server = new app_1.default().getApp(); // instanciamos nuestra clase App 
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}${env_1.default.API_PREFIX}`); // levantamos nuestra Api e imprimimos la url
});
