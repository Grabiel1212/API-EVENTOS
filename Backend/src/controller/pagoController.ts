import { Request, Response } from 'express';
import { ApiResponse } from '../helpers/ApiRespose';
import { logger } from '../helpers/logger';
import {
    STATUS_BAD_REQUEST,
    STATUS_INTERNAL_SERVER_ERROR
} from '../helpers/status';
import { pagoConRegistroSchema } from '../schemas/pagos/pagos.validation';
import { registrarPago } from '../services/pagos/registroPago';

export class PagosController {

    constructor() {
        this.registrarPago = this.registrarPago.bind(this);
    }
  /**
   * Registra un nuevo pago con su inscripción a evento.
   */
  async registrarPago(req: Request, res: Response): Promise<void> {
    try {
      const { error, value } = pagoConRegistroSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        res.status(STATUS_BAD_REQUEST).json(
          ApiResponse.fail(
            'Datos inválidos',
            error.details.map((d) => d.message).join('; ')
          )
        );
        return;
      }

      const resultado = await registrarPago(value);

      res.status(201).json(ApiResponse.ok('Registro creado con éxito', resultado));
    } catch (err) {
      logger.error('Error al registrar el pago:', err);
      res.status(STATUS_INTERNAL_SERVER_ERROR).json(
        ApiResponse.fail('Error interno al registrar el pago')
      );
    }
  }
}

export default new PagosController();