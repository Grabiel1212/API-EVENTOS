import { Request, Response } from 'express';
import { ApiResponse } from '../helpers/ApiRespose';
import { logger } from '../helpers/logger';
import {
    STATUS_BAD_REQUEST,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_OK,
} from '../helpers/status';
import { listarEntradasUsuario } from '../services/registros/entradasUsuario';

export class RegistrosController {
  constructor() {
    this.listarEntradasUsuario = this.listarEntradasUsuario.bind(this);
  }

  async listarEntradasUsuario(req: Request, res: Response): Promise<void> {
    const { id_usuario } = req.params;

    // Validación básica del parámetro
    const id = Number(id_usuario);
    if (!id_usuario || isNaN(id)) {
      logger.warn(`ID de usuario inválido: ${id_usuario}`);
      res
        .status(STATUS_BAD_REQUEST)
        .json(new ApiResponse(false, 'ID de usuario inválido'));
      return;
    }

    try {
      const entradas = await listarEntradasUsuario(id);
      res
        .status(STATUS_OK)
        .json(new ApiResponse(true, 'Entradas recuperadas con éxito', entradas));
    } catch (error: unknown) {
      logger.error('Error al listar entradas del usuario', error);
      res
        .status(STATUS_INTERNAL_SERVER_ERROR)
        .json(new ApiResponse(false, 'Error interno del servidor'));
    }
  }
}

export default new RegistrosController();
