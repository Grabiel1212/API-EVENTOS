import cors from 'cors'; // para permitir el acceso a nuestra API desde otros dominios
import express, { Application } from "express";
import Env from './config/env';
import CategoriaRoutes from './router/categorias.routes';
import EventoRoutes from './router/eventos.routes';
import PagosRoutes from './router/pagos.routes';
import RegistroRoutes from './router/resgistros.routes';
import UsuarioRoutes from './router/usuario.routes';




export class App {

   public app: Application; // instanciamos el exprees


   // inicializamos la Clase App
   constructor() {
      this.app = express();
      this.middlewares();
      this.routes();
   }

   // Registra los middlewares necesarios para la aplicación.
   private middlewares(): void {
      this.app.use(express.json());
       this.app.use(cors()); // <-- esto permite las peticiones del frontend
   }

   //Registra los middlewares necesarios para la aplicación.
   private routes(): void {
      this.app.use(`${Env.API_PREFIX}/user`, UsuarioRoutes);// para usuarios
      this.app.use(`${Env.API_PREFIX}/evento`, EventoRoutes); // para eventos
      this.app.use(`${Env.API_PREFIX}/categoria`, CategoriaRoutes);  // para categorias
      this.app.use(`${Env.API_PREFIX}/pagos`, PagosRoutes); // para pagos
      this.app.use(`${Env.API_PREFIX}/registros`, RegistroRoutes); // para registros
   }

   //esto nos ayudara a instaciar nuestar clase App e inicilizar en otros TS
   public getApp(): Application {
      return this.app;
   }


}


export default App;