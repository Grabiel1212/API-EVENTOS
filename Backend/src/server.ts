  import App from './app';
import Env from './config/env';

  const PORT  : number  = Env.PORT;//optenmos nuestro puerto desde nuestro env 

  const server = new App().getApp();// instanciamos nuestra clase App 

  server.listen (PORT , () => {
   console.log(`Servidor corriendo en http://localhost:${PORT}${Env.API_PREFIX}`);// levantamos nuestra Api e imprimimos la url
  })