import { Request, Response } from 'express';
import { ApiResponse } from '../helpers/ApiRespose';
import { logger } from '../helpers/logger';
import { serializeBigInts } from '../helpers/serializeBigInt';
import {
  STATUS_BAD_REQUEST,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_OK,
} from '../helpers/status';
import { listarEntradasUsuario } from '../services/registros/entradasUsuario';
import { RegistroService } from '../services/registros/registro.service';

const registroService = new RegistroService();

export class RegistrosController {
  constructor() {
    this.listarEntradasUsuario = this.listarEntradasUsuario.bind(this);
  
  }

  async listarEntradasUsuario(req: Request, res: Response): Promise<void> {
    const { id_usuario } = req.params;
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


async reporteGeneral(req: Request, res: Response) {
  try {
    const data = await registroService.obtenerReporteGeneral();
    res.status(200).json(new ApiResponse(true, 'Reporte generado', serializeBigInts(data)));
  } catch (error) {
    logger.error('Error en reporte general', error);
    res.status(500).json(new ApiResponse(false, 'Error interno del servidor'));
  }
}

async resumenUsuarios(req: Request, res: Response): Promise<void> {
  try {
    const data = await registroService.obtenerResumenUsuarios();
    res
      .status(STATUS_OK)
      .json(new ApiResponse(true, 'Resumen de usuarios generado con éxito', serializeBigInts(data)));
  } catch (error) {
    logger.error('Error en resumen de usuarios', error);
    res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json(new ApiResponse(false, 'Error interno del servidor'));
  }
}

async reportePorUsuario(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const id_usuario = Number(id);

  if (!id || isNaN(id_usuario)) {
    res
      .status(STATUS_BAD_REQUEST)
      .json(new ApiResponse(false, 'ID de usuario inválido'));
    return;
  }

  try {
    const data = await registroService.obtenerReportePorUsuario(id_usuario);
    res
      .status(STATUS_OK)
      .json(new ApiResponse(true, 'Reporte del usuario obtenido', serializeBigInts(data)));
  } catch (error) {
    logger.error('Error en reportePorUsuario', error);
    res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json(new ApiResponse(false, 'Error interno del servidor'));
  }
}
}

export default new RegistrosController();
