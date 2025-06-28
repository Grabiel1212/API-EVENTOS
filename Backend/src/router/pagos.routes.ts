 import express from 'express';
import PagosController from '../controller/pagoController';

const router = express.Router();

router.post(
  '/registrar',
  PagosController.registrarPago
);

export default router;