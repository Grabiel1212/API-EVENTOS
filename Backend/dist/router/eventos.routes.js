"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const eventosController_1 = __importDefault(require("../controller/eventosController"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const multer_1 = require("../middlewares/multer");
const router = express_1.default.Router();
// ==============================
// Rutas GET - Lectura
// ==============================
// Listar eventos aleatorios
router.get('/aleatorios', eventosController_1.default.listAleatorios);
// Listar todos los eventos
router.get('/', eventosController_1.default.listAllEventos);
// Listar evento por ID
router.get('/:id', eventosController_1.default.getEventoById);
// Listar eventos por categoría
router.get('/categoria/:id_categoria', eventosController_1.default.listByCategory);
// Listar eventos por ubicación (distrito)
router.get('/ubicacion/:distrito', eventosController_1.default.listByUbicacion);
// Listar eventos por rango de fechas
router.post('/fecha/rango', eventosController_1.default.listByDateRange);
// Listar eventos ordenados por fecha de creación
router.get('/ordenados/:order', eventosController_1.default.listOrdenados);
// Buscar eventos por nombre
router.post('/buscar/nombre', eventosController_1.default.buscarPorNombre);
// ==============================
// Rutas POST - Crear
// ==============================
router.post('/crear', authMiddleware_1.authMiddleware, multer_1.upload.single('imagen'), eventosController_1.default.createEvento);
// ==============================
// Rutas PATCH - Actualizar
// ==============================
router.patch('/actualizar/:id', authMiddleware_1.authMiddleware, multer_1.upload.single('imagen'), eventosController_1.default.updateEvento);
// ==============================
// Rutas DELETE - Eliminación lógica
// ==============================
router.delete('/eliminar/:id', authMiddleware_1.authMiddleware, eventosController_1.default.deleteEvento);
exports.default = router;
