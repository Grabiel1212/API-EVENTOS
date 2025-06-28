import Joi from "joi";


export const pagoConRegistroSchema = Joi.object({
  pago: Joi.object({
    id_usuario: Joi.number().integer().required(),
    metodo_pago: Joi.string().optional(),
    estado_pago: Joi.string().valid('PAGADO', 'PENDIENTE', 'CANCELADO').optional()
  }).required(),

  registro: Joi.object({
    id_evento: Joi.number().integer().required(),
    cantidad: Joi.number().integer().min(1).optional()
  }).required()
});
