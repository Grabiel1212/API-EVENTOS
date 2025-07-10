"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const cors_1 = __importDefault(require("cors")); // para permitir el acceso a nuestra API desde otros dominios
const express_1 = __importDefault(require("express"));
const env_1 = __importDefault(require("./config/env"));
const categorias_routes_1 = __importDefault(require("./router/categorias.routes"));
const eventos_routes_1 = __importDefault(require("./router/eventos.routes"));
const pagos_routes_1 = __importDefault(require("./router/pagos.routes"));
const resgistros_routes_1 = __importDefault(require("./router/resgistros.routes"));
const usuario_routes_1 = __importDefault(require("./router/usuario.routes"));
class App {
    // inicializamos la Clase App
    constructor() {
        this.app = (0, express_1.default)();
        this.middlewares();
        this.routes();
    }
    // Registra los middlewares necesarios para la aplicación.
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)()); // <-- esto permite las peticiones del frontend
    }
    //Registra los middlewares necesarios para la aplicación.
    routes() {
        this.app.use(`${env_1.default.API_PREFIX}/user`, usuario_routes_1.default); // para usuarios
        this.app.use(`${env_1.default.API_PREFIX}/evento`, eventos_routes_1.default); // para eventos
        this.app.use(`${env_1.default.API_PREFIX}/categoria`, categorias_routes_1.default); // para categorias
        this.app.use(`${env_1.default.API_PREFIX}/pagos`, pagos_routes_1.default); // para pagos
        this.app.use(`${env_1.default.API_PREFIX}/registros`, resgistros_routes_1.default); // para registros
    }
    //esto nos ayudara a instaciar nuestar clase App e inicilizar en otros TS
    getApp() {
        return this.app;
    }
}
exports.App = App;
exports.default = App;
