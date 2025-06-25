
import Joi from 'joi';

// Validación de entrada para creación o actualización de categorías
export const categoriaSchema = Joi.object({
  nombre: Joi.string().max(100).required(),
  descripcion: Joi.string().allow('', null).optional(),

  // Campos controlados por el backend, no deben ser enviados por el cliente
  creado_categoria: Joi.forbidden()
});