
import express from 'express';
import RegistrosController from '../controller/registrosController';

const router = express.Router();

router.get('/usuarios/:id_usuario/entradas', RegistrosController.listarEntradasUsuario );

export default router;
