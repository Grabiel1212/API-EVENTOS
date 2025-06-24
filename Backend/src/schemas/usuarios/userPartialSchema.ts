import Joi from 'joi';

export const userPartialSchema = Joi.object({
  name: Joi.string().optional(),
  lastname: Joi.string().optional(),
  password: Joi.string().optional(),
  rol: Joi.string().valid('ADMIN', 'USUARIO').optional(), 
});