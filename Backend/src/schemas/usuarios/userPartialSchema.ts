import Joi from 'joi';

export const userPartialSchema = Joi.object({
  name: Joi.string().max(100).optional(),
  lastname: Joi.string().max(100).optional(),
  email: Joi.string().email().optional(),
  photo: Joi.string().uri().allow(null).optional(),
  password: Joi.string().min(4).optional()
});