import express from 'express';
import eventosController from '../controller/eventosController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { upload } from '../middlewares/multer';

const router = express.Router();

// ==============================
// Rutas GET - Lectura
// ==============================
// Listar eventos aleatorios
router.get('/aleatorios', eventosController.listAleatorios);

// Listar todos los eventos
router.get('/', eventosController.listAllEventos);

// Listar evento por ID
router.get('/:id', eventosController.getEventoById);

// Listar eventos por categoría
router.get('/categoria/:id_categoria', eventosController.listByCategory);

// Listar eventos por ubicación (distrito)
router.get('/ubicacion/:distrito', eventosController.listByUbicacion);

// Listar eventos por rango de fechas
router.get('/fecha/rango', eventosController.listByDateRange);

// Listar eventos ordenados por fecha de creación
router.get('/ordenados/:order', eventosController.listOrdenados);


// Buscar eventos por nombre
router.get('/buscar/nombre', eventosController.buscarPorNombre);

// ==============================
// Rutas POST - Crear
// ==============================

router.post(
  '/crear',
  authMiddleware,
  upload.single('imagen'),
  eventosController.createEvento
);

// ==============================
// Rutas PATCH - Actualizar
// ==============================

router.patch(
  '/actualizar/:id',
  authMiddleware,
  upload.single('imagen'),
  eventosController.updateEvento
);

// ==============================
// Rutas DELETE - Eliminación lógica
// ==============================

router.delete(
  '/eliminar/:id',
  authMiddleware,
  eventosController.deleteEvento
);

export default router;
