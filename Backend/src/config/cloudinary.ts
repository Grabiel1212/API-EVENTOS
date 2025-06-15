import { v2 as cloudinary } from 'cloudinary';
import Env from './env'; // importamos als variables de entorno

// pasamos los datos de nustra variable de entorno a neustro libreria (Cloudinary)
cloudinary.config({
  cloud_name: Env.CLOUDINARY_CLOUD_NAME,
  api_key: Env.CLOUDINARY_APY_KEY,
  api_secret: Env.CLOUDINARY_API_SECRET,
});

export default cloudinary;