"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const registrosController_1 = __importDefault(require("../controller/registrosController"));
const router = express_1.default.Router();
// ✅ Lista entradas de un usuario específico
router.get('/usuarios/:id_usuario/entradas', registrosController_1.default.listarEntradasUsuario);
// ✅ Reporte general de todos los registros
router.get('/reportes/general', registrosController_1.default.reporteGeneral);
// ✅ Resumen de compras por usuario
router.get('/reportes/usuarios', registrosController_1.default.resumenUsuarios);
// ✅ Reporte detallado por usuario específico
router.get('/reportes/usuario/:id', registrosController_1.default.reportePorUsuario);
exports.default = router;
