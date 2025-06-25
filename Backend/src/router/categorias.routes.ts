
import express from 'express';
import categoriasController from '../controller/categoriasController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { upload } from '../middlewares/multer';

const router = express.Router();
// Listar todas las categorías
router.get('/', categoriasController.listarCategorias);
// Rutas POST - Crear / Buscar
// Crear nueva categoría (requiere admin)
router.post(
  '/crear',
  authMiddleware,
  
  categoriasController.createCategoria
);

// Buscar categoría por nombre
router.post('/buscar', categoriasController.buscarCategoria);
// Actualizar categoría (requiere admin)
router.patch(
  '/actualizar/:id',
  authMiddleware,
  categoriasController.updateCategoria
);
// Eliminar categoría (requiere admin)
router.delete(
  '/eliminar/:id',
  authMiddleware,
  categoriasController.deleteCategoria
);

export default router;