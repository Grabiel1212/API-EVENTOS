"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoriasController_1 = __importDefault(require("../controller/categoriasController"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
/**
 * RUTAS DE CATEGORÍAS
 */
// ────────────────────────────────
// GET - Listar todas las categorías
// ────────────────────────────────
router.get('/', categoriasController_1.default.listarCategorias);
// ────────────────────────────────
// POST - Crear nueva categoría (requiere admin)
// ────────────────────────────────
router.post('/crear', authMiddleware_1.authMiddleware, categoriasController_1.default.createCategoria);
// ────────────────────────────────
// POST - Buscar categoría por ID
// ────────────────────────────────
router.post('/buscar/:id', categoriasController_1.default.buscarCategoria);
// ────────────────────────────────
// PATCH - Actualizar categoría (requiere admin)
// ────────────────────────────────
router.patch('/actualizar/:id', authMiddleware_1.authMiddleware, categoriasController_1.default.updateCategoria);
exports.default = router;
