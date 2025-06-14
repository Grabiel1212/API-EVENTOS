import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config();

 export const env  = Joi.object({// uso de joi para validar
    DATABASE_URL: Joi.string().uri().required(),
    PORT : Joi.number().default(3000).required (),
    API_PREFIX : Joi.string().default('/api/v1').required()
 }).unknown();


 const {error , value } = env.validate(process.env);
 
 if(error){throw new Error (`Error en las variables de entorno : ${error.message}`)}

 export default value;

