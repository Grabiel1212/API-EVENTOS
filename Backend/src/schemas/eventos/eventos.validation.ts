// src/schemas/evento.schema.ts
import Joi from 'joi';

// Validación de entrada para creación de eventos
export const eventoSchema = Joi.object({
  titulo: Joi.string().max(100).required(),
  descripcion: Joi.string().allow('').optional(),
  ubicacion: Joi.string().max(150).allow(null, '').optional(),
  fecha_inicio: Joi.date().iso().required(),
  fecha_fin: Joi.date().iso().greater(Joi.ref('fecha_inicio')).required(),
  precio: Joi.number().precision(2).min(0).optional(),
  imagen: Joi.string().uri().allow(null).optional(), // Cloudinary devolverá la URL
  id_categoria: Joi.number().integer().positive().required(),

  // Estos campos los maneja el backend
  creado_evento: Joi.forbidden(),
  actualizado_evento: Joi.forbidden()
});
