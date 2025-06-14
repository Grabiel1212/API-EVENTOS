import Joi from 'joi'


// servira para validar la entrada de nuestros datos
export const userSchema = Joi.object({
    name  :Joi.string().max(100).required(),
    lastname : Joi.string().max(100).required(),
    photo : Joi.string().uri().allow(null),
    email :  Joi.string().required(),
    password : Joi.string().max(100).allow(null),
    googleID : Joi.string().allow(null),
    active : Joi.boolean().default(true),
    rol : Joi.string().valid('ADMIN' ,'USUARIO').default('USUARIO'),
    dateCreate: Joi.date().default(() => new Date())
})