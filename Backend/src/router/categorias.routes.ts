import express from 'express';
import categoriasController from '../controller/categoriasController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

/**
 * RUTAS DE CATEGORÍAS
 */

// ────────────────────────────────
// GET - Listar todas las categorías
// ────────────────────────────────
router.get('/', categoriasController.listarCategorias);

// ────────────────────────────────
// POST - Crear nueva categoría (requiere admin)
// ────────────────────────────────
router.post('/crear', authMiddleware, categoriasController.createCategoria);

// ────────────────────────────────
// POST - Buscar categoría por ID
// ────────────────────────────────
router.post('/buscar/:id', categoriasController.buscarCategoria);

// ────────────────────────────────
// PATCH - Actualizar categoría (requiere admin)
// ────────────────────────────────
router.patch('/actualizar/:id', authMiddleware, categoriasController.updateCategoria);

export default router;
