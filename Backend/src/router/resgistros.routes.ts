
import express from 'express';
import RegistrosController from '../controller/registrosController';

const router = express.Router();

// ✅ Lista entradas de un usuario específico
router.get('/usuarios/:id_usuario/entradas', RegistrosController.listarEntradasUsuario);

// ✅ Reporte general de todos los registros
router.get('/reportes/general', RegistrosController.reporteGeneral);

// ✅ Resumen de compras por usuario
router.get('/reportes/usuarios', RegistrosController.resumenUsuarios);

// ✅ Reporte detallado por usuario específico
router.get('/reportes/usuario/:id', RegistrosController.reportePorUsuario);

export default router;
